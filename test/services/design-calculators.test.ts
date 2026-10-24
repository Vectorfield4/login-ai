import { describe, expect, it } from "vitest";
import { getServiceBySlug } from "@/entities/service";
import { estimate } from "@/features/calculator/model/estimate";
import { initialState } from "@/features/calculator/model/state";
import type { CalculatorState } from "@/features/calculator/model/types";

function price(slug: string, changes: CalculatorState = {}) {
  const spec = getServiceBySlug(slug)?.calculator;
  if (!spec) throw new Error(`Missing calculator: ${slug}`);
  return estimate(spec, { ...initialState(spec), ...changes }, () => undefined).firstPeriod;
}

describe("оценка стоимости дизайна", () => {
  it("включает пять экранов UI/UX и считает дополнительные экраны", () => {
    expect(price("ui-ux-design", { screens: 0 })).toEqual({ low: 60000, high: 95000 });
    expect(price("ui-ux-design")).toEqual({ low: 84000, high: 131000 });
    expect(price("ui-ux-design", { screens: 0, complexity: "product" })).toEqual({
      low: 80000,
      high: 125000,
    });
  });

  it("прибавляет исследование и дизайн-систему один раз", () => {
    expect(price("ui-ux-design", { screens: 0, research: true, system: true })).toEqual({
      low: 110000,
      high: 195000,
    });
  });

  it("показывает опубликованные диапазоны для одной планировки", () => {
    expect(price("3d-design", { format: "plan" })).toEqual({ low: 5000, high: 8000 });
    expect(price("3d-design")).toEqual({ low: 25000, high: 40000 });
    expect(price("3d-design", { format: "browser" })).toEqual({ low: 120000, high: 192000 });
  });

  it("считает вторую планировку в выбранном формате", () => {
    expect(price("3d-design", { format: "plan", layouts: 1 })).toEqual({
      low: 10000,
      high: 16000,
    });
    expect(price("3d-design", { layouts: 1 })).toEqual({ low: 50000, high: 80000 });
  });

  it("не включает скрытые дополнения после смены формата", () => {
    const selected = { renders: ["two"], interaction: ["tour", "materials", "animation"] };
    expect(price("3d-design", { ...selected, format: "plan" })).toEqual({
      low: 5000,
      high: 8000,
    });
    expect(price("3d-design", { ...selected, format: "whitebox" })).toEqual({
      low: 39000,
      high: 64000,
    });
    expect(price("3d-design", { ...selected, format: "browser" })).toEqual({
      low: 210000,
      high: 362000,
    });
  });
});
