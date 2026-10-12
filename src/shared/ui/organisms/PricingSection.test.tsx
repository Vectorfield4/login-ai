import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { PricePackage } from "@/shared/types/content";
import { PricingSection } from "./PricingSection";

describe("PricingSection", () => {
  const t = createT("ru", astroDicts);

  it("без цены и пакетов ничего не рендерит", () => {
    const { container } = render(<PricingSection lang="ru" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("рендерит порог, единицу и подпись", () => {
    const { container } = render(
      <PricingSection lang="ru" price={{ amount: 900000, unit: "project" }} />,
    );
    const text = container.textContent ?? "";
    expect(text).toContain(t("pricing.title"));
    expect(text).toContain(t("pricing.units.project"));
    expect(text).toContain(t("pricing.note"));
    expect(text).toMatch(/900[\s\u00A0,.]?000/);
    expect(text).toContain("₽");
  });

  it("рендерит пакеты решения и «от» на платформе", () => {
    const packages: PricePackage[] = [
      { name: "pricing.packages.pilot", amount: 350000 },
      { name: "pricing.packages.implementation", amount: 900000, from: true },
      { name: "pricing.packages.platform", amount: 1800000, from: true },
    ];
    render(
      <PricingSection lang="ru" price={{ amount: 900000, unit: "project" }} packages={packages} />,
    );
    for (const pkg of packages) {
      expect(screen.getByText(t(pkg.name))).toBeInTheDocument();
    }
    expect(screen.getAllByText(t("pricing.packages.platform"))).toHaveLength(1);
  });

  it("EN-локаль ставит знак ₽ перед суммой", () => {
    const { container } = render(
      <PricingSection lang="en" price={{ amount: 1500000, unit: "project" }} />,
    );
    expect(container.textContent ?? "").toContain("₽1,500,000");
  });
});
