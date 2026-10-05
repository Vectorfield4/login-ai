import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { TradeoffItem } from "@/shared/types/content";
import { TradeoffsBlock } from "./TradeoffsBlock";

describe("TradeoffsBlock", () => {
  const t = createT("ru", astroDicts);
  const items: TradeoffItem[] = [
    {
      title: "services.computer-vision-systems.tradeoffs.0.title",
      text: "services.computer-vision-systems.tradeoffs.0.text",
    },
    {
      title: "services.computer-vision-systems.tradeoffs.1.title",
      text: "services.computer-vision-systems.tradeoffs.1.text",
    },
  ];

  it("рендерит имя и объяснение каждого ограничения", () => {
    render(<TradeoffsBlock lang={"ru"} items={items} />);
    for (const item of items) {
      expect(screen.getByText(t(item.title))).toBeInTheDocument();
      expect(screen.getByText(t(item.text))).toBeInTheDocument();
    }
  });

  it("нумерует строки реестра от 01", () => {
    render(<TradeoffsBlock lang={"ru"} items={items} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("пустой список — ничего не рендерит (null)", () => {
    const { container } = render(<TradeoffsBlock lang={"ru"} items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
