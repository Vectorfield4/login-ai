import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CalculatorField } from "@/shared/types/calculator";
import { ToggleField } from "./ToggleField";

const field: Extract<CalculatorField, { kind: "toggle" }> = {
  kind: "toggle",
  id: "video",
  label: "calculator.fields.video",
  default: false,
};

describe("ToggleField", () => {
  it("переводит подпись и переключает состояние", () => {
    const onChange = vi.fn();
    render(<ToggleField field={field} value={false} onChange={onChange} lang="ru" />);
    expect(screen.getByText("Видео в поставке")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("switch", { name: "Видео в поставке" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
