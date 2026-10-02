import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getAllByRole("button")).toHaveLength(services.length);
  });

  it("переключает правую панель по клику на таб", () => {
    render(<ServiceTabsSection services={services} lang="ru" />);

    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(
      screen.getByRole("heading", { level: 3, name: t(services[1].title) }),
    ).toBeInTheDocument();
  });

  it("без услуг ничего не рендерит", () => {
    const { container } = render(<ServiceTabsSection services={[]} lang="ru" />);
    expect(container.firstChild).toBeNull();
  });
});
