import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";
import type { RelevantsByType } from "@/features/relevant-items/model/relevants.types";
import { getCaseBySlug, getServiceBySlug, getSolutionBySlug } from "@/shared/data/entities";

export type PageType = "service" | "solution" | "case";

export interface ResolvedItem {
  type: EntityRefType;
  slug: string;
  titleKey: string;
  href: string;
  noteKey?: string;
  primaryMetric?: { valueKey: string; labelKey: string };
}

export interface ColumnConfig {
  titleKey: string;
  targetType: EntityRefType;
  maxCards: number;
  forceCompact?: boolean;
  showMetric?: boolean;
}

export const COLUMN_MATRIX: Record<PageType, [ColumnConfig, ColumnConfig, ColumnConfig]> = {
  service: [
    { titleKey: "ecosystem.service.relatedServices", targetType: "service", maxCards: 2 },
    {
      titleKey: "ecosystem.service.solutions",
      targetType: "solution",
      maxCards: 5,
      forceCompact: true,
    },
    { titleKey: "ecosystem.service.cases", targetType: "case", maxCards: 2, showMetric: true },
  ],
  solution: [
    { titleKey: "ecosystem.solution.services", targetType: "service", maxCards: 2 },
    { titleKey: "ecosystem.solution.relatedSolutions", targetType: "solution", maxCards: 2 },
    { titleKey: "ecosystem.solution.cases", targetType: "case", maxCards: 2, showMetric: true },
  ],
  case: [
    { titleKey: "ecosystem.case.services", targetType: "service", maxCards: 2 },
    { titleKey: "ecosystem.case.solutions", targetType: "solution", maxCards: 2 },
    { titleKey: "ecosystem.case.similarCases", targetType: "case", maxCards: 2, showMetric: false },
  ],
};

export function resolveItemsByType(refs: EntityRef[], targetType: EntityRefType): ResolvedItem[] {
  const filtered = refs.filter((r) => r.type === targetType);
  return filtered
    .map((ref) => {
      const base = { type: ref.type, slug: ref.slug, noteKey: ref.noteKey };
      switch (ref.type) {
        case "service": {
          const s = getServiceBySlug(ref.slug);
          return {
            ...base,
            titleKey: s?.navTitle ?? "",
            href: `/services/${ref.slug}`,
          } satisfies ResolvedItem;
        }
        case "solution": {
          const s = getSolutionBySlug(ref.slug);
          return {
            ...base,
            titleKey: s?.navTitle ?? "",
            href: `/solutions/${ref.slug}`,
          } satisfies ResolvedItem;
        }
        case "case": {
          const c = getCaseBySlug(ref.slug);
          const primaryMetric = c?.metrics[0];
          return {
            ...base,
            titleKey: c?.title ?? "",
            href: `/cases/${ref.slug}`,
            primaryMetric: primaryMetric
              ? { valueKey: primaryMetric.value, labelKey: primaryMetric.label }
              : undefined,
          } satisfies ResolvedItem;
        }
        default: {
          const _exhaustive: never = ref;
          return _exhaustive;
        }
      }
    })
    .filter((item) => item.titleKey);
}

export interface EcosystemSectionInput {
  pageType: PageType;
  grouped: RelevantsByType;
}
