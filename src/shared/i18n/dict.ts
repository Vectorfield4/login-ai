import { casesEn, casesRu } from "@/entities/case/i18n";
import { modulesEn, modulesRu } from "@/entities/module/i18n";
import { servicesEn, servicesRu } from "@/entities/service/i18n";

import { solutionsEn, solutionsRu } from "@/entities/solution/i18n";
import { en as sharedEn } from "../../../src/shared/i18n/en";
import { ru as sharedRu } from "../../../src/shared/i18n/ru";

/**
 * Словарь Astro-стороны. Та же композиция, что в `src/app/i18n/index.ts`
 * (без i18next): shared-неймспейсы + entity-словари. Потребление — createT.
 */
export const astroDictRu = {
  ...sharedRu,
  ...casesRu,
  ...servicesRu,
  ...solutionsRu,
  ...modulesRu,
};
export const astroDictEn = {
  ...sharedEn,
  ...casesEn,
  ...servicesEn,
  ...solutionsEn,
  ...modulesEn,
};

export const astroDicts = {
  ru: astroDictRu,
  en: astroDictEn,
} as const;
