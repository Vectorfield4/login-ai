/**
 * Generation queue — the single list of images still to generate.
 *
 * Holds all three pipelines: article covers (`assets/images/articles/<slug>.png`),
 * service backdrops (`assets/images/services/<slug>.png`) and solution
 * backdrops (`assets/images/solutions/<slug>.png`). It is the one home for a
 * record's title, keywords, the structured `visual_config` (or the deprecated
 * free-form `story`), the short Latin `topic` the opener interpolates (the
 * Cyrillic `title`/`keywords` break lettering in the frame) and the Latin
 * `object` — the concrete subject of the image, required for solutions.
 *
 * Presence of a record means "pending"; absence means the image exists. Unlike
 * article/service, a solution record is not a draft gate — solutions ship an SVG
 * hero, so the raster is additive. The record is the prompt source:
 * `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs` fills
 * `{{TITLE}}`/`{{SERVICE}}`/`{{SOLUTION}}`/`{{TOPIC}}`/`{{KEYWORDS}}`/`{{VISUAL_IDEA}}`
 * from it.
 *
 * Usage:
 *   node scripts/generation-queue.mjs list [--kind article|service|solution] [--json]
 *   node scripts/generation-queue.mjs get <kind> <slug>
 *   node scripts/generation-queue.mjs add --kind <k> --slug <s> --title "<t>" --keywords "a, b" [--story "..."] [--topic "..."] [--object "..."] [--visual-config '<json>']
 *   node scripts/generation-queue.mjs remove <kind> <slug>
 *   node scripts/generation-queue.mjs set-story <kind> <slug> "<story>"
 *   node scripts/generation-queue.mjs set-topic <kind> <slug> "<topic>"
 *   node scripts/generation-queue.mjs set-object <kind> <slug> "<object>"
 *   node scripts/generation-queue.mjs set-visual-config <kind> <slug> '<json>'
 *   node scripts/generation-queue.mjs set-keywords <kind> <slug> "a, b, c"
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/** Repo root. From this file's URL when run by node; from cwd under Vite/Vitest. */
function resolveRepoRoot() {
  try {
    return fileURLToPath(new URL("../", import.meta.url));
  } catch {
    return process.cwd();
  }
}

/** Repo root, resolved from this file's location (`<root>/scripts/`). */
export const ROOT = resolveRepoRoot();
/** The manifest itself. */
export const QUEUE_PATH = join(ROOT, "content/generation-queue.json");
/** Where each kind's image lives, repo-relative. */
export const KIND_DIRS = {
  article: "assets/images/articles",
  service: "assets/images/services",
  solution: "assets/images/solutions",
};

export const KINDS = Object.keys(KIND_DIRS);

/** Repo-relative target file for one entry (`<dir>/<slug>.png`). */
export function targetRel(kind, slug) {
  return `${KIND_DIRS[kind]}/${slug}.png`;
}

/** Absolute target file for one entry. */
export function targetPath(kind, slug) {
  return join(ROOT, KIND_DIRS[kind], `${slug}.png`);
}

/** Every entry, in file order. Empty when the manifest is missing or empty. */
export function readQueue() {
  if (!existsSync(QUEUE_PATH)) return [];
  const raw = readFileSync(QUEUE_PATH, "utf8").trim();
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

/** The entry for `(kind, slug)`, or undefined. */
export function getEntry(kind, slug) {
  return readQueue().find((entry) => entry.kind === kind && entry.slug === slug);
}

/** Slugs still pending. Pass a kind to narrow, omit it for both. */
export function pendingSlugs(kind) {
  return readQueue()
    .filter((entry) => !kind || entry.kind === kind)
    .map((entry) => entry.slug);
}

/** Write the whole queue back, preserving the repo's CRLF line endings. */
function writeQueue(entries) {
  const text = JSON.stringify(entries, null, 2).replace(/\n/g, "\r\n");
  writeFileSync(QUEUE_PATH, `${text}\r\n`, "utf8");
}

/** Drop the `(kind, slug)` record. Returns how many rows were removed. */
export function removeEntry(kind, slug) {
  const all = readQueue();
  const next = all.filter((entry) => !(entry.kind === kind && entry.slug === slug));
  if (next.length === all.length) return 0;
  writeQueue(next);
  return all.length - next.length;
}

/** Set the visual `story` of an existing record. Throws when it is missing. */
export function setStory(kind, slug, story) {
  const all = readQueue();
  const entry = all.find((item) => item.kind === kind && item.slug === slug);
  if (!entry) throw new Error(`no ${kind} entry for "${slug}" in the generation queue`);
  entry.story = story;
  writeQueue(all);
  return entry;
}

/** Set the short Latin `topic` of an existing record. Throws when it is missing. */
export function setTopic(kind, slug, topic) {
  const all = readQueue();
  const entry = all.find((item) => item.kind === kind && item.slug === slug);
  if (!entry) throw new Error(`no ${kind} entry for "${slug}" in the generation queue`);
  entry.topic = topic;
  writeQueue(all);
  return entry;
}

/** Set the short Latin `object` (the image's subject) of an existing record. */
export function setObject(kind, slug, object) {
  const all = readQueue();
  const entry = all.find((item) => item.kind === kind && item.slug === slug);
  if (!entry) throw new Error(`no ${kind} entry for "${slug}" in the generation queue`);
  entry.object = object;
  writeQueue(all);
  return entry;
}

/** Set the structured `visual_config` of an existing record. Throws when missing. */
export function setVisualConfig(kind, slug, config) {
  const all = readQueue();
  const entry = all.find((item) => item.kind === kind && item.slug === slug);
  if (!entry) throw new Error(`no ${kind} entry for "${slug}" in the generation queue`);
  entry.visual_config = config;
  writeQueue(all);
  return entry;
}

/** Set the English `keywords` of an existing record. Throws when missing. */
export function setKeywords(kind, slug, keywords) {
  const all = readQueue();
  const entry = all.find((item) => item.kind === kind && item.slug === slug);
  if (!entry) throw new Error(`no ${kind} entry for "${slug}" in the generation queue`);
  entry.keywords = keywords;
  writeQueue(all);
  return entry;
}

/** Append a record. Throws on a duplicate `(kind, slug)` or a solution without `object`. */
export function addEntry(entry) {
  if (entry.kind === "solution" && !entry.object?.trim()) {
    throw new Error(`solution "${entry.slug}" needs a non-empty Latin \`object\``);
  }
  const all = readQueue();
  if (all.some((item) => item.kind === entry.kind && item.slug === entry.slug)) {
    throw new Error(`${entry.kind} "${entry.slug}" is already in the generation queue`);
  }
  all.push(entry);
  writeQueue(all);
  return entry;
}

const USAGE = `Usage:
  node scripts/generation-queue.mjs list [--kind article|service|solution] [--json]
  node scripts/generation-queue.mjs get <kind> <slug>
  node scripts/generation-queue.mjs add --kind <k> --slug <s> --title "<t>" --keywords "a, b" [--story "..."] [--topic "..."] [--object "..."] [--visual-config '<json>']
  node scripts/generation-queue.mjs remove <kind> <slug>
  node scripts/generation-queue.mjs set-story <kind> <slug> "<story>"
  node scripts/generation-queue.mjs set-topic <kind> <slug> "<topic>"
  node scripts/generation-queue.mjs set-object <kind> <slug> "<object>"
  node scripts/generation-queue.mjs set-visual-config <kind> <slug> '<json>'
  node scripts/generation-queue.mjs set-keywords <kind> <slug> "a, b, c"`;

function parseFlags(argv) {
  const flags = {};
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (key === "json") {
        flags.json = true;
      } else {
        index += 1;
        flags[key] = argv[index];
      }
    } else {
      positional.push(arg);
    }
  }
  return { flags, positional };
}

