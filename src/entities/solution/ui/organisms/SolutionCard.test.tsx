import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Solution } from "@/entities/solution/model/solutions";
import { SolutionCard } from "@/entities/solution/ui/organisms/SolutionCard";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

describe("SolutionCard", () => {
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

  it("рендерит ссылку на детальную страницу", () => {
    render(<SolutionCard solution={solution({ slug: "agentic-systems" })} t={t} lang="ru" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/ru/solutions/agentic-systems");
  });

  it("рендерит обложку, только если у решения задан image", () => {
    const { rerender, container } = render(
      <SolutionCard
        solution={solution({ slug: "agentic-systems", image: "/assets/agentic-systems.svg" })}
        t={t}
        lang="ru"
      />,
    );
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "/assets/agentic-systems.svg");

    rerender(<SolutionCard solution={solution({ slug: "agentic-systems" })} t={t} lang="ru" />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("обложка декоративная: пустой alt", () => {
    const { container } = render(
      <SolutionCard
        solution={solution({ slug: "agentic-systems", image: "/assets/agentic-systems.svg" })}
        t={t}
        lang="ru"
      />,
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
  });
});
