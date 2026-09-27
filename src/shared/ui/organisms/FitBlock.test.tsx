import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { FitItem } from "@/shared/types/content";
import { FitBlock } from "./FitBlock";

const t = createT("ru", astroDicts);

// Намеренно смешанный порядок: блок обязан разложить пункты по колонкам сам.
const items: FitItem[] = [
  {
    title: "solutions.agentic-systems.fitItems.0.title",
    text: "solutions.agentic-systems.fitItems.0.text",
    positive: false,
  },
  {
    title: "solutions.agentic-systems.fitItems.1.title",
    text: "solutions.agentic-systems.fitItems.1.text",
    positive: true,
  },
  {
    title: "solutions.agentic-systems.fitItems.2.title",
    text: "solutions.agentic-systems.fitItems.2.text",
    positive: true,
  },
];

describe("FitBlock", () => {
  it("делит пункты на две колонки по полю positive, порядок в данных не важен", () => {
    const { container } = render(<FitBlock items={items} t={t} />);
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    const [fits, notFits] = Array.from(lists);
    expect(fits.querySelectorAll("li")).toHaveLength(2);
    expect(notFits.querySelectorAll("li")).toHaveLength(1);
    expect(notFits.querySelector("li")).not.toBeNull();
    expect(notFits.textContent).toContain(t(items[0].title));
  });

  it("подписывает колонки заголовками из словаря ui", () => {
    render(<FitBlock items={items} t={t} />);
    const [fits, notFits] = screen.getAllByRole("heading", { level: 3 });
    expect(fits.textContent).toBe(t("ui.fitFits"));
    expect(notFits.textContent).toBe(t("ui.fitNot"));
  });

  it("рендерит текст каждого пункта", () => {
    render(<FitBlock items={items} t={t} />);
    for (const item of items) {
      expect(screen.getByText(t(item.title))).toBeTruthy();
      expect(screen.getByText(t(item.text))).toBeTruthy();
    }
  });

  it("колонку без пунктов не рендерит", () => {
    const { container } = render(<FitBlock items={items.filter((item) => item.positive)} t={t} />);
    expect(container.querySelectorAll("ul")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
  });
});
