import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useT } from "@/shared/hooks/useT";
import { astroDicts } from "@/shared/i18n/dict";
import { createT, type TFunc } from "@/shared/i18n/t";
import type { ResolvedItem } from "../../model/ecosystem.types";
import {
  ALL_LINKS,
  COLUMN_MATRIX,
  columnLimit,
  isCompactColumn,
  resolveItemsByType,
} from "../../model/ecosystem.types";
import { CaseCardEco } from "../atoms/CaseCardEco";
import { CompactRowEco } from "../atoms/CompactRowEco";
import { ServiceCardEco } from "../atoms/ServiceCardEco";
import { SolutionCardEco } from "../atoms/SolutionCardEco";
import { EcosystemColumn } from "../molecules/EcosystemColumn";
import { EcosystemSection } from "./EcosystemSection";

const mockT: TFunc = vi.fn((key: string) => key) as unknown as TFunc;
const mockLang = "ru" as const;

vi.mock("@/shared/hooks/useT", () => ({
  useT: vi.fn(() => mockT),
}));
vi.mocked(useT).mockReturnValue(mockT);

const mockGrouped = {
  service: [{ type: "service" as const, slug: "software-development", noteKey: "note1" }],
  solution: [{ type: "solution" as const, slug: "agentic-systems", noteKey: "note2" }],
  case: [{ type: "case" as const, slug: "retail-support-bot", noteKey: "note3" }],
};

const mockResolvedItems: Record<string, ResolvedItem[]> = {
  service: [
    {
      type: "service",
      slug: "software-development",
      titleKey: "services.software-development.navTitle",
      href: "/services/software-development",
      noteKey: "note1",
    },
  ],
  solution: [
    {
      type: "solution",
      slug: "agentic-systems",
      titleKey: "solutions.agentic-systems.navTitle",
      href: "/solutions/agentic-systems",
      noteKey: "note2",
    },
  ],
  case: [
    {
      type: "case",
      slug: "retail-support-bot",
      titleKey: "cases.retail-support-bot.title",
      href: "/cases/retail-support-bot",
      noteKey: "note3",
      primaryMetric: { valueKey: "metric.value", labelKey: "metric.label" },
    },
  ],
};

vi.mock("@/shared/data/entities", () => ({
  getServiceBySlug: vi.fn((slug: string) => ({
    slug,
    navTitle: `services.${slug}.navTitle`,
    tagline: `services.${slug}.tagline`,
    icon: "code",
  })),
  getSolutionBySlug: vi.fn((slug: string) => ({
    slug,
    navTitle: `solutions.${slug}.navTitle`,
    tagline: `solutions.${slug}.tagline`,
  })),
  getCaseBySlug: vi.fn((slug: string) => ({
    slug,
    title: `cases.${slug}.title`,
    tagline: `cases.${slug}.tagline`,
    metrics: [{ value: "metric.value", label: "metric.label" }],
  })),
}));

vi.mock("@/shared/data/iconCatalog", () => ({
  resolveEntityIcon: vi.fn(() => vi.fn(() => null)),
}));

vi.mock("@/shared/data/routes", () => ({
  routeUrl: vi.fn((path: string, lang: string) => `/${lang}${path}`),
}));

function makeSolutions(count: number): ResolvedItem[] {
  return Array.from({ length: count }, (_, i) => ({
    type: "solution" as const,
    slug: `solution-${i}`,
    titleKey: `solutions.solution-${i}.navTitle`,
    href: `/solutions/solution-${i}`,
    noteKey: `note-${i}`,
  }));
}

function makeCases(count: number): ResolvedItem[] {
  return Array.from({ length: count }, (_, i) => ({
    type: "case" as const,
    slug: `case-${i}`,
    titleKey: `cases.case-${i}.title`,
    href: `/cases/case-${i}`,
    noteKey: `note-${i}`,
    primaryMetric: { valueKey: `metric.${i}.value`, labelKey: `metric.${i}.label` },
  }));
}

/** Перевод, отдающий «настоящие» значения метрик (у mockT в значении нет цифр). */
const metricsT: TFunc = vi.fn((key: string) => {
  if (key === "metric.value") return "−90 %";
  if (key === "metric.label") return "Пропущенный брак";
  return key;
}) as unknown as TFunc;

