import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";
import type { RelevantsByType } from "@/features/relevant-items/model/relevants.types";

/**
 * Titles of the relevant-links blocks: one per (source → target) pair.
 * Each combination is its own render block with its own title
 * (see src/features/relevant-items/ui/). The full matrix is typed: adding a
 * new entity type to EntityRefType fails the compile here. Title resolution
 * itself lives in `RelevantCard` (resolveRelevantRef via shared/data/entities).
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
