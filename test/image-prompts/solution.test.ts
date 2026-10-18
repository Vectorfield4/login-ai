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
 * Solutions use the scene-defined standard with a composition axis: the
 * `cover-style-solution.txt` block fixes materials and the crimson accent but
 * leaves framing to `visual_config.composition`. Without the axis every solution
 * compiled to the same centered void, so the eight home cards read as one image.
 *
 * These checks lock the composition render and keep the wiring from rotting:
 * camera, backdrop, focal placement and screen formation each reach the prompt,
 * the screens still cap at three, and the solution style never falls back to the
 * article one.
 *
 * When a solution is queued, add `test/image-prompts/<slug>.test.ts` calling
 * `expectPromptStandard("solution", slug)`.
 */

const SAMPLE_CONFIG: VisualConfig = {
  hardware_archetype: "spatial_lattice",
  topology: "cascade",
  focal_element: "quantum_crystal",
  environment_glow: "laser_lines",
  display_elements: ["telemetry_grid", "data_nodes"],
  composition: "orbital_hub",
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

const STYLE = readFileSync("docs/image-prompts/cover-style-solution.txt", "utf8").trimEnd();

describe("solution prompt standard", () => {
  it("рендерится в scene-defined стандарт с композицией", () => {
    const text = renderStandard("solution", "scene-defined", SAMPLE);
    expect(text).toContain(
      `A premium 3D industrial design and software interface render for a high-end B2B solution page about ${SAMPLE.topic}.`,
    );
    expect(text).toContain("The scene is built around computer vision, an eye.");
    expect(text).toContain("Language: neutral, no visible text on image");
    expect(text).toContain(
      "A high three-quarter camera looks down into the construct, the depth axis running diagonally across the frame.",
    );
    expect(text).toContain(
      "Behind it, a deep charcoal void carries a faint radial glow that fades to black at the edges.",
    );
    expect(text).toContain(
      "The focal object, a single polished quantum crystal, is the only saturated element in the frame: vivid crimson, just left of the optical center, raised above the ring of panels, emitting a soft ambient laser lines.",
    );
    expect(text).toContain("Exactly 2 distinct translucent frosted glass screens");
    expect(text).toContain(
      "orbit the hub at staggered depths and tilted angles, none of them parallel to the picture plane: a precision telemetry grid with micro-data cells; an interconnected matrix of micro-data nodes.",
    );
    expect(text).toContain(STYLE);
    expect(text).not.toContain(
      readFileSync("docs/image-prompts/cover-style.txt", "utf8").trimEnd(),
    );
    expect(
      text
        .trimEnd()
        .endsWith(
          "generous negative space, an uncluttered background, no text, no letters, no numbers, no captions, no logos.",
        ),
    ).toBe(true);
    expect(text).not.toContain("You are an AI image generator");
  });

  it("разные композиции дают разные сцены", () => {
    const orbital = renderStandard("solution", "scene-defined", SAMPLE);
    const macro = renderStandard("solution", "scene-defined", {
      ...SAMPLE,
      visual_config: { ...SAMPLE_CONFIG, composition: "macro_lens" },
    });
    expect(macro).not.toBe(orbital);
    expect(macro).toContain("An extreme macro camera");
    expect(orbital).not.toContain("An extreme macro camera");
  });

  it("solution зарегистрирован в очереди с собственной папкой", () => {
    expect(KINDS).toContain("solution");
    expect(targetRel("solution", "computer-vision")).toBe(
      "assets/images/solutions/computer-vision.png",
    );
  });

  it("композиция запирает экраны максимум в три слота", () => {
    const text = renderStandard("solution", "scene-defined", {
      ...SAMPLE,
      visual_config: {
        ...SAMPLE_CONFIG,
        display_elements: ["telemetry_grid", "data_nodes", "analytics_chart", "bar_chart"],
      },
    });
    expect(text).toContain("Exactly 3 distinct translucent frosted glass screens");
    expect(text).not.toContain("bar chart");
  });

  it("emblem заменяет абстрактный focal", () => {
    const text = renderStandard("solution", "scene-defined", {
      ...SAMPLE,
      visual_config: { ...SAMPLE_CONFIG, emblem: "eye_lens" },
    });
    expect(text).toContain(
      "The focal object, a glass camera-lens ring with an iris, is the only saturated element in the frame",
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
