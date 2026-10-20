import type { VisualComposition, VisualCompositionKey } from "./ui-primitives.mjs";

/** The deterministic composition key for a slug inside the shared set. */
export function compositionKeyFor(slug: string): VisualCompositionKey;

/** Explicit override when valid, otherwise the slug-derived key. */
export function compositionFor(slug: string, override?: string): VisualComposition;
