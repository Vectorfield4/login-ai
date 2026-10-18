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

  it("addon поднимает расчётную цену и показывает дельту", () => {
    render(<CostCalculator kind="service" slug="content-generation" lang="ru" />);
    expect(screen.queryByText("Включено")).toBeNull();
    expect(screen.getByText("Технологии")).toBeInTheDocument();
    expect(screen.getByText("Дополнительно")).toBeInTheDocument();
    expect(screen.queryByText(/^\+ /)).toBeNull();

    const before = resultValue("Расчётная стоимость");
    fireEvent.click(screen.getByRole("switch", { name: "Видео в поставке" }));
    expect(screen.getByRole("button", { name: "Текст в видео" })).toBeInTheDocument();
    expect(screen.getAllByText(/^\+ /).length).toBeGreaterThan(0);
    expect(resultValue("Расчётная стоимость")).not.toBe(before);
  });

  it("уровни поддержки показывают дельту", () => {
    render(<CostCalculator kind="solution" slug="content-generation" lang="ru" />);
    expect(resultValue("Расчётная стоимость")).toBe("2,22 млн. ₽");
    expect(screen.getByRole("button", { name: "Стандартная" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Приоритетная" }));
    expect(screen.getAllByText(/^\+ /).length).toBeGreaterThan(0);
    expect(resultValue("Расчётная стоимость")).toBe("2,44 млн. ₽");

    fireEvent.click(screen.getByRole("button", { name: "Выделенная" }));
    expect(resultValue("Расчётная стоимость")).toBe("2,67 млн. ₽");
  });

  it("agentic: интеграции — карточки software-type с подсказкой и дельтой", () => {
    render(<CostCalculator kind="solution" slug="agentic-systems" lang="ru" />);
    expect(screen.getByRole("button", { name: /ERP/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /CRM/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Таск-трекер/ })).toBeInTheDocument();

    const info = screen.getByRole("button", { name: /учётные системы/ });
    fireEvent.mouseEnter(info);
    expect(
      screen.getAllByRole("tooltip").find((item) => item.getAttribute("data-state") === "open"),
    ).toHaveTextContent("Агент читает и пишет");

    const before = resultValue("Расчётная стоимость");
    fireEvent.click(screen.getByRole("button", { name: /^ERP/ }));
    expect(resultValue("Расчётная стоимость")).not.toBe(before);
    expect(screen.getAllByText(/^\+ /).length).toBeGreaterThan(0);
  });

  it("agentic: контроль доступов растёт с числом интеграций", () => {
    render(<CostCalculator kind="solution" slug="agentic-systems" lang="ru" />);
    const security = screen.getByRole("switch", {
      name: "Контроль доступов и ограничения действий",
    });
    fireEvent.click(security);
    // Без интеграций остаются только guardrails.
    expect(resultValue("Расчётная стоимость")).toBe("2,15 млн. ₽");

    fireEvent.click(screen.getByRole("button", { name: /^ERP/ }));
    expect(resultValue("Расчётная стоимость")).toBe("3,12 млн. ₽");

    fireEvent.click(screen.getByRole("button", { name: /^CRM/ }));
    expect(resultValue("Расчётная стоимость")).toBe("3,81 млн. ₽");

    const info = screen.getByRole("button", { name: /доступы и действия/ });
    fireEvent.mouseEnter(info);
    expect(
      screen.getAllByRole("tooltip").find((item) => item.getAttribute("data-state") === "open"),
    ).toHaveTextContent("правилами");
  });

  it("agentic: выбранный тариф RAG виден в результате", () => {
    render(<CostCalculator kind="solution" slug="agentic-systems" lang="ru" />);
    expect(resultValue("Расчётная стоимость")).toBe("2 млн. ₽");
    expect(screen.getAllByText("Размер базы знаний")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "1–10 ГБ" }));
    expect(screen.getAllByText("1–10 ГБ").length).toBeGreaterThan(1);
    expect(resultValue("Расчётная стоимость")).toBe("2,3 млн. ₽");
  });

  it("agentic: RAG включён и тарифицируется по размеру базы", () => {
    render(<CostCalculator kind="solution" slug="agentic-systems" lang="ru" />);
    expect(screen.getAllByText("Размер базы знаний")).toHaveLength(2);
    expect(screen.getAllByText("до 1 ГБ").length).toBeGreaterThan(0);
    expect(
      screen.getByText("RAG включён; цена зависит от размера базы знаний."),
    ).toBeInTheDocument();
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
