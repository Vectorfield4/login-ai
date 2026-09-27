import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { FaqBlock } from "./FaqBlock";

const t = createT("ru", astroDicts);

const items = [
  {
    question: "solutions.agentic-systems.faqItems.0.question",
    answer: "solutions.agentic-systems.faqItems.0.answer",
  },
  {
    question: "solutions.agentic-systems.faqItems.1.question",
    answer: "solutions.agentic-systems.faqItems.1.answer",
  },
];

describe("FaqBlock", () => {
  it("рендерит вопрос в summary, ответ — в details", () => {
    const { container } = render(<FaqBlock items={items} t={t} />);
    expect(container.querySelectorAll("details")).toHaveLength(2);
    expect(container.querySelectorAll("summary")).toHaveLength(2);
    for (const item of items) {
      const summary = screen.getByText(t(item.question));
      expect(summary.closest("summary")).not.toBeNull();
      expect(screen.getByText(t(item.answer)).closest("details")).not.toBeNull();
    }
  });

  it("первый вопрос раскрыт, остальные свёрнуты", () => {
    const { container } = render(<FaqBlock items={items} t={t} />);
    const [first, second] = Array.from(container.querySelectorAll("details"));
    expect(first.open).toBe(true);
    expect(second.open).toBe(false);
  });
});
