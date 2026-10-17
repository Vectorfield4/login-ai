import { capabilitiesEnDict, capabilitiesRuDict } from "@/entities/capability/i18n";
import { casesEn, casesRu } from "@/entities/case/i18n";
import { modulesEn, modulesRu } from "@/entities/module/i18n";
import { servicesEn, servicesRu } from "@/entities/service/i18n";
import { softwareTypesEnDict, softwareTypesRuDict } from "@/entities/software-type/i18n";
import { solutionsEn, solutionsRu } from "@/entities/solution/i18n";
import { technologiesEnDict, technologiesRuDict } from "@/entities/technology/i18n";
import { en as sharedEn } from "../../../src/shared/i18n/en";
import { ru as sharedRu } from "../../../src/shared/i18n/ru";

/**
 * Словарь Astro-стороны. Та же композиция, что в `src/app/i18n/index.ts`
 * (без i18next): shared-неймспейсы + entity-словари. Потребление — createT.
 */
export const astroDictRu = {
  ...sharedRu,
  ...technologiesRuDict,
  ...capabilitiesRuDict,
  ...softwareTypesRuDict,
  ...casesRu,
  ...servicesRu,
  ...solutionsRu,
  ...modulesRu,
};
export const astroDictEn = {
  ...sharedEn,
  ...technologiesEnDict,
  ...capabilitiesEnDict,
  ...softwareTypesEnDict,
  ...casesEn,
  ...servicesEn,
  ...solutionsEn,
  ...modulesEn,
};

export const astroDicts = {
  ru: astroDictRu,
  en: astroDictEn,
} as const;
