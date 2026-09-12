import type { ReactNode } from "react";
import type { Case } from "../../types/cases";

/** Contract for any case page in src/pages/cases/: exactly one prop, `case`. */
export interface CasePageProps {
  case: Case;
}

/**
 * Props of the CasePageLayout base compositor: CasePageProps plus the sections
 * slot. Specialized pages add their own sections through the slot; the base
 * composition (hero → результат → sections → relevant links → CTA) always
 * renders, so a diverging page can never drop the shared sections.
 */
export interface CasePageLayoutProps extends CasePageProps {
  /** Case-specific sections between the «Результат» block and the relevant links. */
  sections?: ReactNode;
}
