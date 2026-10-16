import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CalculatorField } from "@/shared/types/calculator";
import { MultiselectField } from "./MultiselectField";

const field: Extract<CalculatorField, { kind: "multiselect" }> = {
  kind: "multiselect",
  id: "channels",
  label: "calculator.fields.channels",
  options: [
    { value: "blog", label: "calculator.options.blog" },
    { value: "social", label: "calculator.options.social" },
  ],
  default: ["blog"],
};

describe("MultiselectField", () => {
  it("переводит чипы и добавляет выбор", () => {
    const onChange = vi.fn();
    render(<MultiselectField field={field} value={["blog"]} onChange={onChange} lang="ru" />);
    expect(screen.getByText("Каналы в поставке")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Соцсети" }));
    expect(onChange).toHaveBeenCalledWith(["blog", "social"]);
  });

  it("снимает уже выбранный чип", () => {
    const onChange = vi.fn();
    render(
      <MultiselectField field={field} value={["blog", "social"]} onChange={onChange} lang="ru" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Блог" }));
    expect(onChange).toHaveBeenCalledWith(["social"]);
  });
});
