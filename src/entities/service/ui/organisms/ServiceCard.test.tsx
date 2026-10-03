import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { Service } from "../../model/services";
import { ServiceCard } from "./ServiceCard";

describe("ServiceCard", () => {
  const t = createT("ru", astroDicts);

  function service(overrides: Partial<Service> & { slug: string }): Service {
    return {
      navTitle: `services.${overrides.slug}.navTitle`,
      title: `services.${overrides.slug}.title`,
      tagline: `services.${overrides.slug}.tagline`,
      description: `services.${overrides.slug}.description`,
      icon: "code",
      group: "engineering",
      features: [],
      ...overrides,
    };
  }

  it("рендерит ссылку на детальную страницу с заголовком и теглайном", () => {
    render(<ServiceCard service={service({ slug: "web-development" })} lang="ru" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/ru/services/web-development");
    expect(screen.getByText(String(t(`services.web-development.navTitle`)))).toBeInTheDocument();
    expect(screen.getByText(String(t(`services.web-development.tagline`)))).toBeInTheDocument();
  });

  it("рендерит иконку по строковому ключу из каталога", () => {
    const { container } = render(
      <ServiceCard service={service({ slug: "web-development", icon: "code" })} lang="ru" />,
    );
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("рендерит фолбэк-иконку для неизвестного ключа", () => {
    const { container } = render(
      <ServiceCard service={service({ slug: "web-development", icon: "unknown-key" })} lang="ru" />,
    );
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
