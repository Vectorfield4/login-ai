import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = [
  { value: "standard", label: "Стандарт" },
  { value: "extended", label: "Расширенное" },
];

describe("SegmentedControl", () => {
  it("рендерит опции и отмечает выбранную", () => {
    render(
      <SegmentedControl options={OPTIONS} value="extended" onChange={() => {}} label="Ревью" />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Расширенное" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Стандарт" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("отдаёт выбранное значение", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl options={OPTIONS} value="standard" onChange={onChange} label="Ревью" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Расширенное" }));
    expect(onChange).toHaveBeenCalledWith("extended");
  });
});
