import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { services } from "@/entities/service";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { ServiceTabsSection } from "./ServiceTabsSection";

const t = createT("ru", astroDicts);

describe("ServiceTabsSection", () => {
  it("рендерит заголовок секции, табы и первую услугу", () => {
    render(<ServiceTabsSection services={services} lang="ru" />);

    expect(screen.getByRole("heading", { level: 2, name: "Услуги" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: t(services[0].title) }),
    ).toBeInTheDocument();
    const tabs = screen.getByRole("navigation", { name: t("home.servicesTitle") });
    expect(within(tabs).getAllByRole("button")).toHaveLength(services.length);
  });

  it("переключает правую панель по клику на таб", () => {
    render(<ServiceTabsSection services={services} lang="ru" />);

    fireEvent.click(screen.getByRole("button", { name: t(services[1].navTitle) }));

    expect(
      screen.getByRole("heading", { level: 3, name: t(services[1].title) }),
    ).toBeInTheDocument();
  });

  it("без услуг ничего не рендерит", () => {
    const { container } = render(<ServiceTabsSection services={[]} lang="ru" />);
    expect(container.firstChild).toBeNull();
  });
});
