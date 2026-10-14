// The shared content rubrics for the write-article and write-service skills.
// This is a domain, not the Jev engine: the prose filters, the relevance gate
// and the strict probes. The numbers live in `lib/jev/thresholds.mjs`.

import { choiceQuestion, noulQuestion } from "@login-ai/jev/questions.mjs";

export const PROSE_PROMPT_VERSION = "jev-prose@1";

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

const FILTER_CRITERIA = { ...FILTERS, none: "The text breaks none of the rules." };

/** G1: one dominant-filter `choice` per prose unit. `unitId` references `units[i]`. */
export function filterQuestions(unitCount) {
  const questions = {};
  for (let i = 0; i < unitCount; i += 1) {
    questions[`u${i}`] = choiceQuestion(
      `Which single prose-quality rule, if any, does \`units[${i}]\` most clearly violate? Choose the strongest.`,
      FILTER_CRITERIA,
    );
  }
  return questions;
}

/** G2: one `noul` per linked target. `targets[i]` carries its tagline/description. */
export function relevanceQuestions(targetCount) {
  const questions = {};
  for (let i = 0; i < targetCount; i += 1) {
    questions[`rel${i}`] = noulQuestion(
      `Is \`targets[${i}]\` a genuine, plausible next step for a reader of \`document\`? Judge topical and commercial fit, not shared words.`,
    );
  }
  return questions;
}

/** `--strict`: independent `noul` probes for the two hardest G1 filters. */
export function strictFilterQuestions(unitCount) {
  const questions = {};
  for (let i = 0; i < unitCount; i += 1) {
    questions[`sneg${i}`] = noulQuestion(
      `\`units[${i}]\` is free of negation-or-fear reasoning; it argues from what the system does.`,
    );
    questions[`sfake${i}`] = noulQuestion(
      `\`units[${i}]\` is grounded: it names a number, a boundary or a mechanism.`,
    );
  }
  return questions;
}
