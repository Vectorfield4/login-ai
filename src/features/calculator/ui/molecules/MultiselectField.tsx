import * as stylex from "@stylexjs/stylex";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { toggleSelection } from "../../model/state";
import { FieldRow } from "./FieldRow";

type MultiselectSpec = Extract<CalculatorField, { kind: "multiselect" }>;

type MultiselectFieldProps = {
  field: MultiselectSpec;
  value: string[];
  onChange: (value: string[]) => void;
  lang: AppLang;
};

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: tokens.spacing1,
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
    padding: tokens.spacing15,
    borderRadius: tokens.radiusShape,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.colorDivider,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    fontFamily: "inherit",
    fontSize: tokens.sizeBody2,
    fontWeight: 500,
    textAlign: "start",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: `border-color ${tokens.durationShortest} ease, background-color ${tokens.durationShortest} ease`,
    ":hover": { backgroundColor: tokens.colorActionHover },
    ":focus-visible": { outline: `2px solid ${tokens.colorPrimary}`, outlineOffset: 2 },
  },
  cardOn: {
    borderColor: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
  },
});

/** One multi-choice field as a grid of selectable feature cards. */
export function MultiselectField({ field, value, onChange, lang }: MultiselectFieldProps) {
  const t = useT(lang);
  return (
    <FieldRow label={t(field.label)}>
      <div {...stylex.props(styles.grid)}>
        {field.options.map((option) => {
          const selected = value.includes(option.value);
          const Icon = resolveEntityIcon(option.icon);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(toggleSelection(value, option.value))}
              {...stylex.props(styles.card, selected && styles.cardOn)}
            >
              {option.icon ? <Icon size={18} /> : null}
              <span>{t(option.label)}</span>
            </button>
          );
        })}
      </div>
    </FieldRow>
  );
}

export default MultiselectField;
