import { describe, expect, it } from "vitest";
import { getSolutionImage, solutionImages } from "../src/app/data/solutionImages";
import { solutions } from "../src/entities/solution";
import { toHomeSolution } from "../src/features/home-solutions";
import { resolveOgUrl } from "../src/shared/data/seo";

describe("solutionImages", () => {
  it("отдаёт ассет по slug решения", () => {
    for (const solution of solutions) {
      expect(getSolutionImage(solution.slug), `нет обложки для "${solution.slug}"`).toBeDefined();
    }
  });

  it("не выдумывает ассеты для неизвестного slug", () => {
    expect(getSolutionImage("no-such-solution")).toBeUndefined();
    expect(getSolutionImage(undefined)).toBeUndefined();
    expect(getSolutionImage("")).toBeUndefined();
  });

  it("ключи карты совпадают со слагами решений", () => {
    expect(Object.keys(solutionImages).sort()).toEqual(solutions.map((s) => s.slug).sort());
  });
});

describe("toHomeSolution", () => {
  const [solution] = solutions;

  it("подставляет переданный src обложки", () => {
    const home = toHomeSolution(solution, "/_astro/agentic-systems.svg");
    expect(home.image).toBe("/_astro/agentic-systems.svg");
  });

  it("без src не выдумывает картинку и не тащит индекс массива", () => {
    const home = toHomeSolution(solution);
    expect(home.image).toBeUndefined();
    expect(home.slug).toBe(solution.slug);
    expect(home.navTitle).toBe(solution.navTitle);
    expect(home.tagline).toBe(solution.tagline);
  });
});

describe("resolveOgUrl", () => {
  it("делает абсолютный URL из ассета", () => {
    const image = getSolutionImage("computer-vision");
    if (!image) throw new Error("Test fixture missing");
    expect(resolveOgUrl(image, "https://loginai.ru")).toMatch(/^https:\/\/loginai\.ru\/.+/);
  });
});
