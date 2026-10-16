import type { PriceItem } from "@/shared/types/content";

/** A closed numeric band. `low ≤ high` by construction. */
export interface Range {
  low: number;
  high: number;
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
}

/** A single field's value; the shape follows the field kind. */
export type FieldValue = string | boolean | number | string[];

/** The live configuration keyed by field id. */
export type CalculatorState = Record<string, FieldValue>;

/** Resolves a bundle term's `ref` to the referenced entity's price floor. */
export type BundleResolver = (ref: string) => PriceItem | undefined;
