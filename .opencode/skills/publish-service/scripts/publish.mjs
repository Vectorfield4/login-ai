#!/usr/bin/env node
// Publish a service from draft (skill: publish-service).
// Usage:
//   node .opencode/skills/publish-service/scripts/publish.mjs [--dry-run] <slug ...>
// Runs the readiness audit first and skips a slug that is not ready unless
// --force is passed. Then does the mechanical edits:
//   - drop the `draft: true` line from the fixture;
//   - remove the slug's row from the services README and the backdrops plan.
// It does not run the build; run `npm run lint && npm run test && npm run verify`
// afterwards.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const SVC_FIXTURES = path.join(ROOT, "src/entities/service/model/fixtures");
const README = path.join(ROOT, "src/shared/assets/images/services/README.md");
const BACKDROPS_PLAN = path.join(ROOT, "docs/plans/service-backdrops-plan.md");
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

/** Remove the row only inside the plan's "## Backlog" table, not the "Generated" one. */
function editBacklog(file, slug) {
  const src = fs.readFileSync(file, "utf8");
  const eol = src.includes("\r\n") ? "\r\n" : "\n";
  const lines = src.split(/\r?\n/);
  const start = lines.findIndex((line) => line.startsWith("## Backlog"));
  const row = tableRow(slug);
  let removed = 0;
  const kept = lines.filter((line, i) => {
    if (start === -1 || i < start || !row(line)) return true;
    removed++;
    return false;
  });
  if (removed && !dryRun) fs.writeFileSync(file, kept.join(eol));
  const verb = dryRun ? "уберёт" : "убрал";
  console.log(
    `   ${removed ? `${verb} ${removed} строк(у)` : "строк нет"} — ${path.relative(ROOT, file)}`,
  );
}

const draftLine = (line) => /^\s*draft:\s*true\s*,?\s*$/.test(line);
const tableRow = (slug) => (line) => new RegExp(`^\\|\\s*\`${slug}\`\\s*\\|`).test(line);

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
  editLines(README, tableRow(slug));
  editBacklog(BACKDROPS_PLAN, slug);
  changed++;
}

console.log(
  `\n${dryRun ? "План" : "Готово"}: ${changed}/${slugs.length}. Далее: npm run lint && npm run test && npm run verify`,
);
