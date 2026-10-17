import { describe, expect, it } from "vitest";
import { getServices } from "@/entities/service";
import { getSolutions } from "@/entities/solution";
import type { CalculatorSpec } from "@/shared/types/calculator";
import { estimate } from "./estimate";
import type { AddonResolver, BundleResolver, CalculatorState, Estimate, Range } from "./types";

const spec: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    { kind: "stepper", id: "volume", label: "fields.volume", min: 0, max: 10, default: 2 },
    {
      kind: "segmented",
      id: "tier",
      label: "fields.tier",
      options: [
        { value: "a", label: "options.a" },
        { value: "b", label: "options.b" },
      ],
      default: "a",
    },
    { kind: "toggle", id: "extra", label: "fields.extra", default: false },
  ],
  terms: [
    { kind: "setup", amount: 1000, weeks: 2 },
    { kind: "perUnit", field: "volume", rate: 100, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "tier", rates: { a: 0, b: 500 } },
    { kind: "multiplier", field: "tier", factors: { a: 1, b: 2 } },
    { kind: "bundle", ref: "bundle-service", when: { field: "extra", equals: "true" } },
  ],
};

const resolver: BundleResolver = (ref) =>
  ref === "bundle-service" ? { amount: 700, unit: "program" } : undefined;

const addonResolver: AddonResolver = (ref) =>
  ref === "text-to-video" ? { setupFactor: 0.2, recurringFactor: 0.1 } : undefined;

const addonSpec: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [{ kind: "toggle", id: "video", label: "fields.video", default: false }],
  terms: [
    { kind: "setup", amount: 1000, weeks: 2 },
    { kind: "addon", field: "video", ref: "text-to-video" },
  ],
};

const groupedAddonSpec: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    { kind: "toggle", id: "videoEnabled", label: "fields.videoEnabled", default: false },
    {
      kind: "multiselect",
      id: "video",
      label: "fields.video",
      options: [{ value: "text-to-video", label: "options.textToVideo" }],
      default: ["text-to-video"],
    },
  ],
  terms: [
    { kind: "setup", amount: 1000, weeks: 2 },
    {
      kind: "addon",
      field: "video",
      equals: "text-to-video",
      ref: "text-to-video",
      when: { field: "videoEnabled", equals: "true" },
    },
  ],
};

const base: CalculatorState = { volume: 2, tier: "a", extra: false };

const cells = (value: Estimate): Range[] => [
  value.setup,
  value.runPerPeriod,
  value.firstPeriod,
  value.unitCost,
  value.timelineWeeks,
];

