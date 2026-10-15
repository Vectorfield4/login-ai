#!/usr/bin/env node
/**
 * Builds an image-generation prompt into the folder where the image belongs, so
 * nobody assembles the fixed prompt by hand (or spends model tokens on it). The
 * fixed text lives in `docs/image-prompts/scene-defined/<type>.txt` with
 * `{{SLOT}}` placeholders; the shared style paragraph lives in
 * `docs/image-prompts/cover-style.txt` and is injected as `{{STYLE}}`. This
 * script fills the slots from `content/generation-queue.json` and writes
 * `<slug>.prompt.txt` next to the image.
 *
 * The pickers (`getNewsCover`, `getServiceImage`) glob only
 * `*.{png,jpg,jpeg,webp}`, so `.prompt.txt` files are ignored by the build.
 *
 * Usage:
 *   node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs article <slug> [--idea "..."] [--lang "..."] [--force] [--print]
 *   node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs service <slug> [--idea "..."] [--topic "..."] [--lang "..."] [--force] [--print]
 *   node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs solution <slug> [--idea "..."] [--lang "..."] [--force] [--print]
 *   node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs article --all [--force]
 *   node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs service --all [--force]
 *   node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs solution --all [--force]
 *
 * The visual idea comes from the queue record's structured `visual_config`,
 * compiled by `buildScene()`, plus the motif objects resolved from the record's
 * English `keywords` (`docs/image-prompts/keyword-motifs.mjs`). `--idea`
 * overrides it for a one-off run; an entry with no `visual_config` gets a
 * `[TODO: ...]` marker. The deprecated free-form `story` no longer drives the
 * prompt. With `--all` the same `--idea` (if any) applies to every entry, so pass
 * it per slug.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { resolveKeywordMotifs } from "../../../../docs/image-prompts/keyword-motifs.mjs";
import {
  resolveControlElements,
  resolveDisplayElements,
  resolveEmblem,
  VISUAL_ARCHETYPES,
} from "../../../../docs/image-prompts/ui-primitives.mjs";
import { readQueue } from "../../../../scripts/generation-queue.mjs";

const KINDS = {
  article: {
    template: "docs/image-prompts/scene-defined/article.txt",
    outDir: "assets/images/articles",
  },
  service: {
    template: "docs/image-prompts/scene-defined/service.txt",
    outDir: "assets/images/services",
  },
  solution: {
    template: "docs/image-prompts/scene-defined/solution.txt",
    outDir: "assets/images/solutions",
  },
};

/** Shared style block, injected as {{STYLE}} into both templates. */
const STYLE_FILE = "docs/image-prompts/cover-style.txt";
/** Default {{LANG}} value; override with `--lang`. */
const DEFAULT_LANG = "neutral, no visible text on image";

const USAGE = `Usage:
  node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs article <slug> [--idea "..."] [--lang "..."] [--force] [--print]
  node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs service <slug> [--idea "..."] [--topic "..."] [--lang "..."] [--force] [--print]
  node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs solution <slug> [--idea "..."] [--lang "..."] [--force] [--print]
  node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs article --all [--force]
  node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs service --all [--force]
  node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs solution --all [--force]`;

function parseArgs(argv) {
  const flags = {
    idea: undefined,
    topic: undefined,
    lang: undefined,
    force: false,
    print: false,
    all: false,
  };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--idea") {
      index += 1;
      flags.idea = argv[index];
    } else if (arg === "--topic") {
      index += 1;
      flags.topic = argv[index];
    } else if (arg === "--lang") {
      index += 1;
      flags.lang = argv[index];
    } else if (arg === "--force") {
      flags.force = true;
    } else if (arg === "--print") {
      flags.print = true;
    } else if (arg === "--all") {
      flags.all = true;
    } else {
      positional.push(arg);
    }
  }
  return { ...flags, positional };
}

/** Mirrors the `keywords` slot of the scene-defined service template. */
const asArray = (keywords) => `[${keywords.map((keyword) => `"${keyword}"`).join(", ")}]`;

/** `laser_prism` → `laser prism`, so a token reads as prose inside the prompt. */
const humanize = (token) => String(token).replace(/_/g, " ");

/**
 * `visual_config` → `{{VISUAL_IDEA}}` (RFC 6.0). The scene no longer joins the
 * display tokens in a list: slot locking names each screen's position and caps
 * the count at three, so the model cannot duplicate panels and fill the frame.
 * The control layer adds physical input organs for management/control semantics.
 * Mirror of `buildScene()` in `test/image-prompts/helpers.ts`.
 */
const SLOT_POSITIONS = ["left", "center", "right"];

function buildScene(config) {
  const archetype =
    VISUAL_ARCHETYPES[config.hardware_archetype] ?? VISUAL_ARCHETYPES.spatial_lattice;
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
    resolveEmblem(config.emblem) ?? `a single polished ${humanize(config.focal_element)}`;
  const focalText = `At the absolute focal center sits ${focal} emitting a soft ${glow.startsWith("ambient") ? glow : `ambient ${glow}`}.`;

  return `The scene is ${archetype}. ${focalText} Arranged in a strict spatial layout, there are exactly ${screens.length} distinct translucent frosted glass screens with clear boundaries and no duplicate panels: ${layout}.${controlText}`;
}

