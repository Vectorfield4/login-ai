import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { MechanismSection, type MechanismViewItem } from "./MechanismSection";

describe("MechanismSection", () => {
  const t = createT("ru", astroDicts);
  const items: MechanismViewItem[] = [
    {
      title: "services.deterministic-rag-systems.mechanism.0.title",
      text: "services.deterministic-rag-systems.mechanism.0.text",
      image: { light: "/diagrams/a.svg", dark: "/diagrams/a.dark.svg" },
    },
    {
      title: "services.deterministic-rag-systems.mechanism.2.title",
      text: "services.deterministic-rag-systems.mechanism.2.text",
    },
  ];

  it("нумерует этапы и переводит заголовок, объяснение и диаграмму", () => {
    const { container } = render(
      <MechanismSection
        lang={"ru"}
        eyebrow="servicePage.mechanismEyebrow"
        title="servicePage.mechanismTitle"
        items={items}
      />,
    );
    expect(screen.getByText(t(items[0].title))).toBeInTheDocument();
    expect(screen.getByText(t(items[0].text))).toBeInTheDocument();
    expect(screen.getByText(t(items[1].title))).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: t(items[0].title) })).toBeInTheDocument();
    expect(container.querySelectorAll("figure img")).toHaveLength(2);
  });

  it("пустой список — ничего не рендерит (null)", () => {
    const { container } = render(<MechanismSection lang={"ru"} items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
