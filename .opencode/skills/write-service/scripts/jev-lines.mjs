// Service dictionary parsing for the Jev review gates (skill: write-service).
//
// A service copy is a TS dictionary of string literals. `serviceStrings` locates
// every prose literal with its line; `serviceBlocks` gives the structured view
// G5 needs (titled items, `mechanism`, `sections`). Neither judges anything — it
// only locates text. `unescapeString` is shared from `lib/prose/lines.mjs`.

import { unescapeString } from "@login-ai/prose/lines.mjs";

/**
 * Prose string literals of a TS i18n dictionary, each with its 1-based source
 * line and the key it sits under when one is on the same line. Pure symbol
 * literals (no letters) are skipped; very short tokens are left to the caller.
 */
export function serviceStrings(tsSource) {
  const lines = tsSource.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i += 1) {
    const re = /"((?:[^"\\]|\\.)*)"/g;
    let match = re.exec(lines[i]);
    while (match) {
      const text = unescapeString(match[1]);
      if (/[\p{L}]/u.test(text)) {
        const before = lines[i].slice(0, match.index);
        const key = /([A-Za-z_][\w]*)\s*:\s*$/.exec(before)?.[1] ?? null;
        out.push({ key, text, line: i + 1 });
      }
      match = re.exec(lines[i]);
    }
  }
  return out;
}

/** Index of the bracket matching the opener at `open`, skipping string literals. */
function matchBracket(src, open) {
  let depth = 0;
  let inString = false;
  for (let i = open; i < src.length; i += 1) {
    const ch = src[i];
    if (inString) {
      if (ch === "\\") i += 1;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "[" || ch === "{") depth += 1;
    else if (ch === "]" || ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Absolute 1-based line of a character index. */
function lineOf(src, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) if (src[i] === "\n") line += 1;
  return line;
}

/** Span of a `key: [ ... ]` array between `from` and `to`, or null. */
function arraySpan(src, key, from = 0, to = src.length) {
  const slice = src.slice(from, to);
  const match = new RegExp(`\\b${key}\\s*:\\s*\\[`).exec(slice);
  if (!match) return null;
  const open = from + slice.indexOf("[", match.index);
  const close = matchBracket(src, open);
  return close < 0 || close > to ? null : { start: open, end: close };
}

/** Top-level `{ ... }` object spans inside a range. */
function objectSpans(src, start, end) {
  const out = [];
  let i = start;
  while (i < end) {
    const ch = src[i];
    if (ch === '"') {
      i += 1;
      while (i < end && src[i] !== '"') {
        if (src[i] === "\\") i += 1;
        i += 1;
      }
      i += 1;
      continue;
    }
    if (ch === "{") {
      const close = matchBracket(src, i);
      if (close < 0 || close > end) break;
      out.push({ start: i, end: close });
      i = close + 1;
      continue;
    }
    i += 1;
  }
  return out;
}

/** A `field: "..."` string inside a range, with its line. */
function fieldString(src, start, end, field) {
  const slice = src.slice(start, end);
  const match = new RegExp(`\\b${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(slice);
  if (!match) return null;
  const quote = slice.indexOf('"', match.index);
  return { value: unescapeString(match[1]), line: lineOf(src, start + quote) };
}

/** Every quoted string literal inside a range, with its line. */
function stringsIn(src, start, end) {
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"/g;
  const slice = src.slice(start, end);
  let match = re.exec(slice);
  while (match) {
    out.push({ value: unescapeString(match[1]), line: lineOf(src, start + match.index) });
    match = re.exec(slice);
  }
  return out;
}

/** Titled blocks (features, mechanism, …) worth a semantic check. */
const TITLED_BLOCKS = [
  "features",
  "mechanism",
  "deliverables",
  "tradeoffs",
  "outcomes",
  "proofItems",
];

/**
 * Structured view of a service dictionary for G5: titled `{title, text}` items,
 * the `mechanism` items in order, and `sections` items. Line numbers point at the
 * string literal in the source file.
 */
export function serviceBlocks(tsSource) {
  const titled = {};
  for (const key of TITLED_BLOCKS) {
    const span = arraySpan(tsSource, key);
    if (!span) continue;
    titled[key] = objectSpans(tsSource, span.start, span.end).map((o) => {
      const title = fieldString(tsSource, o.start, o.end, "title");
      const text = fieldString(tsSource, o.start, o.end, "text");
      return {
        key,
        title: title?.value ?? null,
        titleLine: title?.line ?? null,
        text: text?.value ?? null,
        textLine: text?.line ?? null,
      };
    });
  }
  const sections = [];
  const sectionSpan = arraySpan(tsSource, "sections");
  if (sectionSpan) {
    for (const o of objectSpans(tsSource, sectionSpan.start, sectionSpan.end)) {
      const title = fieldString(tsSource, o.start, o.end, "title");
      const itemsSpan = arraySpan(tsSource, "items", o.start, o.end);
      sections.push({
        title: title?.value ?? null,
        items: itemsSpan ? stringsIn(tsSource, itemsSpan.start, itemsSpan.end) : [],
      });
    }
  }
  return { titled, mechanism: titled.mechanism ?? [], sections };
}
