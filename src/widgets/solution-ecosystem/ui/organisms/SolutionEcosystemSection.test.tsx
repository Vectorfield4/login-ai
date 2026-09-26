import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { SolutionEcosystemSection } from "./SolutionEcosystemSection";

const t = createT("ru", astroDicts);

const relevants = [
  { type: "service" as const, slug: "software-development" },
  { type: "service" as const, slug: "seo-aeo" },
  { type: "solution" as const, slug: "agentic-systems" },
  { type: "case" as const, slug: "retail-support-bot" },
];

describe("SolutionEcosystemSection", () => {
  it("колонка услуг называется «Входящие услуги» и рендерится шаг-листом", () => {
    const { container } = render(
      <SolutionEcosystemSection relevants={relevants} t={t} lang="ru" />,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Входящие услуги" })).toBeInTheDocument();
    expect(container.querySelector("ol")).not.toBeNull();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("порядок колонок: услуги, решения, кейсы", () => {
    render(<SolutionEcosystemSection relevants={relevants} t={t} lang="ru" />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Входящие услуги",
      "Похожие решения",
      "Примеры реализации",
    ]);
  });

  it("без связей секция не рендерится", () => {
    const { container } = render(<SolutionEcosystemSection relevants={[]} t={t} lang="ru" />);
    expect(container.firstChild).toBeNull();
  });
});
