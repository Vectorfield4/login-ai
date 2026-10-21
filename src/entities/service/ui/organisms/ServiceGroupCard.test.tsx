import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getServices } from "@/entities/service";
import { ServiceGroupCard } from "./ServiceGroupCard";

const webGrowth = getServices().filter((service) => service.group === "web-growth");

describe("ServiceGroupCard", () => {
  it("ссылается на страницу группы и на её услуги", () => {
    render(<ServiceGroupCard group="web-growth" services={webGrowth} lang="ru" hasPage />);

    expect(screen.getByRole("link", { name: "Веб и рост" })).toHaveAttribute(
      "href",
      "/ru/services/group/web-growth",
    );
    expect(screen.getByRole("link", { name: "Мониторинг информации" })).toHaveAttribute(
      "href",
      "/ru/services/information-monitoring",
    );
  });

  it("без страницы группы показывает название без ссылки", () => {
    render(<ServiceGroupCard group="agentic" services={[]} lang="ru" />);

    expect(screen.queryByRole("link", { name: "Агентные системы" })).toBeNull();
    expect(screen.getByText("Агентные системы")).toBeInTheDocument();
  });
});
