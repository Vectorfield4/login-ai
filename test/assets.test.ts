import { describe, expect, it } from "vitest";
import { toHomeSolution } from "../src/shared/data/entities";
import { resolveOgUrl } from "../src/shared/data/seo";
import { getSolutionImage, solutionImages } from "../src/shared/data/solutionImages";
import { solutionFixtures } from "../src/shared/mocks/fixtures/solutions";

describe("solutionImages", () => {
  it("отдаёт ассет по slug решения", () => {
    for (const solution of solutionFixtures) {
      expect(getSolutionImage(solution.slug), `нет обложки для "${solution.slug}"`).toBeDefined();
    }
  });

  it("не выдумывает ассеты для неизвестного slug", () => {
    expect(getSolutionImage("no-such-solution")).toBeUndefined();
    expect(getSolutionImage(undefined)).toBeUndefined();
    expect(getSolutionImage("")).toBeUndefined();
  });

  it("ключи карты совпадают со слагами фикстур", () => {
    expect(Object.keys(solutionImages).sort()).toEqual(solutionFixtures.map((s) => s.slug).sort());
  });
});

describe("toHomeSolution", () => {
  const [solution] = solutionFixtures;

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
    expect(resolveOgUrl(getSolutionImage("computer-vision")!, "https://loginai.ru")).toMatch(
      /^https:\/\/loginai\.ru\/.+/,
    );
  });
});
