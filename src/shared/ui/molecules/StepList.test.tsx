import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { LucideIcon } from "@/shared/data/iconCatalog";
import { astroDicts } from "@/shared/i18n/dict";
import { createT, type TFunc } from "@/shared/i18n/t";
import type { StepListItem } from "@/shared/types/content";
import { StepList } from "@/shared/ui/molecules";

const t = createT("ru", astroDicts);
const identity = vi.fn((key: string) => key) as unknown as TFunc;

function makeSteps(count: number): StepListItem[] {
  return Array.from({ length: count }, (_, i) => ({
    title: `title-${i}`,
    text: `text-${i}`,
    href: `/solutions/solution-${i}`,
    icon: "code",
  }));
}

describe("StepList", () => {
  it("нумерует шаги с 01 и соединяет соседние пунктиром", () => {
    const { container } = render(<StepList items={makeSteps(3)} t={identity} lang="ru" />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(container.querySelectorAll("li")).toHaveLength(3);
    expect(container.querySelectorAll("[data-connector]")).toHaveLength(2);
  });

  it("рендерит каждый шаг ссылкой с заголовком, текстом и иконкой", () => {
    const { container } = render(<StepList items={makeSteps(2)} t={identity} lang="ru" />);
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/ru/solutions/solution-0");
    expect(links[0].querySelector("h4")?.textContent).toBe("title-0");
    expect(links[0].querySelector("p")?.textContent).toBe("text-0");
    expect(links[0].querySelector("svg")).not.toBeNull();
  });

  it("переводит заголовок и текст шага через t", () => {
    render(
      <StepList items={[{ title: "a", text: "b", href: "/x", icon: "code" }]} t={t} lang="ru" />,
    );
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
  });

  it("принимает готовый lucide-компонент вместо ключа каталога", () => {
    const CustomIcon = (() => <span data-icon="custom" />) as unknown as LucideIcon;
    const { container } = render(
      <StepList
        items={[{ title: "a", text: "b", href: "/x", icon: CustomIcon }]}
        t={identity}
        lang="en"
      />,
    );
    expect(container.querySelector("[data-icon='custom']")).not.toBeNull();
    expect(container.querySelector("svg")).toBeNull();
  });

  it("резолвит строковый ключ иконки через каталог сущностей", () => {
    const { container } = render(
      <StepList
        items={[{ title: "a", text: "b", href: "/x", icon: "code" }]}
        t={identity}
        lang="ru"
      />,
    );
    expect(container.querySelector("svg.lucide-code-xml")).not.toBeNull();
  });

  it("не рендерит бейдж и контейнер карточки", () => {
    const { container } = render(<StepList items={makeSteps(1)} t={identity} lang="ru" />);
    expect(container.querySelector("div")).toBeNull();
  });

  it("возвращает null для пустого списка", () => {
    const { container } = render(<StepList items={[]} t={identity} lang="ru" />);
    expect(container.firstChild).toBeNull();
  });
});
