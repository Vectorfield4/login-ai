#!/usr/bin/env node
// Jev review CLI (skills: write-article / write-service).
//
// Usage:
//   node scripts/jev/review.mjs article <slug> [--lang ru|en] [--json] [--advisory]
//   node scripts/jev/review.mjs service <slug> [--lang ru|en] [--json] [--advisory]
//
// Prints the candidate findings for one document (one batched decisions call).
// Exits non-zero when candidates exist, unless --advisory. Without
// RUNWARE_API_KEY it prints a skip notice and exits 0, so it is safe to call
// unconditionally.

import { formatFindings, hasKey, JevError, review } from "./core.mjs";

const argv = process.argv.slice(2);
const flags = { json: false, advisory: false, strict: false, lang: "ru", minConfidence: undefined };
const rest = [];
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i];
  if (arg === "--json") flags.json = true;
  else if (arg === "--advisory") flags.advisory = true;
  else if (arg === "--strict") flags.strict = true;
  else if (arg === "--lang") flags.lang = argv[++i];
  else if (arg === "--min-confidence") flags.minConfidence = Number(argv[++i]);
  else if (arg.startsWith("--")) {
    console.error(`unknown flag: ${arg}`);
    process.exit(2);
  } else rest.push(arg);
}

const [kind, slug] = rest;
if (!kind || !slug || !["article", "service"].includes(kind)) {
  console.error(
    "usage: review.mjs article|service <slug> [--lang ru|en] [--json] [--advisory] [--strict] [--min-confidence 0.5]",
  );
  process.exit(2);
}

if (!hasKey()) {
  console.log("Jev: пропущено — RUNWARE_API_KEY не задан.");
  process.exit(0);
}

try {
  const report = await review(kind, slug, {
    lang: flags.lang,
    minConfidence: flags.minConfidence,
    strict: flags.strict,
  });
  if (flags.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(
      `\n${report.file}  [${report.kind}]  units=${report.units} targets=${report.targets}`,
    );
    console.log(formatFindings(report));
    if (report.usage) {
      console.log(`· tokens: ${report.usage.input_tokens} in / ${report.usage.output_tokens} out`);
    }
  }
  process.exit(!flags.advisory && report.findings.length ? 1 : 0);
} catch (error) {
  if (error instanceof JevError) {
    console.error(`Jev error [${error.code}]: ${error.message}`);
    process.exit(2);
  }
  throw error;
}
