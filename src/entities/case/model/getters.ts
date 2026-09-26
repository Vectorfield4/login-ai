import type { Case } from "./cases";
import { cases } from "./fixtures";

/** All cases in fixture order. */
export const getCases = (): Case[] => cases;

/** One case by its natural key; `undefined` for an unknown slug. */
export const getCaseBySlug = (slug?: string): Case | undefined =>
  cases.find((caseData) => caseData.slug === slug);
