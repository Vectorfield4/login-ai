import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CalculatorField } from "@/shared/types/calculator";
import { SliderField } from "./SliderField";

const field: Extract<CalculatorField, { kind: "slider" }> = {
  kind: "slider",
  id: "volume",
  label: "calculator.fields.volume",
  min: 4,
  max: 60,
  step: 4,
  default: 12,
};

describe("SliderField", () => {
  it("переводит подпись и отдаёт значение числом", () => {
    const onChange = vi.fn();
    render(<SliderField field={field} value={12} onChange={onChange} lang="ru" />);
    expect(screen.getByText("Объём материалов в месяц")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("slider"), { target: { value: "20" } });
    expect(onChange).toHaveBeenCalledWith(20);
  });
});