/**
 * `{{VISUAL_IDEA}}` precedence: the `--idea` override, then a structured
 * `visual_config` compiled by `buildScene()`, then a TODO marker. The record's
 * English `keywords` are appended as concrete motif objects (`keyword-motifs.mjs`),
 * so the scene names its subject. The free-form `story` field is deprecated and
 * no longer drives the prompt — a record without `visual_config` compiles to a
 * TODO marker instead.
 */
function compileVisualIdea(entry, override) {
  if (override) return override;
  const config = entry.visual_config;
  if (config) return `${buildScene(config)}${motifSentence(entry.keywords)}`;
  return `[TODO: one abstract visual idea about ${entry.keywords.join(", ")}]`;
}

/**
 * The keyword enhancers: up to three concrete objects, each resolved from an
 * English keyword, placed among the screens so the frame names its subject.
 */
function motifSentence(keywords) {
  const motifs = resolveKeywordMotifs(keywords);
  if (!motifs.length) return "";
  const count = ["no", "one", "two", "three"][motifs.length] ?? String(motifs.length);
  return ` Grounding the subject, the frame holds ${count} concrete objects among the panels: ${motifs.join(", ")}.`;
}

function fill(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? `[TODO: ${key}]`);
}

/** Slot values per kind; a template ignores the slots it does not use. */
function valuesFor(kind, entry, { visualIdea, topic, lang, style }) {
  // The concrete Latin subject (`object`); omitted from the map when the record
  // has none, so `fill` leaves the `[TODO: OBJECT]` marker in the `{{OBJECT}}` slot.
  const object = entry.object?.trim();
  const common = {
    VISUAL_IDEA: visualIdea,
    STYLE: style,
    LANG: lang ?? DEFAULT_LANG,
    ...(object ? { OBJECT: object } : {}),
  };
  // The scene-defined opener interpolates a short Latin `SUBJECT` after "about":
  // `--topic` wins, then the record's authored `topic`, then `keywords`. The
  // Cyrillic `title` never reaches the frame through the opener.
  const subject = topic?.trim() || entry.topic?.trim() || entry.keywords.join(" ");
  if (kind === "article") {
    return {
      ...common,
      TITLE: entry.title,
      SUBJECT: subject,
      KEYWORDS: entry.keywords.join(", "),
    };
  }
  const named = {
    ...common,
    TOPIC: topic ?? entry.title,
    SUBJECT: subject,
    KEYWORDS: asArray(entry.keywords),
  };
  return kind === "solution"
    ? { ...named, SOLUTION: entry.title }
    : { ...named, SERVICE: entry.title };
}

const { idea, topic, lang, force, print, all, positional } = parseArgs(process.argv.slice(2));
const [kind, slug] = positional;
const spec = KINDS[kind];

if (!spec || (!all && !slug)) {
  console.error(USAGE);
  process.exit(1);
}

const entries = readQueue().filter((entry) => entry.kind === kind);
const targets = all ? entries : entries.filter((entry) => entry.slug === slug);
if (targets.length === 0) {
  console.error(`slug "${slug}" is not in the generation queue for kind "${kind}"`);
  process.exit(1);
}

const template = readFileSync(spec.template, "utf8");
const style = readFileSync(STYLE_FILE, "utf8").trimEnd();
/** The record's metadata, minus empties, as the sidecar the asset ships with. */
function toMeta(entry) {
  const meta = {
    kind: entry.kind,
    slug: entry.slug,
    title: entry.title,
    keywords: entry.keywords,
    topic: entry.topic ?? "",
    object: entry.object ?? "",
    visual_config: entry.visual_config ?? null,
  };
  if (entry.story?.trim()) meta.story = entry.story;
  return meta;
}

const written = [];
for (const entry of targets) {
  const outPath = join(spec.outDir, `${entry.slug}.prompt.txt`);
  if (existsSync(outPath) && !force) {
    written.push(`skip (exists): ${outPath}`);
    continue;
  }
  const values = valuesFor(kind, entry, {
    visualIdea: compileVisualIdea(entry, idea),
    topic,
    lang,
    style,
  });
  const text = `${fill(template, values).trimEnd()}\n`;
  writeFileSync(outPath, text, "utf8");
  // Sidecar metadata next to the image; the pickers only read png/jpg/jpeg/webp.
  const metaPath = join(spec.outDir, `${entry.slug}.meta.json`);
  writeFileSync(metaPath, `${JSON.stringify(toMeta(entry), null, 2)}\n`, "utf8");
  written.push(outPath, metaPath);
  if (print) console.log(`\n--- ${outPath} ---\n${text}`);
}

for (const path of written) console.log(path);
