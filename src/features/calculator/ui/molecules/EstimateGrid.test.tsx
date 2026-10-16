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
  it("рендерит пять метрик с переведёнными подписями", () => {
    render(<EstimateGrid estimate={estimate} lang="ru" />);
    expect(screen.getByText("Разовые работы")).toBeInTheDocument();
    expect(screen.getByText("Стоимость за период")).toBeInTheDocument();
    expect(screen.getByText("Итого за горизонт")).toBeInTheDocument();
    expect(screen.getByText("Цена за единицу")).toBeInTheDocument();
    expect(screen.getByText("Срок работ")).toBeInTheDocument();
  });

  it("форматирует диапазон и срок", () => {
    render(<EstimateGrid estimate={estimate} lang="ru" />);
    expect(screen.getByText(/1[\s\u00A0]000 ₽/)).toBeInTheDocument();
    expect(screen.getByText("200 ₽ – 300 ₽")).toBeInTheDocument();
    expect(screen.getByText("3 нед.")).toBeInTheDocument();
  });
});
