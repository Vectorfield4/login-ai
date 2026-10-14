// Article-only Jev rubrics: genre, structure and the AEO lead hook. The shared
// per-unit filters, relevance gate and thresholds live in `lib/prose/` and
// `lib/jev/`.

import { choiceQuestion, noulQuestion } from "@login-ai/jev/questions.mjs";

export const ARTICLE_PROMPT_VERSION = "jev-article@1";

/** Article genres and the structures each may use (from write-article/SKILL.md). */
export const GENRE_STRUCTURES = {
  product: ["PSI", "How-To"],
  research: ["PSI", "Breakdown", "Journey"],
  technical: ["Breakdown", "How-To"],
  "case-study": ["PSI", "Journey"],
  corporate: ["PSI", "Journey"],
  industry: ["Comparison", "Breakdown"],
  media: ["Breakdown"],
  community: ["PSI"],
};

export const STRUCTURES = {
  PSI: "problem, then solution, then effect",
  Breakdown: "context, then mechanism, then limits",
  Comparison: "criterion, option A, option B, then a verdict",
  "How-To": "problem, prerequisites, steps, then verification",
  Journey: "status quo, challenge, failed attempts, insight, result",
};

/** G3a: article genre versus the declared frontmatter category. */
export function genreQuestion() {
  return choiceQuestion("Which single news-section genre does `document` belong to?", {
    product: "A solution or product choice for the reader",
    research: "Broad research coverage",
    technical: "A deep technical breakdown or how-to",
    "case-study": "One specific client case",
    corporate: "Corporate news",
    industry: "Industry coverage or a comparison",
    media: "A roundup of media",
    community: "Community news",
  });
}

/** G3b: article structure versus the one the genre allows. */
export function structureQuestion() {
  return choiceQuestion("Which single structure does `document` follow?", STRUCTURES);
}

/** G4: AEO lead-hook. Both nouls state the desirable property; a low value is a finding. */
export function leadQuestions() {
  return {
    aeo_problem: noulQuestion(
      "`lead` states the reader's problem or situation first, not an about-the-product run-up.",
    ),
    aeo_answer: noulQuestion(
      "`lead` carries the core answer or mechanism of the article in the same paragraph.",
    ),
  };
}
