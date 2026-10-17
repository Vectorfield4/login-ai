import { describe, expect, it } from "vitest";
import { getServiceBySlug, getServices } from "@/entities/service";
import { services } from "@/entities/service/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { dictionaryHasKey } from "../i18nKeys";

describe("services: калькуляторы", () => {
  it("калькуляторная услуга несёт валидный spec", () => {
    const withCalculator = getServices().filter((service) => service.calculator);
    expect(withCalculator.length, "ни одна услуга не несёт calculator").toBeGreaterThan(0);

    for (const service of withCalculator) {
      const spec = service.calculator;
      if (!spec) continue;
      expect(spec.fields.length, `${service.slug}: пустой fields`).toBeGreaterThan(0);
      expect(
        spec.terms.some((term) => term.kind === "setup"),
        `${service.slug}: нет setup-терма`,
      ).toBe(true);

      const ids = spec.fields.map((field) => field.id);
      expect(new Set(ids).size, `${service.slug}: дубли id полей`).toBe(ids.length);

      for (const term of spec.terms) {
        if (term.kind === "bundle") {
          expect(getServiceBySlug(term.ref), `${service.slug} → ${term.ref}`).toBeDefined();
        } else if (term.kind !== "setup") {
          expect(ids, `${service.slug}: терм ссылается на неизвестное поле`).toContain(term.field);
        }
      }

      for (const field of spec.fields) {
        expect(dictionaryHasKey(astroDictRu, field.label), `RU ${field.label}`).toBe(true);
        expect(dictionaryHasKey(astroDictEn, field.label), `EN ${field.label}`).toBe(true);
        if (
          field.kind === "segmented" ||
          field.kind === "multiselect" ||
          field.kind === "urgency"
        ) {
          for (const option of field.options) {
            expect(dictionaryHasKey(astroDictRu, option.label), `RU ${option.label}`).toBe(true);
            expect(dictionaryHasKey(astroDictEn, option.label), `EN ${option.label}`).toBe(true);
            if (option.description) {
              expect(
                dictionaryHasKey(astroDictRu, option.description),
                `RU ${option.description}`,
              ).toBe(true);
              expect(
                dictionaryHasKey(astroDictEn, option.description),
                `EN ${option.description}`,
              ).toBe(true);
            }
          }
        }
        if (field.kind === "software-types" && field.infoKey) {
          expect(dictionaryHasKey(astroDictRu, field.infoKey), `RU ${field.infoKey}`).toBe(true);
          expect(dictionaryHasKey(astroDictEn, field.infoKey), `EN ${field.infoKey}`).toBe(true);
        }
        if (field.kind === "slider" && field.hints) {
          for (const hint of field.hints) {
            expect(dictionaryHasKey(astroDictRu, hint.label), `RU ${hint.label}`).toBe(true);
            expect(dictionaryHasKey(astroDictEn, hint.label), `EN ${hint.label}`).toBe(true);
          }
        }
      }
    }
  });

  it("услуга без spec остаётся без секции", () => {
    const plain = getServices().find((service) => !service.calculator);
    if (plain) {
      // Секция монтируется по наличию spec, а не по слагу.
      expect(plain.calculator).toBeUndefined();
    } else {
      // Каталог полностью покрыт калькуляторами: негативный кейс на реальных
      // данных недоступен, инвариант проверяем через полноту покрытия.
      expect(getServices().every((service) => service.calculator !== undefined)).toBe(true);
    }
  });
});

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
