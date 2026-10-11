#!/usr/bin/env node
// Publish a service from draft (skill: write-service).
// Usage:
//   node .opencode/skills/write-service/scripts/publish.mjs [--dry-run] [--force] <slug ...>
// Runs the readiness audit first and skips a slug that is not ready unless
// --force is passed. Then does the mechanical edits:
//   - drop the `draft: true` line from the fixture;
//   - drop the slug's record from content/generation-queue.json.
// It does not run the build; run `npm run lint && npm run test && npm run verify`
// afterwards.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { removeEntry } from "../../../../scripts/generation-queue.mjs";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const SVC_FIXTURES = path.join(ROOT, "src/entities/service/model/fixtures");
const AUDIT = fileURLToPath(new URL("./audit.mjs", import.meta.url));

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const slugs = args.filter((a) => !a.startsWith("--"));

if (!slugs.length) {
  console.error("Укажите хотя бы один slug: publish.mjs [--dry-run] [--force] <slug ...>");
  process.exit(1);
}

function editLines(file, drop) {
  const src = fs.readFileSync(file, "utf8");
  const eol = src.includes("\r\n") ? "\r\n" : "\n";
  const lines = src.split(/\r?\n/);
  const kept = lines.filter((line) => !drop(line));
  const removed = lines.length - kept.length;
  if (removed && !dryRun) fs.writeFileSync(file, kept.join(eol));
  const verb = dryRun ? "уберёт" : "убрал";
  console.log(
    `   ${removed ? `${verb} ${removed} строк(у)` : "строк нет"} — ${path.relative(ROOT, file)}`,
  );
}

const draftLine = (line) => /^\s*draft:\s*true\s*,?\s*$/.test(line);

let changed = 0;
for (const slug of slugs) {
  const audit = spawnSync(process.execPath, [AUDIT, slug], { encoding: "utf8" });
  if (audit.status !== 0 && !force) {
    console.log(
      `\nSKIP ${slug} — аудит не пройден (посмотри audit.mjs${force ? "" : " или --force"}).`,
    );
    continue;
  }

  console.log(`\nPUBLISH ${slug}${dryRun ? " (dry-run)" : ""}`);
  editLines(path.join(SVC_FIXTURES, `${slug}.ts`), draftLine);
  if (!dryRun) removeEntry("service", slug);
  console.log(`   ${dryRun ? "уберёт" : "убрал"} запись — content/generation-queue.json`);
  changed++;
}

console.log(
  `\n${dryRun ? "План" : "Готово"}: ${changed}/${slugs.length}. Далее: npm run lint && npm run test && npm run verify`,
);
