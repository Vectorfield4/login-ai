import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CalculatorActions } from "./CalculatorActions";

describe("CalculatorActions", () => {
  it("несёт конфигурацию и в mailto, и в ссылку на контакты", () => {
    render(<CalculatorActions config="volume=12" lang="ru" />);
    const mailto = screen.getByRole("link", { name: "Обсудить проект" });
    expect(mailto.getAttribute("href")).toMatch(/^mailto:\?subject=/);
    expect(mailto.getAttribute("href")).toContain("body=volume%3D12");

    expect(screen.getByRole("link", { name: "Задать вопрос" })).toHaveAttribute(
      "href",
      "/ru/contacts?config=volume%3D12",
    );
  });

  it("локализует маршрут на en", () => {
    render(<CalculatorActions config="volume=12" lang="en" />);
    expect(screen.getByRole("link", { name: "Ask a question" })).toHaveAttribute(
      "href",
      "/en/contacts?config=volume%3D12",
    );
  });
});
