import type { PriceUnit } from "./content";

/**
 * Contract for the generic cost-calculator platform. A calculator is not a
 * component: it is declarative data (`CalculatorSpec`) attached to a service or
 * a solution fixture. `features/calculator` holds the one engine and the one
 * island that render every spec, so the contract lives below the entities in
 * `shared/types` — the same placement as `WithRelevants` (relevants.ts).
 *
 * Labels are i18n keys under the shared `calculator` namespace; `value`, the
 * numeric bounds and every rate stay locale-free fixture numbers.
 */

/** One choice of a segmented, urgency or multiselect field. `label` is an i18n key. */
export interface FieldOption {
  value: string;
  label: string;
  /** Optional icon-catalog key (`ENTITY_ICONS`), rendered as a card glyph. */
  icon?: string;
}

/**
 * One input of a calculator. The kinds are deliberately discrete — segmented,
 * toggle, slider, stepper, urgency, multiselect — with no free number input, so
 * a visitor can only pick from the values the fixture declares.
 */
export type CalculatorField =
  | { kind: "segmented"; id: string; label: string; options: FieldOption[]; default: string }
  | { kind: "toggle"; id: string; label: string; default: boolean }
  | {
      kind: "slider";
      id: string;
      label: string;
      min: number;
      max: number;
      step: number;
      default: number;
      /** Range captions; the first hint whose `upTo >= value` is shown. */
      hints?: { upTo: number; label: string }[];
    }
  | { kind: "stepper"; id: string; label: string; min: number; max: number; default: number }
  | {
      kind: "multiselect";
      id: string;
      label: string;
      options: FieldOption[];
      default: string[];
    }
  /**
   * Delivery speed as a slider between the declared options (left = first).
   * Costs are modelled by the spec via a `perOption`/`multiplier` term.
   */
  | { kind: "urgency"; id: string; label: string; options: FieldOption[]; default: string };

/** A money or duration figure: a point or an explicit band. `low ≤ high`. */
export type Band = number | { low: number; high: number };

/**
 * One term of the estimate fold (see `features/calculator/model/estimate.ts`).
 *
 * - `setup` — a one-off amount (the entity price floor) and, optionally, weeks.
 * - `perUnit` — `rate × <numeric field>` folded into the recurring period.
 * - `perOption` — a one-off amount for the value chosen in the field.
 * - `perSelection` — the sum of the one-off rates of a multiselect's choices.
 * - `multiplier` — scales the recurring period and the timeline.
 * - `bundle` — pulls another service's price floor into the one-off setup,
 *   optionally gated on a field value.
 */
export type CalculatorTerm =
  | { kind: "setup"; amount: Band; weeks?: Band }
  | { kind: "perUnit"; field: string; rate: Band; weeksPerUnit?: Band }
  | { kind: "perOption"; field: string; rates: Record<string, Band> }
  | { kind: "perSelection"; field: string; rates: Record<string, Band> }
  | { kind: "multiplier"; field: string; factors: Record<string, number> }
  | { kind: "bundle"; ref: string; when?: { field: string; equals: string } };

/** Declarative definition of one entity's estimator: data, not code. */
export interface CalculatorSpec {
  /** Billing unit of the estimate; reuses `PriceUnit`. */
  unit: PriceUnit;
  /** Recurring periods folded into `firstPeriod` (e.g. 12 months). */
  horizon: number;
  fields: CalculatorField[];
  terms: CalculatorTerm[];
}

/** Any site entity that can carry an estimator. */
export interface WithCalculator {
  calculator?: CalculatorSpec;
}
