import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KINDS, type QueueEntry, targetRel } from "../../scripts/generation-queue.mjs";
import { renderStandard } from "./helpers";

/**
 * Solution is newer than the article/service pipelines: a solution already ships
 * an SVG hero, so the raster backdrop is additive, and no `kind: "solution"`
 * record is queued yet. That leaves no `<slug>.prompt.txt` to lock per slug, so
 * these checks lock the standard and stop the wiring from rotting:
 *
 * - the template renders to the scene-defined shape (opener, language line,
 *   story, shared style, closing) and never to the instructional brief;
 * - `solution` stays a queue kind mapped to its own image folder.
 *
 * When the first raster backdrop is queued, add
 * `test/image-prompts/<slug>.test.ts` calling `expectPromptStandard("solution", slug)`.
 */

const SAMPLE: QueueEntry = {
  kind: "solution",
  slug: "computer-vision",
  title: "Компьютерное зрение",
  keywords: ["зрение", "дефекты", "линия", "контроль"],
  story:
    "A conveyor belt of pale blocks passes a single crimson-lit lens; one block leaves the line marked.",
};

const STYLE = readFileSync("docs/image-prompts/cover-style.txt", "utf8").trimEnd();

describe("solution prompt standard", () => {
  it("рендерится в scene-defined стандарт", () => {
    const text = renderStandard("solution", "scene-defined", SAMPLE);
    expect(text).toContain(
      `A minimal editorial illustration for a B2B solution page about ${SAMPLE.title}.`,
    );
    expect(text).toContain("Language: Russian (preferred) or neutral, no visible text on image");
    expect(text).toContain(SAMPLE.story);
    expect(text).toContain(STYLE);
    expect(
      text.trimEnd().endsWith("The image contains no legible text, no lettering, no logos."),
    ).toBe(true);
    expect(text).not.toContain("You are an AI image generator");
  });

  it("solution зарегистрирован в очереди с собственной папкой", () => {
    expect(KINDS).toContain("solution");
    expect(targetRel("solution", "computer-vision")).toBe(
      "assets/images/solutions/computer-vision.png",
    );
  });
});
