import type { ComponentType } from "react";
import type { CasePageProps } from "@/pages/cases/details/model/types";
import { Chasovoy } from "@/pages/cases/details/ui/Chasovoy";
import { RetailSupportBot } from "@/pages/cases/details/ui/RetailSupportBot";

/**
 * Registry of case pages: slug → page component.
 * Cases without an entry render through the shared DefaultCasePage template.
 * Giving a case its own page = a page file + a row here.
 */
export const casePages: Record<string, ComponentType<CasePageProps>> = {
  "reputation-monitoring-platform": Chasovoy,
  "retail-support-bot": RetailSupportBot,
};
