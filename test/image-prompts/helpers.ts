import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect } from "vitest";
import { getEntry, type QueueEntry, type QueueKind } from "../../scripts/generation-queue.mjs";

/**
 * Shared harness for the per-slug cover/backdrop prompt locks.
 *
 * `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs` turns one fixed template into `<slug>.prompt.txt`
 * from a `content/generation-queue.json` record. A kind may accept two standards
 * while it migrates off the old one:
 *
 * - "instructional" (old): the `You are an AI image generator ...` brief with
 *   Style bullets and Technical requirements, in `docs/image-prompts/instructional/`.
 * - "scene-defined" (new): the short scene paragraph in
 *   `docs/image-prompts/scene-defined/` with `{{STYLE}}` from
 *   `docs/image-prompts/cover-style.txt`.
 *
 * `<slug>.prompt.txt` must equal one of the accepted renders for its kind
 * exactly. The title, keywords and visual idea all come from the queue record, so
 * editing the file without editing the record is caught. Anything half-migrated
 * (an old brief with the new style block, a missing `Language:` line) fails.
 *
 * Solution has no legacy brief, so it accepts `scene-defined` only.
 */

export type Kind = QueueKind;
export type Standard = "instructional" | "scene-defined";

const TEMPLATE: Record<Kind, Partial<Record<Standard, string>>> = {
  article: {
    "scene-defined": "docs/image-prompts/scene-defined/article.txt",
    instructional: "docs/image-prompts/instructional/article.txt",
  },
  service: {
    "scene-defined": "docs/image-prompts/scene-defined/service.txt",
    instructional: "docs/image-prompts/instructional/service.txt",
  },
  solution: {
    "scene-defined": "docs/image-prompts/scene-defined/solution.txt",
  },
};
const PROMPT_DIR: Record<Kind, string> = {
  article: "assets/images/articles",
  service: "assets/images/services",
  solution: "assets/images/solutions",
};

/** Injected by the script from `docs/image-prompts/cover-style.txt`. */
const STYLE = readFileSync("docs/image-prompts/cover-style.txt", "utf8").trimEnd();
/** Default `--lang` value in the current scene-defined template. */
const LANG = "Russian (preferred) or neutral, no visible text on image";

/** Mirrors the `keywords` slot of the scene-defined named templates. */
const asArray = (keywords: string[]) => `[${keywords.map((keyword) => `"${keyword}"`).join(", ")}]`;

/** Mirrors `fill()` in `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs`. */
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? `[TODO: ${key}]`);

/** Mirrors the write in `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs`: `${fill(...).trimEnd()}\n`. */
const render = (template: string, values: Record<string, string>) =>
  `${fill(template, values).replace(/\s+$/, "")}\n`;

/** Line-ending and trailing-whitespace insensitive comparison. */
const canonical = (text: string) => text.replace(/\r\n/g, "\n").replace(/\s+$/, "");

/** Mirrors `valuesFor()` in `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs`. */
function values(entry: QueueEntry): Record<string, string> {
  if (entry.kind === "article") {
    return {
      TITLE: entry.title,
      KEYWORDS: entry.keywords.join(", "),
      VISUAL_IDEA: entry.story,
      STYLE,
      LANG,
    };
  }
  const named = {
    TOPIC: entry.title,
    KEYWORDS: asArray(entry.keywords),
    VISUAL_IDEA: entry.story,
    STYLE,
    LANG,
  };
  return entry.kind === "solution"
    ? { ...named, SOLUTION: entry.title }
    : { ...named, SERVICE: entry.title };
}

/** Render `kind` under `standard` from a queue record. */
export function renderStandard(kind: Kind, standard: Standard, entry: QueueEntry): string {
  const templatePath = TEMPLATE[kind][standard];
  if (!templatePath) throw new Error(`no "${standard}" template for kind "${kind}"`);
  return render(readFileSync(templatePath, "utf8"), values(entry));
}

/** Names the accepted standards use in failure output. */
const STANDARD_LABEL: Record<Standard, string> = {
  instructional: "instructional-old",
  "scene-defined": "scene-defined-new",
};

/**
 * Asserts that `<slug>.prompt.txt` equals an accepted standard render of the
 * same queue record.
 */
export function expectPromptStandard(kind: Kind, slug: string): void {
  const entry = getEntry(kind, slug);
  if (!entry) throw new Error(`slug "${slug}" is not in content/generation-queue.json`);
  const actual = canonical(readFileSync(join(PROMPT_DIR[kind], `${slug}.prompt.txt`), "utf8"));
  const standards: Record<string, string> = {};
  for (const standard of ["instructional", "scene-defined"] as const) {
    if (!TEMPLATE[kind][standard]) continue;
    standards[STANDARD_LABEL[standard]] = canonical(renderStandard(kind, standard, entry));
  }
  const matched = Object.keys(standards).filter((name) => standards[name] === actual);
  expect(
    matched.length,
    `"${slug}.prompt.txt" must match one prompt standard.\n` +
      `Accepted: ${Object.keys(standards).join(", ")}.\n` +
      `Regenerate it with .opencode/skills/generate-image-cover/scripts/image-prompt.mjs or fix the "${slug}" record in ` +
      `content/generation-queue.json.`,
  ).toBeGreaterThan(0);
}
