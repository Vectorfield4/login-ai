import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Service } from "@/entities/service/model/services";
import { ServiceCard } from "@/entities/service/ui/organisms/ServiceCard";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

describe("ServiceCard", () => {
  const t = createT("ru", astroDicts);

  function service(overrides: Partial<Service> & { slug: string }): Service {
    return {
      navTitle: `services.${overrides.slug}.navTitle`,
      title: `services.${overrides.slug}.title`,
      tagline: `services.${overrides.slug}.tagline`,
      description: `services.${overrides.slug}.description`,
      icon: "code",
      features: [],
      ...overrides,
    };
  }

  it("рендерит ссылку на детальную страницу с заголовком и теглайном", () => {
    render(<ServiceCard service={service({ slug: "web-development" })} t={t} lang="ru" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/ru/services/web-development");
    expect(screen.getByText(String(t(`services.web-development.navTitle`)))).toBeInTheDocument();
    expect(screen.getByText(String(t(`services.web-development.tagline`)))).toBeInTheDocument();
  });

  it("рендерит иконку по строковому ключу из каталога", () => {
    const { container } = render(
      <ServiceCard service={service({ slug: "web-development", icon: "code" })} t={t} lang="ru" />,
    );
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("рендерит фолбэк-иконку для неизвестного ключа", () => {
    const { container } = render(
      <ServiceCard
        service={service({ slug: "web-development", icon: "unknown-key" })}
        t={t}
        lang="ru"
      />,
    );
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
