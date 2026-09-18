import { casesEn, casesRu } from "@/entities/case/i18n/cases";
import { servicesEn, servicesRu } from "@/entities/service/i18n/services";
import { solutionsEn, solutionsRu } from "@/entities/solution/i18n/solutions";
import { configureI18n } from "@/shared/i18n";
import { en as sharedEn } from "@/shared/i18n/en";
import { ru as sharedRu } from "@/shared/i18n/ru";

const ru = { ...sharedRu, ...casesRu, ...servicesRu, ...solutionsRu };
const en = { ...sharedEn, ...casesEn, ...servicesEn, ...solutionsEn };

configureI18n({ ru, en });

export { en, ru };
