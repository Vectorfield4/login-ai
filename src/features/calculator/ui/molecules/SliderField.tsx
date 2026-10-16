import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { Slider, Typography } from "@/shared/ui/atoms";
import { FieldRow } from "./FieldRow";

type SliderSpec = Extract<CalculatorField, { kind: "slider" }>;

type SliderFieldProps = {
  field: SliderSpec;
  value: number;
  onChange: (value: number) => void;
  lang: AppLang;
};

const styles = stylex.create({
  hint: { marginTop: tokens.spacing1, fontWeight: 600, color: tokens.colorPrimary },
});

/** One discrete range as a labelled form row, with an optional dynamic hint. */
export function SliderField({ field, value, onChange, lang }: SliderFieldProps) {
  const t = useT(lang);
  const label = t(field.label);
  const hint = field.hints?.find((item) => value <= item.upTo);
  return (
    <FieldRow label={label}>
      <Slider
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={onChange}
        label={label}
      />
      {hint ? (
        <Typography variant="body2" style={styles.hint}>
          {t(hint.label)}
        </Typography>
      ) : null}
    </FieldRow>
  );
}

export default SliderField;
