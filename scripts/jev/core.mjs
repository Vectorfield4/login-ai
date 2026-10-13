// Jev review core: the one place that talks HTTP to the decisions endpoint.
//
// Jev (`typesafe:jev@1`) is a Runware *compatible* model with a single endpoint,
// `POST /v1/decisions`, in the TypeSafe request shape (`state` + `questions`).
// It is not reachable through the Runware MCP, so both skill scripts and
// `publish.mjs --jev` import this module instead. Everything network-facing is
// here; the question text and thresholds live in `prompts.mjs`.
//
// Without RUNWARE_API_KEY the module is inert: `hasKey()` is false and callers
// skip the gate, so CI (`npm test`, `verify`) never depends on the network.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  articleParagraphs,
  firstField,
  frontmatterField,
  frontmatterList,
  serviceBlocks,
  serviceStrings,
  splitFrontmatter,
} from "./lines.mjs";
import {
  ENDPOINT,
  filterQuestions,
  GENRE_STRUCTURES,
  genreQuestion,
  leadQuestions,
  MODEL,
  mechanismQuestions,
  PROMPT_VERSION,
  relevanceQuestions,
  sectionItemQuestions,
  strictFilterQuestions,
  structureQuestion,
  THRESHOLDS,
  titleQuestions,
} from "./prompts.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

export class JevError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "JevError";
    this.code = code;
  }
}

const apiKey = () => process.env.RUNWARE_API_KEY ?? "";
export const hasKey = () => apiKey().length > 0;

const read = (file) => (existsSync(file) ? readFileSync(file, "utf8") : "");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const rel = (file) => path.relative(ROOT, file).replace(/\\/g, "/");
const wordCount = (text) => text.split(/[^\p{L}\p{N}]+/u).filter(Boolean).length;

/**
 * One batched decisions request. Retries the transient 429/529 the TypeSafe docs
 * describe with exponential backoff; a key-less environment throws `no-key`
 * before any network call.
 */
export async function askDecisions({ state, questions, model = MODEL, endpoint = ENDPOINT }) {
  if (!hasKey()) throw new JevError("no-key", "RUNWARE_API_KEY is not set");
  const body = JSON.stringify({ model, state, questions });
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
        body,
      });
      if (res.status === 429 || res.status === 529) {
        await sleep(500 * 2 ** attempt);
        continue;
      }
      if (!res.ok) throw new JevError("http", `${res.status} ${await res.text()}`);
      return await res.json();
    } catch (error) {
      if (error instanceof JevError) throw error;
      lastError = error;
      await sleep(500 * 2 ** attempt);
    }
  }
  throw lastError ?? new JevError("http", "decisions request failed");
}

const ENTITY_DIRS = {
  service: "src/entities/service",
  solution: "src/entities/solution",
  case: "src/entities/case",
};

/** Short marketing text of a linked entity for the relevance gate; null if absent. */
function entityText(type, slug, lang) {
  const dir = ENTITY_DIRS[type];
  if (!dir) return null;
  const file = path.join(ROOT, dir, "i18n", lang, `${slug}.ts`);
  const src = read(file);
  if (!src) return null;
  return (
    firstField(src, "tagline") ??
    firstField(src, "description") ??
    firstField(src, "title") ??
    firstField(src, "navTitle")
  );
}

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

/** Service fixture `relevants[]`, with resolved tagline text. */
function serviceRelevants(slug, lang) {
  const src = read(path.join(ROOT, "src/entities/service/model/fixtures", `${slug}.ts`));
  const index = src.indexOf("relevants: [");
  if (index < 0) return [];
  const out = [];
  for (const m of src.slice(index).matchAll(/type:\s*"(\w+)"\s*,\s*slug:\s*"([a-z0-9-]+)"/g)) {
    out.push({ type: m[1], slug: m[2], text: entityText(m[1], m[2], lang) });
  }
  return out;
}

const noKeyReport = (kind, slug, lang) => ({
  kind,
  slug,
  lang,
  skipped: "no-key",
  findings: [],
  promptVersion: PROMPT_VERSION,
});

