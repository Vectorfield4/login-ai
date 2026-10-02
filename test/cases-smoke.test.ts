import { describe, expect, it } from "vitest";
import { cases } from "@/entities/case/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { dictionaryHasKey } from "./i18nKeys";

describe("cases: все переводы из fixtures есть в словарях", () => {
  it("RU и EN содержат все базовые ключи кейсов", () => {
    for (const caseData of cases) {
      const criticalKeys = [
        `cases.${caseData.slug}.title`,
        `cases.${caseData.slug}.tagline`,
        `cases.${caseData.slug}.description`,
        `cases.${caseData.slug}.metrics.0.label`,
        `cases.${caseData.slug}.metrics.0.value`,
        `cases.${caseData.slug}.metrics.1.label`,
        `cases.${caseData.slug}.metrics.1.value`,
        `cases.${caseData.slug}.metrics.2.label`,
        `cases.${caseData.slug}.metrics.2.value`,
      ] as const;

      for (const key of criticalKeys) {
        expect(dictionaryHasKey(astroDictRu, key), `RU: ключ ${key} не найден`).toBe(true);
        expect(dictionaryHasKey(astroDictEn, key), `EN: ключ ${key} не найден`).toBe(true);
      }
    }
  });
});
