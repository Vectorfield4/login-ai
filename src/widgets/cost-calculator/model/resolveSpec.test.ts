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

  it("подставляет уровни поддержки и уважает opt-out", () => {
    const withSupport = resolveSpec("service", "content-generation");
    expect(withSupport?.fields.some((field) => field.id === "support")).toBe(true);
    const term = withSupport?.terms.find(
      (item) => item.kind === "perOption" && item.field === "support",
    );
    expect(term?.kind === "perOption" ? term.rates : undefined).toEqual({
      standard: 0,
      priority: 180000,
      dedicated: 360000,
    });

    const withoutSupport = resolveSpec("service", "ai-text-training");
    expect(withoutSupport?.fields.some((field) => field.id === "support")).toBe(false);
    expect(
      withoutSupport?.terms.some((item) => item.kind === "perOption" && item.field === "support"),
    ).toBe(false);
  });
});
