#!/usr/bin/env node
// Calibration harness for the Jev prose-filter gate (G1).
//
// Runs eval-fixtures.json through the exact production shape — one batched
// `choice` question per unit — and reports per-item verdicts plus a per-filter
// confusion matrix. Run it after any edit to `prompts.mjs` so the gate stays
// honest. Requires RUNWARE_API_KEY; exits 0 without it.
//
//   node scripts/jev/eval.mjs [--json]

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { askDecisions, hasKey } from "./core.mjs";
import { FILTER_IDS, filterQuestions, PROMPT_VERSION } from "./prompts.mjs";

const FIXTURES = fileURLToPath(new URL("./eval-fixtures.json", import.meta.url));
const json = process.argv.includes("--json");

if (!hasKey()) {
  console.log("Jev eval: пропущено — RUNWARE_API_KEY не задан.");
  process.exit(0);
}

const fixtures = JSON.parse(readFileSync(FIXTURES, "utf8"));
const labels = [...FILTER_IDS, "none"];
const stats = Object.fromEntries(labels.map((l) => [l, { tp: 0, fp: 0, fn: 0, tn: 0 }]));
const rows = [];

for (const lang of ["ru", "en"]) {
  const items = fixtures.filter((f) => f.lang === lang);
  if (!items.length) continue;
  const { answers, usage } = await askDecisions({
    state: { units: items.map((f) => f.text) },
    questions: filterQuestions(items.length),
  });
  items.forEach((item, i) => {
    const answer = answers[`u${i}`];
    const got = answer?.choice ?? "none";
    rows.push({ ...item, got, confidence: answer?.confidence ?? 0, usage });
    for (const label of labels) {
      const want = item.expect === label;
      const hit = got === label;
      if (want && hit) stats[label].tp += 1;
      else if (!want && hit) stats[label].fp += 1;
      else if (want && !hit) stats[label].fn += 1;
      else stats[label].tn += 1;
    }
  });
}

const correct = rows.filter((r) => r.got === r.expect).length;
const accuracy = rows.length ? correct / rows.length : 0;

if (json) {
  console.log(JSON.stringify({ accuracy, promptVersion: PROMPT_VERSION, rows, stats }, null, 2));
} else {
  console.log("");
  for (const row of rows) {
    const ok = row.got === row.expect ? "OK  " : "MISS";
    console.log(
      `${ok} ${row.id.padEnd(22)} expect=${row.expect.padEnd(21)} got=${row.got.padEnd(21)} conf=${row.confidence}`,
    );
  }
  console.log(
    `\nDominant-label accuracy: ${correct}/${rows.length} (${(accuracy * 100).toFixed(0)}%)\n`,
  );
  for (const label of labels) {
    const s = stats[label];
    const total = s.tp + s.fp + s.fn + s.tn || 1;
    console.log(
      `  ${label.padEnd(21)} TP=${s.tp} FP=${s.fp} FN=${s.fn} TN=${s.tn}  acc=${((s.tp + s.tn) / total).toFixed(2)}`,
    );
  }
}