/** G1 verdicts into findings. Shared by both document shapes. */
function filterFindings(units, answers, findings, minConfidence) {
  units.forEach((unit, i) => {
    const answer = answers[`u${i}`];
    if (!answer || answer.choice === "none") return;
    if (answer.confidence < minConfidence) return;
    findings.push({
      line: unit.line,
      rule: `${answer.choice.toUpperCase()}_CANDIDATE`,
      confidence: answer.confidence,
      detail: unit.text.slice(0, 90),
    });
  });
}

/** G2 verdicts into findings (flag a target the model reads as off-topic). */
function relevanceFindings(targets, answers, findings) {
  const low = 1 - THRESHOLDS.noul;
  targets.forEach((target, i) => {
    const answer = answers[`rel${i}`];
    if (!answer || !target.text || answer.noul > low) return;
    findings.push({
      line: 0,
      rule: "RELEVANT_FIT_CANDIDATE",
      confidence: answer.noul,
      detail: `${target.type}:${target.slug}`,
    });
  });
}

/** `--strict`: independent `noul` probes for the negation and grounding filters. */
function strictFindings(units, answers, findings) {
  const low = 1 - THRESHOLDS.noul;
  const rules = [
    ["sneg", "NEGATIVE_CONNOTATION_CANDIDATE"],
    ["sfake", "FAKE_DEPTH_CANDIDATE"],
  ];
  units.forEach((unit, i) => {
    if (wordCount(unit.text) < 4) return;
    for (const [prefix, rule] of rules) {
      const answer = answers[`${prefix}${i}`];
      if (answer && answer.noul <= low) {
        findings.push({
          line: unit.line,
          rule,
          confidence: answer.noul,
          detail: unit.text.slice(0, 90),
        });
      }
    }
  });
}

/** Drops duplicate `line|rule` findings, keeping the first. */
const dedupe = (findings) => [...new Map(findings.map((f) => [`${f.line}|${f.rule}`, f])).values()];

