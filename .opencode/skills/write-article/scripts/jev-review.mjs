#!/usr/bin/env node
// Jev review CLI for articles (skill: write-article).
//
// Usage:
//   node .opencode/skills/write-article/scripts/jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory]
//   node .opencode/skills/write-article/scripts/jev-review.mjs --stdin [--json] [--advisory]
//
// One batched Jev call per article: G1 (per-unit `noul` prose checklist), G3
// (genre and structure), G4 (AEO lead hook) and G2 (related links). With
// --stdin the draft arrives on standard input and only the G1 checklist runs,
// so a section can be checked while it is still being written. The engine and
// the prose domain live in `lib/jev/` and `lib/prose/`; this file is the
// article wiring only.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runReviewCli } from "@login-ai/jev/cli.mjs";
import { JevError } from "@login-ai/jev/client.mjs";
import { noulFinding } from "@login-ai/jev/findings.mjs";
import { noulQuestion } from "@login-ai/jev/questions.mjs";
import { mergeReports } from "@login-ai/jev/report.mjs";
import { runReview } from "@login-ai/jev/review.mjs";
import { chunk } from "@login-ai/jev/text.mjs";
import { THRESHOLDS } from "@login-ai/jev/thresholds.mjs";
import { filterFindings, relevanceFindings } from "@login-ai/prose/findings.mjs";
import { reviewText } from "@login-ai/prose/inline.mjs";
import {
  articleParagraphs,
  frontmatterField,
  frontmatterList,
  splitFrontmatter,
} from "@login-ai/prose/lines.mjs";
import { filterQuestions, relevanceQuestions } from "@login-ai/prose/prompts.mjs";
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

/** Units per request: 24 units × 5 filters stays well under the token limit. */
const UNIT_CHUNK = 20;

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

/** G7: the frontmatter metadata carries its weight. A low `noul` is a finding. */
function metaQuestions() {
  return {
    meta_title: noulQuestion(
      "`title` names a specific outcome and audience, not a generic phrase.",
    ),
    meta_description: noulQuestion(
      "`description` states the reader's problem and the core answer in one or two sentences.",
    ),
    meta_excerpt: noulQuestion(
      "`excerpt` adds information beyond the title and does not restate `description`.",
    ),
  };
}

const META_RULES = {
  meta_title: "TITLE_WEAK_CANDIDATE",
  meta_description: "DESCRIPTION_WEAK_CANDIDATE",
  meta_excerpt: "EXCERPT_WEAK_CANDIDATE",
};

/** G3 (genre/structure) + G4 (AEO) + G2 (targets) + G7 (metadata): document-level gates. */
function articleGlobalFindings({ units, category, meta, answers, targets = [], findings }) {
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

  for (const [key, rule] of Object.entries(META_RULES)) {
    noulFinding(findings, answers[key], { line: 1, rule, detail: meta[key] ?? "" });
  }
}

/** Review a markdown article: G1, G3, G4, G2, G7. */
export async function reviewArticle(slug, { lang = "ru" } = {}) {
  const file = path.join(ROOT, "articles", `${slug}.${lang}.md`);
  if (!existsSync(file)) throw new JevError("missing", `нет ${rel(file)}`);

  const source = read(file);
  const { frontmatter } = splitFrontmatter(source);
  const category = (frontmatterField(frontmatter, "category") ?? "").replace(/^["']|["']$/g, "");
  const units = articleParagraphs(source);
  const lead = units[0]?.text ?? "";
  const document = units.map((u) => u.text).join("\n\n");
  const targets = articleTargets(frontmatter, lang);
  const meta = {
    meta_title: frontmatterField(frontmatter, "title") ?? "",
    meta_description: frontmatterField(frontmatter, "description") ?? "",
    meta_excerpt: frontmatterField(frontmatter, "excerpt") ?? "",
  };

  const reports = [];
  const chunks = chunk(units, UNIT_CHUNK);
  for (let ci = 0; ci < chunks.length; ci += 1) {
    const current = chunks[ci];
    const global = ci === 0;
    reports.push(
      await runReview({
        kind: "article",
        slug,
        lang,
        file: rel(file),
        promptVersion: ARTICLE_PROMPT_VERSION,
        state: {
          units: current.map((u) => u.text),
          ...(global
            ? {
                document,
                title: meta.meta_title,
                description: meta.meta_description,
                excerpt: meta.meta_excerpt,
                declared_genre: category,
                lead,
                targets: targets.map((t) => t.text ?? ""),
              }
            : {}),
        },
        questions: {
          ...filterQuestions(current.length),
          ...(global
            ? {
                genre: genreQuestion(),
                structure: structureQuestion(),
                ...leadQuestions(),
                ...metaQuestions(),
                ...relevanceQuestions(targets.length),
              }
            : {}),
        },
        units: current.length,
        targets: global ? targets.length : 0,
        findingsFrom: (answers) => {
          const findings = [];
          filterFindings(current, answers, findings);
          if (global) articleGlobalFindings({ units, category, meta, answers, targets, findings });
          return findings;
        },
      }),
    );
  }
  return mergeReports(reports);
}

await runReviewCli({
  review: reviewArticle,
  inline: (text, options) => reviewText("article", text, options),
  usage: [
    "usage: jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory]",
    "       jev-review.mjs --stdin [--lang ru|en] ...  (draft on stdin)",
  ],
});
