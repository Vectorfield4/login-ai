import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("отражает состояние и переключается", () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} label="Видео" />);
    const toggle = screen.getByRole("switch", { name: "Видео" });
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("выключение отдаёт false", () => {
    const onChange = vi.fn();
    render(<Switch checked onChange={onChange} label="Видео" />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
