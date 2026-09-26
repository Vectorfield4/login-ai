import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CaseColumn } from "@/features/relevant-items/ui/organisms/CaseColumn";
import { astroDicts } from "@/shared/i18n/dict";
import { createT, type TFunc } from "@/shared/i18n/t";

const identity = vi.fn((key: string) => key) as unknown as TFunc;
const t = createT("ru", astroDicts);
const ref = { type: "case" as const, slug: "retail-support-bot", noteKey: "note-1" };
const metricValueKey = "cases.retail-support-bot.metrics.0.value";
const metricLabelKey = "cases.retail-support-bot.metrics.0.label";

describe("CaseColumn", () => {
  it("рендерит карточку с заголовком и примечанием", () => {
    const { container } = render(
      <CaseColumn titleKey="x" refs={[ref]} limit={2} t={identity} lang="ru" />,
    );
    expect(container.querySelector("h4")?.textContent).toBe("cases.retail-support-bot.title");
    expect(screen.getByText("note-1")).toBeInTheDocument();
  });

  it("выносит метрику в шапку колонки, когда её просят", () => {
    render(<CaseColumn titleKey="x" refs={[ref]} limit={2} showMetric t={identity} lang="ru" />);
    expect(screen.getByText(metricValueKey)).toBeInTheDocument();
    expect(screen.getByText(metricLabelKey)).toBeInTheDocument();
  });

  it("без showMetric метрика не показывается", () => {
    render(<CaseColumn titleKey="x" refs={[ref]} limit={2} t={identity} lang="ru" />);
    expect(screen.queryByText(metricValueKey)).not.toBeInTheDocument();
  });

  it("не показывает метрику без числового значения", () => {
    // в словарь просочился ключ вместо числа — показывать читателю нечего
    const wordT = ((key: string) =>
      key === metricValueKey ? "без цифр" : key) as unknown as TFunc;
    render(<CaseColumn titleKey="x" refs={[ref]} limit={2} showMetric t={wordT} lang="ru" />);
    expect(screen.queryByText("без цифр")).not.toBeInTheDocument();
  });

  it("от трёх пунктов рендерит плотные строки без примечаний", () => {
    render(<CaseColumn titleKey="x" refs={[ref, ref, ref]} limit={2} t={identity} lang="ru" />);
    expect(screen.queryByText("note-1")).not.toBeInTheDocument();
    expect(screen.getAllByText("cases.retail-support-bot.title")).toHaveLength(3);
  });

  it("пустая колонка не рендерится", () => {
    const { container } = render(
      <CaseColumn
        titleKey="x"
        refs={[{ type: "case", slug: "no-such-case" }]}
        limit={2}
        t={t}
        lang="ru"
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});
