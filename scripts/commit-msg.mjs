/**
 * commit-msg — enforce the commit prefix on the first meaningful line.
 *
 * Accepted prefixes live in `commit-convention.mjs`: Conventional types plus the
 * repo's area prefixes (`content`, `skill`, `agent`, `news`, …). Merge,
 * revert-by-git and fixup/squash commits pass through.
 *
 * Installed as the husky `commit-msg` hook:
 *   node scripts/commit-msg.mjs "$1"
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { ALL_TYPES } from "./commit-convention.mjs";

const SUBJECT = /^(\w+)(?:\(([^)]+)\))?(!)?: .+/;

/** The first non-empty, non-comment line — the subject git will show. */
export function firstMeaningfulLine(text) {
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    return trimmed;
  }
  return "";
}

/** `null` when valid or exempt; otherwise the human-readable problem. */
export function validateSubject(subject) {
  if (!subject) return null;
  if (/^merge\b/i.test(subject)) return null;
  if (/^revert\b/i.test(subject)) return null;
  if (/^(fixup|squash)!/i.test(subject)) return null;
  const match = SUBJECT.exec(subject);
  if (!match) return "missing a `type: description` shape";
  if (!ALL_TYPES.includes(match[1].toLowerCase())) {
    return `unknown prefix "${match[1]}"; use one of ${ALL_TYPES.join(", ")}`;
  }
  return null;
}

function main(argv) {
  const file = argv[0];
  if (!file) {
    console.error("commit-msg: no message file given");
    process.exit(1);
  }
  const subject = firstMeaningfulLine(readFileSync(file, "utf8"));
  const problem = validateSubject(subject);
  if (!problem) return;

  console.error(`commit-msg: ${problem}`);
  console.error(`  got: ${subject || "(empty)"}`);
  console.error("  form: type(scope): description — e.g. fix(release): tag the version commit");
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
