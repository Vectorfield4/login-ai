/**
 * Relevant pages: a polymorphic «entity type + target slug» link any entity can
 * carry (solution, case, service). Titles and addresses resolve in
 * src/lib/relevants.ts.
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
