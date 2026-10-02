import { describe, expect, it } from "vitest";
import { services } from "@/entities/service/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { dictionaryHasKey } from "./i18nKeys";

describe("services: все переводы из fixtures есть в словарях", () => {
  it("RU и EN содержат все базовые ключи услуг", () => {
    for (const service of services) {
      const criticalKeys = [
        `services.${service.slug}.navTitle`,
        `services.${service.slug}.title`,
        `services.${service.slug}.tagline`,
        `services.${service.slug}.description`,
        `services.${service.slug}.ctaBanner.title`,
        `services.${service.slug}.ctaBanner.text`,
        `services.${service.slug}.ctaBanner.buttonLabel`,
        // features
        ...(service.features?.map((_, i) => `services.${service.slug}.features.${i}.title`) || []),
        ...(service.features?.map((_, i) => `services.${service.slug}.features.${i}.text`) || []),
      ] as const;

      for (const key of criticalKeys) {
        expect(dictionaryHasKey(astroDictRu, key), `RU: ключ ${key} не найден`).toBe(true);
        expect(dictionaryHasKey(astroDictEn, key), `EN: ключ ${key} не найден`).toBe(true);
      }
    }
  });
});
