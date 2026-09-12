import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { caseFixtures } from "../../mocks/fixtures/cases";
import { theme } from "../../theme";
import { CasePageLayout } from "./CasePageLayout";

function renderLayout(slug: string, sections?: ReactNode) {
  const caseData = caseFixtures.find((caseData) => caseData.slug === slug);
  if (!caseData) {
    throw new Error(`Кейс не найден в фикстурах: ${slug}`);
  }
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <CasePageLayout case={caseData} sections={sections} />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("CasePageLayout", () => {
  it("чистый шаблон: hero, результат, релевантные ссылки и CTA", () => {
    renderLayout("reputation-monitoring-platform");

    expect(screen.getByRole("heading", { name: "Часовой", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ключевые показатели" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Решения из кейса" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Задействованные услуги" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Обсудить задачу" })).toHaveLength(2);
  });

  it("слот sections встраивается между результатом и релевантными ссылками и не отключает базовый состав", () => {
    renderLayout("reputation-monitoring-platform", <div>custom-section</div>);
    const custom = screen.getByText("custom-section");
    expect(custom).toBeInTheDocument();
    const results = screen.getByRole("heading", { name: "Ключевые показатели" });
    const relevants = screen.getByRole("heading", { name: "Решения из кейса" });
    expect(
      results.compareDocumentPosition(custom) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeGreaterThan(0);
    expect(
      custom.compareDocumentPosition(relevants) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeGreaterThan(0);

    expect(screen.getByRole("heading", { name: "Часовой", level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Обсудить задачу" })).toHaveLength(2);
  });
});
