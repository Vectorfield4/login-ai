import { describe, expect, it } from "vitest";
import { readCatalog } from "../scripts/image-catalog.mjs";

/**
 * The image catalog folds the per-image `<slug>.meta.json` sidecars into one
 * list, so the metadata of shipped assets is queryable without the queue. These
 * checks confirm the three migrated solutions aggregate with their scene spec.
 */
describe("image catalog", () => {
  it("агрегирует sidecar-метаданные решений", () => {
    const bySlug = new Map(readCatalog("solution").map((entry) => [entry.slug, entry]));
    for (const slug of ["content-generation", "customer-experience", "reputation-management"]) {
      const entry = bySlug.get(slug);
      expect(entry, `нет метаданных для "${slug}"`).toBeDefined();
      expect(entry?.image).toBe(`assets/images/solutions/${slug}.png`);
      expect(entry?.hasImage).toBe(true);
      expect(entry?.topic).toMatch(/^AI /);
      expect(entry?.object).toBeTruthy();
      expect(entry?.visual_config?.composition).toBeTruthy();
    }
  });

  it("не выдумывает записи для чужих kind", () => {
    const articles = readCatalog("article");
    expect(articles.every((entry) => entry.kind === "article")).toBe(true);
  });
});
