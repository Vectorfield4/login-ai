import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("рендерит дискретный диапазон с текущим значением", () => {
    render(
      <Slider min={4} max={60} step={4} value={12} onChange={() => {}} label="Объём в месяц" />,
    );
    const input = screen.getByRole("slider", { name: "Объём в месяц" });
    expect(input).toHaveAttribute("min", "4");
    expect(input).toHaveAttribute("max", "60");
    expect(input).toHaveAttribute("step", "4");
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("отдаёт новое значение числом", () => {
    const onChange = vi.fn();
    render(<Slider min={4} max={60} step={4} value={12} onChange={onChange} label="Объём" />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "20" } });
    expect(onChange).toHaveBeenCalledWith(20);
  });
});
