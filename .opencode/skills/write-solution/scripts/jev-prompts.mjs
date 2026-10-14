// Solution-only Jev rubrics. The shared per-unit filters, relevance gate and
// thresholds live in `lib/prose/` and `lib/jev/`.

import { noulQuestion } from "@login-ai/jev/questions.mjs";

export const SOLUTION_PROMPT_VERSION = "jev-solution@1";

/** G6: an FAQ answer must actually answer its question. A low `noul` is a finding. */
export function faqQuestions(count) {
  const questions = {};
  for (let i = 0; i < count; i += 1) {
    questions[`faq${i}`] = noulQuestion(
      `In \`faqs[${i}]\` (format "QUESTION — ANSWER"), the answer directly answers the question instead of restating it, dodging it, or changing the subject.`,
    );
  }
  return questions;
}
