#!/usr/bin/env node
/**
 * Builds an image-generation prompt into the folder where the image belongs, so
 * nobody assembles the fixed prompt by hand (or spends model tokens on it). The
 * fixed text lives in `docs/image-prompts/scene-defined/<type>.txt` with
 * `{{SLOT}}` placeholders; the shared style paragraph lives in
 * `docs/image-prompts/cover-style.txt` and is injected as `{{STYLE}}`. This
 * script fills the slots from `content/generation-queue.json` and writes
 * `<slug>.prompt.txt` next to the image.
 *
 * The pickers (`getNewsCover`, `getServiceImage`) glob only
 * `*.{png,jpg,jpeg,webp}`, so `.prompt.txt` files are ignored by the build.
 *
 * Usage:
 *   node scripts/image-prompt.mjs article <slug> [--idea "..."] [--lang "..."] [--force] [--print]
 *   node scripts/image-prompt.mjs service <slug> [--idea "..."] [--topic "..."] [--lang "..."] [--force] [--print]
 *   node scripts/image-prompt.mjs solution <slug> [--idea "..."] [--lang "..."] [--force] [--print]
 *   node scripts/image-prompt.mjs article --all [--force]
 *   node scripts/image-prompt.mjs service --all [--force]
 *   node scripts/image-prompt.mjs solution --all [--force]
 *
 * The visual idea comes from the queue record's `story`. `--idea` overrides it
 * for a one-off run; an entry with no story gets a `[TODO: ...]` marker. With
 * `--all` the same `--idea` (if any) applies to every entry, so pass it per slug.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readQueue } from "./generation-queue.mjs";

const KINDS = {
  article: {
    template: "docs/image-prompts/scene-defined/article.txt",
    outDir: "articles/images",
  },
  service: {
    template: "docs/image-prompts/scene-defined/service.txt",
    outDir: "src/shared/assets/images/services",
  },
  solution: {
    template: "docs/image-prompts/scene-defined/solution.txt",
    outDir: "src/shared/assets/images/solutions",
  },
};

/** Shared style block, injected as {{STYLE}} into both templates. */
const STYLE_FILE = "docs/image-prompts/cover-style.txt";
/** Default {{LANG}} value; override with `--lang`. */
const DEFAULT_LANG = "Russian (preferred) or neutral, no visible text on image";

const USAGE = `Usage:
  node scripts/image-prompt.mjs article <slug> [--idea "..."] [--lang "..."] [--force] [--print]
  node scripts/image-prompt.mjs service <slug> [--idea "..."] [--topic "..."] [--lang "..."] [--force] [--print]
  node scripts/image-prompt.mjs solution <slug> [--idea "..."] [--lang "..."] [--force] [--print]
  node scripts/image-prompt.mjs article --all [--force]
  node scripts/image-prompt.mjs service --all [--force]
  node scripts/image-prompt.mjs solution --all [--force]`;

function parseArgs(argv) {
  const flags = {
    idea: undefined,
    topic: undefined,
    lang: undefined,
    force: false,
    print: false,
    all: false,
  };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--idea") {
      index += 1;
      flags.idea = argv[index];
    } else if (arg === "--topic") {
      index += 1;
      flags.topic = argv[index];
    } else if (arg === "--lang") {
      index += 1;
      flags.lang = argv[index];
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

/** Mirrors the `keywords` slot of the scene-defined service template. */
const asArray = (keywords) => `[${keywords.map((keyword) => `"${keyword}"`).join(", ")}]`;

function fill(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? `[TODO: ${key}]`);
}

/** Slot values per kind; a template ignores the slots it does not use. */
function valuesFor(kind, entry, { visualIdea, topic, lang, style }) {
  const common = { VISUAL_IDEA: visualIdea, STYLE: style, LANG: lang ?? DEFAULT_LANG };
  if (kind === "article") {
    return { ...common, TITLE: entry.title, KEYWORDS: entry.keywords.join(", ") };
  }
  const named = { ...common, TOPIC: topic ?? entry.title, KEYWORDS: asArray(entry.keywords) };
  return kind === "solution"
    ? { ...named, SOLUTION: entry.title }
    : { ...named, SERVICE: entry.title };
}

const { idea, topic, lang, force, print, all, positional } = parseArgs(process.argv.slice(2));
const [kind, slug] = positional;
const spec = KINDS[kind];

if (!spec || (!all && !slug)) {
  console.error(USAGE);
  process.exit(1);
}

const entries = readQueue().filter((entry) => entry.kind === kind);
const targets = all ? entries : entries.filter((entry) => entry.slug === slug);
if (targets.length === 0) {
  console.error(`slug "${slug}" is not in the generation queue for kind "${kind}"`);
  process.exit(1);
}

const template = readFileSync(spec.template, "utf8");
const style = readFileSync(STYLE_FILE, "utf8").trimEnd();
const written = [];
for (const entry of targets) {
  const outPath = join(spec.outDir, `${entry.slug}.prompt.txt`);
  if (existsSync(outPath) && !force) {
    written.push(`skip (exists): ${outPath}`);
    continue;
  }
  const story = idea ?? (entry.story?.trim() ? entry.story : undefined);
  const todo = `[TODO: one abstract visual idea about ${entry.keywords.join(", ")}]`;
  const values = valuesFor(kind, entry, {
    visualIdea: story ?? todo,
    topic,
    lang,
    style,
  });
  const text = `${fill(template, values).trimEnd()}\n`;
  writeFileSync(outPath, text, "utf8");
  written.push(outPath);
  if (print) console.log(`\n--- ${outPath} ---\n${text}`);
}

for (const path of written) console.log(path);
