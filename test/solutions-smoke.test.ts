import { describe, expect, it } from "vitest";
import { getServiceBySlug } from "@/entities/service";
import { getSolutions } from "@/entities/solution";
import { solutions } from "@/entities/solution/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { dictionaryHasKey } from "./i18nKeys";

describe("solutions: калькуляторы", () => {
  it("калькуляторное решение несёт валидный spec", () => {
    const withCalculator = getSolutions().filter((solution) => solution.calculator);
    expect(withCalculator.length, "ни одно решение не несёт calculator").toBeGreaterThan(0);

    for (const solution of withCalculator) {
      const spec = solution.calculator;
      if (!spec) continue;
      expect(spec.fields.length, `${solution.slug}: пустой fields`).toBeGreaterThan(0);
      expect(
        spec.terms.some((term) => term.kind === "setup"),
        `${solution.slug}: нет setup-терма`,
      ).toBe(true);

      const ids = spec.fields.map((field) => field.id);
      expect(new Set(ids).size, `${solution.slug}: дубли id полей`).toBe(ids.length);

      for (const term of spec.terms) {
        if (term.kind === "setup") continue;
        if (term.kind === "bundle") {
          // A solution bundle must resolve to a published service.
          expect(getServiceBySlug(term.ref), `${solution.slug} → ${term.ref}`).toBeDefined();
          continue;
        }
        expect(ids, `${solution.slug}: терм ссылается на неизвестное поле`).toContain(term.field);
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
});

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
