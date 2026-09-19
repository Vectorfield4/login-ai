import type { Case } from "../../../src/entities/case/model/cases";
import type { Service } from "../../../src/entities/service/model/services";
import type { Solution } from "../../../src/entities/solution/model/solutions";
import { caseFixtures } from "../../../src/shared/mocks/fixtures/cases";
import { serviceFixtures } from "../../../src/shared/mocks/fixtures/services";
import { solutionFixtures } from "../../../src/shared/mocks/fixtures/solutions";

/**
 * Слой данных Astro-стороны: прямое чтение фикстур (единственный источник
 * правды — те же `*Fixtures`, что и у легаси-сторы). Zustand/TanStack Query
 * не используются: данные синхронные и статичные.
 */

export const getServices = (): Service[] => serviceFixtures;
export const getServiceBySlug = (slug?: string): Service | undefined =>
  serviceFixtures.find((s) => s.slug === slug);

export const getSolutions = (): Solution[] => solutionFixtures;
export const getSolutionBySlug = (slug?: string): Solution | undefined =>
  solutionFixtures.find((s) => s.slug === slug);

export const getCases = (): Case[] => caseFixtures;
export const getCaseBySlug = (slug?: string): Case | undefined =>
  caseFixtures.find((c) => c.slug === slug);
