import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { DeliverableItem } from "@/shared/types/content";
import { DeliverablesBlock } from "./DeliverablesBlock";

describe("DeliverablesBlock", () => {
  const t = createT("ru", astroDicts);
  const items: DeliverableItem[] = [
    {
      title: "services.ai-erp-integration.deliverables.0.title",
      text: "services.ai-erp-integration.deliverables.0.text",
    },
    {
      title: "services.ai-erp-integration.deliverables.1.title",
      text: "services.ai-erp-integration.deliverables.1.text",
    },
  ];

  it("рендерит имя и пояснение каждого пункта поставки", () => {
    render(<DeliverablesBlock lang={"ru"} items={items} />);
    for (const item of items) {
      expect(screen.getByText(t(item.title))).toBeInTheDocument();
      expect(screen.getByText(t(item.text))).toBeInTheDocument();
    }
  });

  it("даёт каждому пункту иконку-компонент", () => {
    const { container } = render(<DeliverablesBlock lang={"ru"} items={items} />);
    expect(container.querySelectorAll("svg")).toHaveLength(items.length);
  });

  it("пустой список — ничего не рендерит (null)", () => {
    const { container } = render(<DeliverablesBlock lang={"ru"} items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
