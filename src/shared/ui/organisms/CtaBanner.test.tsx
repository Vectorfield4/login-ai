import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { theme } from "@/shared/config/theme";
import { CtaBanner } from "@/shared/ui/organisms/CtaBanner";

interface BannerProps {
  alt?: boolean;
  eyebrow?: string;
  title: string;
  text: string;
  primaryLabel: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

function renderBanner(props: BannerProps) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <CtaBanner {...props} />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("CtaBanner", () => {
  it("рендерит overline, заголовок, текст и primary-ссылку на /contacts по умолчанию", () => {
    renderBanner({
      eyebrow: "Расчёт",
      title: "Посчитаем за один день",
      text: "Опишите задачу, и мы подготовим смету.",
      primaryLabel: "Получить расчёт",
    });

    expect(screen.getByText("Расчёт")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Посчитаем за один день" })).toBeInTheDocument();
    expect(screen.getByText("Опишите задачу, и мы подготовим смету.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Получить расчёт" })).toHaveAttribute(
      "href",
      "/contacts",
    );
  });

  it("secondary-ссылка рендерится, когда заданы label и to", () => {
    renderBanner({
      title: "t",
      text: "x",
      primaryLabel: "p",
      secondaryLabel: "Смотреть кейсы",
      secondaryTo: "/cases",
    });

    expect(screen.getByRole("link", { name: "Смотреть кейсы" })).toHaveAttribute("href", "/cases");
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("без secondaryLabel второй ссылки нет", () => {
    renderBanner({ title: "t", text: "x", primaryLabel: "p" });

    expect(screen.queryByRole("link", { name: "Смотреть кейсы" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("primaryTo переопределяется", () => {
    renderBanner({ title: "t", text: "x", primaryLabel: "p", primaryTo: "/cases" });

    expect(screen.getByRole("link", { name: "p" })).toHaveAttribute("href", "/cases");
  });
});
