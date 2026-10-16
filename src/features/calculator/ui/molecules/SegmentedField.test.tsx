import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CalculatorField } from "@/shared/types/calculator";
import { SegmentedField } from "./SegmentedField";

const field: Extract<CalculatorField, { kind: "segmented" }> = {
  kind: "segmented",
  id: "review",
  label: "calculator.fields.review",
  options: [
    { value: "standard", label: "calculator.options.standard" },
    { value: "extended", label: "calculator.options.extended" },
  ],
  default: "standard",
};

describe("SegmentedField", () => {
  it("переводит подпись и опции и отдаёт выбор", () => {
    const onChange = vi.fn();
    render(<SegmentedField field={field} value="standard" onChange={onChange} lang="ru" />);
    expect(screen.getByText("Ревью")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Расширенное" }));
    expect(onChange).toHaveBeenCalledWith("extended");
  });
});
