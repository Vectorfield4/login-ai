import type { AddonPricing } from "@/shared/types/calculator";
import type { PriceItem } from "@/shared/types/content";

/** A closed numeric band. `low ≤ high` by construction. */
export interface Range {
  low: number;
  high: number;
}

/** One capability/software-type option and its potential delta. */
export interface AddonEstimate {
  /** Catalog slug of the add-on. */
  ref: string;
  /** The field currently selects this add-on. */
  active: boolean;
  /** One-off delta. */
  setup: Range;
  /** Recurring delta per period. */
  recurring: Range;
  /** `setup + recurring × horizon`. */
  firstPeriod: Range;
  /** Timeline delta. */
  weeks: Range;
}

/** The full estimate: money and timeline, each as a range. */
export interface Estimate {
  /** One-off work. */
  setup: Range;
  /** Recurring work per period. */
  runPerPeriod: Range;
  /** `setup + runPerPeriod × horizon`. */
  firstPeriod: Range;
  /** `runPerPeriod / volume`. */
  unitCost: Range;
  /** Weeks: setup weeks plus every `weeksPerUnit × volume`. */
  timelineWeeks: Range;
  /** Every add-on term with its potential delta; inactive ones are shown too. */
  addons: AddonEstimate[];
}

/** A single field's value; the shape follows the field kind. */
export type FieldValue = string | boolean | number | string[];

/** The live configuration keyed by field id. */
export type CalculatorState = Record<string, FieldValue>;

/** Resolves a bundle term's `ref` to the referenced entity's price floor. */
export type BundleResolver = (ref: string) => PriceItem | undefined;

/** Resolves an add-on term's catalog slug to its pricing coefficients. */
export type AddonResolver = (ref: string) => AddonPricing | undefined;
