#!/usr/bin/env node
// Jev review CLI for services (skill: write-service).
//
// Usage:
//   node .opencode/skills/write-service/scripts/jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory]
//   node .opencode/skills/write-service/scripts/jev-review.mjs --stdin [--json] [--advisory]
//
// One batched Jev call per service: G1 (per-unit `noul` prose checklist),
// G2 (relevants) and G5 (mechanism, block titles, section items). With --stdin
// the draft arrives on standard input and only the G1 checklist runs, so a
// block can be checked while it is still being written. The engine and the
// prose domain live in `lib/jev/` and `lib/prose/`; this file is the service
// wiring only.

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
import { serviceBlocks, serviceStrings } from "./jev-lines.mjs";
import {
  mechanismQuestions,
  SERVICE_PROMPT_VERSION,
  sectionItemQuestions,
  titleQuestions,
} from "./jev-prompts.mjs";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const read = (file) => (existsSync(file) ? readFileSync(file, "utf8") : "");
const rel = (file) => path.relative(ROOT, file).replace(/\\/g, "/");

/** Units per request: 20 units × 5 filters per the token ceiling. */
const UNIT_CHUNK = 20;
/** Per-unit state cap: keeps a long dictionary from bloating the request. */
const UNIT_CAP = 1200;
const cap = (text) => (text.length > UNIT_CAP ? `${text.slice(0, UNIT_CAP)}…` : text);

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

/** G5: `mechanism` fragments, off-title blocks and fragment `sections` items. */
function blockFindings({ answers, blocks, pairs, sectionItems, findings }) {
  blocks.mechanism.forEach((item, i) => {
    if (!item.text || wordCount(item.text) < 20) return;
    noulFinding(findings, answers[`mech${i}`], {
      line: item.textLine,
      rule: "MECHANISM_FRAGMENT_CANDIDATE",
      detail: item.text.slice(0, 90),
    });
  });
  pairs.forEach((item, i) => {
    noulFinding(findings, answers[`title${i}`], {
      line: item.titleLine,
      rule: "BLOCK_TITLE_CANDIDATE",
      detail: item.title,
    });
  });
  sectionItems.forEach((item, i) => {
    if (wordCount(item.value) < 3) return;
    noulFinding(findings, answers[`sec${i}`], {
      line: item.line,
      rule: "SECTION_FRAGMENT_CANDIDATE",
      detail: item.value.slice(0, 90),
    });
  });
}

/** Review a service dictionary: G1 (filters), G2 (relevants), G5 (block semantics). */
export async function reviewService(slug, { lang = "ru" } = {}) {
  const file = path.join(ROOT, "src/entities/service/i18n", lang, `${slug}.ts`);
  if (!existsSync(file)) throw new JevError("missing", `нет ${rel(file)}`);

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

  const reports = [];
  const chunks = chunk(units, UNIT_CHUNK);
  for (let ci = 0; ci < chunks.length; ci += 1) {
    const current = chunks[ci];
    const global = ci === 0;
    reports.push(
      await runReview({
        kind: "service",
        slug,
        lang,
        file: rel(file),
        promptVersion: SERVICE_PROMPT_VERSION,
        state: {
          units: current.map((u) => cap(u.text)),
          ...(global
            ? {
                targets: targets.map((t) => t.text ?? ""),
                mechanisms: blocks.mechanism.map((m) => cap(m.text ?? "")),
                titleChecks: pairs.map((p) => `${p.title} — ${cap(p.text)}`),
                sectionItems: sectionItems.map((s) => cap(s.value)),
              }
            : {}),
        },
        questions: {
          ...filterQuestions(current.length),
          ...(global
            ? {
                ...relevanceQuestions(targets.length),
                ...mechanismQuestions(blocks.mechanism.length),
                ...titleQuestions(pairs.length),
                ...sectionItemQuestions(sectionItems.length),
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
            blockFindings({ answers, blocks, pairs, sectionItems, findings });
          }
          return findings;
        },
      }),
    );
  }
  return mergeReports(reports);
}

await runReviewCli({
  review: reviewService,
  inline: (text, options) => reviewText("service", text, options),
  usage: [
    "usage: jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory]",
    "       jev-review.mjs --stdin [--lang ru|en] ...  (draft on stdin)",
  ],
});
