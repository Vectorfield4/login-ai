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
  it("рендерит одну расчётную цену и срок (ru)", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="ru" />);
    expect(resultValue("Расчётная стоимость")).toBe("6,96 млн. ₽");
    expect(screen.getByText("Срок работ")).toBeInTheDocument();
    // Отдельных «разовых / периодических / единичных» цен больше нет.
    expect(screen.queryByText("Разовые работы")).toBeNull();
    expect(screen.queryByText("Цена за единицу")).toBeNull();
  });

  it("меняет расчётную цену при изменении полей", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="ru" />);
    fireEvent.change(screen.getByRole("slider", { name: "Объём материалов в месяц" }), {
      target: { value: "20" },
    });
    expect(resultValue("Расчётная стоимость")).toBe("10,8 млн. ₽");

    fireEvent.click(screen.getByRole("button", { name: "Языки: +" }));
    expect(resultValue("Расчётная стоимость")).toBe("12,72 млн. ₽");
  });

  it("bundle поднимает расчётную цену", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="ru" />);
    const before = resultValue("Расчётная стоимость");
    fireEvent.click(screen.getByRole("switch", { name: "Видео в поставке" }));
    expect(resultValue("Расчётная стоимость")).not.toBe(before);
    expect(resultValue("Расчётная стоимость")).toBe("7,36 млн. ₽");
  });

  it("рендерит подписи на en", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="en" />);
    expect(screen.getByText("Estimated cost")).toBeInTheDocument();
    expect(resultValue("Estimated cost")).toBe("₽6.96M");
  });

  it("рендерит калькулятор решения", () => {
    render(<CostCalculator kind="solution" slug="content-generation" lang="ru" />);
    expect(resultValue("Расчётная стоимость")).toBe("2,22 млн. ₽");
  });
});
