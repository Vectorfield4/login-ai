import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { InfoHint, Stepper } from "@/shared/ui/atoms";
import { FieldRow } from "./FieldRow";

type StepperSpec = Extract<CalculatorField, { kind: "stepper" }>;

type StepperFieldProps = {
  field: StepperSpec;
  value: number;
  onChange: (value: number) => void;
  lang: AppLang;
};

/** One integer count as a labelled form row. */
export function StepperField({ field, value, onChange, lang }: StepperFieldProps) {
  const t = useT(lang);
  const label = t(field.label);
  return (
    <FieldRow label={label} info={field.infoKey ? <InfoHint text={t(field.infoKey)} /> : undefined}>
      <Stepper min={field.min} max={field.max} value={value} onChange={onChange} label={label} />
    </FieldRow>
  );
}

export default StepperField;
