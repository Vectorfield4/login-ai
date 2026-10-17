import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { Switch } from "@/shared/ui/atoms";
import { FieldRow } from "./FieldRow";

type ToggleSpec = Extract<CalculatorField, { kind: "toggle" }>;

type ToggleFieldProps = {
  field: ToggleSpec;
  value: boolean;
  onChange: (value: boolean) => void;
  lang: AppLang;
};

/** One boolean option as a labelled form row. */
export function ToggleField({ field, value, onChange, lang }: ToggleFieldProps) {
  const t = useT(lang);
  const label = t(field.label);
  return (
    <FieldRow label={label}>
      <Switch checked={value} onChange={onChange} label={label} />
    </FieldRow>
  );
}

export default ToggleField;
