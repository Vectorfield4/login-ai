import { describe, expect, it } from "vitest";
import { resolveSpec } from "./resolveSpec";

describe("resolveSpec", () => {
  it("находит spec услуги и решения", () => {
    expect(resolveSpec("service", "content-generation")?.fields.length).toBeGreaterThan(0);
    expect(resolveSpec("solution", "content-generation")?.fields.length).toBeGreaterThan(0);
  });

  it("отдаёт undefined для неизвестного слага", () => {
    expect(resolveSpec("service", "does-not-exist")).toBeUndefined();
    expect(resolveSpec("solution", "does-not-exist")).toBeUndefined();
  });
});