describe("estimate", () => {
  it("детерминирован", () => {
    expect(estimate(spec, base, resolver)).toEqual(estimate(spec, base, resolver));
  });

  it("во всех диапазонах low ≤ high", () => {
    for (const range of cells(estimate(spec, { ...base, volume: 7, tier: "b" }, resolver))) {
      expect(range.low).toBeLessThanOrEqual(range.high);
    }
  });

  it("фолдит термы в разовые, периодические и срок", () => {
    const value = estimate(spec, base, resolver);
    expect(value.setup).toEqual({ low: 1000, high: 1000 });
    expect(value.runPerPeriod).toEqual({ low: 200, high: 200 });
    expect(value.firstPeriod).toEqual({ low: 1000 + 200 * 12, high: 1000 + 200 * 12 });
    expect(value.unitCost).toEqual({ low: 100, high: 100 });
    expect(value.timelineWeeks).toEqual({ low: 1 + 2, high: 1 + 2 });
  });

  it("множитель монотонно увеличивает период", () => {
    const low = estimate(spec, { ...base, tier: "a" }, resolver);
    const high = estimate(spec, { ...base, tier: "b" }, resolver);
    expect(high.runPerPeriod.low).toBeGreaterThan(low.runPerPeriod.low);
    expect(high.firstPeriod.high).toBeGreaterThan(low.firstPeriod.high);
  });

  it("неизвестный option id падает на дефолт поля", () => {
    const withJunk = estimate(spec, { ...base, tier: "zzz" }, resolver);
    expect(withJunk).toEqual(estimate(spec, base, resolver));
  });

  it("нулевой и мусорный ввод безопасен", () => {
    const zero = estimate(spec, { ...base, volume: 0 }, resolver);
    expect(zero.runPerPeriod).toEqual({ low: 0, high: 0 });
    expect(Number.isFinite(zero.unitCost.low)).toBe(true);

    const junk = estimate(spec, { ...base, volume: Number.NaN }, resolver);
    expect(junk.runPerPeriod).toEqual({ low: 200, high: 200 });

    const over = estimate(spec, { ...base, volume: 999 }, resolver);
    expect(over.runPerPeriod).toEqual({ low: 1000, high: 1000 });
  });

  it("bundle включается по when-гейту и тянет чужую цену", () => {
    const off = estimate(spec, base, resolver);
    const on = estimate(spec, { ...base, extra: true }, resolver);
    expect(off.setup.low).toBe(1000);
    expect(on.setup.low).toBe(1700);
  });

  it("addon добавляет коэффициент от базы и показывает активную дельту", () => {
    const off = estimate(addonSpec, { video: false }, resolver, addonResolver);
    const on = estimate(addonSpec, { video: true }, resolver, addonResolver);

    expect(off.setup).toEqual({ low: 1000, high: 1000 });
    expect(off.addons[0]).toMatchObject({ ref: "text-to-video", active: false });
    expect(off.addons[0]?.setup).toEqual({ low: 200, high: 200 });

    expect(on.setup).toEqual({ low: 1200, high: 1200 });
    expect(on.addons[0]).toMatchObject({ ref: "text-to-video", active: true });
    expect(on.addons[0]?.setup).toEqual({ low: 200, high: 200 });
  });

  it("addon с when-гейтом ждёт включения группы", () => {
    const off = estimate(
      groupedAddonSpec,
      { videoEnabled: false, video: ["text-to-video"] },
      resolver,
      addonResolver,
    );
    const on = estimate(
      groupedAddonSpec,
      { videoEnabled: true, video: ["text-to-video"] },
      resolver,
      addonResolver,
    );

    expect(off.setup).toEqual({ low: 1000, high: 1000 });
    expect(off.addons[0]?.active).toBe(false);
    expect(on.setup).toEqual({ low: 1200, high: 1200 });
    expect(on.addons[0]?.active).toBe(true);
  });

  it("месячный bundle идёт в период, а не в setup, и не масштабируется множителем", () => {
    const monthly: BundleResolver = (ref) =>
      ref === "bundle-service" ? { amount: 700, unit: "month" } : undefined;
    const value = estimate(spec, { volume: 2, tier: "b", extra: true }, monthly);
    // setup = setup(1000) + perOption(b: 500); месячный bundle сюда не попадает
    expect(value.setup).toEqual({ low: 1500, high: 1500 });
    // period = perUnit(2×100) × factor(2) + monthly(700) = 1100 (множитель bundle не трогает)
    expect(value.runPerPeriod).toEqual({ low: 1100, high: 1100 });
    expect(value.unitCost).toEqual({ low: 550, high: 550 });
  });
});

// No invariant pins `setup` to the entity price floor (a spec is free to model
// its own setup), so the guard is only that every authored spec estimates into
// ordered, finite ranges.
describe("estimate: каждая спека даёт корректную смету", () => {
  it("услуги с калькулятором", () => {
    for (const service of getServices().filter((item) => item.calculator)) {
      const value = estimate(service.calculator as CalculatorSpec, {}, resolver);
      for (const range of cells(value)) {
        expect(Number.isFinite(range.low), service.slug).toBe(true);
        expect(range.low, service.slug).toBeLessThanOrEqual(range.high);
      }
    }
  });

  it("решения с калькулятором", () => {
    for (const solution of getSolutions().filter((item) => item.calculator)) {
      const value = estimate(solution.calculator as CalculatorSpec, {}, resolver);
      for (const range of cells(value)) {
        expect(Number.isFinite(range.low), solution.slug).toBe(true);
        expect(range.low, solution.slug).toBeLessThanOrEqual(range.high);
      }
    }
  });
});
