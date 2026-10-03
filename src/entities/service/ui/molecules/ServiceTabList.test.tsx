import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { services } from "@/entities/service";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { ServiceTabList } from "./ServiceTabList";

const t = createT("ru", astroDicts);

describe("ServiceTabList", () => {
  it("рендерит все услуги переведёнными названиями", () => {
    render(
      <ServiceTabList
        services={services}
        activeSlug={services[0].slug}
        onSelect={() => {}}
        lang="ru"
      />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(services.length);
    expect(screen.getByRole("button", { name: /Разработка ПО/ })).toBeInTheDocument();
  });

  it("передаёт слаг выбранной услуги в onSelect", () => {
    const onSelect = vi.fn();
    render(
      <ServiceTabList
        services={services}
        activeSlug={services[0].slug}
        onSelect={onSelect}
        lang="ru"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: t(services[1].navTitle) }));
    expect(onSelect).toHaveBeenCalledWith(services[1].slug);
  });

  it("помечает активный таб через aria-current", () => {
    render(
      <ServiceTabList
        services={services}
        activeSlug={services[1].slug}
        onSelect={() => {}}
        lang="ru"
      />,
    );
    expect(screen.getByRole("button", { name: t(services[1].navTitle) })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });
});
