import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseEcosystemSection } from "./CaseEcosystemSection";

const relevants = [
  { type: "service" as const, slug: "software-development" },
  { type: "solution" as const, slug: "agentic-systems" },
  { type: "case" as const, slug: "clinic-ai-assistant" },
];

describe("CaseEcosystemSection", () => {
  it("рендерит три колонки под заголовком секции", () => {
    render(<CaseEcosystemSection relevants={relevants} lang="ru" />);
    expect(screen.getByRole("heading", { level: 2, name: "Что лежит в основе кейса" }));
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Оказанные услуги",
      "Использованные решения",
      "Похожие кейсы",
    ]);
  });

  it("колонка похожих кейсов идёт без метрики в шапке", () => {
    const { container } = render(<CaseEcosystemSection relevants={relevants} lang="ru" />);
    const text = container.textContent ?? "";
    expect(text).not.toContain("−40 %");
  });

  it("без связей секция не рендерится", () => {
    const { container } = render(<CaseEcosystemSection lang="ru" />);
    expect(container.firstChild).toBeNull();
  });
});
