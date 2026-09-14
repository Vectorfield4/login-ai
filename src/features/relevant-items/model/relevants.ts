import { getCaseBySlug } from "@/entities/case/model/casesStore";
import { getServiceBySlug } from "@/entities/service/model/servicesStore";
import { getSolutionBySlug } from "@/entities/solution/model/solutionsStore";
import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";
import type { RelevantsByType } from "@/features/relevant-items/model/relevants.types";

/** Resolved relevant link: the target's i18n title, address and note. */
export interface ResolvedRelevant {
  titleKey: string;
  href: string;
  noteKey?: string;
}

/**
 * Titles of the relevant-links blocks: one per (source → target) pair.
 * Each combination is its own render block with its own title
 * (see src/components/organisms/blocks/). The full matrix is typed: adding a
 * new entity type to EntityRefType fails the compile here.
 */
export const relevantBlockTitleKeys: Record<EntityRefType, Record<EntityRefType, string>> = {
  service: {
    service: "relevants.blocks.service.service",
    solution: "relevants.blocks.service.solution",
    case: "relevants.blocks.service.case",
  },
  solution: {
    service: "relevants.blocks.solution.service",
    solution: "relevants.blocks.solution.solution",
    case: "relevants.blocks.solution.case",
  },
  case: {
    service: "relevants.blocks.case.service",
    solution: "relevants.blocks.case.solution",
    case: "relevants.blocks.case.case",
  },
};

/**
 * Per-type registries: target titles and addresses differ. Solutions and
 * services render their navTitle, cases their title; each type has its own
 * routes. This is the only place that knows about the type differences.
 */
const titles: Record<EntityRefType, (slug: string) => string | undefined> = {
  solution: (slug) => getSolutionBySlug(slug)?.navTitle,
  case: (slug) => getCaseBySlug(slug)?.title,
  service: (slug) => getServiceBySlug(slug)?.navTitle,
};

const hrefs: Record<EntityRefType, (slug: string) => string> = {
  solution: (slug) => `/solutions/${slug}`,
  case: (slug) => `/cases/${slug}`,
  service: (slug) => `/services/${slug}`,
};

/**
 * Resolves one reference into a card. Returns undefined when the target is
 * unknown (removed slug); resolveRelevants filters such references out.
 */
export function resolveRelevant(ref: EntityRef): ResolvedRelevant | undefined {
  const titleKey = titles[ref.type]?.(ref.slug);
  if (!titleKey) {
    return undefined;
  }
  return { titleKey, href: hrefs[ref.type](ref.slug), noteKey: ref.noteKey };
}

/**
 * Resolves a list of references: unknown targets and links to the current page
 * (self references) are dropped. An empty result means the block does not
 * render.
 */
export function resolveRelevants(items: EntityRef[], currentPath: string): ResolvedRelevant[] {
  return items
    .map(resolveRelevant)
    .filter((item): item is ResolvedRelevant => item !== undefined && item.href !== currentPath);
}

/** Groups references by target type. All keys are always present. */
export function groupByType(relevants?: EntityRef[]): RelevantsByType {
  const byType: RelevantsByType = { case: [], solution: [], service: [] };
  for (const ref of relevants ?? []) {
    switch (ref.type) {
      case "case":
        byType.case.push(ref);
        break;
      case "solution":
        byType.solution.push(ref);
        break;
      case "service":
        byType.service.push(ref);
        break;
    }
  }
  return byType;
}
