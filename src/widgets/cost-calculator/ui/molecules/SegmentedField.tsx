import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { SegmentedControl, Typography } from "@/shared/ui/atoms";
import { FieldRow } from "./FieldRow";

type SegmentedSpec = Extract<CalculatorField, { kind: "segmented" }>;

type SegmentedFieldProps = {
  field: SegmentedSpec;
  value: string;
  onChange: (value: string) => void;
  /** Price delta, shown next to the label for priced levels. */
  hint?: string;
  lang: AppLang;
};

const styles = stylex.create({
  description: {
    marginTop: tokens.spacing05,
  },
});

/** One segmented choice as a labelled form row. */
export function SegmentedField({ field, value, onChange, hint, lang }: SegmentedFieldProps) {
  const t = useT(lang);
  const label = t(field.label);
  const selected = field.options.find((option) => option.value === value);
  return (
    <FieldRow label={label} hint={hint}>
      <SegmentedControl
        options={field.options.map((option) => ({ value: option.value, label: t(option.label) }))}
        value={value}
        onChange={onChange}
        label={label}
      />
      {selected?.description ? (
        <Typography variant="body2" color="textSecondary" style={styles.description}>
          {t(selected.description)}
        </Typography>
      ) : null}
    </FieldRow>
  );
}

export default SegmentedField;
