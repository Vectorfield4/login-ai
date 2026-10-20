import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  VISUAL_COMPOSITIONS,
  type VisualCompositionKey,
} from "../../docs/image-prompts/ui-primitives.mjs";

const DIR = "assets/images/services";
const LEGACY = [
  "At the absolute focal center sits",
  "positioned strictly at the left slot",
  "configured as a weightless computing void",
];

/**
 * Guards the service backdrops against a return to the centered template. Every
 * sidecar that records a composition must carry that composition's camera
 * sentence in its prompt, and no active service prompt may contain the old
 * centered-layout phrases.
 */
describe("service backdrop drift guard", () => {
  const prompts = readdirSync(DIR)
    .filter((file) => file.endsWith(".prompt.txt"))
    .map((file) => ({
      slug: file.replace(".prompt.txt", ""),
      text: readFileSync(join(DIR, file), "utf8"),
    }));
  const metas = readdirSync(DIR)
    .filter((file) => file.endsWith(".meta.json"))
    .map((file) => {
      const meta = JSON.parse(readFileSync(join(DIR, file), "utf8"));
      const promptPath = join(DIR, `${meta.slug}.prompt.txt`);
      const prompt = readFileSync(promptPath, "utf8");
      return { meta, prompt };
    });

  it("records a composition for every regenerated service", () => {
    const composed = metas.filter(({ meta }) => meta.visual_config?.composition);
    expect(composed.length).toBeGreaterThanOrEqual(30);
  });

  it("uses the recorded composition's camera sentence", () => {
    for (const { meta, prompt } of metas) {
      const key = meta.visual_config?.composition as VisualCompositionKey | undefined;
      if (!key) continue;
      expect(VISUAL_COMPOSITIONS[key], `unknown composition "${key}"`).toBeDefined();
      expect(prompt, `${meta.slug} не содержит камеру композиции ${key}`).toContain(
        VISUAL_COMPOSITIONS[key].camera,
      );
    }
  });

  it("never falls back to the legacy centered layout", () => {
    for (const { slug, text: prompt } of prompts) {
      for (const phrase of LEGACY) {
        expect(prompt, `${slug} содержит legacy-фразу "${phrase}"`).not.toContain(phrase);
      }
    }
  });
});