/** Review a markdown article: G1 (filters), G3 (genre/structure), G4 (AEO lead), G2 (links). */
export async function reviewArticle(
  slug,
  { lang = "ru", minConfidence = THRESHOLDS.choiceConfidence, strict = false } = {},
) {
  const file = path.join(ROOT, "articles", `${slug}.${lang}.md`);
  if (!existsSync(file)) throw new JevError("missing", `нет ${rel(file)}`);
  if (!hasKey()) return noKeyReport("article", slug, lang);

  const source = read(file);
  const { frontmatter } = splitFrontmatter(source);
  const category = (frontmatterField(frontmatter, "category") ?? "").replace(/^["']|["']$/g, "");
  const units = articleParagraphs(source);
  const lead = units[0]?.text ?? "";
  const targets = articleTargets(frontmatter, lang);

  const questions = {
    ...filterQuestions(units.length),
    genre: genreQuestion(),
    structure: structureQuestion(),
    ...leadQuestions(),
    ...relevanceQuestions(targets.length),
    ...(strict ? strictFilterQuestions(units.length) : {}),
  };
  const state = {
    document: units.map((u) => u.text).join("\n\n"),
    title: frontmatterField(frontmatter, "title") ?? "",
    declared_genre: category,
    lead,
    units: units.map((u) => u.text),
    targets: targets.map((t) => t.text ?? ""),
  };

  const { answers, usage } = await askDecisions({ state, questions });
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
  const low = 1 - THRESHOLDS.noul;
  for (const key of ["aeo_problem", "aeo_answer"]) {
    const answer = answers[key];
    if (answer && answer.noul <= low) {
      findings.push({
        line: leadLine,
        rule: `${key.toUpperCase()}_CANDIDATE`,
        confidence: answer.noul,
        detail: "lead hook",
      });
    }
  }
  relevanceFindings(targets, answers, findings);
  if (strict) strictFindings(units, answers, findings);

  return {
    kind: "article",
    slug,
    lang,
    file: rel(file),
    units: units.length,
    targets: targets.length,
    findings: dedupe(findings),
    usage,
    promptVersion: PROMPT_VERSION,
  };
}

/** Review a service dictionary: G1 (filters), G2 (relevants), G5 (block semantics). */
export async function reviewService(
  slug,
  { lang = "ru", minConfidence = THRESHOLDS.choiceConfidence, strict = false } = {},
) {
  const file = path.join(ROOT, "src/entities/service/i18n", lang, `${slug}.ts`);
  if (!existsSync(file)) throw new JevError("missing", `нет ${rel(file)}`);
  if (!hasKey()) return noKeyReport("service", slug, lang);

  const source = read(file);
  const units = serviceStrings(source).filter((u) => wordCount(u.text) >= 3);
  const targets = serviceRelevants(slug, lang);
  const blocks = serviceBlocks(source);
  const pairs = [];
  for (const key of Object.keys(blocks.titled)) {
    for (const item of blocks.titled[key]) {
      if (item.title && item.text) pairs.push(item);
    }
  }
  const sectionItems = blocks.sections.flatMap((section) => section.items);

  const questions = {
    ...filterQuestions(units.length),
    ...relevanceQuestions(targets.length),
    ...mechanismQuestions(blocks.mechanism.length),
    ...titleQuestions(pairs.length),
    ...sectionItemQuestions(sectionItems.length),
    ...(strict ? strictFilterQuestions(units.length) : {}),
  };
  const state = {
    document: units.map((u) => u.text).join("\n"),
    units: units.map((u) => u.text),
    targets: targets.map((t) => t.text ?? ""),
    mechanisms: blocks.mechanism.map((m) => m.text ?? ""),
    titleChecks: pairs.map((p) => `${p.title} — ${p.text}`),
    sectionItems: sectionItems.map((s) => s.value),
  };

  const { answers, usage } = await askDecisions({ state, questions });
  const findings = [];
  filterFindings(units, answers, findings, minConfidence);
  relevanceFindings(targets, answers, findings);

  const low = 1 - THRESHOLDS.noul;
  blocks.mechanism.forEach((item, i) => {
    const answer = answers[`mech${i}`];
    if (!item.text || wordCount(item.text) < 20 || !answer || answer.noul > low) return;
    findings.push({
      line: item.textLine,
      rule: "MECHANISM_FRAGMENT_CANDIDATE",
      confidence: answer.noul,
      detail: item.text.slice(0, 90),
    });
  });
  pairs.forEach((item, i) => {
    const answer = answers[`title${i}`];
    if (!answer || answer.noul > low) return;
    findings.push({
      line: item.titleLine,
      rule: "BLOCK_TITLE_CANDIDATE",
      confidence: answer.noul,
      detail: item.title,
    });
  });
  sectionItems.forEach((item, i) => {
    const answer = answers[`sec${i}`];
    if (wordCount(item.value) < 3 || !answer || answer.noul > low) return;
    findings.push({
      line: item.line,
      rule: "SECTION_FRAGMENT_CANDIDATE",
      confidence: answer.noul,
      detail: item.value.slice(0, 90),
    });
  });
  if (strict) strictFindings(units, answers, findings);

  return {
    kind: "service",
    slug,
    lang,
    file: rel(file),
    units: units.length,
    targets: targets.length,
    findings: dedupe(findings),
    usage,
    promptVersion: PROMPT_VERSION,
  };
}

/** Dispatch by kind. */
export const review = (kind, slug, options) =>
  kind === "service" ? reviewService(slug, options) : reviewArticle(slug, options);

/** One `[file:line] RULE (conf)` line per finding, for the skill procedures. */
export function formatFindings(report) {
  if (report.skipped) return `Jev: пропущено (${report.skipped}) — RUNWARE_API_KEY не задан.`;
  if (!report.findings.length) return "Jev: кандидатов нет.";
  return report.findings
    .map((f) => {
      const where = f.line ? `[${report.file}:${f.line}]` : `[${report.file}]`;
      const detail = f.detail ? ` — ${f.detail}` : "";
      return `${where} ${f.rule} (${f.confidence})${detail}`;
    })
    .join("\n");
}
