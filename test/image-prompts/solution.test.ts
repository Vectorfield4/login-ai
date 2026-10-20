import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { compositionKeyFor } from "../../docs/image-prompts/composition.mjs";
import { VISUAL_COMPOSITIONS } from "../../docs/image-prompts/ui-primitives.mjs";
import {
  KINDS,
  type QueueEntry,
  targetRel,
  type VisualConfig,
} from "../../scripts/generation-queue.mjs";
import { renderStandard } from "./helpers";

const SAMPLE_CONFIG: VisualConfig = {
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

const STYLE = readFileSync("docs/image-prompts/cover-style.txt", "utf8").trimEnd();

describe("unified image prompt", () => {
  it("uses one template and style for every entity kind", () => {
    const prompts = (["article", "service", "solution"] as const).map((kind) =>
      renderStandard(kind, "unified", { ...SAMPLE, kind }),
    );

    expect(new Set(prompts).size).toBe(1);
    expect(prompts[0]).toContain(
      "A premium 3D industrial-design and software-interface image for a high-end B2B topic.",
    );
    expect(prompts[0]).toContain("The concrete visual subject is computer vision, an eye.");
    expect(prompts[0]).toContain(STYLE);
  });

  it("derives a stable composition from the slug when no override exists", () => {
    const config = { ...SAMPLE_CONFIG, composition: undefined };
    const first = renderStandard("article", "unified", {
      ...SAMPLE,
      kind: "article",
      visual_config: config,
    });
    const second = renderStandard("service", "unified", {
      ...SAMPLE,
      kind: "service",
      visual_config: config,
    });

    expect(first).toBe(second);
    expect(first).toContain(VISUAL_COMPOSITIONS[compositionKeyFor(SAMPLE.slug)].camera);
  });

  it("does not emit the legacy centered layout", () => {
    const text = renderStandard("solution", "unified", SAMPLE);
    expect(text).not.toContain("At the absolute focal center sits");
    expect(text).not.toContain("positioned strictly at the left slot");
    expect(text).not.toContain("configured as a weightless computing void");
  });

  it("caps supporting panels at three", () => {
    const text = renderStandard("solution", "unified", {
      ...SAMPLE,
      visual_config: {
        ...SAMPLE_CONFIG,
        display_elements: ["telemetry_grid", "data_nodes", "analytics_chart", "bar_chart"],
      },
    });
    expect(text).toContain("Exactly 3 translucent frosted glass panels");
    expect(text).not.toContain("bar chart");
  });

  it("uses domain emblem and control layers", () => {
    const text = renderStandard("solution", "unified", {
      ...SAMPLE,
      visual_config: {
        ...SAMPLE_CONFIG,
        emblem: "eye_lens",
        control_layer: ["slider_tracks", "rotary_dials"],
      },
    });
    expect(text).toContain("a glass camera-lens ring with an iris");
    expect(text).toContain("organs of manual control");
  });

  it("solution image path stays registered", () => {
    expect(KINDS).toContain("solution");
    expect(targetRel("solution", "computer-vision")).toBe(
      "assets/images/solutions/computer-vision.png",
    );
  });
});
