import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  it("увеличивает и уменьшает значение", () => {
    const onChange = vi.fn();
    render(<Stepper min={1} max={5} value={3} onChange={onChange} label="Языки" />);
    fireEvent.click(screen.getByRole("button", { name: "Языки: +" }));
    expect(onChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByRole("button", { name: "Языки: −" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("не выходит за границы", () => {
    const onChange = vi.fn();
    render(<Stepper min={1} max={5} value={5} onChange={onChange} label="Языки" />);
    fireEvent.click(screen.getByRole("button", { name: "Языки: +" }));
    expect(onChange).toHaveBeenCalledWith(5);
  });
});
