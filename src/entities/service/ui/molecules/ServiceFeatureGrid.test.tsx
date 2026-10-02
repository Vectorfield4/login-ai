import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceFeatureGrid } from "./ServiceFeatureGrid";

const features = [
  {
    title: "services.software-development.features.0.title",
    text: "services.software-development.features.0.text",
  },
];

describe("ServiceFeatureGrid", () => {
  it("переводит заголовок блока и карточки преимуществ", () => {
    render(
      <ServiceFeatureGrid titleKey="home.servicesBenefitsTitle" features={features} lang="ru" />,
    );
    expect(
      screen.getByRole("heading", { level: 4, name: "Ключевые преимущества" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Полный цикл разработки")).toBeInTheDocument();
  });

  it("без преимуществ ничего не рендерит", () => {
    const { container } = render(
      <ServiceFeatureGrid titleKey="home.servicesBenefitsTitle" features={[]} lang="ru" />,
    );
    expect(container.firstChild).toBeNull();
  });
});
