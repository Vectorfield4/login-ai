import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT, type TFunc } from "@/shared/i18n/t";
import { ServiceEcosystemSection } from "./ServiceEcosystemSection";

const t = createT("ru", astroDicts);
const identity = vi.fn((key: string) => key) as unknown as TFunc;

const relevants = [
  { type: "service" as const, slug: "software-development" },
  { type: "solution" as const, slug: "agentic-systems" },
  { type: "solution" as const, slug: "computer-vision" },
  { type: "solution" as const, slug: "medical-clinics" },
  { type: "case" as const, slug: "retail-support-bot" },
];

describe("ServiceEcosystemSection", () => {
  it("рендерит три колонки с заголовками и подписью региона", () => {
    const { container } = render(<ServiceEcosystemSection relevants={relevants} t={t} lang="ru" />);
    expect(screen.getByRole("heading", { level: 2, name: "Что берут вместе с этой услугой" }));
    expect(container.querySelector("section")?.getAttribute("aria-label")).toBe(
      "Связанные услуги, решения и кейсы",
    );
    const columns = screen.getAllByRole("heading", { level: 3 });
    expect(columns).toHaveLength(3);
  });

  it("решения идут строками: их больше двух", () => {
    const { container } = render(
      <ServiceEcosystemSection relevants={relevants} t={identity} lang="ru" />,
    );
    const rows = container.querySelectorAll("a[href^='/ru/solutions/']");
    expect(rows.length).toBeGreaterThanOrEqual(3);
  });

  it("без связей секция не рендерится", () => {
    const { container } = render(<ServiceEcosystemSection t={t} lang="ru" />);
    expect(container.firstChild).toBeNull();
  });

  it("одна связь оставляет одну колонку", () => {
    render(
      <ServiceEcosystemSection
        relevants={[{ type: "case", slug: "retail-support-bot" }]}
        t={t}
        lang="ru"
      />,
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
  });
});
