import type { ComponentType } from "react";
import type { CasePageProps } from "@/pages/cases/[slug]/model/types";
import { Chasovoy } from "@/pages/cases/[slug]/ui/Chasovoy";
import { RetailSupportBot } from "@/pages/cases/[slug]/ui/RetailSupportBot";

/**
 * Registry of case pages: slug → page component.
 * Cases without an entry render through the shared DefaultCasePage template.
 * Giving a case its own page = a page file + a row here.
 */
export const casePages: Record<string, ComponentType<CasePageProps>> = {
  "reputation-monitoring-platform": Chasovoy,
  "retail-support-bot": RetailSupportBot,
};
