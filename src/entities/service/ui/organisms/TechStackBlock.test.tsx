import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { TechGroup } from "../../model/services";
import { TechStackBlock } from "./TechStackBlock";

const t = createT("ru", astroDicts);
const SUBTITLE = "services.software-development.techStack.0.subtitle";
const DESCRIPTION = "services.software-development.techStack.0.description";
const GLOSSARY = "services.software-development.techStack.0.technologies.1.glossary";

function group(overrides: Partial<TechGroup> = {}): TechGroup {
  return {
    subtitle: SUBTITLE,
    description: DESCRIPTION,
    technologies: [{ id: "react", name: "React", glossary: GLOSSARY }],
    ...overrides,
  };
}

/** Description paragraph of the single rendered group. */
function descriptionOf(): HTMLElement {
  const paragraph = document.querySelector("p");
  if (!paragraph) throw new Error("абзац описания не найден");
  return paragraph;
}

describe("TechStackBlock", () => {
  it("рендерит подзаголовок группы и текст описания", () => {
    render(<TechStackBlock lang={"ru"} groups={[group()]} />);
    expect(screen.getByRole("heading", { name: t(SUBTITLE) })).toBeInTheDocument();
    expect(descriptionOf()).toHaveTextContent(String(t(DESCRIPTION)).replaceAll(/[[\]]/g, ""));
  });

  it("убирает скобки и подсвечивает термы из описания инверсией", () => {
    render(<TechStackBlock lang={"ru"} groups={[group()]} />);
    expect(String(t(DESCRIPTION))).toContain("[React]");
    expect(screen.getByText("React", { selector: "span" })).toBeInTheDocument();
    expect(descriptionOf().textContent).not.toContain("[");
  });

  it("показывает глоссарий по наведению и прячет его после ухода курсора", () => {
    render(<TechStackBlock lang={"ru"} groups={[group()]} />);
    const chip = screen.getByRole("button", { name: "React" });
    const tooltip = screen.getByRole("tooltip", { name: t(GLOSSARY) });

    expect(tooltip).toHaveAttribute("data-state", "closed");
    fireEvent.mouseEnter(chip);
    expect(tooltip).toHaveAttribute("data-state", "open");
    fireEvent.mouseLeave(chip);
    expect(tooltip).toHaveAttribute("data-state", "closed");
  });

  it("открывает глоссарий с клавиатуры и закрывает по Escape", () => {
    render(<TechStackBlock lang={"ru"} groups={[group()]} />);
    const chip = screen.getByRole("button", { name: "React" });
    const tooltip = screen.getByRole("tooltip", { name: t(GLOSSARY) });

    fireEvent.focusIn(chip);
    expect(tooltip).toHaveAttribute("data-state", "open");
    fireEvent.keyDown(chip, { key: "Escape" });
    expect(tooltip).toHaveAttribute("data-state", "closed");
  });

  it("открывает глоссарий по клику, чтобы он работал и на тач-экранах", () => {
    render(<TechStackBlock lang={"ru"} groups={[group()]} />);
    const chip = screen.getByRole("button", { name: "React" });
    const tooltip = screen.getByRole("tooltip", { name: t(GLOSSARY) });

    fireEvent.click(chip);
    expect(tooltip).toHaveAttribute("data-state", "open");
  });

  it("глоссарий остаётся в HTML и связан с плашкой через aria-describedby", () => {
    render(<TechStackBlock lang={"ru"} groups={[group()]} />);
    const chip = screen.getByRole("button", { name: "React" });
    expect(chip).toHaveAttribute("aria-describedby", screen.getByRole("tooltip").id);
  });
});
