import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import {
  type AddonEstimate,
  type CalculatorState,
  type CalculatorTerm,
  encodeConfig,
  estimate,
  type FieldValue,
  initialState,
} from "@/features/calculator";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorSpec } from "@/shared/types/calculator";
import { Typography } from "@/shared/ui/atoms";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { resolveAddon } from "../../model/resolveAddon";
import { resolveBundle } from "../../model/resolveBundle";
import { type CalculatorKind, resolveSpec } from "../../model/resolveSpec";
import { AddonField } from "../molecules/AddonField";
import { CalculatorActions } from "../molecules/CalculatorActions";
import { CalculatorField } from "../molecules/CalculatorField";
import { EstimateGrid } from "../molecules/EstimateGrid";
import { IncludedBlock } from "../molecules/IncludedBlock";

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
  addons: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
    paddingTop: tokens.spacing2,
    borderTop: `1px solid ${tokens.colorDivider}`,
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

const addonTerms = (spec: CalculatorSpec): Extract<CalculatorTerm, { kind: "addon" }>[] =>
  spec.terms.filter((term): term is Extract<CalculatorTerm, { kind: "addon" }> => {
    return term.kind === "addon";
  });

/**
 * The generic estimator island, laid out as a hero split-screen: the included
 * basket and configurator on the left, the sticky result on the right (a fixed
 * bottom bar on phones). Takes only JSON-safe props (`kind`, `slug`, `lang`) —
 * the spec is resolved from the entity getters inside, so no function crosses
 * the island boundary and `verify:dist`'s `[0,null]` guard passes.
 */
export function CostCalculator({ kind, slug, lang }: CostCalculatorProps) {
  const t = useT(lang);
  const spec = resolveSpec(kind, slug);
  const [state, setState] = useState<CalculatorState>(() => (spec ? initialState(spec) : {}));

  if (!spec) return null;

  const set = (id: string, value: FieldValue) => setState((prev) => ({ ...prev, [id]: value }));
  const result = estimate(spec, state, resolveBundle, resolveAddon);
  const config = encodeConfig(state);
  const addons = addonTerms(spec);
  const addonFieldIds = new Set(
    addons.flatMap((term) => [term.field, ...(term.when ? [term.when.field] : [])]),
  );
  const isVisible = (field: CalculatorSpec["fields"][number]): boolean =>
    !field.visibleWhen || String(state[field.visibleWhen.field]) === field.visibleWhen.equals;
  const baseFields = spec.fields.filter(
    (field) => !addonFieldIds.has(field.id) && isVisible(field),
  );
  const addonFields = spec.fields.filter(
    (field) => addonFieldIds.has(field.id) && isVisible(field),
  );

  const addonsFor = (fieldId: string): AddonEstimate[] =>
    addons
      .filter((term) => term.field === fieldId)
      .map((term) => result.addons.find((item) => item.ref === term.ref))
      .filter((item): item is AddonEstimate => Boolean(item));

  return (
    <BlockSection
      alt
      id="calculator"
      eyebrow={t("calculator.eyebrow")}
      title={t("calculator.title")}
      subtitle={t("calculator.note")}
    >
      <IncludedBlock kind={kind} slug={slug} items={spec.included ?? []} lang={lang} />
      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.config)}>
          {baseFields.map((field) => (
            <CalculatorField
              key={field.id}
              field={field}
              value={state[field.id]}
              onChange={(value) => set(field.id, value)}
              lang={lang}
            />
          ))}

          {addonFields.length > 0 ? (
            <section {...stylex.props(styles.addons)}>
              <Typography variant="h6" component="h3">
                {t("calculator.addons.title")}
              </Typography>
              {addonFields.map((field) => (
                <AddonField
                  key={field.id}
                  field={field}
                  value={state[field.id]}
                  onChange={(value) => set(field.id, value)}
                  addons={addonsFor(field.id)}
                  lang={lang}
                />
              ))}
            </section>
          ) : null}
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
