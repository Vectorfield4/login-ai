import type { AppLang } from "@/shared/hooks/useT";
import type { CalculatorField as CalculatorFieldSpec } from "@/shared/types/calculator";
import type { FieldValue } from "../../model/types";
import { MultiselectField } from "./MultiselectField";
import { SegmentedField } from "./SegmentedField";
import { SliderField } from "./SliderField";
import { StepperField } from "./StepperField";
import { ToggleField } from "./ToggleField";

type CalculatorFieldProps = {
  field: CalculatorFieldSpec;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  lang: AppLang;
};

/**
 * Picks the field component by `kind` and coerces the loose state value to the
 * field's own type (falling back to the spec default on junk). A closed
 * discriminated union, so the switch is exhaustive by construction.
 */
export function CalculatorField({ field, value, onChange, lang }: CalculatorFieldProps) {
  switch (field.kind) {
    case "segmented":
      return (
        <SegmentedField
          field={field}
          value={typeof value === "string" ? value : field.default}
          onChange={onChange}
          lang={lang}
        />
      );
    case "toggle":
      return (
        <ToggleField
          field={field}
          value={typeof value === "boolean" ? value : field.default}
          onChange={onChange}
          lang={lang}
        />
      );
    case "slider":
      return (
        <SliderField
          field={field}
          value={typeof value === "number" ? value : field.default}
          onChange={onChange}
          lang={lang}
        />
      );
    case "stepper":
      return (
        <StepperField
          field={field}
          value={typeof value === "number" ? value : field.default}
          onChange={onChange}
          lang={lang}
        />
      );
    case "multiselect":
      return (
        <MultiselectField
          field={field}
          value={Array.isArray(value) ? value : field.default}
          onChange={onChange}
          lang={lang}
        />
      );
  }
}

export default CalculatorField;
