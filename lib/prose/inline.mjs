// Inline review of a draft fragment pasted on stdin, before it reaches disk.
//
// Runs the per-unit prose-filter sweep (G1), optionally `--strict` — genre,
// structure, AEO and the relevance gate need the file's frontmatter and linked
// targets, so they stay in the file-level article/service review. Units are
// prose paragraphs, so markdown and plain copy both work.

import { makeReport } from "@login-ai/jev/report.mjs";
import { runReview } from "@login-ai/jev/review.mjs";
import { THRESHOLDS } from "@login-ai/jev/thresholds.mjs";
import { filterFindings, strictFindings } from "./findings.mjs";
import { articleParagraphs } from "./lines.mjs";
import { filterQuestions, PROSE_PROMPT_VERSION, strictFilterQuestions } from "./prompts.mjs";

/** Review a pasted fragment: one dominant-filter `choice` per prose paragraph. */
export async function reviewText(
  kind,
  text,
  { lang = "ru", minConfidence = THRESHOLDS.choiceConfidence, strict = false } = {},
) {
  const units = articleParagraphs(text);
  if (!units.length) {
    return makeReport({
      kind,
      slug: "(stdin)",
      lang,
      file: "(stdin)",
      units: 0,
      findings: [],
      promptVersion: PROSE_PROMPT_VERSION,
    });
  }
  const questions = {
    ...filterQuestions(units.length),
    ...(strict ? strictFilterQuestions(units.length) : {}),
  };
  return runReview({
    kind,
    slug: "(stdin)",
    lang,
    file: "(stdin)",
    promptVersion: PROSE_PROMPT_VERSION,
    state: {
      document: units.map((u) => u.text).join("\n\n"),
      units: units.map((u) => u.text),
    },
    questions,
    units: units.length,
    minConfidence,
    findingsFrom: (answers) => {
      const findings = [];
      filterFindings(units, answers, findings, minConfidence);
      if (strict) strictFindings(units, answers, findings);
      return findings;
    },
  });
}
