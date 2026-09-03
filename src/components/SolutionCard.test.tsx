import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { getSolution } from "../data/solutions";
import { theme } from "../theme";
import { SolutionCard } from "./SolutionCard";

function renderCard(slug: string) {
  const solution = getSolution(slug);
  if (!solution) {
    throw new Error(`solution ${slug} not found`);
  }
  const utils = render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <SolutionCard solution={solution} />
      </MemoryRouter>
    </ThemeProvider>,
  );
  return { ...utils, solution };
}

describe("SolutionCard", () => {
  it("ссылается на страницу решения и показывает название и теглайн", () => {
    renderCard("agentic-systems");
    // Карточка — ссылка на /solutions/<slug>; имя — заголовок решения.
    const link = screen.getByRole("link", { name: /агентные системы/i });
    expect(link).toHaveAttribute("href", "/solutions/agentic-systems");
  });

  it("рендерит обложку, только если у решения задан image", () => {
    // computer-vision — image задан; медицинские клиники — image нет.
    const withImage = renderCard("computer-vision");
    expect(withImage.container.querySelector("img")).not.toBeNull();

    const withoutImage = renderCard("medical-clinics");
    expect(withoutImage.container.querySelector("img")).toBeNull();
  });

  it("обложка декоративная: пустой alt и role=presentation", () => {
    const { container } = renderCard("computer-vision");
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("role", "presentation");
  });
});
