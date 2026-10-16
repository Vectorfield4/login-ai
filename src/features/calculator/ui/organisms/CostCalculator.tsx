import { useState } from "react";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Grid } from "@/shared/ui/atoms";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { estimate } from "../../model/estimate";
import { resolveBundle } from "../../model/resolveBundle";
import { type CalculatorKind, resolveSpec } from "../../model/resolveSpec";
import { encodeConfig, initialState } from "../../model/state";
import type { CalculatorState, FieldValue } from "../../model/types";
import { CalculatorActions } from "../molecules/CalculatorActions";
import { CalculatorField } from "../molecules/CalculatorField";
import { EstimateGrid } from "../molecules/EstimateGrid";

export interface CostCalculatorProps {
  kind: CalculatorKind;
  slug: string;
  lang: AppLang;
}

/**
 * The generic estimator island. Takes only JSON-safe props (`kind`, `slug`,
 * `lang`) — the spec is resolved from the entity getters inside, so no function
 * crosses the island boundary and `verify:dist`'s `[0,null]` guard passes.
 * Composition only: fields, estimate and CTA are their own molecules.
 */
export function CostCalculator({ kind, slug, lang }: CostCalculatorProps) {
  const t = useT(lang);
  const spec = resolveSpec(kind, slug);
  const [state, setState] = useState<CalculatorState>(() => (spec ? initialState(spec) : {}));

  if (!spec) return null;

  const set = (id: string, value: FieldValue) => setState((prev) => ({ ...prev, [id]: value }));
  const result = estimate(spec, state, resolveBundle);
  const config = encodeConfig(state);

  return (
    <BlockSection
      alt
      id="calculator"
      eyebrow={t("calculator.eyebrow")}
      title={t("calculator.title")}
      subtitle={t("calculator.note")}
    >
      <Grid container spacing={3}>
        {spec.fields.map((field) => (
          <Grid key={field.id} item size={12} sm={6}>
            <CalculatorField
              field={field}
              value={state[field.id]}
              onChange={(value) => set(field.id, value)}
              lang={lang}
            />
          </Grid>
        ))}
      </Grid>

      <EstimateGrid estimate={result} lang={lang} />
      <CalculatorActions config={config} lang={lang} />
    </BlockSection>
  );
}

export default CostCalculator;
