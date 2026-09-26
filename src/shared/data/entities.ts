import type { Case } from "@/entities/case/model/cases";
import type { Solution } from "@/entities/solution/model/solutions";
import { caseFixtures } from "@/shared/mocks/fixtures/cases";
import { solutionFixtures } from "@/shared/mocks/fixtures/solutions";

/** Минимальная форма решения, передаваемая на главную в остров HomeSolutions. */
export interface HomeSolution {
  slug: string;
  navTitle: string;
  tagline: string;
  image?: string;
  audiences: string[];
  tags: string[];
}

/** Превращает полную модель решения в форму для главной (минимизирует payload острова).
 *  `imageSrc` приходит из `getSolutionImage(slug)?.src`: сущности не знают
 *  про `ImageMetadata`, поэтому ассет подставляет страница. */
export function toHomeSolution(s: Solution, imageSrc?: string): HomeSolution {
  return {
    slug: s.slug,
    navTitle: s.navTitle,
    tagline: s.tagline,
    image: imageSrc,
    audiences: s.audiences,
    tags: s.tags,
  };
}

/** Слой данных Astro-стороны: прямое чтение доменных данных (без сторов и
 * сетевых запросов). Домены мигрируют из `shared/mocks/fixtures` в свои срезы
 * по одному: услуги уже живут в `entities/service` (`@/entities/service`).
 */

export const getSolutions = (): Solution[] => solutionFixtures;
export const getSolutionBySlug = (slug?: string): Solution | undefined =>
  solutionFixtures.find((s) => s.slug === slug);

export const getCases = (): Case[] => caseFixtures;
export const getCaseBySlug = (slug?: string): Case | undefined =>
  caseFixtures.find((c) => c.slug === slug);
