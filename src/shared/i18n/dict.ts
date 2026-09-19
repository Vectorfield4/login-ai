import { casesEn, casesRu } from "../../../src/entities/case/i18n/cases";
import { servicesEn, servicesRu } from "../../../src/entities/service/i18n/services";
import { solutionsEn, solutionsRu } from "../../../src/entities/solution/i18n/solutions";
import { en as sharedEn } from "../../../src/shared/i18n/en";
import { ru as sharedRu } from "../../../src/shared/i18n/ru";

/**
 * Словарь Astro-стороны. Та же композиция, что в `src/app/i18n/index.ts`
 * (без i18next): shared-неймспейсы + entity-словари. Потребление — createT.
 */
export const astroDictRu = { ...sharedRu, ...casesRu, ...servicesRu, ...solutionsRu };
export const astroDictEn = { ...sharedEn, ...casesEn, ...servicesEn, ...solutionsEn };

export const astroDicts = {
  ru: astroDictRu,
  en: astroDictEn,
} as const;
