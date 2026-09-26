import type { SvgIconComponent } from "@/shared/data/iconCatalog";
import type { CaseMetric } from "@/shared/types/content";
import type { WithRelevants } from "@/shared/types/relevants";

export type { SvgIconComponent } from "@/shared/data/iconCatalog";

/**
 * Demo case. All text fields are i18n keys (see src/i18n/ru.ts and en.ts).
 * Every case is a real project: client materials and metrics are published.
 */
export interface Case extends WithRelevants {
  slug: string;
  title: string; // cases.<slug>.title
  tagline: string; // cases.<slug>.tagline
  description: string; // cases.<slug>.description
  /** Placeholder instead of a screenshot; no assets added */
  icon: SvgIconComponent;
  /** Reuses existing audiences.* keys (industry chip) */
  industryKey: string;
  /** 3 items, keys cases.<slug>.metrics.N.{label,value} */
  metrics: CaseMetric[];
  /** Link to a live demo («Открыть демо» button on the detail page) */
  demoUrl?: string;
}
