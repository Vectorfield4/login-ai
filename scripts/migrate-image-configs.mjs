#!/usr/bin/env node
/**
 * Normalize queued visual configs to the shared slug-derived composition model.
 *
 * Usage: node scripts/migrate-image-configs.mjs [--dry-run]
 */
import { writeFileSync } from "node:fs";
import { compositionKeyFor } from "../docs/image-prompts/composition.mjs";
import { QUEUE_PATH, readQueue } from "./generation-queue.mjs";

const dryRun = process.argv.includes("--dry-run");
const entries = readQueue();
let changed = 0;

for (const entry of entries) {
  const config = entry.visual_config;
  if (!config) continue;
  const normalized = { ...config };
  delete normalized.topology;
  delete normalized.hardware_archetype;
  delete normalized.slot_locking;
  normalized.composition = normalized.composition || compositionKeyFor(entry.slug);

  if (JSON.stringify(config) !== JSON.stringify(normalized)) {
    entry.visual_config = normalized;
    changed += 1;
  }
}

if (!dryRun && changed > 0) {
  const text = JSON.stringify(entries, null, 2).replace(/\n/g, "\r\n");
  writeFileSync(QUEUE_PATH, `${text}\r\n`, "utf8");
}

console.log(`${dryRun ? "would normalize" : "normalized"} ${changed} queued visual config(s)`);
