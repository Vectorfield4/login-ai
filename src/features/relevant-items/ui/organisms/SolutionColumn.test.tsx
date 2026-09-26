import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SolutionColumn } from "@/features/relevant-items/ui/organisms/SolutionColumn";
import { astroDicts } from "@/shared/i18n/dict";
import { createT, type TFunc } from "@/shared/i18n/t";

const identity = vi.fn((key: string) => key) as unknown as TFunc;
const t = createT("ru", astroDicts);
const ref = { type: "solution" as const, slug: "agentic-systems" };

describe("SolutionColumn", () => {
  it("до двух пунктов рендерит карточки с бейджем и заголовком h4", () => {
    const { container } = render(
      <SolutionColumn titleKey="x" refs={[ref]} limit={2} t={t} lang="ru" />,
    );
    expect(screen.getByText("Решение")).toBeInTheDocument();
    expect(container.querySelector("h4")).not.toBeNull();
    expect(container.querySelector("ol")).toBeNull();
  });

  it("от трёх пунктов рендерит плотные строки", () => {
    render(<SolutionColumn titleKey="x" refs={[ref, ref, ref]} limit={2} t={identity} lang="ru" />);
    expect(screen.queryByText("ui.ecosystem.badge.solution")).not.toBeInTheDocument();
    expect(screen.getAllByText("solutions.agentic-systems.navTitle")).toHaveLength(3);
  });

  it("forceRows держит строки при любом числе пунктов", () => {
    const { container } = render(
      <SolutionColumn titleKey="x" refs={[ref]} limit={2} forceRows t={t} lang="ru" />,
    );
    expect(container.querySelector("h4")).toBeNull();
    expect(screen.queryByText("Решение")).not.toBeInTheDocument();
  });

  it("пустая колонка не рендерится", () => {
    const { container } = render(
      <SolutionColumn titleKey="x" refs={[]} limit={2} t={t} lang="ru" />,
    );
    expect(container.firstChild).toBeNull();
  });
});
