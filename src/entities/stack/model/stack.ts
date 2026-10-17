/**
 * Two axes answer two different questions, and they never repeat each other:
 *
 * - `kind` - which broad family the artifact belongs to
 *   (language, library, data-store, platform…);
 * - `category` - which specific product area it serves
 *   (database, cache, messaging, ML…).
 *
 * `PostgreSQL` is a `data-store` in the `database` area; `pgvector` is an
 * `extension` in the same area; `Kafka` is a `broker` in `messaging`.
 */
export const STACK_KINDS = [
  "language",
  "runtime",
  "framework",
  "library",
  "extension",
  "inference",
  "data-store",
  "broker",
  "platform",
  "api",
] as const;

export type StackKind = (typeof STACK_KINDS)[number];

/** Specific product area, not a broad `data` layer. */
export const STACK_CATEGORIES = [
  "frontend",
  "backend",
  "mobile",
  "database",
  "cache",
  "search",
  "messaging",
  "storage",
  "ml",
  "ai",
  "infra",
  "security",
  "observability",
] as const;

export type StackCategory = (typeof STACK_CATEGORIES)[number];

export interface StackItem {
  /** Stable catalog key: React key and future add-on reference. */
  slug: string;
  kind: StackKind;
  category: StackCategory;
  /** Proper-noun display name, shown as is. */
  name: string;
}
