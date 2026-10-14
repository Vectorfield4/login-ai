// Line mapping for the content gates.
//
// The article body is markdown; a service dictionary is a TS file. The shared
// extractors here cover markdown prose and the generic TS string read; the
// service-specific structured parse (blocks, sections) lives with the service
// skill (`write-service/scripts/jev-lines.mjs`). Neither extractor judges
// anything — it only locates text, so the gates stay testable without the
// network.

/** Strips a leading YAML frontmatter block. Returns the body and the frontmatter. */
export function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return { frontmatter: "", body: text, bodyLine: 1 };
  const lineCount = match[0].split(/\r?\n/).length;
  return { frontmatter: match[1], body: text.slice(match[0].length), bodyLine: lineCount + 1 };
}

/** Reads one scalar field from a frontmatter string. */
export function frontmatterField(frontmatter, key) {
  return new RegExp(`^${key}:\\s*(.+)$`, "m").exec(frontmatter)?.[1]?.trim();
}

/** Parses a JSON array field (the `related*` lists) from frontmatter. */
export function frontmatterList(frontmatter, key) {
  const raw = frontmatterField(frontmatter, key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

const SKIP_LINE = /^(#{1,6}\s|>|\||([-*+]|\d+\.)\s)/;

/**
 * Prose paragraphs of a markdown article, each with its 1-based source line.
 * Headings, tables, blockquotes, lists and fenced code are not prose and are
 * skipped; a paragraph is a blank-line-separated run of prose lines.
 */
export function articleParagraphs(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let inFrontmatter = false;
  let inCode = false;
  let buffer = [];
  let startLine = 0;
  const flush = () => {
    if (!buffer.length) return;
    out.push({ text: buffer.join(" "), line: startLine });
    buffer = [];
  };
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (i === 0 && line.trim() === "---") {
      inFrontmatter = true;
      continue;
    }
    if (inFrontmatter) {
      if (line.trim() === "---") inFrontmatter = false;
      continue;
    }
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inCode = !inCode;
      flush();
      continue;
    }
    if (inCode) continue;
    if (!trimmed) {
      flush();
      continue;
    }
    if (SKIP_LINE.test(trimmed)) {
      flush();
      continue;
    }
    if (!buffer.length) startLine = i + 1;
    buffer.push(trimmed);
  }
  flush();
  return out;
}

/** Unescapes the common sequences in a TS double-quoted string literal. */
export function unescapeString(value) {
  return value.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

/** First prose value of a `key: "..."` field in a TS i18n file, for G2 context. */
export function firstField(tsSource, key) {
  const match = new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(tsSource);
  return match ? unescapeString(match[1]) : null;
}

/**
 * Prose string literals of a TS i18n dictionary (service or solution), each
 * with its 1-based source line and the key it sits under when one is on the
 * same line. Pure symbol literals (no letters) are skipped; very short tokens
 * are left to the caller. Shared by every dictionary-shaped domain.
 */
export function tsStrings(tsSource) {
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
export function matchBracket(src, open) {
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
export function lineOf(src, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) if (src[i] === "\n") line += 1;
  return line;
}

/** Span of a `key: [ ... ]` array between `from` and `to`, or null. */
export function arraySpan(src, key, from = 0, to = src.length) {
  const slice = src.slice(from, to);
  const match = new RegExp(`\\b${key}\\s*:\\s*\\[`).exec(slice);
  if (!match) return null;
  const open = from + slice.indexOf("[", match.index);
  const close = matchBracket(src, open);
  return close < 0 || close > to ? null : { start: open, end: close };
}

/** Top-level `{ ... }` object spans inside a range. */
export function objectSpans(src, start, end) {
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
export function fieldString(src, start, end, field) {
  const slice = src.slice(start, end);
  const match = new RegExp(`\\b${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(slice);
  if (!match) return null;
  const quote = slice.indexOf('"', match.index);
  return { value: unescapeString(match[1]), line: lineOf(src, start + quote) };
}

/** Every quoted string literal inside a range, with its line. */
export function stringsIn(src, start, end) {
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

/**
 * Two-field records of a `key: [ { a, b }, … ]` block (e.g. FAQ
 * `question`/`answer`, fit `title`/`text`), each with both source lines.
 */
export function tsPairs(tsSource, arrayKey, fieldA, fieldB) {
  const span = arraySpan(tsSource, arrayKey);
  if (!span) return [];
  const out = [];
  for (const span_ of objectSpans(tsSource, span.start, span.end)) {
    const a = fieldString(tsSource, span_.start, span_.end, fieldA);
    const b = fieldString(tsSource, span_.start, span_.end, fieldB);
    if (a && b) out.push({ a: a.value, aLine: a.line, b: b.value, bLine: b.line });
  }
  return out;
}
