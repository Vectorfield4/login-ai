// Calibration harnesses for the G1 prose gate: the dual run (production `noul`
// vs legacy `choice`) and the stability run (`noul` N times). Pure over an
// injected fixture list; `eval.mjs` holds the CLI and reporting.

import { askDecisions } from "../jev/client.mjs";
import { THRESHOLDS } from "../jev/thresholds.mjs";
import { FILTER_IDS, FILTERS, filterQuestions } from "./prompts.mjs";

const LANGS = ["ru", "en"];

/** The legacy dominant-label harness, kept only for comparison. */
export function legacyFilterQuestions(unitCount) {
  const criteria = { none: "The text breaks none of the rules." };
  for (const id of FILTER_IDS) criteria[id] = FILTERS[id].what;
  const questions = {};
  for (let i = 0; i < unitCount; i += 1) {
    questions[`u${i}`] = {
      type: "choice",
      instructions: `Which single prose-quality rule, if any, does \`units[${i}]\` most clearly violate? Choose the strongest.`,
      criteria,
    };
  }
  return questions;
}

/** The dominant filter of the `noul` checklist, or `none` below the dead zone. */
export function noulVerdict(answers, i) {
  let best = "none";
  let bestP = 0;
  for (const id of FILTER_IDS) {
    const answer = answers[`u${i}_${id}`];
    if (answer && answer.noul > bestP) {
      bestP = answer.noul;
      best = id;
    }
  }
  return { label: bestP >= THRESHOLDS.violation.review ? best : "none", confidence: bestP };
}

/** Most frequent label; ties go to the first seen. */
export function modal(labels) {
  const counts = new Map();
  for (const label of labels) counts.set(label, (counts.get(label) ?? 0) + 1);
  let best = labels[0];
  let bestCount = 0;
  for (const [label, count] of counts) {
    if (count > bestCount) {
      best = label;
      bestCount = count;
    }
  }
  return { label: best, agreement: bestCount / labels.length };
}

/** Dual harness over the fixtures: rows plus a per-filter confusion matrix. */
export async function dualRun(fixtures) {
  const labels = [...FILTER_IDS, "none"];
  const stats = Object.fromEntries(labels.map((l) => [l, { tp: 0, fp: 0, fn: 0, tn: 0 }]));
  const rows = [];
  for (const lang of LANGS) {
    const items = fixtures.filter((f) => f.lang === lang);
    if (!items.length) continue;
    const units = items.map((f) => f.text);
    const [{ answers: noulAnswers }, { answers: legacyAnswers }] = await Promise.all([
      askDecisions({ state: { units }, questions: filterQuestions(items.length) }),
      askDecisions({ state: { units }, questions: legacyFilterQuestions(items.length) }),
    ]);
    items.forEach((item, i) => {
      const { label: noulGot, confidence } = noulVerdict(noulAnswers, i);
      const legacyGot = legacyAnswers[`u${i}`]?.choice ?? "none";
      rows.push({ ...item, noulGot, confidence, legacyGot });
      for (const label of labels) {
        const want = item.expect === label;
        const hit = noulGot === label;
        if (want && hit) stats[label].tp += 1;
        else if (!want && hit) stats[label].fp += 1;
        else if (want && !hit) stats[label].fn += 1;
        else stats[label].tn += 1;
      }
    });
  }
  return { labels, stats, rows };
}

/** Stability harness: the `noul` checklist `repeat` times, modal label + agreement. */
export async function stabilityRun(fixtures, repeat) {
  const rows = [];
  for (const lang of LANGS) {
    const items = fixtures.filter((f) => f.lang === lang);
    if (!items.length) continue;
    const units = items.map((f) => f.text);
    const labels = items.map(() => []);
    for (let run = 0; run < repeat; run += 1) {
      const { answers } = await askDecisions({
        state: { units },
        questions: filterQuestions(items.length),
      });
      items.forEach((_, i) => {
        labels[i].push(noulVerdict(answers, i).label);
      });
    }
    items.forEach((item, i) => {
      const { label, agreement } = modal(labels[i]);
      rows.push({ ...item, modal: label, agreement });
    });
  }
  return rows;
}
