import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";
import type {
  RefOf,
  RelevantsByType,
  WithRelevants,
} from "@/features/relevant-items/model/relevants.types";

/**
 * Заголовки блоков релевантных ссылок: один на пару (source → target).
 * Полная матрица, как в src (src/features/relevant-items/model/relevants.ts),
 * но без стор-резолверов: рендер получает `EntityRef[]` уже сгруппированными
 * по типу и резолвит заголовок в карточке через astro/shared/data/entities.
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

/** Группирует ссылки по типу цели (все ключи всегда присутствуют). */
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

export type { EntityRef, EntityRefType, RefOf, RelevantsByType, WithRelevants };
