#!/usr/bin/env node
// Calibration harness for the Jev prose-filter gate (G1).
//
// Default: runs `eval-fixtures.json` through two question shapes over the same
// fixtures — the production `noul` checklist and the legacy dominant-label
// `choice` — and prints both accuracies, their agreement and a per-filter
// confusion matrix.
//
//   --repeat N: runs the `noul` harness N times and reports each item's modal
//   label and agreement. It is a measurement of stability, not a gate: there is
//   no consensus loop, no re-run to convergence. Low agreement is flagged.
//
// Requires RUNWARE_API_KEY; exits 0 without it.
//
//   node lib/prose/eval.mjs [--json] [--repeat N]

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { askDecisions, hasKey } from "../jev/client.mjs";
import { THRESHOLDS } from "../jev/thresholds.mjs";
import { FILTER_IDS, FILTERS, filterQuestions, PROSE_PROMPT_VERSION } from "./prompts.mjs";

const FIXTURES = fileURLToPath(new URL("./eval-fixtures.json", import.meta.url));
const argv = process.argv.slice(2);
const json = argv.includes("--json");
const repeatIndex = argv.indexOf("--repeat");
const repeat = repeatIndex >= 0 ? Math.max(1, Number(argv[repeatIndex + 1]) || 1) : 1;

if (!hasKey()) {
  console.log("Jev eval: пропущено — RUNWARE_API_KEY не задан.");
  process.exit(0);
}

/** The legacy dominant-label harness, kept only for comparison. */
function legacyFilterQuestions(unitCount) {
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
function noulVerdict(answers, i) {
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
function modal(labels) {
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

const fixtures = JSON.parse(readFileSync(FIXTURES, "utf8"));

if (repeat > 1) {
  // Stability mode: the `noul` harness N times, modal label + agreement per item.
  const rows = [];
  for (const lang of ["ru", "en"]) {
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
      rows.push({ ...item, modal: label, agreement, matchesExpected: label === item.expect });
    });
  }
  const lowAgreement = rows.filter((r) => r.agreement < 1);
  if (json) {
    console.log(JSON.stringify({ promptVersion: PROSE_PROMPT_VERSION, repeat, rows }, null, 2));
  } else {
    console.log(`\nstability over ${repeat} runs:`);
    for (const row of rows) {
      const flag = row.agreement < 1 ? "LOW " : "STAB";
      console.log(
        `${flag} ${row.id.padEnd(22)} modal=${row.modal.padEnd(21)} agree=${row.agreement.toFixed(2)}  expect=${row.expect}`,
      );
    }
    console.log(
      `\nstable: ${rows.length - lowAgreement.length}/${rows.length}; low-agreement: ${lowAgreement.length}`,
    );
  }
  process.exit(0);
}

const labels = [...FILTER_IDS, "none"];
const stats = Object.fromEntries(labels.map((l) => [l, { tp: 0, fp: 0, fn: 0, tn: 0 }]));
const rows = [];

for (const lang of ["ru", "en"]) {
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

const noulCorrect = rows.filter((r) => r.noulGot === r.expect).length;
const legacyCorrect = rows.filter((r) => r.legacyGot === r.expect).length;
const agree = rows.filter((r) => r.noulGot === r.legacyGot).length;

if (json) {
  console.log(
    JSON.stringify(
      { promptVersion: PROSE_PROMPT_VERSION, noulCorrect, legacyCorrect, agree, rows, stats },
      null,
      2,
    ),
  );
} else {
  console.log("");
  for (const row of rows) {
    const ok = row.noulGot === row.expect ? "OK  " : "MISS";
    console.log(
      `${ok} ${row.id.padEnd(22)} expect=${row.expect.padEnd(21)} noul=${row.noulGot.padEnd(21)} p=${row.confidence.toFixed(2)}  legacy=${row.legacyGot}`,
    );
  }
  console.log(`\nNoul accuracy:   ${noulCorrect}/${rows.length}`);
  console.log(`Legacy accuracy: ${legacyCorrect}/${rows.length}`);
  console.log(`Harness agreement: ${agree}/${rows.length}\n`);
  for (const label of labels) {
    const s = stats[label];
    const total = s.tp + s.fp + s.fn + s.tn || 1;
    console.log(
      `  ${label.padEnd(21)} TP=${s.tp} FP=${s.fp} FN=${s.fn} TN=${s.tn}  acc=${((s.tp + s.tn) / total).toFixed(2)}`,
    );
  }
}
