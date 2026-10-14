// Service-only Jev rubrics: the block-semantics gate (G5). The shared per-unit
// filters, relevance gate and thresholds live in `lib/prose/` and `lib/jev/`.

import { noulQuestion } from "@login-ai/jev/questions.mjs";

export const SERVICE_PROMPT_VERSION = "jev-service@1";

/** G5a: a `mechanism` item must read as a point plus its consequence, not a fragment. */
export function mechanismQuestions(count) {
  const questions = {};
  for (let i = 0; i < count; i += 1) {
    questions[`mech${i}`] = noulQuestion(
      `\`mechanisms[${i}]\` reads as a point plus its consequence — a full paragraph, not a fragment.`,
    );
  }
  return questions;
}

/** G5b: a block title must name something its own text actually talks about. */
export function titleQuestions(count) {
  const questions = {};
  for (let i = 0; i < count; i += 1) {
    questions[`title${i}`] = noulQuestion(
      `In \`titleChecks[${i}]\` (format "TITLE — TEXT"), the title names something the text actually talks about.`,
    );
  }
  return questions;
}

/** G5c: a `sections` item must read as a full sentence, not a fragment. */
export function sectionItemQuestions(count) {
  const questions = {};
  for (let i = 0; i < count; i += 1) {
    questions[`sec${i}`] = noulQuestion(
      `\`sectionItems[${i}]\` reads as a full sentence, not a fragment.`,
    );
  }
  return questions;
}
