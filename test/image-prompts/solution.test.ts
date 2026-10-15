import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  KINDS,
  type QueueEntry,
  targetRel,
  type VisualConfig,
} from "../../scripts/generation-queue.mjs";
import { renderStandard } from "./helpers";

/**
 * Solution is newer than the article/service pipelines: a solution already ships
 * an SVG hero, so the raster backdrop is additive, and no `kind: "solution"`
 * record is queued yet. That leaves no `<slug>.prompt.txt` to lock per slug, so
 * these checks lock the standard and stop the wiring from rotting:
 *
 * - the template renders to the scene-defined shape (opener, language line,
 *   compiled `visual_config` scene, shared style, closing) and never to the
 *   instructional brief;
 * - `solution` stays a queue kind mapped to its own image folder.
 *
 * When the first raster backdrop is queued, add
 * `test/image-prompts/<slug>.test.ts` calling `expectPromptStandard("solution", slug)`.
 */

const SAMPLE_CONFIG: VisualConfig = {
  hardware_archetype: "spatial_lattice",
  topology: "cascade",
  focal_element: "quantum_crystal",
  environment_glow: "laser_lines",
  display_elements: ["telemetry_grid", "data_nodes"],
};

const SAMPLE: QueueEntry = {
  kind: "solution",
  slug: "computer-vision",
  title: "Компьютерное зрение",
  keywords: ["зрение", "дефекты", "линия", "контроль"],
  topic: "computer vision defect control",
  object: "computer vision, an eye",
  visual_config: SAMPLE_CONFIG,
};

const STYLE = readFileSync("docs/image-prompts/cover-style.txt", "utf8").trimEnd();

describe("solution prompt standard", () => {
  it("рендерится в scene-defined стандарт", () => {
    const text = renderStandard("solution", "scene-defined", SAMPLE);
    expect(text).toContain(
      `A premium 3D industrial design and software interface render for a high-end B2B solution page about ${SAMPLE.topic}.`,
    );
    expect(text).toContain("The scene centers on computer vision, an eye.");
    expect(text).toContain("Language: neutral, no visible text on image");
    expect(text).toContain(
      "The scene is configured as a weightless computing void where elements float in a spacious spatial lattice with deep perspective.",
    );
    expect(text).toContain(
      "At the absolute focal center sits a single polished quantum crystal emitting a soft ambient laser lines.",
    );
    expect(text).toContain("there are exactly 2 distinct translucent frosted glass screens");
    expect(text).toContain(
      "positioned strictly at the left slot is one single independent screen showing a precision telemetry grid with micro-data cells",
    );
    expect(text).toContain(
      "positioned strictly at the center slot is one single independent screen showing an interconnected matrix of micro-data nodes",
    );
    expect(text).toContain(STYLE);
    expect(text.trimEnd().endsWith("no text, no letters, no numbers, no lines, no logos.")).toBe(
      true,
    );
    expect(text).not.toContain("You are an AI image generator");
  });

  it("solution зарегистрирован в очереди с собственной папкой", () => {
    expect(KINDS).toContain("solution");
    expect(targetRel("solution", "computer-vision")).toBe(
      "assets/images/solutions/computer-vision.png",
    );
  });

  it("slot_locking запирает экраны максимум в три слота", () => {
    const text = renderStandard("solution", "scene-defined", {
      ...SAMPLE,
      visual_config: {
        ...SAMPLE_CONFIG,
        display_elements: ["telemetry_grid", "data_nodes", "analytics_chart", "bar_chart"],
      },
    });
    expect(text).toContain("there are exactly 3 distinct translucent frosted glass screens");
    expect(text).not.toContain("bar chart");
  });

  it("emblem заменяет абстрактный focal на доменный знак", () => {
    const text = renderStandard("solution", "scene-defined", {
      ...SAMPLE,
      visual_config: { ...SAMPLE_CONFIG, emblem: "eye_lens" },
    });
    expect(text).toContain(
      "At the absolute focal center sits a glass camera-lens ring with an iris emitting a soft ambient laser lines.",
    );
    expect(text).not.toContain("laser prism");
  });

  it("control_layer добавляет физические органы управления", () => {
    const text = renderStandard("solution", "scene-defined", {
      ...SAMPLE,
      visual_config: {
        ...SAMPLE_CONFIG,
        control_layer: ["slider_tracks", "rotary_dials"],
      },
    });
    expect(text).toContain("organs of manual control");
    expect(text).toContain("three physical tactile slider tracks with metallic fader knobs");
    expect(text).toContain("a row of miniature precise rotary tuning knobs");
  });
});
