import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect } from "vitest";
import { compositionFor } from "../../docs/image-prompts/composition.mjs";
import { resolveKeywordMotifs } from "../../docs/image-prompts/keyword-motifs.mjs";
import {
  resolveControlElements,
  resolveDisplayElements,
  resolveEmblem,
} from "../../docs/image-prompts/ui-primitives.mjs";
import { getEntry, type QueueEntry, type QueueKind } from "../../scripts/generation-queue.mjs";

/** Shared harness for the one prompt template used by every image kind. */
export type Kind = QueueKind;
export type Standard = "unified";

const TEMPLATE = "docs/image-prompts/scene-defined/image.txt";
const PROMPT_DIR: Record<Kind, string> = {
  article: "assets/images/articles",
  service: "assets/images/services",
  solution: "assets/images/solutions",
};
const STYLE = readFileSync("docs/image-prompts/cover-style.txt", "utf8").trimEnd();
const LANG = "neutral, no visible text on image";
const MAX_SCREENS = 3;

const humanize = (token: string) => token.replace(/_/g, " ");

type BuildableConfig = {
  focal_element: string;
  environment_glow: string;
  display_elements: string[];
  emblem?: string;
  composition?: string;
  control_layer?: string[];
};

/** Mirrors the slug-derived composition renderer in image-prompt.mjs. */
function buildScene(config: BuildableConfig, slug: string): string {
  const composition = compositionFor(slug, config.composition);
  const screens = resolveDisplayElements(config.display_elements ?? []).slice(0, MAX_SCREENS);
  const formation = composition.formation.replace("{{SCREENS}}", screens.join("; "));
  const controls = resolveControlElements(config.control_layer ?? []);
  const controlText = controls.length
    ? ` Integrated into the physical slate body are organs of manual control: ${controls.join(", and ")}.`
    : "";
  const glow = humanize(config.environment_glow);
  const focal =
    resolveEmblem(config.emblem as Parameters<typeof resolveEmblem>[0]) ??
    `a single polished ${humanize(config.focal_element)}`;
  const screenText = screens.length
    ? ` Exactly ${screens.length} translucent frosted glass panels support the physical scene: ${formation}.`
    : "";

  return `${composition.camera} ${composition.backdrop} The focal object, ${focal}, is the only saturated element in the frame: vivid crimson, ${composition.focal}, emitting a soft ${glow.startsWith("ambient") ? glow : `ambient ${glow}`}.${screenText}${controlText}`;
}

function buildVisualIdea(entry: QueueEntry): string {
  const config = entry.visual_config;
  if (!config) return `[TODO: visual_config for "${entry.slug}"]`;
  return `${buildScene(config, entry.slug)}${motifSentence(entry.keywords)}`;
}

function motifSentence(keywords: string[]): string {
  const motifs = resolveKeywordMotifs(keywords, 1);
  return motifs.length ? ` A small supporting detail is ${motifs[0]}.` : "";
}

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? `[TODO: ${key}]`);
const render = (template: string, values: Record<string, string>) =>
  `${fill(template, values).replace(/\s+$/, "")}\n`;
const canonical = (text: string) => text.replace(/\r\n/g, "\n").replace(/\s+$/, "");

function values(entry: QueueEntry): Record<string, string> {
  const subject = entry.topic?.trim() || entry.keywords.join(" ");
  return {
    SUBJECT: subject,
    OBJECT: entry.object?.trim() || subject,
    VISUAL_IDEA: buildVisualIdea(entry),
    STYLE,
    LANG,
  };
}

export function renderStandard(_kind: Kind, standard: Standard, entry: QueueEntry): string {
  if (standard !== "unified") throw new Error(`unsupported prompt standard: ${standard}`);
  return render(readFileSync(TEMPLATE, "utf8"), values(entry));
}

export function expectPromptStandard(kind: Kind, slug: string): void {
  const entry = getEntry(kind, slug);
  if (!entry) throw new Error(`slug "${slug}" is not in content/generation-queue.json`);
  const actual = canonical(readFileSync(join(PROMPT_DIR[kind], `${slug}.prompt.txt`), "utf8"));
  const expected = canonical(renderStandard(kind, "unified", entry));
  expect(
    actual,
    `"${slug}.prompt.txt" must match the unified template. Regenerate it with ` +
      `the \`generate-image-cover\` skill's \`image-prompt.mjs\` or fix the queue record.`,
  ).toBe(expected);
}
