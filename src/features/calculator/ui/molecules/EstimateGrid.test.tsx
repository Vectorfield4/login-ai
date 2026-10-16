import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Estimate } from "../../model/types";
import { EstimateGrid } from "./EstimateGrid";

const estimate: Estimate = {
  setup: { low: 1000, high: 1000 },
  runPerPeriod: { low: 200, high: 300 },
  firstPeriod: { low: 3400, high: 4600 },
  unitCost: { low: 100, high: 100 },
  timelineWeeks: { low: 3, high: 3 },
};

describe("EstimateGrid", () => {
  it("рендерит одну расчётную цену и один срок", () => {
    render(<EstimateGrid estimate={estimate} lang="ru" />);
    expect(screen.getByText("Расчётная стоимость")).toBeInTheDocument();
    expect(screen.getByText("Срок работ")).toBeInTheDocument();
    // Разбивки на разовые/периодические/единичные цены больше нет.
    expect(screen.queryByText("Разовые работы")).toBeNull();
    expect(screen.queryByText("Стоимость за период")).toBeNull();
    expect(screen.queryByText("Цена за единицу")).toBeNull();
  });

  it("форматирует диапазон цены и срок", () => {
    render(<EstimateGrid estimate={estimate} lang="ru" />);
    expect(screen.getByText(/3[\s\u00A0]400 ₽ – 4[\s\u00A0]600 ₽/)).toBeInTheDocument();
    expect(screen.getByText("3 нед.")).toBeInTheDocument();
  });
});
