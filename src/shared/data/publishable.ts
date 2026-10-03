import type { Publishable } from "@/shared/types/content";

/**
 * Publication gate shared by every entity: a `draft` entity is not generated and
 * every link to it (block relation or inline markdown) is dropped. See
 * `docs/plans/content-expansion-plan.md`, section 7.
 */
export function isPublished(entity: Publishable): boolean {
  return entity.draft !== true;
}
