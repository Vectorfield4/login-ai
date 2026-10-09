#!/usr/bin/env node
// Find draft articles whose cover is already generated (skill: find-ready-article).
//
// A draft is `draft: true` in articles/<slug>.ru.md. It ships the moment a cover
// exists at articles/images/<slug>.<ext>. This script reports that one pair and
// nothing else: volume, frontmatter and prose stay with test/articles.test.ts and
// the write-article skill.
//
// Usage:
//   node .opencode/skills/find-ready-article/scripts/find.mjs [--json] [slug ...]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const ARTICLES = path.join(ROOT, "articles");
const IMAGES = path.join(ARTICLES, "images");
const README = path.join(IMAGES, "README.md");
const EXT = ["png", "jpg", "jpeg", "webp"];

const read = (file) => (fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "");

function coverOf(slug) {
  for (const ext of EXT) {
    const file = path.join(IMAGES, `${slug}.${ext}`);
    if (fs.existsSync(file)) return ext;
  }
  return null;
}

const awaitingRow = (slug) => new RegExp(`^\\|\\s*\`${slug}\``, "m").test(read(README));

/** Mirrors the schema default in src/content.config.ts: draft unless `false`. */
const isDraft = (frontmatter) => {
  const value = /^draft:\s*(true|false)\s*,?\s*$/m.exec(frontmatter)?.[1];
  return value !== "false";
};

function drafts() {
  const found = [];
  for (const file of fs.readdirSync(ARTICLES)) {
    const match = /^(.*)\.ru\.md$/.exec(file);
    if (!match) continue;
    const slug = match[1];
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(read(path.join(ARTICLES, file)))?.[1];
    if (!frontmatter || !isDraft(frontmatter)) continue;
    const ext = coverOf(slug);
    found.push({ slug, ext, staleRow: ext !== null && awaitingRow(slug) });
  }
  return found.sort((a, b) => a.slug.localeCompare(b.slug));
}

const args = process.argv.slice(2);
const json = args.includes("--json");
const wanted = new Set(args.filter((arg) => !arg.startsWith("--")));
let list = drafts();
if (wanted.size) list = list.filter((draft) => wanted.has(draft.slug));

const ready = list.filter((draft) => draft.ext !== null);
const waiting = list.filter((draft) => draft.ext === null);

if (json) {
  console.log(JSON.stringify({ ready, waiting }, null, 2));
  process.exit(0);
}

console.log(
  `Черновиков: ${list.length} · с обложкой: ${ready.length} · без обложки: ${waiting.length}`,
);
for (const draft of ready) {
  const note = draft.staleRow ? "  — убери строку в articles/images/README.md" : "";
  console.log(`  ✓ ${draft.slug} (${draft.ext})${note}`);
}
if (waiting.length) {
  console.log("Ждут обложку:");
  for (const draft of waiting) console.log(`  · ${draft.slug}`);
}