describe("EcosystemSection Widget", () => {
  describe("COLUMN_MATRIX", () => {
    it("has correct structure for all page types", () => {
      expect(COLUMN_MATRIX.service).toHaveLength(3);
      expect(COLUMN_MATRIX.solution).toHaveLength(3);
      expect(COLUMN_MATRIX.case).toHaveLength(3);
    });

    it("service page has correct column configs", () => {
      const [col1, col2, col3] = COLUMN_MATRIX.service;
      expect(col1.targetType).toBe("service");
      expect(col1.maxCards).toBe(2);
      expect(col2.targetType).toBe("solution");
      expect(col2.maxCards).toBe(5);
      expect(col2.forceCompact).toBe(true);
      expect(col3.targetType).toBe("case");
      expect(col3.maxCards).toBe(2);
      expect(col3.showMetric).toBe(true);
    });

    it("solution page has correct column configs", () => {
      const [col1, col2, col3] = COLUMN_MATRIX.solution;
      expect(col1.targetType).toBe("service");
      expect(col2.targetType).toBe("solution");
      expect(col3.targetType).toBe("case");
      expect(col3.showMetric).toBe(true);
    });

    it("case page has correct column configs", () => {
      const [col1, col2, col3] = COLUMN_MATRIX.case;
      expect(col1.targetType).toBe("service");
      expect(col2.targetType).toBe("solution");
      expect(col3.targetType).toBe("case");
      expect(col3.showMetric).toBe(false);
    });

    it("все titleKey резолвятся в словаре ru и en", () => {
      const keys = (["service", "solution", "case"] as const).flatMap((pageType) =>
        COLUMN_MATRIX[pageType].map((col) => col.titleKey),
      );
      for (const lang of ["ru", "en"] as const) {
        const t = createT(lang, astroDicts);
        for (const key of keys) {
          expect(t(key), `${lang}: ${key}`).not.toBe(key);
        }
      }
    });

    it("ключи бейджей и ссылок «все …» резолвятся в словаре ru и en", () => {
      const keys = [
        "ui.ecosystem.badge.service",
        "ui.ecosystem.badge.solution",
        ...Object.values(ALL_LINKS).map((link) => link.labelKey),
      ];
      for (const lang of ["ru", "en"] as const) {
        const t = createT(lang, astroDicts);
        for (const key of keys) {
          expect(t(key), `${lang}: ${key}`).not.toBe(key);
        }
      }
    });
  });

  describe("isCompactColumn", () => {
    it("переводит колонку в строки после двух пунктов", () => {
      const config = COLUMN_MATRIX.solution[1];
      expect(isCompactColumn(config, 1)).toBe(false);
      expect(isCompactColumn(config, 2)).toBe(false);
      expect(isCompactColumn(config, 3)).toBe(true);
    });

    it("уважает forceCompact из конфига", () => {
      const config = COLUMN_MATRIX.service[1];
      expect(config.forceCompact).toBe(true);
      expect(isCompactColumn(config, 1)).toBe(true);
    });
  });

  describe("columnLimit", () => {
    it("карточки ограничены maxCards, строки — большим лимитом", () => {
      expect(columnLimit(COLUMN_MATRIX.solution[1], 2)).toBe(2);
      expect(columnLimit(COLUMN_MATRIX.solution[1], 3)).toBeGreaterThanOrEqual(3);
      expect(columnLimit(COLUMN_MATRIX.service[1], 6)).toBeGreaterThanOrEqual(5);
    });
  });

  describe("resolveItemsByType", () => {
    it("resolves service items correctly", () => {
      const result = resolveItemsByType(mockGrouped.service, "service");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("service");
      expect(result[0].slug).toBe("software-development");
      expect(result[0].titleKey).toBe("services.software-development.navTitle");
      expect(result[0].href).toBe("/services/software-development");
    });

    it("resolves solution items correctly", () => {
      const result = resolveItemsByType(mockGrouped.solution, "solution");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("solution");
      expect(result[0].slug).toBe("agentic-systems");
      expect(result[0].titleKey).toBe("solutions.agentic-systems.navTitle");
    });

    it("resolves case items with metrics", () => {
      const result = resolveItemsByType(mockGrouped.case, "case");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("case");
      expect(result[0].primaryMetric).toBeDefined();
      expect(result[0].primaryMetric?.valueKey).toBe("metric.value");
    });

    it("filters out unresolved items", () => {
      const emptyGrouped = { ...mockGrouped, service: [] };
      const result = resolveItemsByType(emptyGrouped.service, "service");
      expect(result).toHaveLength(0);
    });
  });

  describe("EcosystemSection", () => {
    it("renders without crashing", () => {
      const { container } = render(
        <EcosystemSection pageType="service" grouped={mockGrouped} lang={mockLang} />,
      );
      expect(container).toBeInTheDocument();
    });

    it("renders three column sections", () => {
      render(<EcosystemSection pageType="service" grouped={mockGrouped} lang={mockLang} />);
      const sections = screen.getAllByRole("heading", { level: 2 });
      expect(sections.length).toBeGreaterThanOrEqual(3);
    });

    it("помечает секцию для скринридера", () => {
      render(<EcosystemSection pageType="service" grouped={mockGrouped} lang={mockLang} />);
      expect(screen.getByRole("region", { name: "ui.ecosystem.columns" })).toBeInTheDocument();
    });

    it("не рендерит пустые колонки", () => {
      render(
        <EcosystemSection
          pageType="service"
          grouped={{ service: mockGrouped.service, solution: [], case: [] }}
          lang={mockLang}
        />,
      );
      expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    });

    it("returns null when no column has items", () => {
      const { container } = render(
        <EcosystemSection
          pageType="case"
          grouped={{ service: [], solution: [], case: [] }}
          lang={mockLang}
        />,
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with correct props for all page types", () => {
      const { unmount } = render(
        <EcosystemSection pageType="solution" grouped={mockGrouped} lang={mockLang} />,
      );
      expect(() => unmount()).not.toThrow();

      render(<EcosystemSection pageType="case" grouped={mockGrouped} lang={mockLang} />);
      expect(() => unmount()).not.toThrow();
    });
  });

  describe("EcosystemColumn", () => {
    it("renders column with title", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[0]}
          items={mockResolvedItems.service}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("ui.ecosystem.service.relatedServices")).toBeInTheDocument();
    });

    it("renders service cards when items provided", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[0]}
          items={mockResolvedItems.service}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("services.software-development.navTitle")).toBeInTheDocument();
      expect(screen.getByText("services.software-development.tagline")).toBeInTheDocument();
    });

    it("рендерит карточками, пока пунктов не больше двух", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.solution[1]}
          items={makeSolutions(2)}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("solutions.solution-0.tagline")).toBeInTheDocument();
    });

    it("переводит колонку решений в строки от трёх пунктов", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.solution[1]}
          items={makeSolutions(3)}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("solutions.solution-0.navTitle")).toBeInTheDocument();
      expect(screen.getByText("solutions.solution-2.navTitle")).toBeInTheDocument();
      // подписи карточек в плотном режиме не рендерятся
      expect(screen.queryByText("solutions.solution-0.tagline")).toBeNull();
    });

    it("рендерит компактный список решений, когда forceCompact", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[1]}
          items={makeSolutions(5)}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("solutions.solution-0.navTitle")).toBeInTheDocument();
      expect(screen.queryByText("solutions.solution-0.tagline")).toBeNull();
    });

    it("переводит колонку кейсов в строки от трёх пунктов", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[2]}
          items={makeCases(3)}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("cases.case-0.title")).toBeInTheDocument();
      // примечание живёт только в карточке, в строке его нет
      expect(screen.queryByText("note-0")).toBeNull();
    });

    it("показывает ссылку «все …», когда колонка усечена", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[1]}
          items={makeSolutions(6)}
          t={mockT}
          lang={mockLang}
        />,
      );
      const allLink = screen.getByText("ui.menu.allSolutions").closest("a");
      expect(allLink).toHaveAttribute("href", "/ru/solutions");
    });

    it("выносит метрику кейса в шапку колонки", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[2]}
          items={mockResolvedItems.case}
          t={metricsT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("−90 %")).toBeInTheDocument();
      expect(screen.getByText("Пропущенный брак")).toBeInTheDocument();
      expect(screen.getByText("cases.retail-support-bot.title")).toBeInTheDocument();
    });

    it("не показывает метрику без числового значения", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[2]}
          items={mockResolvedItems.case}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.queryByText("metric.value")).toBeNull();
      expect(screen.getByText("cases.retail-support-bot.title")).toBeInTheDocument();
    });

    it("не показывает метрику, когда колонка кейсов её не просит", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.case[2]}
          items={mockResolvedItems.case}
          t={metricsT}
          lang={mockLang}
        />,
      );
      expect(screen.queryByText("−90 %")).toBeNull();
    });

    it("renders case cards", () => {
      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[2]}
          items={mockResolvedItems.case}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("cases.retail-support-bot.title")).toBeInTheDocument();
    });

    it("returns null when no items", () => {
      const { container } = render(
        <EcosystemColumn config={COLUMN_MATRIX.service[0]} items={[]} t={mockT} lang={mockLang} />,
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Card Components", () => {
    it("ServiceCardEco renders with badge", () => {
      render(<ServiceCardEco item={mockResolvedItems.service[0]} t={mockT} lang={mockLang} />);
      expect(screen.getByText("ui.ecosystem.badge.service")).toBeInTheDocument();
      expect(screen.getByText("services.software-development.navTitle")).toBeInTheDocument();
    });

    it("SolutionCardEco renders with badge", () => {
      render(<SolutionCardEco item={mockResolvedItems.solution[0]} t={mockT} lang={mockLang} />);
      expect(screen.getByText("ui.ecosystem.badge.solution")).toBeInTheDocument();
      expect(screen.getByText("solutions.agentic-systems.navTitle")).toBeInTheDocument();
    });

    it("CaseCardEco renders title", () => {
      render(<CaseCardEco item={mockResolvedItems.case[0]} t={mockT} lang={mockLang} />);
      expect(screen.getByText("cases.retail-support-bot.title")).toBeInTheDocument();
    });

    it("CaseCardEco renders note when present", () => {
      render(<CaseCardEco item={mockResolvedItems.case[0]} t={mockT} lang={mockLang} />);
      expect(screen.getByText("note3")).toBeInTheDocument();
    });

    it("CaseCardEco renders title when note is missing", () => {
      const itemWithoutNote: ResolvedItem = { ...mockResolvedItems.case[0], noteKey: undefined };
      render(<CaseCardEco item={itemWithoutNote} t={mockT} lang={mockLang} />);
      expect(screen.getByText("cases.retail-support-bot.title")).toBeInTheDocument();
    });

    it("CompactRowEco renders a single linked title", () => {
      render(<CompactRowEco item={mockResolvedItems.solution[0]} t={mockT} lang={mockLang} />);
      const link = screen.getByText("solutions.agentic-systems.navTitle").closest("a");
      expect(link).toHaveAttribute("href", "/ru/solutions/agentic-systems");
    });
  });

  describe("Hydration Safety", () => {
    it("EcosystemSection creates t via useT internally, not as a prop", () => {
      render(<EcosystemSection pageType="service" grouped={mockGrouped} lang={mockLang} />);
      expect(vi.mocked(useT)).toHaveBeenCalledWith(mockLang);
      cleanup();
    });

    it("all page types produce deterministic output", () => {
      const pageTypes = ["service", "solution", "case"] as const;
      pageTypes.forEach((pageType) => {
        const { container: firstRender } = render(
          <EcosystemSection pageType={pageType} grouped={mockGrouped} lang={mockLang} />,
        );
        const htmlAfterFirst = firstRender.innerHTML;

        const { container: secondRender } = render(
          <EcosystemSection pageType={pageType} grouped={mockGrouped} lang={mockLang} />,
        );
        const htmlAfterSecond = secondRender.innerHTML;

        expect(htmlAfterFirst).toBe(htmlAfterSecond);
        cleanup();
      });
    });

    it("useT is called with lang and returns stable t", () => {
      const { rerender } = render(
        <EcosystemSection pageType="service" grouped={mockGrouped} lang={mockLang} />,
      );
      expect(vi.mocked(useT)).toHaveBeenCalledWith(mockLang);

      rerender(<EcosystemSection pageType="service" grouped={mockGrouped} lang={mockLang} />);
      expect(vi.mocked(useT)).toHaveBeenCalledWith(mockLang);
      cleanup();
    });

    it("card components receive t as prop and call it directly", () => {
      const serviceT = vi.fn((key: string) => key) as unknown as TFunc;
      const solutionT = vi.fn((key: string) => key) as unknown as TFunc;
      const caseT = vi.fn((key: string) => key) as unknown as TFunc;

      render(<ServiceCardEco item={mockResolvedItems.service[0]} t={serviceT} lang={mockLang} />);
      expect(serviceT).toHaveBeenCalled();
      cleanup();

      render(
        <SolutionCardEco item={mockResolvedItems.solution[0]} t={solutionT} lang={mockLang} />,
      );
      expect(solutionT).toHaveBeenCalled();
      cleanup();

      render(<CaseCardEco item={mockResolvedItems.case[0]} t={caseT} lang={mockLang} />);
      expect(caseT).toHaveBeenCalled();
      cleanup();
    });
  });
});
