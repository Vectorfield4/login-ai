import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { Solution } from "../data/solutions";
import { getSolution } from "../data/solutions";
import { theme } from "../theme";
import { SolutionCard } from "./SolutionCard";

function renderCard(solution: Solution) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <SolutionCard solution={solution} />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

function solutionFor(slug: string): Solution {
  const solution = getSolution(slug);
  if (!solution) {
    throw new Error(`solution ${slug} not found`);
  }
  return solution;
}

/**
 * Минимальное решение без обложки: у всех реальных решений в solutions.ts
 * теперь есть image, поэтому условная ветка проверяется на объекте,
 * сконструированном без поля image (тип Solution допускает его отсутствие).
 */
const solutionWithoutImage: Solution = {
  slug: "no-image",
  navTitle: "solutions.agentic-systems.navTitle",
  title: "solutions.agentic-systems.title",
  tagline: "solutions.agentic-systems.tagline",
  description: "solutions.agentic-systems.description",
  audiences: [],
  tags: [],
};

describe("SolutionCard", () => {
  it("ссылается на страницу решения и показывает название и теглайн", () => {
    renderCard(solutionFor("agentic-systems"));
    // Карточка — ссылка на /solutions/<slug>; имя — заголовок решения.
    const link = screen.getByRole("link", { name: /агентные системы/i });
    expect(link).toHaveAttribute("href", "/solutions/agentic-systems");
  });

  it("рендерит обложку, только если у решения задан image", () => {
    // У реальных решений image задан (см. src/data/solutions.test.ts),
    // поэтому ветку «без обложки» проверяем на объекте без поля image.
    const withImage = renderCard(solutionFor("computer-vision"));
    expect(withImage.container.querySelector("img")).not.toBeNull();

    const withoutImage = renderCard(solutionWithoutImage);
    expect(withoutImage.container.querySelector("img")).toBeNull();
  });

  it("обложка декоративная: пустой alt и role=presentation", () => {
    const { container } = renderCard(solutionFor("computer-vision"));
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("role", "presentation");
  });
});
