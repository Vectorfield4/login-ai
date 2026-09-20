import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { ContentSection } from "@/shared/types/content";
import { SectionsBlock } from "@/shared/ui/organisms/SectionsBlock";

describe("SectionsBlock", () => {
  const t = createT("ru", astroDicts);
  const section: ContentSection = {
    title: "solutions.agentic-systems.sections.0.title",
    items: [
      "solutions.agentic-systems.sections.0.items.0",
      "solutions.agentic-systems.sections.0.items.1",
    ],
  };

  it("рендерит заголовок секции и все пункты", () => {
    render(<SectionsBlock sections={[section]} t={t} />);
    expect(screen.getByText(t(section.title))).toBeInTheDocument();
    for (const item of section.items) {
      expect(screen.getByText(t(item))).toBeInTheDocument();
    }
  });

  it("пустой список — ничего не рендерит (null)", () => {
    const { container } = render(<SectionsBlock sections={[]} t={t} />);
    expect(container).toBeEmptyDOMElement();
  });
});
