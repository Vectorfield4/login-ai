import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CostCalculator } from "./CostCalculator";

const NBSP = /\u00A0/g;
const clean = (value: string): string => value.replace(NBSP, " ");

/** The value cell under a result label. */
function resultValue(label: string): string {
  const node = screen.getByText(label).parentElement?.lastElementChild?.textContent ?? "";
  return clean(node);
}

describe("CostCalculator", () => {
  it("рендерит числовую смету по умолчанию и читает ru", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="ru" />);
    expect(resultValue("Разовые работы")).toBe("1 200 000 ₽");
    expect(resultValue("Стоимость за период")).toBe("480 000 ₽");
    expect(resultValue("Итого за горизонт")).toBe("6 960 000 ₽");
  });

  it("двигает деньги и срок при изменении полей", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="ru" />);
    const before = resultValue("Итого за горизонт");

    fireEvent.change(screen.getByRole("slider", { name: "Объём материалов в месяц" }), {
      target: { value: "20" },
    });
    expect(resultValue("Стоимость за период")).toBe("800 000 ₽");
    expect(resultValue("Итого за горизонт")).not.toBe(before);

    fireEvent.click(screen.getByRole("button", { name: "Языки: +" }));
    expect(resultValue("Итого за горизонт")).not.toBe(before);
  });

  it("включает bundle и поднимает разовые работы чужой ценой", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="ru" />);
    expect(resultValue("Разовые работы")).toBe("1 200 000 ₽");
    fireEvent.click(screen.getByRole("switch", { name: "Видео в поставке" }));
    expect(resultValue("Разовые работы")).toBe("1 600 000 ₽");
  });

  it("рендерит подписи на en", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="en" />);
    expect(screen.getByText("One-off work")).toBeInTheDocument();
    expect(resultValue("One-off work")).toBe("₽1,200,000");
  });

  it("рендерит калькулятор решения", () => {
    render(<CostCalculator kind="solution" slug="content-generation" lang="ru" />);
    expect(resultValue("Разовые работы")).toBe("1 500 000 ₽");
  });
});
