import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseColumn } from "@/features/relevant-items/ui/organisms/CaseColumn";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

const t = createT("ru", astroDicts);
const ref = { type: "case" as const, slug: "retail-support-bot", noteKey: "note-1" };
const metricValueKey = "cases.retail-support-bot.metrics.0.value";
const metricLabelKey = "cases.retail-support-bot.metrics.0.label";

describe("CaseColumn", () => {
  it("рендерит карточку с заголовком и примечанием", () => {
    const { container } = render(<CaseColumn titleKey="x" refs={[ref]} limit={2} lang="ru" />);
    expect(container.querySelector("h4")?.textContent).toBe(t("cases.retail-support-bot.title"));
    expect(screen.getByText("note-1")).toBeInTheDocument();
  });

  it("выносит метрику в шапку колонки, когда её просят", () => {
    render(<CaseColumn titleKey="x" refs={[ref]} limit={2} showMetric lang="ru" />);
    expect(screen.getByText(t(metricValueKey))).toBeInTheDocument();
    expect(screen.getByText(t(metricLabelKey))).toBeInTheDocument();
  });

  it("без showMetric метрика не показывается", () => {
    render(<CaseColumn titleKey="x" refs={[ref]} limit={2} lang="ru" />);
    expect(screen.queryByText(t(metricValueKey))).not.toBeInTheDocument();
  });

  it("от трёх пунктов рендерит плотные строки без примечаний", () => {
    render(<CaseColumn titleKey="x" refs={[ref, ref, ref]} limit={2} lang="ru" />);
    expect(screen.queryByText("note-1")).not.toBeInTheDocument();
    expect(screen.getAllByText(t("cases.retail-support-bot.title"))).toHaveLength(3);
  });

  it("пустая колонка не рендерится", () => {
    const { container } = render(
      <CaseColumn
        titleKey="x"
        refs={[{ type: "case", slug: "no-such-case" }]}
        limit={2}
        lang="ru"
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});
