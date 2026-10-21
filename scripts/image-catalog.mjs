/**
 * Image catalog — aggregates the per-image metadata sidecars.
 *
 * Each landed image ships with a `<slug>.meta.json` next to it (written by the
 * `generate-image-cover` skill's `scripts/image-prompt.mjs`). This module
 * walks `assets/images/<kind>/` and folds those sidecars into one list, so the
 * metadata of shipped assets is queryable without reading the queue (which only
 * ever holds what is still pending).
 *
 * Usage:
 *   node scripts/image-catalog.mjs [--kind article|service|solution] [--json] [--out <path>]
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { KIND_DIRS, ROOT } from "./generation-queue.mjs";

/** Meta sidecar suffix, next to `<slug>.png` / `<slug>.prompt.txt`. */
export const META_SUFFIX = ".meta.json";

/** Repo-relative roots to scan, per kind. Re-exported for tools and tests. */
export const CATALOG_ROOTS = KIND_DIRS;

/**
 * Aggregate every `<slug>.meta.json` under the kind folders, sorted by slug.
 * A malformed sidecar is skipped with a warning rather than failing the walk.
 */
export function readCatalog(kind) {
  const kinds = kind ? [kind] : Object.keys(KIND_DIRS);
  const entries = [];
  for (const current of kinds) {
    const dir = join(ROOT, KIND_DIRS[current]);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(META_SUFFIX)) continue;
      const slug = file.slice(0, -META_SUFFIX.length);
      let meta;
      try {
        meta = JSON.parse(readFileSync(join(dir, file), "utf8"));
      } catch (error) {
        console.warn(`image-catalog: skipping ${KIND_DIRS[current]}/${file} — ${error.message}`);
        continue;
      }
      entries.push({
        ...meta,
        kind: meta.kind ?? current,
        slug: meta.slug ?? slug,
        image: `${KIND_DIRS[current]}/${slug}.png`,
        hasImage: existsSync(join(dir, `${slug}.png`)),
        hasPrompt: existsSync(join(dir, `${slug}.prompt.txt`)),
      });
    }
  }
  return entries.sort((a, b) => a.slug.localeCompare(b.slug));
}

function printTable(entries) {
  for (const entry of entries) {
    const config = entry.visual_config ?? {};
    const flags = `${entry.hasImage ? "img" : "---"}${entry.hasPrompt ? "+prompt" : ""}`;
    console.log(
      `${entry.kind}\t${entry.slug}\t${flags}\t${entry.object || "-"}\t${config.composition ?? "-"}`,
    );
  }
  console.log(`\n${entries.length} image(s).`);
}

function main(argv) {
  const kindFlag = argv.indexOf("--kind");
  const kind = kindFlag === -1 ? undefined : argv[kindFlag + 1];
  const json = argv.includes("--json");
  const outFlag = argv.indexOf("--out");
  const out = outFlag === -1 ? undefined : argv[outFlag + 1];

  const entries = readCatalog(kind);
  const payload = json || out ? JSON.stringify(entries, null, 2) : undefined;

  if (out) writeFileSync(join(ROOT, out), `${payload}\n`, "utf8");
  if (json || out) console.log(out ? `wrote ${out} (${entries.length})` : payload);
  else printTable(entries);
}

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
