import { describe, expect, it } from "vitest";
import { solutions } from "./solutions";

describe("solutions data", () => {
  it("каждое решение имеет непустую тематическую обложку (image)", () => {
    for (const solution of solutions) {
      expect(
        solution.image,
        `решение "${solution.slug}" должно иметь непустое поле image`,
      ).toBeTruthy();
    }
  });

  it("slug решений уникальны", () => {
    const slugs = solutions.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
