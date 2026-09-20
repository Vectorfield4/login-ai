import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Solution } from "@/entities/solution/model/solutions";
import { HomeSolutions } from "@/features/home-solutions";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

const t = createT("ru", astroDicts);

function solution(overrides: Partial<Solution> & { slug: string }): Solution {
  return {
    navTitle: `solutions.${overrides.slug}.navTitle`,
    title: `solutions.${overrides.slug}.title`,
    tagline: `solutions.${overrides.slug}.tagline`,
    description: `solutions.${overrides.slug}.description`,
    audiences: ["audiences.manufacturers"],
    tags: ["technologies.agentic"],
    ...overrides,
  };
}

const solutions: Solution[] = [
  solution({
    slug: "agentic-systems",
    audiences: ["audiences.manufacturers"],
    tags: ["technologies.agentic"],
  }),
  solution({
    slug: "medical-clinics",
    audiences: ["audiences.clinics"],
    tags: ["technologies.llm"],
  }),
];

const href = (slug: string) => `/ru/solutions/${slug}`;

function solutionLinks(): string[] {
  return screen
    .queryAllByRole("link")
    .map((el) => el.getAttribute("href") ?? "")
    .filter((value) => value.startsWith("/ru/solutions/"));
}

describe("HomeSolutions", () => {
  it("по умолчанию рендерит все решения", () => {
    render(<HomeSolutions solutions={solutions} lang="ru" />);
    expect(solutionLinks()).toEqual(
      expect.arrayContaining([href("agentic-systems"), href("medical-clinics")]),
    );
  });

  it("фильтрует по аудитории", async () => {
    const user = userEvent.setup();
    render(<HomeSolutions solutions={solutions} lang="ru" />);

    await user.click(screen.getByRole("button", { name: t("audiences.clinics") }));

    expect(solutionLinks()).toEqual([href("medical-clinics")]);
  });

  it("фильтрует по технологии", async () => {
    const user = userEvent.setup();
    render(<HomeSolutions solutions={solutions} lang="ru" />);

    await user.click(screen.getByRole("button", { name: t("technologies.llm") }));

    expect(solutionLinks()).toEqual([href("medical-clinics")]);
  });

  it("пустой результат комбинации фильтров показывает empty-сообщение", async () => {
    const user = userEvent.setup();
    render(<HomeSolutions solutions={solutions} lang="ru" />);

    await user.click(screen.getByRole("button", { name: t("audiences.clinics") }));
    await user.click(screen.getByRole("button", { name: t("technologies.agentic") }));

    expect(screen.getByText(t("home.filters.empty"))).toBeInTheDocument();
    expect(solutionLinks()).toEqual([]);
  });
});
