import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { TechGroup } from "../../model/services";
import { TechStackSection } from "./TechStackSection";

const SUBTITLE = "services.software-development.techStack.0.subtitle";

function group(): TechGroup {
  return {
    subtitle: SUBTITLE,
    description: "services.software-development.techStack.0.description",
    technologies: [
      {
        id: "react",
        name: "React",
        glossary: "services.software-development.techStack.0.technologies.1.glossary",
      },
    ],
  };
}

describe("TechStackSection", () => {
  it("переводит заголовки по lang, а не по пропу t", () => {
    // Страница гидрирует этот блок, а функция в пропах острова не
    // сериализуется: на клиенте она приходит как null и блок исчезает.
    const ru = createT("ru", astroDicts);
    const { unmount } = render(<TechStackSection groups={[group()]} lang="ru" />);
    expect(screen.getByRole("heading", { name: ru(SUBTITLE) })).toBeInTheDocument();
    unmount();

    render(<TechStackSection groups={[group()]} lang="en" />);
    expect(
      screen.getByRole("heading", { name: "Web apps and high-load SaaS" }),
    ).toBeInTheDocument();
  });

  it("рисует блок с группами и контактный Alert", () => {
    render(<TechStackSection groups={[group()]} lang="ru" />);
    expect(screen.getByRole("button", { name: "React" })).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Заинтересовала услуга?");
  });
});
