// Jev question builders and thresholds — the single reviewable home the TypeSafe
// docs ask for. Change a rubric or a threshold here, nowhere else, and bump
// PROMPT_VERSION so the eval harness records which prompt produced the numbers.
//
// The gates are advisory: a `choice`/`noul` answer only becomes a finding when it
// clears the thresholds below. G1 uses `choice` (the reliable primitive from the
// RU benchmark); the `noul` gates are narrow binary rules.

export const PROMPT_VERSION = "jev-write-skills@1";

export const MODEL = "typesafe:jev@1";
export const ENDPOINT = "https://api.runware.ai/v1/decisions";

export const THRESHOLDS = {
  /** Minimum `choice.confidence` before a dominant-label verdict is reported. */
  choiceConfidence: 0.5,
  /** A `noul` at or above this is a strong yes; at or below (1 - it) a strong no. */
  noul: 0.8,
};

/** Per-unit prose rules (G1). Short rubrics on purpose: they repeat per question. */
export const FILTERS = {
  negative_connotation:
    "argues from negation or fear (not X but Y, not just X, doomsaying, legacy-bashing) instead of stating what the system does",
  fake_depth:
    "sounds substantial but names no number, boundary or mechanism; gloss idioms like «корпоративного уровня», «бесшовная интеграция», unqualified superlatives",
  structural_slop:
    "a sentence-level AI tell: tri-colon, forced rule of three, false range, hedging stack, generic conclusion, abstract metaphor noun (substrate, wedge, nexus, paradigm)",
  synthetic_depth:
    "an empty transition («важно отметить», «кроме того», furthermore), a spatial bridge («ниже», «в следующем разделе», below), or an unqualified puffery adjective («мощный», «гибкий», «надёжный» / flexible, powerful, reliable, scalable)",
  tautology: "says the same thing twice, adds no fact",
};

export const FILTER_IDS = Object.keys(FILTERS);

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

export const GENRES = Object.keys(GENRE_STRUCTURES);

export const STRUCTURES = {
  PSI: "problem, then solution, then effect",
  Breakdown: "context, then mechanism, then limits",
  Comparison: "criterion, option A, option B, then a verdict",
  "How-To": "problem, prerequisites, steps, then verification",
  Journey: "status quo, challenge, failed attempts, insight, result",
};

const FILTER_CRITERIA = { ...FILTERS, none: "The text breaks none of the rules." };

/** G1: one dominant-filter `choice` per prose unit. `unitId` references `units[i]`. */
export function filterQuestions(unitCount) {
  const questions = {};
  for (let i = 0; i < unitCount; i += 1) {
    questions[`u${i}`] = {
      type: "choice",
      instructions: `Which single prose-quality rule, if any, does \`units[${i}]\` most clearly violate? Choose the strongest.`,
      criteria: FILTER_CRITERIA,
    };
  }
  return questions;
}

/** G3a: article genre versus the declared frontmatter category. */
export function genreQuestion() {
  return {
    type: "choice",
    instructions: "Which single news-section genre does `document` belong to?",
    criteria: {
      product: "A solution or product choice for the reader",
      research: "Broad research coverage",
      technical: "A deep technical breakdown or how-to",
      "case-study": "One specific client case",
      corporate: "Corporate news",
      industry: "Industry coverage or a comparison",
      media: "A roundup of media",
      community: "Community news",
    },
  };
}

/** G3b: article structure versus the one the genre allows. */
export function structureQuestion() {
  return {
    type: "choice",
    instructions: "Which single structure does `document` follow?",
    criteria: STRUCTURES,
  };
}

/** G4: AEO lead-hook. Both nouls state the desirable property; a low value is a finding. */
export function leadQuestions() {
  return {
    aeo_problem: {
      type: "noul",
      instructions:
        "`lead` states the reader's problem or situation first, not an about-the-product run-up.",
    },
    aeo_answer: {
      type: "noul",
      instructions:
        "`lead` carries the core answer or mechanism of the article in the same paragraph.",
    },
  };
}

/** G2: one `noul` per linked target. `targets[i]` carries its tagline/description. */
export function relevanceQuestions(targetCount) {
  const questions = {};
  for (let i = 0; i < targetCount; i += 1) {
    questions[`rel${i}`] = {
      type: "noul",
      instructions: `Is \`targets[${i}]\` a genuine, plausible next step for a reader of \`document\`? Judge topical and commercial fit, not shared words.`,
    };
  }
  return questions;
}

/** G5a: a `mechanism` item must read as a point plus its consequence, not a fragment. */
export function mechanismQuestions(count) {
  const questions = {};
  for (let i = 0; i < count; i += 1) {
    questions[`mech${i}`] = {
      type: "noul",
      instructions: `\`mechanisms[${i}]\` reads as a point plus its consequence — a full paragraph, not a fragment.`,
    };
  }
  return questions;
}

/** G5b: a block title must name something its own text actually talks about. */
export function titleQuestions(count) {
  const questions = {};
  for (let i = 0; i < count; i += 1) {
    questions[`title${i}`] = {
      type: "noul",
      instructions: `In \`titleChecks[${i}]\` (format "TITLE — TEXT"), the title names something the text actually talks about.`,
    };
  }
  return questions;
}

/** G5c: a `sections` item must read as a full sentence, not a fragment. */
export function sectionItemQuestions(count) {
  const questions = {};
  for (let i = 0; i < count; i += 1) {
    questions[`sec${i}`] = {
      type: "noul",
      instructions: `\`sectionItems[${i}]\` reads as a full sentence, not a fragment.`,
    };
  }
  return questions;
}

/** `--strict`: independent `noul` probes for the two hardest G1 filters. */
export function strictFilterQuestions(unitCount) {
  const questions = {};
  for (let i = 0; i < unitCount; i += 1) {
    questions[`sneg${i}`] = {
      type: "noul",
      instructions: `\`units[${i}]\` is free of negation-or-fear reasoning; it argues from what the system does.`,
    };
    questions[`sfake${i}`] = {
      type: "noul",
      instructions: `\`units[${i}]\` is grounded: it names a number, a boundary or a mechanism.`,
    };
  }
  return questions;
}
