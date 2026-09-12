import type { ComponentType } from "react";
import { Chasovoy } from "./Chasovoy";
import { RetailSupportBot } from "./RetailSupportBot";
import type { CasePageProps } from "./types";

/**
 * Registry of case pages: slug → page component.
 * Cases without an entry render through the shared DefaultCasePage template.
 * Giving a case its own page = a page file + a row here.
 */
export const casePages: Record<string, ComponentType<CasePageProps>> = {
  "reputation-monitoring-platform": Chasovoy,
  "retail-support-bot": RetailSupportBot,
};
