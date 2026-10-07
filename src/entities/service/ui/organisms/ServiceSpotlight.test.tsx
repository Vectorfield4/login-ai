import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { services } from "@/entities/service";
import { ServiceSpotlight } from "./ServiceSpotlight";

describe("ServiceSpotlight", () => {
  it("рендерит заголовок, блоки и обе кнопки", () => {
    render(<ServiceSpotlight service={services[0]} lang="ru" />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Разработка программного обеспечения",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "Ключевые преимущества" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Как мы работаем" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Условия работы" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Подробнее" })).toHaveAttribute(
      "href",
      "/ru/services/software-development",
    );
    expect(screen.getByRole("link", { name: "Заказать" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Читать далее" })).toHaveAttribute(
      "href",
      "/ru/services/software-development",
    );
  });

  it("без картинки отдаёт иконку-фолбэк вместо img", () => {
    const { container } = render(<ServiceSpotlight service={services[0]} lang="ru" />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("рендерит оптимизированный источник, когда он передан", () => {
    const { container } = render(
      <ServiceSpotlight
        service={services[0]}
        lang="ru"
        image={{ src: "/_astro/cover.webp", alt: "Обложка услуги" }}
      />,
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "/_astro/cover.webp");
    expect(img).toHaveAttribute("alt", "Обложка услуги");
    expect(screen.getByRole("link", { name: "Читать далее" })).toHaveAttribute(
      "href",
      "/ru/services/software-development",
    );
  });
});
