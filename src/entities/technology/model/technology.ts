/**
 * One groupable technology. The catalog is intentionally wider than the
 * calculator: solution filters use the `technologies.*` capability keys, service
 * pages list the engineering stack, while the future calculator treats a
 * technology as an add-on.
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
}
