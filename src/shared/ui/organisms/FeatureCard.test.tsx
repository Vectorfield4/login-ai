import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { FeatureCard } from "@/shared/ui/organisms/FeatureCard";

describe("FeatureCard", () => {
  const t = createT("ru", astroDicts);

  it("рендерит заголовок и описание по i18n-ключам", () => {
    const title = "solutions.agentic-systems.features.0.title";
    const text = "solutions.agentic-systems.features.0.text";
    render(<FeatureCard title={title} text={text} t={t} />);
    expect(screen.getByText(t(title))).toBeInTheDocument();
    expect(screen.getByText(t(text))).toBeInTheDocument();
  });
});
