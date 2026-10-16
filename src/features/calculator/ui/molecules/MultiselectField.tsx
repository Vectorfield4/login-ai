import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { Chip } from "@/shared/ui/atoms";
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
  chips: { display: "flex", flexWrap: "wrap", gap: tokens.spacing1 },
  chipOn: {
    backgroundColor: tokens.colorPrimarySoft,
    borderColor: tokens.colorPrimary,
    color: tokens.colorPrimary,
  },
});

/** One multi-choice field as a labelled row of toggleable chips. */
export function MultiselectField({ field, value, onChange, lang }: MultiselectFieldProps) {
  const t = useT(lang);
  return (
    <FieldRow label={t(field.label)}>
      <div {...stylex.props(styles.chips)}>
        {field.options.map((option) => {
          const selected = value.includes(option.value);
          return (
            <Chip
              key={option.value}
              label={t(option.label)}
              onClick={() => onChange(toggleSelection(value, option.value))}
              style={selected ? styles.chipOn : undefined}
            />
          );
        })}
      </div>
    </FieldRow>
  );
}

export default MultiselectField;
