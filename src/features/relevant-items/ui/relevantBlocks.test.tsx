import { ThemeProvider } from "@mui/material";
import { cleanup, render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { casesRu } from "@/entities/case/i18n/cases";
import { servicesRu } from "@/entities/service/i18n/services";
import { solutionsRu } from "@/entities/solution/i18n/solutions";
import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";
import { relevantBlockTitleKeys } from "@/features/relevant-items/model/relevants";
import { CaseServices } from "@/features/relevant-items/ui/CaseServices";
import { CaseSolutions } from "@/features/relevant-items/ui/CaseSolutions";
import { PartOfSolutions } from "@/features/relevant-items/ui/PartOfSolutions";
import { RelatedServices } from "@/features/relevant-items/ui/RelatedServices";
import { RelatedSolutions } from "@/features/relevant-items/ui/RelatedSolutions";
import { ServiceCases } from "@/features/relevant-items/ui/ServiceCases";
import { SimilarCases } from "@/features/relevant-items/ui/SimilarCases";
import { SolutionCases } from "@/features/relevant-items/ui/SolutionCases";
import { SolutionServices } from "@/features/relevant-items/ui/SolutionServices";
import { theme } from "@/shared/config/theme";
import { ru as sharedRu } from "@/shared/i18n/ru";

const ru = { ...sharedRu, ...casesRu, ...servicesRu, ...solutionsRu };

/** Блоки по паре (источник → цель). */
const blocks: Record<
  EntityRefType,
  Record<EntityRefType, ComponentType<{ items: EntityRef[] }>>
> = {
  service: {
    service: RelatedServices as ComponentType<{ items: EntityRef[] }>,
    solution: PartOfSolutions as ComponentType<{ items: EntityRef[] }>,
    case: ServiceCases as ComponentType<{ items: EntityRef[] }>,
  },
  solution: {
    service: SolutionServices as ComponentType<{ items: EntityRef[] }>,
    solution: RelatedSolutions as ComponentType<{ items: EntityRef[] }>,
    case: SolutionCases as ComponentType<{ items: EntityRef[] }>,
  },
  case: {
    service: CaseServices as ComponentType<{ items: EntityRef[] }>,
    solution: CaseSolutions as ComponentType<{ items: EntityRef[] }>,
    case: SimilarCases as ComponentType<{ items: EntityRef[] }>,
  },
};

/** Существующие цели из фикстур + их рендер-заголовки (из словаря). */
const fixtures: Record<EntityRefType, { ref: EntityRef; labelKey: string }> = {
  case: {
    ref: { type: "case", slug: "reputation-monitoring-platform" },
    labelKey: "cases.reputation-monitoring-platform.title",
  },
  solution: {
    ref: { type: "solution", slug: "agentic-systems" },
    labelKey: "solutions.agentic-systems.navTitle",
  },
  service: {
    ref: { type: "service", slug: "software-development" },
    labelKey: "services.software-development.navTitle",
  },
};

function dictValue(key: string): string {
  let node: unknown = ru;
  for (const part of key.split(".")) {
    node = (node as Record<string, unknown>)[part];
  }
  return node as string;
}

function renderBlock(source: EntityRefType, target: EntityRefType) {
  cleanup();
  const Block = blocks[source][target];
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={["/ru"]}>
        <Block items={[fixtures[target].ref]} />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("блоки релевантных связей", () => {
  it("все 9 сочетаний отображают свой заголовок и карточку цели", () => {
    const sources: EntityRefType[] = ["case", "solution", "service"];
    const targets: EntityRefType[] = ["case", "solution", "service"];
    for (const source of sources) {
      for (const target of targets) {
        const heading = dictValue(relevantBlockTitleKeys[source][target]);
        const label = dictValue(fixtures[target].labelKey);

        renderBlock(source, target);

        expect(
          screen.getByRole("heading", { name: heading }),
          `${source} → ${target}`,
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: label }),
          `${source} → ${target}: карточка цели не найдена`,
        ).toHaveAttribute("href", `/ru/${target}s/${fixtures[target].ref.slug}`);
      }
    }
  });

  it("пустой список: блок не рендерится", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/ru"]}>
          <RelatedServices items={[]} />
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
