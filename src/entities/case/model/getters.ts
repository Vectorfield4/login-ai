import { isPublished } from "@/shared/data/publishable";
import type { Case } from "./cases";
import { cases } from "./fixtures";

/** Published cases in fixture order; drafts are not generated. */
export const getCases = (): Case[] => cases.filter(isPublished);

/** One published case by its natural key; `undefined` for a draft or unknown slug. */
export const getCaseBySlug = (slug?: string): Case | undefined =>
  cases.find((caseData) => caseData.slug === slug && isPublished(caseData));
