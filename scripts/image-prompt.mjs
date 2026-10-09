#!/usr/bin/env node
/**
 * Builds an image-generation prompt into the folder where the image belongs, so
 * nobody assembles the fixed 30-line prompt by hand (or spends model tokens on
 * it). The fixed text lives in `docs/images/*-prompt.txt` with `{{SLOT}}`
 * placeholders; this script fills the slots from the "Awaiting generation" table
 * of the matching README and writes `<slug>.prompt.txt` next to the image.
 *
 * The pickers (`getNewsCover`, `getServiceImage`) glob only
 * `*.{png,jpg,jpeg,webp}`, so `.prompt.txt` files are ignored by the build.
 *
 * Usage:
 *   node scripts/image-prompt.mjs article <slug> [--idea "..."] [--force] [--print]
 *   node scripts/image-prompt.mjs service <slug> [--idea "..."] [--topic "..."] [--force] [--print]
 *   node scripts/image-prompt.mjs article --all [--force]
 *   node scripts/image-prompt.mjs service --all [--force]
 *
 * Without `--idea`, the visual-idea slot gets a `[TODO: ...]` marker. With
 * `--all` the same `--idea` (if any) applies to every row, so pass it per slug.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const KINDS = {
  article: {
    table: "articles/images/README.md",
    template: "docs/images/image-generation-prompt.txt",
    outDir: "articles/images",
  },
  service: {
    table: "src/shared/assets/images/services/README.md",
    template: "docs/images/service-backdrop-prompt.txt",
    outDir: "src/shared/assets/images/services",
  },
};

const USAGE = `Usage:
  node scripts/image-prompt.mjs article <slug> [--idea "..."] [--force] [--print]
  node scripts/image-prompt.mjs service <slug> [--idea "..."] [--topic "..."] [--force] [--print]
  node scripts/image-prompt.mjs article --all [--force]
  node scripts/image-prompt.mjs service --all [--force]`;

function parseArgs(argv) {
  const flags = { idea: undefined, topic: undefined, force: false, print: false, all: false };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--idea") {
      index += 1;
      flags.idea = argv[index];
    } else if (arg === "--topic") {
      index += 1;
      flags.topic = argv[index];
    } else if (arg === "--force") {
      flags.force = true;
    } else if (arg === "--print") {
      flags.print = true;
    } else if (arg === "--all") {
      flags.all = true;
    } else {
      positional.push(arg);
    }
  }
  return { ...flags, positional };
}

/** Rows of the "Awaiting generation" table: `| \`slug\` | title | keywords |`. */
function readRows(tablePath) {
  const rows = [];
  for (const line of readFileSync(tablePath, "utf8").split(/\r?\n/)) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").map((cell) => cell.trim());
    if (cells.length < 5) continue;
    // Data rows wrap the slug in backticks; the header and the `| --- |`
    // separator row do not, so they fall out here.
    if (!cells[1].startsWith("`")) continue;
    const slug = cells[1].replace(/`/g, "");
    if (!/^[a-z0-9-]+$/.test(slug)) continue;
    rows.push({ slug, title: cells[2], keywords: cells[3] });
  }
  return rows;
}

const asArray = (keywords) =>
  `[${keywords
    .split(",")
    .map((keyword) => `"${keyword.trim()}"`)
    .join(", ")}]`;

function fill(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? `[TODO: ${key}]`);
}

const { idea, topic, force, print, all, positional } = parseArgs(process.argv.slice(2));
const [kind, slug] = positional;
const spec = KINDS[kind];

if (!spec || (!all && !slug)) {
  console.error(USAGE);
  process.exit(1);
}

const rows = readRows(spec.table);
const targets = all ? rows : rows.filter((row) => row.slug === slug);
if (targets.length === 0) {
  console.error(`slug "${slug}" is not in ${spec.table}`);
  process.exit(1);
}

const template = readFileSync(spec.template, "utf8");
const written = [];
for (const row of targets) {
  const outPath = join(spec.outDir, `${row.slug}.prompt.txt`);
  if (existsSync(outPath) && !force) {
    written.push(`skip (exists): ${outPath}`);
    continue;
  }
  const values =
    kind === "service"
      ? {
          SERVICE: row.title,
          TOPIC: topic ?? row.title,
          KEYWORDS: asArray(row.keywords),
          VISUAL_IDEA: idea ?? `[TODO: one abstract visual idea about ${row.keywords}]`,
        }
      : {
          TITLE: row.title,
          KEYWORDS: row.keywords,
          VISUAL_IDEA: idea ?? `[TODO: one abstract visual idea about ${row.keywords}]`,
        };
  const text = `${fill(template, values).trimEnd()}\n`;
  writeFileSync(outPath, text, "utf8");
  written.push(outPath);
  if (print) console.log(`\n--- ${outPath} ---\n${text}`);
}

for (const path of written) console.log(path);
