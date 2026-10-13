import type { NewsCategory } from "../../src/shared/types/content";

/**
 * The content plan contract. `content/plan/*.json` is the single source of
 * truth for the publishing calendar: one file per buyer persona plus a
 * `pubDate` index. `test/content-plan.test.ts` validates every file against
 * these types.
 *
 * Genre and funnel are independent axes. Genre is the assembly format (its
 * structure and volume live in the write-article references); funnel is the
 * business goal of the piece. A release keeps the `product` genre and its PSI
 * structure while its funnel is `HoFu` (retention), not `BoFu` (sale).
 */

/** Assembly genre; the eight values match `NewsCategory`. */
export type PlanGenre = NewsCategory;

/** Prose structure enforced by the write-article structure references. */
export type PlanStructure = "PSI" | "Breakdown" | "Comparison" | "How-To" | "Journey";

/** Business goal of the piece; `HoFu` is retention/advocacy. */
export type PlanFunnel = "ToFu" | "MoFu" | "BoFu" | "HoFu";

/** Buyer persona that owns the budget for the piece. */
export type PlanPersona = "CMO" | "CTO" | "COO-Operations" | "COO-Plant";

/** One calendar row. */
export interface ContentPlanEntry {
  /** Row number in the original calendar; a stable id, not an order. */
  number: number;
  /** ISO `YYYY-MM-DD`; Tuesdays and Thursdays, two per week. */
  pubDate: string;
  /** Article slug; also the future `articles/<slug>.<lang>.md` name. */
  slug: string;
  genre: PlanGenre;
  structure: PlanStructure;
  funnel: PlanFunnel;
  persona: PlanPersona;
  /** RU target query. */
  query: string;
  /** Entity targets, `"<kind>:<slug>"`: service, solution or case. */
  links: string[];
  /** Locales to produce. */
  languages: Array<"ru" | "en">;
  /** Why the article enters production. */
  primaryGoal: string;
  /** Primary commercial destination, `"<kind>:<slug>"`; empty when none. */
  linkMatrix: string;
  /** Locale-free CTA route for `linkMatrix` (see `routeUrl`). */
  ctaRoute: string;
  /** Declared success metric; documentation only, nothing enforces it. */
  successMetric: string;
}

/** One persona file under `content/plan/`. */
export interface ContentPlanFile {
  persona: PlanPersona;
  entries: ContentPlanEntry[];
}

/** One row of the `pubDate` index. */
export interface ContentPlanIndexEntry {
  pubDate: string;
  slug: string;
  persona: PlanPersona;
  funnel: PlanFunnel;
}

/** The `content/plan/index.json` payload, sorted by `pubDate`. */
export interface ContentPlanIndex {
  entries: ContentPlanIndexEntry[];
}

export const PLAN_GENRES: readonly PlanGenre[] = [
  "product",
  "research",
  "technical",
  "case-study",
  "corporate",
  "industry",
  "media",
  "community",
];

export const PLAN_STRUCTURES: readonly PlanStructure[] = [
  "PSI",
  "Breakdown",
  "Comparison",
  "How-To",
  "Journey",
];

export const PLAN_FUNNELS: readonly PlanFunnel[] = ["ToFu", "MoFu", "BoFu", "HoFu"];

export const PLAN_PERSONAS: readonly PlanPersona[] = ["CMO", "CTO", "COO-Operations", "COO-Plant"];

/** Persona → its file name under `content/plan/`. */
export const PLAN_PERSONA_FILES: Record<PlanPersona, string> = {
  CMO: "cmo.json",
  CTO: "cto.json",
  "COO-Operations": "coo-operations.json",
  "COO-Plant": "coo-plant.json",
};
