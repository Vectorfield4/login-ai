import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { OutcomeItem } from "@/shared/types/content";
import { OutcomesBlock } from "./OutcomesBlock";

describe("OutcomesBlock", () => {
  const t = createT("ru", astroDicts);
  const items: OutcomeItem[] = [
    {
      title: "services.corporate-websites.outcomes.0.title",
      value: "services.corporate-websites.outcomes.0.value",
      text: "services.corporate-websites.outcomes.0.text",
      icon: "rate-review",
    },
    {
      title: "services.corporate-websites.outcomes.1.title",
      value: "services.corporate-websites.outcomes.1.value",
      text: "services.corporate-websites.outcomes.1.text",
      icon: "fact-check",
    },
  ];

  it("рендерит значение, заголовок и текст каждого результата", () => {
    render(<OutcomesBlock lang={"ru"} items={items} />);
    for (const item of items) {
      expect(screen.getByText(t(item.value))).toBeInTheDocument();
      expect(screen.getByText(t(item.title))).toBeInTheDocument();
      expect(screen.getByText(t(item.text))).toBeInTheDocument();
    }
  });

  it("даёт каждому пункту иконку-якорь", () => {
    const { container } = render(<OutcomesBlock lang={"ru"} items={items} />);
    expect(container.querySelectorAll("svg")).toHaveLength(items.length);
  });

  it("пустой список — ничего не рендерит (null)", () => {
    const { container } = render(<OutcomesBlock lang={"ru"} items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
