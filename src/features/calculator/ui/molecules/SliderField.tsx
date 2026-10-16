import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { Slider } from "@/shared/ui/atoms";
import { FieldRow } from "./FieldRow";

type SliderSpec = Extract<CalculatorField, { kind: "slider" }>;

type SliderFieldProps = {
  field: SliderSpec;
  value: number;
  onChange: (value: number) => void;
  lang: AppLang;
};

/** One discrete range as a labelled form row. */
export function SliderField({ field, value, onChange, lang }: SliderFieldProps) {
  const t = useT(lang);
  const label = t(field.label);
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
    </FieldRow>
  );
}

export default SliderField;
