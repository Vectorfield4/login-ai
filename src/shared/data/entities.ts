import type { Case } from "@/entities/case/model/cases";
import { caseFixtures } from "@/shared/mocks/fixtures/cases";

/**
 * Build-time data access: domain data is read synchronously, without stores or
 * network calls. Domains move from `shared/mocks/fixtures` into their own slice
 * one by one — services (`@/entities/service`) and solutions
 * (`@/entities/solution`) are already there; cases are the last one.
 */

export const getCases = (): Case[] => caseFixtures;
export const getCaseBySlug = (slug?: string): Case | undefined =>
  caseFixtures.find((c) => c.slug === slug);
