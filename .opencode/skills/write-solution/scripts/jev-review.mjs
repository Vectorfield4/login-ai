#!/usr/bin/env node
// Jev review CLI for solutions (skill: write-solution).
//
// Usage:
//   node .opencode/skills/write-solution/scripts/jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory]
//   node .opencode/skills/write-solution/scripts/jev-review.mjs --stdin [--json] [--advisory]
//
// One batched Jev call per solution: G1 (per-unit `noul` prose checklist),
// G2 (relevants, with a deterministic note-key check) and G6 (FAQ answers).
// With --stdin only the G1 checklist runs. The engine and the prose domain live
// in `lib/jev/` and `lib/prose/`; this file is the solution wiring only.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runReviewCli } from "@login-ai/jev/cli.mjs";
import { JevError } from "@login-ai/jev/client.mjs";
import { noulFinding } from "@login-ai/jev/findings.mjs";
import { mergeReports } from "@login-ai/jev/report.mjs";
import { runReview } from "@login-ai/jev/review.mjs";
import { chunk, wordCount } from "@login-ai/jev/text.mjs";
import { filterFindings, relevanceFindings } from "@login-ai/prose/findings.mjs";
import { reviewText } from "@login-ai/prose/inline.mjs";
import { filterQuestions, relevanceQuestions } from "@login-ai/prose/prompts.mjs";
import { entityText } from "@login-ai/prose/targets.mjs";
import { solutionFaqs, solutionStrings } from "./jev-lines.mjs";
import { faqQuestions, SOLUTION_PROMPT_VERSION } from "./jev-prompts.mjs";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const read = (file) => (existsSync(file) ? readFileSync(file, "utf8") : "");
const rel = (file) => path.relative(ROOT, file).replace(/\\/g, "/");

/** Units per request: 20 units × 5 filters per the token ceiling. */
const UNIT_CHUNK = 20;
/** Per-unit state cap: keeps a long dictionary from bloating the request. */
const UNIT_CAP = 1200;
const cap = (text) => (text.length > UNIT_CAP ? `${text.slice(0, UNIT_CAP)}…` : text);

/** Solution fixture `relevants[]`, with resolved tagline text and note keys. */
function solutionRelevants(slug, lang) {
  const src = read(path.join(ROOT, "src/entities/solution/model/fixtures", `${slug}.ts`));
  const index = src.indexOf("relevants: [");
  if (index < 0) return [];
  const out = [];
  const re = /type:\s*"(\w+)"\s*,\s*slug:\s*"([a-z0-9-]+)"\s*,\s*noteKey:\s*"([^"]*)"/g;
  for (const m of src.slice(index).matchAll(re)) {
    out.push({ type: m[1], slug: m[2], noteKey: m[3], text: entityText(m[1], m[2], lang) });
  }
  return out;
}

/** G6 + a deterministic note-key presence check. */
function faqAndNoteFindings({ answers, faqs, targets, findings }) {
  faqs.forEach((faq, i) => {
    noulFinding(findings, answers[`faq${i}`], {
      line: faq.questionLine,
      rule: "FAQ_UNANSWERED_CANDIDATE",
      detail: faq.question.slice(0, 90),
    });
  });
  targets.forEach((target) => {
    if (!target.noteKey) {
      findings.push({
        line: 0,
        rule: "RELEVANT_NOTE_MISSING",
        confidence: 1,
        detail: `${target.type}:${target.slug}`,
      });
    }
  });
}

/** Review a solution dictionary: G1 (filters), G2 (relevants), G6 (FAQ answers). */
export async function reviewSolution(slug, { lang = "ru" } = {}) {
  const file = path.join(ROOT, "src/entities/solution/i18n", lang, `${slug}.ts`);
  if (!existsSync(file)) throw new JevError("missing", `нет ${rel(file)}`);

  const source = read(file);
  const units = solutionStrings(source).filter((u) => wordCount(u.text) >= 3);
  const targets = solutionRelevants(slug, lang);
  const faqs = solutionFaqs(source);

  const reports = [];
  const chunks = chunk(units, UNIT_CHUNK);
  for (let ci = 0; ci < chunks.length; ci += 1) {
    const current = chunks[ci];
    const global = ci === 0;
    reports.push(
      await runReview({
        kind: "solution",
        slug,
        lang,
        file: rel(file),
        promptVersion: SOLUTION_PROMPT_VERSION,
        state: {
          units: current.map((u) => cap(u.text)),
          ...(global
            ? {
                targets: targets.map((t) => t.text ?? ""),
                faqs: faqs.map((f) => `${f.question} — ${f.answer}`),
              }
            : {}),
        },
        questions: {
          ...filterQuestions(current.length),
          ...(global
            ? {
                ...relevanceQuestions(targets.length),
                ...faqQuestions(faqs.length),
              }
            : {}),
        },
        units: current.length,
        targets: global ? targets.length : 0,
        findingsFrom: (answers) => {
          const findings = [];
          filterFindings(current, answers, findings);
          if (global) {
            relevanceFindings(targets, answers, findings);
            faqAndNoteFindings({ answers, faqs, targets, findings });
          }
          return findings;
        },
      }),
    );
  }
  return mergeReports(reports);
}

await runReviewCli({
  review: reviewSolution,
  inline: (text, options) => reviewText("solution", text, options),
  usage: [
    "usage: jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory]",
    "       jev-review.mjs --stdin [--lang ru|en] ...  (draft on stdin)",
  ],
});
