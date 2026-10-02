import { describe, expect, it } from "vitest";
import { solutions } from "@/entities/solution/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { dictionaryHasKey } from "./i18nKeys";

describe("solutions: все переводы из fixtures есть в словарях", () => {
  it("RU и EN содержат все базовые ключи решений", () => {
    for (const solution of solutions) {
      // Проверяем только критически важные i18n-ключи, определённые в фикстурах
      const criticalKeys = [
        `solutions.${solution.slug}.navTitle`,
        `solutions.${solution.slug}.title`,
        `solutions.${solution.slug}.tagline`,
        `solutions.${solution.slug}.description`,
      ] as const;

      for (const key of criticalKeys) {
        expect(dictionaryHasKey(astroDictRu, key), `RU: ключ ${key} не найден`).toBe(true);
        expect(dictionaryHasKey(astroDictEn, key), `EN: ключ ${key} не найден`).toBe(true);
      }
    }
  });
});
