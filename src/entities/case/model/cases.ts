import type { SvgIconComponent } from "@mui/icons-material";
import type { WithRelevants } from "@/features/relevant-items/model/relevants.types";

/** One case result metric. label/value are i18n keys (cases.<slug>.metrics.N.*). */
export interface CaseMetric {
  label: string;
  value: string;
}

/** Numeric value animated on the page. */
export interface CounterItem {
  value: number;
  /** i18n key of the counter label. */
  label: string;
}

/** «заголовок + текст» card. */
export interface TextItem {
  /** i18n key of the title. */
  title: string;
  /** i18n key of the text. */
  text: string;
}

/** KPI stat (stat tile). */
export interface StatItem {
  /** i18n key of the stat label. */
  label: string;
  /** i18n key of the value (string, no number formatting). */
  value: string;
}

/** Depth slider level description (index = level). */
export interface SliderLevel {
  /** i18n key of the depth mode name. */
  title: string;
  /** i18n key of the mode description. */
  text: string;
}

/**
 * Demo case. All text fields are i18n keys (see src/i18n/ru.ts and en.ts).
 * Until real client materials exist, content is modeled after typical tasks
 * and marked on the page (casesPage.demoNotice).
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
