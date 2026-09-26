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
    { titleKey: "ui.ecosystem.service.relatedServices", targetType: "service", maxCards: 2 },
    {
      titleKey: "ui.ecosystem.service.solutions",
      targetType: "solution",
      maxCards: 5,
      forceCompact: true,
    },
    { titleKey: "ui.ecosystem.service.cases", targetType: "case", maxCards: 2, showMetric: true },
  ],
  solution: [
    { titleKey: "ui.ecosystem.solution.services", targetType: "service", maxCards: 2 },
    { titleKey: "ui.ecosystem.solution.relatedSolutions", targetType: "solution", maxCards: 2 },
    { titleKey: "ui.ecosystem.solution.cases", targetType: "case", maxCards: 2, showMetric: true },
  ],
  case: [
    { titleKey: "ui.ecosystem.case.services", targetType: "service", maxCards: 2 },
    { titleKey: "ui.ecosystem.case.solutions", targetType: "solution", maxCards: 2 },
    {
      titleKey: "ui.ecosystem.case.similarCases",
      targetType: "case",
      maxCards: 2,
      showMetric: false,
    },
  ],
};

/** Заголовок блока: один на тип страницы, чтобы три колонки читались как
 *  один раздел, а не как три случайных блока. */
export const SECTION_HEADINGS: Record<PageType, { titleKey: string }> = {
  service: { titleKey: "ui.ecosystem.heading.service" },
  solution: { titleKey: "ui.ecosystem.heading.solution" },
  case: { titleKey: "ui.ecosystem.heading.case" },
};

/**
 * Порог плотности колонки: два пункта ещё помещаются как карточки, три и
 * больше — только строки. Без порога колонка решений на странице услуги
 * растягивала секцию на весь экран.
 */
export const COMPACT_THRESHOLD = 2;

/**
 * Сколько пунктов показывает плотная колонка. Список строк дешевле по
 * высоте, поэтому лимит выше, чем у карточек: третий пункт не должен просто
 * исчезнуть за `maxCards`.
 */
export const COMPACT_LIMIT = 4;

/** Плотность колонки: компакт по конфигу или по числу найденных пунктов. */
export function isCompactColumn(config: ColumnConfig, count: number): boolean {
  return config.forceCompact === true || count > COMPACT_THRESHOLD;
}

/** Сколько пунктов колонка отдаёт при выбранной плотности. */
export function columnLimit(config: ColumnConfig, count: number): number {
  return isCompactColumn(config, count)
    ? Math.max(config.maxCards, COMPACT_LIMIT)
    : config.maxCards;
}

/**
 * Ссылка «все N …» под усечённой колонкой: в компактном режиме часть пунктов
 * не помещается в `maxCards`, и без выхода из блока колонка становится тупиком.
 */
export const ALL_LINKS: Record<EntityRefType, { href: string; labelKey: string }> = {
  service: { href: "/services", labelKey: "ui.menu.allServices" },
  solution: { href: "/solutions", labelKey: "ui.menu.allSolutions" },
  case: { href: "/cases", labelKey: "ui.menu.allCases" },
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
