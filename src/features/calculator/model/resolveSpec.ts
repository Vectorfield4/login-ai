import { getServiceBySlug } from "@/entities/service";
import { getSolutionBySlug } from "@/entities/solution";
import type { CalculatorSpec, WithCalculator } from "@/shared/types/calculator";

/** Which catalog slice a calculator is attached to. */
export type CalculatorKind = "service" | "solution";

/** One entity getter per kind: a new kind is an entry, not a new branch. */
const RESOLVERS: Record<CalculatorKind, (slug: string) => WithCalculator | undefined> = {
  service: getServiceBySlug,
  solution: getSolutionBySlug,
};

/**
 * The estimator spec of an entity, or `undefined` when it carries none. The
 * island's only data access: kept out of the component so it stays
 * presentational and this dependency stays unit-testable.
 */
export function resolveSpec(kind: CalculatorKind, slug: string): CalculatorSpec | undefined {
  return RESOLVERS[kind](slug)?.calculator;
}
