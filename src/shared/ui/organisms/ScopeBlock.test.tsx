import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { ScopeItem } from "@/shared/types/content";
import { ScopeBlock } from "./ScopeBlock";

describe("ScopeBlock", () => {
  const t = createT("ru", astroDicts);
  const items: ScopeItem[] = [
    {
      title: "services.ai-security-audit.scope.0.title",
      text: "services.ai-security-audit.scope.0.text",
    },
    { title: "services.ai-security-audit.scope.1.title" },
  ];

  it("рендерит пункт с пояснением и пункт без пояснения", () => {
    render(<ScopeBlock lang={"ru"} items={items} />);
    expect(screen.getByText(t("services.ai-security-audit.scope.0.title"))).toBeInTheDocument();
    expect(screen.getByText(t("services.ai-security-audit.scope.0.text"))).toBeInTheDocument();
    expect(screen.getByText(t("services.ai-security-audit.scope.1.title"))).toBeInTheDocument();
  });

  it("проставляет position каждому пункту ItemList", () => {
    const { container } = render(<ScopeBlock lang={"ru"} items={items} />);
    const positions = [...container.querySelectorAll('meta[itemprop="position"]')].map((meta) =>
      meta.getAttribute("content"),
    );
    expect(positions).toEqual(["1", "2"]);
    expect(container.querySelectorAll('[itemprop="itemListElement"]')).toHaveLength(items.length);
  });

  it("пустой список — ничего не рендерит (null)", () => {
    const { container } = render(<ScopeBlock lang={"ru"} items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
