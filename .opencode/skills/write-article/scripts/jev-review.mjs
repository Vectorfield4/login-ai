#!/usr/bin/env node
// Jev review CLI for articles (skill: write-article).
//
// Usage:
//   node .opencode/skills/write-article/scripts/jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory] [--strict] [--min-confidence 0.5]
//   node .opencode/skills/write-article/scripts/jev-review.mjs --stdin [--json] [--advisory] [--strict]
//
// One batched Jev call per article: G1 (per-unit prose filters), G3 (genre and
// structure), G4 (AEO lead hook) and G2 (related links). With --stdin the draft
// arrives on standard input and only the G1 sweep runs, so a section can be
// checked while it is still being written. The engine and the prose domain live
// in `lib/jev/` and `lib/prose/`; this file is the article wiring only.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runReviewCli } from "@login-ai/jev/cli.mjs";
import { JevError } from "@login-ai/jev/client.mjs";
import { noulFinding } from "@login-ai/jev/findings.mjs";
import { runReview } from "@login-ai/jev/review.mjs";
import { THRESHOLDS } from "@login-ai/jev/thresholds.mjs";
import { filterFindings, relevanceFindings, strictFindings } from "@login-ai/prose/findings.mjs";
import { reviewText } from "@login-ai/prose/inline.mjs";
import {
  articleParagraphs,
  frontmatterField,
  frontmatterList,
  splitFrontmatter,
} from "@login-ai/prose/lines.mjs";
import {
  filterQuestions,
  relevanceQuestions,
  strictFilterQuestions,
} from "@login-ai/prose/prompts.mjs";
import { entityText } from "@login-ai/prose/targets.mjs";
import {
  ARTICLE_PROMPT_VERSION,
  GENRE_STRUCTURES,
  genreQuestion,
  leadQuestions,
  structureQuestion,
} from "./jev-prompts.mjs";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const read = (file) => (existsSync(file) ? readFileSync(file, "utf8") : "");
const rel = (file) => path.relative(ROOT, file).replace(/\\/g, "/");

/** Article frontmatter links, with resolved tagline text for the relevance gate. */
function articleTargets(frontmatter, lang) {
  const fields = [
    ["service", "relatedServices"],
    ["solution", "relatedSolutions"],
    ["case", "relatedCases"],
  ];
  const out = [];
  for (const [type, key] of fields) {
    for (const slug of frontmatterList(frontmatter, key)) {
      out.push({ type, slug, text: entityText(type, slug, lang) });
    }
  }
  return out;
}

/** The article question set. `targetCount=0` (inline review) drops the relevance gate. */
function articleQuestions(units, { targetCount = 0, strict = false } = {}) {
  return {
    ...filterQuestions(units.length),
    genre: genreQuestion(),
    structure: structureQuestion(),
    ...leadQuestions(),
    ...relevanceQuestions(targetCount),
    ...(strict ? strictFilterQuestions(units.length) : {}),
  };
}

/** G1 + G3 (genre/structure) + G4 (AEO) + G2 (targets). */
function articleFindings({ units, category, answers, targets = [], minConfidence, strict }) {
  const findings = [];
  filterFindings(units, answers, findings, minConfidence);

  const genre = answers.genre;
  if (
    genre &&
    category &&
    genre.choice !== category &&
    genre.confidence >= THRESHOLDS.choiceConfidence
  ) {
    findings.push({
      line: 1,
      rule: "GENRE_MISMATCH",
      confidence: genre.confidence,
      detail: `declared ${category}, reads as ${genre.choice}`,
    });
  }
  const structure = answers.structure;
  const allowed = GENRE_STRUCTURES[category];
  if (
    structure &&
    allowed &&
    !allowed.includes(structure.choice) &&
    structure.confidence >= THRESHOLDS.choiceConfidence
  ) {
    findings.push({
      line: 1,
      rule: "STRUCTURE_MISMATCH",
      confidence: structure.confidence,
      detail: `reads as ${structure.choice}; ${category} allows ${allowed.join("/")}`,
    });
  }

  const leadLine = units[0]?.line ?? 1;
  for (const key of ["aeo_problem", "aeo_answer"]) {
    noulFinding(findings, answers[key], {
      line: leadLine,
      rule: `${key.toUpperCase()}_CANDIDATE`,
      detail: "lead hook",
    });
  }
  relevanceFindings(targets, answers, findings);
  if (strict) strictFindings(units, answers, findings);
  return findings;
}

/** Review a markdown article: G1 (filters), G3 (genre/structure), G4 (AEO lead), G2 (links). */
export async function reviewArticle(
  slug,
  { lang = "ru", minConfidence = THRESHOLDS.choiceConfidence, strict = false } = {},
) {
  const file = path.join(ROOT, "articles", `${slug}.${lang}.md`);
  if (!existsSync(file)) throw new JevError("missing", `нет ${rel(file)}`);

  const source = read(file);
  const { frontmatter } = splitFrontmatter(source);
  const category = (frontmatterField(frontmatter, "category") ?? "").replace(/^["']|["']$/g, "");
  const units = articleParagraphs(source);
  const lead = units[0]?.text ?? "";
  const targets = articleTargets(frontmatter, lang);

  return runReview({
    kind: "article",
    slug,
    lang,
    file: rel(file),
    promptVersion: ARTICLE_PROMPT_VERSION,
    state: {
      document: units.map((u) => u.text).join("\n\n"),
      title: frontmatterField(frontmatter, "title") ?? "",
      declared_genre: category,
      lead,
      units: units.map((u) => u.text),
      targets: targets.map((t) => t.text ?? ""),
    },
    questions: articleQuestions(units, { targetCount: targets.length, strict }),
    units: units.length,
    targets: targets.length,
    minConfidence,
    findingsFrom: (answers, min) =>
      articleFindings({ units, category, answers, targets, minConfidence: min, strict }),
  });
}

await runReviewCli({
  review: reviewArticle,
  inline: (text, options) => reviewText("article", text, options),
  usage: [
    "usage: jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory] [--strict] [--min-confidence 0.5]",
    "       jev-review.mjs --stdin [--lang ru|en] ...  (draft on stdin)",
  ],
});