function main(argv) {
  const [command, ...rest] = argv;
  const { flags, positional } = parseFlags(rest);

  if (command === "list") {
    const entries = readQueue().filter((entry) => !flags.kind || entry.kind === flags.kind);
    if (flags.json) {
      console.log(JSON.stringify(entries, null, 2));
      return;
    }
    for (const entry of entries) {
      console.log(`${entry.kind}\t${entry.slug}\t${entry.title}`);
    }
    console.log(`\n${entries.length} pending image(s).`);
    return;
  }

  if (command === "get") {
    const [kind, slug] = positional;
    const entry = getEntry(kind, slug);
    if (!entry) {
      console.error(`no ${kind} entry for "${slug}"`);
      process.exit(1);
    }
    console.log(JSON.stringify(entry, null, 2));
    return;
  }

  if (command === "remove") {
    const [kind, slug] = positional;
    const removed = removeEntry(kind, slug);
    console.log(removed ? `removed ${kind} "${slug}"` : `no ${kind} entry for "${slug}"`);
    return;
  }

  if (command === "set-story") {
    const [kind, slug, story] = positional;
    setStory(kind, slug, story ?? "");
    console.log(`set story for ${kind} "${slug}"`);
    return;
  }

  if (command === "set-topic") {
    const [kind, slug, topic] = positional;
    setTopic(kind, slug, topic ?? "");
    console.log(`set topic for ${kind} "${slug}"`);
    return;
  }

  if (command === "set-object") {
    const [kind, slug, object] = positional;
    setObject(kind, slug, object ?? "");
    console.log(`set object for ${kind} "${slug}"`);
    return;
  }

  if (command === "set-visual-config") {
    const [kind, slug, json] = positional;
    setVisualConfig(kind, slug, JSON.parse(json ?? "{}"));
    console.log(`set visual_config for ${kind} "${slug}"`);
    return;
  }

  if (command === "set-keywords") {
    const [kind, slug, raw] = positional;
    const keywords = (raw ?? "")
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    setKeywords(kind, slug, keywords);
    console.log(`set ${keywords.length} keywords for ${kind} "${slug}"`);
    return;
  }

  if (command === "add") {
    const keywords = (flags.keywords ?? "")
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    const entry = {
      kind: flags.kind,
      slug: flags.slug,
      title: flags.title ?? "",
      keywords,
      story: flags.story ?? "",
    };
    if (flags.topic) entry.topic = flags.topic;
    if (flags.object) entry.object = flags.object;
    if (flags["visual-config"]) entry.visual_config = JSON.parse(flags["visual-config"]);
    addEntry(entry);
    console.log(`added ${flags.kind} "${flags.slug}"`);
    return;
  }

  console.error(USAGE);
  process.exit(1);
}

/** True only when this file is the node entrypoint, never when imported. */
function isEntrypoint() {
  try {
    return Boolean(process.argv[1]) && fileURLToPath(import.meta.url) === process.argv[1];
  } catch {
    return false;
  }
}

if (isEntrypoint()) {
  main(process.argv.slice(2));
}
