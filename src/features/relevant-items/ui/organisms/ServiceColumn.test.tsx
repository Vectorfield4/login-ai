import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceColumn } from "@/features/relevant-items/ui/organisms/ServiceColumn";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

const t = createT("ru", astroDicts);
const serviceRef = { type: "service" as const, slug: "software-development" };

describe("ServiceColumn", () => {
  it("рендерит заголовок и нумерованные шаги услуг", () => {
    const { container } = render(
      <ServiceColumn
        titleKey="ui.ecosystem.solution.services"
        refs={[serviceRef]}
        limit={2}
        lang="ru"
      />,
    );
    expect(screen.getByRole("heading", { level: 3, name: t("ui.ecosystem.solution.services") }));
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(container.querySelector("ol")).not.toBeNull();
  });

  it("ссылается на страницу услуги с префиксом языка", () => {
    render(<ServiceColumn titleKey="x" refs={[serviceRef]} limit={2} lang="ru" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/ru/services/software-development");
  });

  it("показывает выход «все услуги», когда пунктов больше лимита строк", () => {
    render(
      <ServiceColumn
        titleKey="x"
        refs={[
          "corporate-ai-training",
          "corporate-websites",
          "information-monitoring",
          "landing-pages",
          "seo-aeo",
        ].map((slug) => ({ type: "service" as const, slug }))}
        limit={2}
        lang="ru"
      />,
    );
    expect(screen.getByText("Все услуги")).toBeInTheDocument();
  });

  it("пустая колонка и неизвестный slug не рендерятся", () => {
    const { container: emptyColumn } = render(
      <ServiceColumn titleKey="x" refs={[]} limit={2} lang="ru" />,
    );
    expect(emptyColumn.firstChild).toBeNull();

    const { container: unknownSlug } = render(
      <ServiceColumn
        titleKey="x"
        refs={[{ type: "service", slug: "no-such-service" }]}
        limit={2}
        lang="ru"
      />,
    );
    expect(unknownSlug.firstChild).toBeNull();
  });
});
