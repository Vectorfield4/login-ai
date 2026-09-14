import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";

/**
 * Single contract for relevant links: any site entity (solution, service,
 * case) can link to any others through `relevants?: EntityRef[]`.
 */
export interface WithRelevants {
  relevants?: EntityRef[];
}

/** References narrowed to one target type. */
export type RefOf<T extends EntityRefType> = Extract<EntityRef, { type: T }>;

/** Grouping of references by target type. All keys are always present. */
export type RelevantsByType = {
  [K in EntityRefType]: RefOf<K>[];
};
