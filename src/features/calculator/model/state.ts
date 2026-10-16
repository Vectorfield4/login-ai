import type { CalculatorSpec } from "@/shared/types/calculator";
import type { CalculatorState, FieldValue } from "./types";

/** The default configuration of a spec, one entry per field. */
export function initialState(spec: CalculatorSpec): CalculatorState {
  const state: CalculatorState = {};
  for (const field of spec.fields) state[field.id] = field.default;
  return state;
}

/**
 * A stable, locale-free rendering of a configuration for the CTA URL and the
 * `mailto:` body — and the seam a future CRM form will reuse. Keys are sorted,
 * arrays are sorted and joined with `+`, pairs with `,`.
 */
export function encodeConfig(state: CalculatorState): string {
  return Object.keys(state)
    .sort()
    .map((key) => {
      const value = state[key];
      const rendered = Array.isArray(value) ? [...value].sort().join("+") : String(value);
      return `${key}=${rendered}`;
    })
    .join(",");
}

/** Toggles an id inside a multiselect value, tolerating a non-array state. */
export function toggleSelection(value: FieldValue, id: string): string[] {
  const current = Array.isArray(value) ? value : [];
  return current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
}
