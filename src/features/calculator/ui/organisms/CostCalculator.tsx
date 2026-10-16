import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
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

const styles = stylex.create({
  // Desktop: a 60/40 split — the configurator scrolls on the left, the result
  // sticks on the right.
  layout: {
    display: "grid",
    gap: tokens.spacing3,
    "@media (min-width: 960px)": {
      gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
      gap: tokens.spacing5,
      alignItems: "start",
    },
  },
  config: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing3,
    minWidth: 0,
  },
  // Mobile: a bar fixed to the bottom of the viewport, always over the content.
  // Desktop: a sticky card parked in the right column. `zSticky` keeps it below
  // the app bar, so it never scrolls over the header.
  result: {
    position: "fixed",
    insetInline: 0,
    bottom: 0,
    zIndex: tokens.zSticky,
    padding: tokens.spacing2,
    backgroundColor: tokens.colorSurface,
    borderTop: `1px solid ${tokens.colorDivider}`,
    boxShadow: tokens.shadow8,
    boxSizing: "border-box",
    "@media (min-width: 960px)": {
      position: "sticky",
      top: 96,
      insetInline: "auto",
      bottom: "auto",
      padding: tokens.spacing3,
      borderTop: "none",
      border: `1px solid ${tokens.colorDivider}`,
      borderRadius: tokens.radiusBorder,
      boxShadow: tokens.shadow1,
    },
  },
});

/**
 * The generic estimator island, laid out as a hero split-screen: the
 * configurator on the left, the sticky result on the right (a fixed bottom bar
 * on phones). Takes only JSON-safe props (`kind`, `slug`, `lang`) — the spec is
 * resolved from the entity getters inside, so no function crosses the island
 * boundary and `verify:dist`'s `[0,null]` guard passes.
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
      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.config)}>
          {spec.fields.map((field) => (
            <CalculatorField
              key={field.id}
              field={field}
              value={state[field.id]}
              onChange={(value) => set(field.id, value)}
              lang={lang}
            />
          ))}
        </div>

        <div {...stylex.props(styles.result)}>
          <EstimateGrid estimate={result} lang={lang} />
          <CalculatorActions config={config} lang={lang} />
        </div>
      </div>
    </BlockSection>
  );
}

export default CostCalculator;
