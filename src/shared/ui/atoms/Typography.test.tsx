import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Typography } from "@/shared/ui/atoms/Typography";

/**
 * Контракт появления заголовков: атом только ставит метку `data-reveal`, а
 * режет заголовок на слова скрипт `app/scripts/revealHeadings.ts` уже в
 * готовом DOM. Поэтому в статике заголовок остаётся обычным текстом.
 */
describe("Typography", () => {
  it("помечает визуальный H1 для появления", () => {
    render(<Typography variant="h1">Login AI</Typography>);

    const heading = screen.getByRole("heading", { level: 1, name: "Login AI" });
    expect(heading).toHaveAttribute("data-reveal");
  });

  it("помечает визуальный H2 для появления", () => {
    render(<Typography variant="h2">Что лежит в основе кейса</Typography>);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("data-reveal");
    expect(heading.textContent).toBe("Что лежит в основе кейса");
  });

  it("помечает по визуальному варианту, а не по тегу", () => {
    // FeatureCard верстает заголовок карточки как h6 внутри h2: по тегу он попал
    // бы в каскад, и сетка карточек замигала бы при прокрутке.
    render(
      <Typography variant="h6" component="h2">
        Фича
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).not.toHaveAttribute("data-reveal");
    expect(heading).toHaveTextContent("Фича");
  });

  it("не трогает текстовые варианты", () => {
    render(<Typography variant="body1">Обычный абзац подзаголовка</Typography>);

    expect(screen.getByText("Обычный абзац подзаголовка")).not.toHaveAttribute("data-reveal");
  });

  it("разделяет уровень заголовка и тег", () => {
    render(
      <Typography variant="h2" component="h1">
        Решение
      </Typography>,
    );

    const heading = screen.getByRole("heading", { level: 1, name: "Решение" });
    expect(heading).toHaveAttribute("data-reveal");
  });

  it("оставляет заголовок обычным текстом в статике", () => {
    render(
      <Typography variant="h1">
        <span>Вложенный</span> узел
      </Typography>,
    );

    // Никаких слов-обёрток: без JS заголовок остаётся читаемым текстом,
    // который и SEO-скрипты, и поиск по странице видят как есть.
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.innerHTML).toBe("<span>Вложенный</span> узел");
  });
});
