import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { SegmentedControl } from "@/shared/ui/atoms";
import { FieldRow } from "./FieldRow";

type SegmentedSpec = Extract<CalculatorField, { kind: "segmented" }>;

type SegmentedFieldProps = {
  field: SegmentedSpec;
  value: string;
  onChange: (value: string) => void;
  lang: AppLang;
};

/** One segmented choice as a labelled form row. */
export function SegmentedField({ field, value, onChange, lang }: SegmentedFieldProps) {
  const t = useT(lang);
  const label = t(field.label);
  return (
    <FieldRow label={label}>
      <SegmentedControl
        options={field.options.map((option) => ({ value: option.value, label: t(option.label) }))}
        value={value}
        onChange={onChange}
        label={label}
      />
    </FieldRow>
  );
}

export default SegmentedField;
