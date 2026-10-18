import { getServiceBySlug } from "@/entities/service";
import { getSolutionBySlug } from "@/entities/solution";
import type {
  CalculatorField,
  CalculatorSpec,
  FieldOption,
  WithCalculator,
} from "@/shared/types/calculator";

/** Which catalog slice a calculator is attached to. */
export type CalculatorKind = "service" | "solution";

/** One entity getter per kind: a new kind is an entry, not a new branch. */
const RESOLVERS: Record<CalculatorKind, (slug: string) => WithCalculator | undefined> = {
  service: getServiceBySlug,
  solution: getSolutionBySlug,
};

const SUPPORT_OPTIONS: FieldOption[] = [
  {
    value: "standard",
    label: "calculator.options.supportStandard",
    description: "calculator.supportHints.standard",
  },
  {
    value: "priority",
    label: "calculator.options.supportPriority",
    description: "calculator.supportHints.priority",
  },
  {
    value: "dedicated",
    label: "calculator.options.supportDedicated",
    description: "calculator.supportHints.dedicated",
  },
];

/** The one-off base a support level is a share of. */
function setupAmount(spec: CalculatorSpec): number | undefined {
  for (const term of spec.terms) {
    if (term.kind === "setup" && typeof term.amount === "number") return term.amount;
  }
  return undefined;
}

/**
 * Appends the standard first-year support field unless the spec opts out. The
 * level prices are shares of the setup, so a fixture never repeats three lines
 * that are the same across the site.
 */
function withSupport(spec: CalculatorSpec): CalculatorSpec {
  if (spec.support === false) return spec;
  if (spec.fields.some((field) => field.id === "support")) return spec;
  const amount = setupAmount(spec);
  if (amount == null) return spec;

  const priority = Math.round((amount * 0.15) / 1000) * 1000;
  const dedicated = Math.round((amount * 0.3) / 1000) * 1000;
  const field: CalculatorField = {
    kind: "segmented",
    id: "support",
    label: "calculator.fields.support",
    options: SUPPORT_OPTIONS,
    default: "standard",
    placement: "addons",
  };
  return {
    ...spec,
    fields: [...spec.fields, field],
    terms: [
      ...spec.terms,
      { kind: "perOption", field: "support", rates: { standard: 0, priority, dedicated } },
    ],
  };
}

/**
 * The estimator spec of an entity, or `undefined` when it carries none. The
 * island's only data access: kept out of the component so it stays
 * presentational and this dependency stays unit-testable.
 */
export function resolveSpec(kind: CalculatorKind, slug: string): CalculatorSpec | undefined {
  const spec = RESOLVERS[kind](slug)?.calculator;
  return spec ? withSupport(spec) : undefined;
}
