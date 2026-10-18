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

/** A field is shown only when another field has this value. */
export interface FieldVisibility {
  field: string;
  equals: string;
}

/** One choice of a segmented, urgency or multiselect field. `label` is an i18n key. */
export interface FieldOption {
  value: string;
  label: string;
  /** Optional i18n key of a short explanation under the control. */
  description?: string;
  /** Optional icon-catalog key (`ENTITY_ICONS`), rendered as a card glyph. */
  icon?: string;
}

/** Properties every calculator field carries. */
interface FieldBase {
  id: string;
  label: string;
  visibleWhen?: FieldVisibility;
  /** Also show the chosen value in the result panel. */
  showOnResults?: boolean;
  /** i18n key of the tooltip next to the field label. */
  infoKey?: string;
  /** Put the field in the Add-ons section instead of the base config. */
  placement?: "addons";
}

/**
 * One input of a calculator. The kinds are deliberately discrete — segmented,
 * toggle, slider, stepper, urgency, multiselect, software types — with no free
 * number input, so a visitor can only pick from the values the fixture declares.
 */
export type CalculatorField =
  | ({ kind: "segmented"; options: FieldOption[]; default: string } & FieldBase)
  | ({ kind: "toggle"; default: boolean } & FieldBase)
  | ({
      kind: "slider";
      min: number;
      max: number;
      step: number;
      default: number;
      /** Range captions; the first hint whose `upTo >= value` is shown. */
      hints?: { upTo: number; label: string }[];
    } & FieldBase)
  | ({
      kind: "stepper";
      min: number;
      max: number;
      default: number;
    } & FieldBase)
  | ({
      kind: "multiselect";
      options: FieldOption[];
      default: string[];
      /** Minimum selected options (e.g. 1 inside an enabled add-on group). */
      minSelected?: number;
    } & FieldBase)
  /**
   * Delivery speed as a slider between the declared options (left = first).
   * Costs are modelled by the spec via a `perOption`/`multiplier` term.
   */
  | ({
      kind: "urgency";
      options: FieldOption[];
      default: string;
    } & FieldBase)
  /**
   * A multi-choice over the `software-type` catalog. The widget resolves the
   * types, their vendor products and icons; the spec only names the selection.
   */
  | ({
      kind: "software-types";
      default: string[];
      /** Minimum selected types; omit to allow an empty selection. */
      minSelected?: number;
    } & FieldBase);

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
 * - `bundle` — pulls another service's price floor into the estimate; kept for
 *   a genuinely separate service (training), not for capabilities.
 * - `addon` — adds a capability/software-type delta as a coefficient of the
 *   base. The coefficient lives in the catalog (`AddonPricing`), not here.
 */
export type CalculatorTerm =
  | { kind: "setup"; amount: Band; weeks?: Band }
  | { kind: "perUnit"; field: string; rate: Band; weeksPerUnit?: Band }
  | { kind: "perOption"; field: string; rates: Record<string, Band> }
  | {
      kind: "perSelection";
      field: string;
      rates: Record<string, Band>;
      when?: FieldVisibility;
    }
  | { kind: "multiplier"; field: string; factors: Record<string, number> }
  | { kind: "bundle"; ref: string; when?: FieldVisibility }
  | { kind: "addon"; field: string; equals?: string; ref: string; when?: FieldVisibility };

/**
 * How an add-on scales the base estimate. The base is the spec's own setup and
 * recurring period, so the client pays the marginal capability, not the shared
 * stack or base capability again.
 */
export interface AddonPricing {
  /** Share of the base setup added when the add-on is selected. */
  setupFactor: number;
  /** Share of the base recurring period added when selected. */
  recurringFactor?: number;
  /** Share of the base timeline added when selected. */
  weeksFactor?: number;
}

/** A base item shown in the calculator's "Included" block; display only. */
export type IncludedKind = "service" | "technology" | "capability" | "software-type";

export interface IncludedItem {
  kind: IncludedKind;
  /** Slug in the matching catalog. */
  slug: string;
  /** Optional i18n key of a short note under the item. */
  noteKey?: string;
}

/** Declarative definition of one entity's estimator: data, not code. */
export interface CalculatorSpec {
  /** Billing unit of the estimate; reuses `PriceUnit`. */
  unit: PriceUnit;
  /** Recurring periods folded into `firstPeriod` (e.g. 12 months). */
  horizon: number;
  fields: CalculatorField[];
  terms: CalculatorTerm[];
  /** Base services/capabilities already covered by the estimate. */
  included?: IncludedItem[];
  /**
   * Whether the widget appends the standard support-level field. Defaults to
   * `true`; set `false` for a one-time offer with no post-launch support.
   */
  support?: boolean;
}

/** Any site entity that can carry an estimator. */
export interface WithCalculator {
  calculator?: CalculatorSpec;
}
