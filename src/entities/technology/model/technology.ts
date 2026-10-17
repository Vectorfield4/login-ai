import type { AddonPricing } from "@/shared/types/calculator";

/**
 * Broad AI families. A family is a grouping key, not a catalog record: `video`
 * is not a technology on its own, it is the family of `text-to-video`,
 * `image-to-video` and `video-to-video`.
 */
export const TECHNOLOGY_FAMILIES = [
  "llm",
  "computer-vision",
  "agentic",
  "video",
  "image",
  "audio",
  "rag",
  "nlp",
] as const;

export type TechnologyFamily = (typeof TECHNOLOGY_FAMILIES)[number];

/**
 * One groupable technology. The catalog is intentionally wider than the
 * calculator: solution filters use the `technologies.*` capability keys, service
 * pages list the engineering stack, while the calculator treats a capability as
 * an add-on.
 *
 * Proper nouns (`PostgreSQL`, `React`) keep `name` and are shown as is.
 * Capabilities (`LLM`, `компьютерное зрение`) keep `nameKey` and are translated.
 */
export type TechnologyCategory =
  | "ai"
  | "data"
  | "ml"
  | "backend"
  | "frontend"
  | "infra"
  | "security";

export interface Technology {
  /** Stable catalog key: React key and future add-on reference. */
  slug: string;
  /** Global domain bucket; display groups stay with the consumer. */
  category: TechnologyCategory;
  /** Proper-noun display name, shown as is. */
  name?: string;
  /** i18n key of a translated capability name. */
  nameKey?: string;
  /** i18n key of a plain-language explanation; filled on migration. */
  glossaryKey?: string;
  /**
   * Family of a granular AI feature (`text-to-video` belongs to `video`). The
   * family is a key, not a record; omitted on cross-cutting capabilities such as
   * `reputation` or `mlops`.
   */
  family?: TechnologyFamily;
  /** Coefficients for the calculator when this capability is an add-on. */
  pricing?: AddonPricing;
}
