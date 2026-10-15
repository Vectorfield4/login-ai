import type { QueueKind, VisualConfig } from "./generation-queue.mjs";

export type CatalogEntry = {
  kind: QueueKind;
  slug: string;
  title: string;
  keywords: string[];
  topic: string;
  /** Short Latin subject of the image; feeds the `{{OBJECT}}` prompt slot. */
  object: string;
  visual_config: VisualConfig | null;
  story?: string;
  /** Repo-relative PNG path. */
  image: string;
  hasImage: boolean;
  hasPrompt: boolean;
};

export const META_SUFFIX: string;
export const CATALOG_ROOTS: Record<QueueKind, string>;

export function readCatalog(kind?: QueueKind): CatalogEntry[];
