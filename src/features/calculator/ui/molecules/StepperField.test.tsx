import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CalculatorField } from "@/shared/types/calculator";
import { StepperField } from "./StepperField";

const field: Extract<CalculatorField, { kind: "stepper" }> = {
  kind: "stepper",
  id: "languages",
  label: "calculator.fields.languages",
  min: 1,
  max: 5,
  default: 1,
};

describe("StepperField", () => {
  it("переводит подпись и шагает значение", () => {
    const onChange = vi.fn();
    render(<StepperField field={field} value={2} onChange={onChange} lang="ru" />);
    expect(screen.getByText("Языки")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Языки: +" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
