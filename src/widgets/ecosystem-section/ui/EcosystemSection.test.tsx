import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useT } from "@/shared/hooks/useT";
import type { TFunc } from "@/shared/i18n/t";
import type { ResolvedItem } from "../model/ecosystem.types";
import { COLUMN_MATRIX, resolveItemsByType } from "../model/ecosystem.types";
import { CaseCardEco } from "./CaseCardEco";
import { EcosystemColumn } from "./EcosystemColumn";
import { EcosystemSection } from "./EcosystemSection";
import { ServiceCardEco } from "./ServiceCardEco";
import { SolutionCardEco } from "./SolutionCardEco";

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
      expect(screen.getByText("ecosystem.service.relatedServices")).toBeInTheDocument();
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
    });

    it("renders compact list for solutions when forceCompact is true", () => {
      const manySolutions = Array.from({ length: 5 }, (_, i) => ({
        type: "solution" as const,
        slug: `solution-${i}`,
        titleKey: `solutions.solution-${i}.navTitle`,
        href: `/solutions/solution-${i}`,
        noteKey: `note-${i}`,
      }));

      render(
        <EcosystemColumn
          config={COLUMN_MATRIX.service[1]}
          items={manySolutions}
          t={mockT}
          lang={mockLang}
        />,
      );
      expect(screen.getByText("solutions.solution-0.navTitle")).toBeInTheDocument();
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
      expect(screen.getByText("ecosystem.badge.service")).toBeInTheDocument();
      expect(screen.getByText("services.software-development.navTitle")).toBeInTheDocument();
    });

    it("SolutionCardEco renders without metric", () => {
      render(<SolutionCardEco item={mockResolvedItems.solution[0]} t={mockT} lang={mockLang} />);
      expect(screen.getByText("solutions.agentic-systems.navTitle")).toBeInTheDocument();
    });

    it("CaseCardEco renders title", () => {
      render(<CaseCardEco item={mockResolvedItems.case[0]} t={mockT} lang={mockLang} />);
      expect(screen.getByText("cases.retail-support-bot.title")).toBeInTheDocument();
    });

    it("CaseCardEco renders fallback title when no metric", () => {
      const itemWithoutMetric: ResolvedItem = {
        ...mockResolvedItems.case[0],
        primaryMetric: undefined,
      };
      render(<CaseCardEco item={itemWithoutMetric} t={mockT} lang={mockLang} />);
      expect(screen.getByText("cases.retail-support-bot.title")).toBeInTheDocument();
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
