/**
 * Contract for relevant links: any site entity (solution, case, service) can
 * link to any others through `relevants?: EntityRef[]`. Entities declare the
 * field, so the contract lives below them in `shared/types` (next to the
 * display models in `content.ts`); `features/relevant-items` builds the UI on
 * top of it. Titles and addresses resolve in
 * src/features/relevant-items/ui/RelevantCard.tsx.
 */

/** Where a relevant link points. */
export type EntityRefType = "solution" | "case" | "service";

/**
 * One relevant link: a discriminator + the target's natural key.
 * A discriminated union so Extract utilities and narrowing work.
 */
export type EntityRef =
  | { type: "case"; slug: string; noteKey?: string }
  | { type: "solution"; slug: string; noteKey?: string }
  | { type: "service"; slug: string; noteKey?: string };

/** Any site entity that can carry `relevants`. */
export interface WithRelevants {
  relevants?: EntityRef[];
}

/** References narrowed to one target type. */
export type RefOf<T extends EntityRefType> = Extract<EntityRef, { type: T }>;

/** Grouping of references by target type. All keys are always present. */
export type RelevantsByType = {
  [K in EntityRefType]: RefOf<K>[];
};
