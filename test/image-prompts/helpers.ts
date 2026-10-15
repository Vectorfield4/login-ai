import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect } from "vitest";
import { resolveKeywordMotifs } from "../../docs/image-prompts/keyword-motifs.mjs";
import {
  resolveControlElements,
  resolveDisplayElements,
  resolveEmblem,
  VISUAL_ARCHETYPES,
} from "../../docs/image-prompts/ui-primitives.mjs";
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
const LANG = "neutral, no visible text on image";

/** Mirrors the `keywords` slot of the scene-defined named templates. */
const asArray = (keywords: string[]) => `[${keywords.map((keyword) => `"${keyword}"`).join(", ")}]`;

/** Mirrors `humanize()` in `image-prompt.mjs`. */
const humanize = (token: string) => token.replace(/_/g, " ");

/**
 * Mirrors `buildScene()` in
 * `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs` (RFC 6.0):
 * archetype + slot-locked screens + control layer. Keep the two in lockstep.
 */
type BuildableConfig = {
  hardware_archetype?: string;
  focal_element: string;
  environment_glow: string;
  display_elements: string[];
  emblem?: string;
  control_layer?: string[];
  slot_locking?: boolean;
};

const SLOT_POSITIONS = ["left", "center", "right"];

function buildScene(config: BuildableConfig): string {
  const archetype =
    VISUAL_ARCHETYPES[config.hardware_archetype as keyof typeof VISUAL_ARCHETYPES] ??
    VISUAL_ARCHETYPES.spatial_lattice;
  const screens = resolveDisplayElements(config.display_elements).slice(0, SLOT_POSITIONS.length);
  const locked = config.slot_locking !== false;
  const layout = locked
    ? screens
        .map(
          (text, index) =>
            `positioned strictly at the ${SLOT_POSITIONS[index]} slot is one single independent screen showing ${text}`,
        )
        .join("; ")
    : screens.join(", and ");

  const controls = resolveControlElements(config.control_layer ?? []);
  const controlText = controls.length
    ? ` Integrated into the physical slate body are organs of manual control: ${controls.join(", and ")}.`
    : "";
  const glow = humanize(config.environment_glow);
  // A domain `emblem` (a medical cross, a gear) replaces the abstract focal node.
  const focal =
    resolveEmblem(config.emblem as Parameters<typeof resolveEmblem>[0]) ??
    `a single polished ${humanize(config.focal_element)}`;
  const focalText = `At the absolute focal center sits ${focal} emitting a soft ${glow.startsWith("ambient") ? glow : `ambient ${glow}`}.`;

  return `The scene is ${archetype}. ${focalText} Arranged in a strict spatial layout, there are exactly ${screens.length} distinct translucent frosted glass screens with clear boundaries and no duplicate panels: ${layout}.${controlText}`;
}

/** Mirrors `motifSentence()` in the builder: keyword enhancers, capped at three. */
function motifSentence(keywords: string[]): string {
  const motifs = resolveKeywordMotifs(keywords);
  if (!motifs.length) return "";
  const count = ["no", "one", "two", "three"][motifs.length] ?? String(motifs.length);
  return ` Grounding the subject, the frame holds ${count} concrete objects among the panels: ${motifs.join(", ")}.`;
}

/** Mirrors `compileVisualIdea()`: `visual_config` + keyword motifs, else a TODO. */
function buildVisualIdea(entry: QueueEntry): string {
  const config = entry.visual_config;
  if (config) {
    return `${buildScene({
      hardware_archetype: config.hardware_archetype,
      focal_element: config.focal_element,
      environment_glow: config.environment_glow,
      display_elements: config.display_elements,
      emblem: config.emblem,
      control_layer: config.control_layer,
      slot_locking: config.slot_locking,
    })}${motifSentence(entry.keywords)}`;
  }
  return `[TODO: one abstract visual idea about ${entry.keywords.join(", ")}]`;
}

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
  // `SUBJECT` is the Latin opener token: the authored `topic`, then `keywords`.
  const subject = entry.topic?.trim() || entry.keywords.join(" ");
  const base: Record<string, string> =
    entry.kind === "article"
      ? {
          TITLE: entry.title,
          SUBJECT: subject,
          KEYWORDS: entry.keywords.join(", "),
          VISUAL_IDEA: buildVisualIdea(entry),
          STYLE,
          LANG,
        }
      : {
          TOPIC: entry.title,
          SUBJECT: subject,
          KEYWORDS: asArray(entry.keywords),
          VISUAL_IDEA: buildVisualIdea(entry),
          STYLE,
          LANG,
          [entry.kind === "solution" ? "SOLUTION" : "SERVICE"]: entry.title,
        };
  // `OBJECT` is the Latin image subject; omitted when absent so `fill` marks it.
  const object = entry.object?.trim();
  if (object) base.OBJECT = object;
  return base;
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
