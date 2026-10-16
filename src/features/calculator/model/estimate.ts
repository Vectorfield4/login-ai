import type { Band, CalculatorField, CalculatorSpec } from "@/shared/types/calculator";
import type { BundleResolver, CalculatorState, Estimate, Range } from "./types";

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
      return "";
  }
}

/** The selected ids of a multiselect, dropping ids the field does not declare. */
function selection(field: CalculatorField, raw: unknown): string[] {
  if (field.kind !== "multiselect") return [];
  if (!Array.isArray(raw)) return field.default;
  return raw.filter(
    (id): id is string =>
      typeof id === "string" && field.options.some((option) => option.value === id),
  );
}

function roundRange(value: Range): Range {
  return { low: Math.round(value.low), high: Math.round(value.high) };
}

/**
 * Folds a spec's terms into an estimate. Pure and deterministic: the same spec,
 * state and resolver always give the same ranges. Unknown option ids fall back
 * to the field default, and a zero volume keeps `unitCost` finite.
 *
 * `setup` keeps the entity's price floor; `perUnit` folds into the recurring
 * period, `multiplier` scales that period and the timeline. A `bundle` pulls the
 * referenced service's price: a one-off unit (`project`/`program`/`language`)
 * lands in `setup`, while a `month` unit lands in the recurring period, after
 * the multipliers.
 */
export function estimate(
  spec: CalculatorSpec,
  state: CalculatorState,
  resolveBundle: BundleResolver,
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
    }
  }

  const factor = factors.reduce((acc, value) => acc * value, 1);
  const period = scale(run, factor);
  add(period, recurring);
  const timeline = scale(weeks, factor);
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
  };
}
