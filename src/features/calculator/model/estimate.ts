import type { Band, CalculatorField, CalculatorSpec } from "@/shared/types/calculator";
import type {
  AddonEstimate,
  AddonResolver,
  BundleResolver,
  CalculatorState,
  Estimate,
  Range,
} from "./types";

function findField(spec: CalculatorSpec, id: string): CalculatorField | undefined {
  return spec.fields.find((field) => field.id === id);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** A band as a normalized range, tolerating a reversed `low`/`high`. */
function toRange(value: Band): Range {
  if (typeof value === "number") return { low: value, high: value };
  return { low: Math.min(value.low, value.high), high: Math.max(value.low, value.high) };
}

function add(target: Range, value: Range): void {
  target.low += value.low;
  target.high += value.high;
}

function scale(value: Range, factor: number): Range {
  return { low: value.low * factor, high: value.high * factor };
}

/** The number of a slider/stepper field, clamped to its bounds, default on junk. */
function numericValue(field: CalculatorField, raw: unknown): number {
  if (field.kind !== "slider" && field.kind !== "stepper") return 0;
  const value = typeof raw === "number" && Number.isFinite(raw) ? raw : field.default;
  return clamp(value, field.min, field.max);
}

/** The chosen value used to key `rates`/`factors`; unknown ids fall to default. */
function chosenValue(spec: CalculatorSpec, state: CalculatorState, id: string): string {
  const field = findField(spec, id);
  if (!field) return "";
  const raw = state[id];
  switch (field.kind) {
    case "segmented":
    case "urgency": {
      const candidate = typeof raw === "string" ? raw : "";
      return field.options.some((option) => option.value === candidate) ? candidate : field.default;
    }
    case "toggle":
      return String(typeof raw === "boolean" ? raw : field.default);
    case "slider":
    case "stepper":
      return String(numericValue(field, raw));
    case "multiselect":
    case "software-types":
      return "";
  }
}

/** The selected ids of a multiselect, dropping ids the field does not declare. */
function selection(field: CalculatorField, raw: unknown): string[] {
  if (field.kind !== "multiselect" && field.kind !== "software-types") return [];
  if (!Array.isArray(raw)) return field.default;
  if (field.kind === "software-types") {
    return raw.filter((id): id is string => typeof id === "string");
  }
  return raw.filter(
    (id): id is string =>
      typeof id === "string" && field.options.some((option) => option.value === id),
  );
}

function roundRange(value: Range): Range {
  return { low: Math.round(value.low), high: Math.round(value.high) };
}

/** The field currently selects an add-on; `equals` falls back to a toggle. */
function addonActive(
  term: Extract<CalculatorSpec["terms"][number], { kind: "addon" }>,
  state: CalculatorState,
): boolean {
  if (term.when && String(state[term.when.field]) !== term.when.equals) return false;
  const raw = state[term.field];
  const expected = term.equals ?? "true";
  if (Array.isArray(raw)) return raw.includes(expected);
  return String(raw) === expected;
}

/**
 * Folds a spec's terms into an estimate. Pure and deterministic: the same spec,
 * state and resolvers always give the same ranges. Unknown option ids fall back
 * to the field default, and a zero volume keeps `unitCost` finite.
 *
 * `setup` keeps the entity's price floor; `perUnit` folds into the recurring
 * period, `multiplier` scales that period and the timeline. A `bundle` pulls the
 * referenced service's price. An `addon` is a delta on the base: its catalog
 * coefficients scale setup, the recurring period and the timeline, so the shared
 * stack/base capability is never charged twice.
 */
export function estimate(
  spec: CalculatorSpec,
  state: CalculatorState,
  resolveBundle: BundleResolver,
  resolveAddon: AddonResolver = () => undefined,
): Estimate {
  const setup: Range = { low: 0, high: 0 };
  const run: Range = { low: 0, high: 0 };
  // Recurring bundles (`month` unit) are tallied apart and folded into the
  // period after the multipliers, so complexity/language factors never scale a
  // service that is billed per month.
  const recurring: Range = { low: 0, high: 0 };
  const weeks: Range = { low: 0, high: 0 };
  const factors: number[] = [];
  let volume = 0;

  for (const term of spec.terms) {
    switch (term.kind) {
      case "setup": {
        add(setup, toRange(term.amount));
        if (term.weeks != null) add(weeks, toRange(term.weeks));
        break;
      }
      case "perUnit": {
        const field = findField(spec, term.field);
        const value = field ? numericValue(field, state[term.field]) : 0;
        volume = value;
        add(run, scale(toRange(term.rate), value));
        if (term.weeksPerUnit != null) add(weeks, scale(toRange(term.weeksPerUnit), value));
        break;
      }
      case "perOption": {
        const key = chosenValue(spec, state, term.field);
        add(setup, toRange(term.rates[key] ?? 0));
        break;
      }
      case "perSelection": {
        const field = findField(spec, term.field);
        const ids = field ? selection(field, state[term.field]) : [];
        for (const id of ids) add(setup, toRange(term.rates[id] ?? 0));
        break;
      }
      case "multiplier": {
        const key = chosenValue(spec, state, term.field);
        const factor = term.factors[key];
        if (typeof factor === "number" && factor > 0) factors.push(factor);
        break;
      }
      case "bundle": {
        if (term.when && String(state[term.when.field]) !== term.when.equals) break;
        const price = resolveBundle(term.ref);
        if (!price) break;
        // A monthly service folds into the recurring period; a one-off unit
        // (`project`/`program`/`language`) folds into setup.
        if (price.unit === "month") add(recurring, toRange(price.amount));
        else add(setup, toRange(price.amount));
        break;
      }
      case "addon":
        // Applied after the base is folded; see the second pass below.
        break;
    }
  }

  const factor = factors.reduce((acc, value) => acc * value, 1);
  const basePeriod = scale(run, factor);
  add(basePeriod, recurring);
  const baseTimeline = scale(weeks, factor);

  const addonSetup: Range = { low: 0, high: 0 };
  const addonPeriod: Range = { low: 0, high: 0 };
  const addonWeeks: Range = { low: 0, high: 0 };
  const addons: AddonEstimate[] = [];

  for (const term of spec.terms) {
    if (term.kind !== "addon") continue;
    const pricing = resolveAddon(term.ref);
    const setupDelta = pricing ? scale(setup, pricing.setupFactor) : { low: 0, high: 0 };
    const periodDelta =
      pricing?.recurringFactor != null
        ? scale(basePeriod, pricing.recurringFactor)
        : { low: 0, high: 0 };
    const weeksDelta =
      pricing?.weeksFactor != null ? scale(baseTimeline, pricing.weeksFactor) : { low: 0, high: 0 };

    addons.push({
      ref: term.ref,
      active: addonActive(term, state),
      setup: roundRange(setupDelta),
      recurring: roundRange(periodDelta),
      firstPeriod: roundRange({
        low: setupDelta.low + periodDelta.low * spec.horizon,
        high: setupDelta.high + periodDelta.high * spec.horizon,
      }),
      weeks: roundRange(weeksDelta),
    });

    if (!addonActive(term, state)) continue;
    add(addonSetup, setupDelta);
    add(addonPeriod, periodDelta);
    add(addonWeeks, weeksDelta);
  }

  add(setup, addonSetup);
  const period = basePeriod;
  add(period, addonPeriod);
  const timeline = baseTimeline;
  add(timeline, addonWeeks);
  const unitCount = volume > 0 ? volume : 1;

  return {
    setup: roundRange(setup),
    runPerPeriod: roundRange(period),
    firstPeriod: roundRange({
      low: setup.low + period.low * spec.horizon,
      high: setup.high + period.high * spec.horizon,
    }),
    unitCost: roundRange(scale(period, 1 / unitCount)),
    timelineWeeks: roundRange(timeline),
    addons,
  };
}
