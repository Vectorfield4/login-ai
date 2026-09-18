import { describe, expect, it } from "vitest";
import { en, ru } from "@/app/i18n";
import { collectStrings, keyPaths, wordCount } from "../../../test/words";

/**
 * Контентные нормативы страниц услуг и решений.
 * Источник правил: docs/frontend/prose-quality.md, §7–8 плана обогащения.
 */

const SERVICE_MIN_WORDS = 700;
const SOLUTION_MIN_WORDS = 1000;

/** Запрещённые RU-корни/слова из prose-quality.md. */
const BANNED_RU = [
  "инновационн",
  "передов",
  "комплексн",
  "перспективн",
  "универсальн",
  "уникальн",
  "революционн",
  "прорывн",
  "экосистем",
  "синерг",
  "холистич",
  "качественно новый уровень",
];

/** Запрещённая конструкция «не просто X, а Y». */
const BANNED_PHRASE = /не просто\s+.+?,\s*а\s+/iu;

const emDash = "\u2014";

const entities = {
  services: ru.services as Record<string, unknown>,
  solutions: ru.solutions as Record<string, unknown>,
};

const entitiesEn = {
  services: en.services as Record<string, unknown>,
  solutions: en.solutions as Record<string, unknown>,
};

describe("AC-5: объём контента страниц", () => {
  for (const [slug, content] of Object.entries(entities.services)) {
    it(`услуга «${slug}»: ≥ ${SERVICE_MIN_WORDS} слов RU`, () => {
      expect(
        wordCount(content),
        `${slug}: ${wordCount(content)} слов, нужно ≥ ${SERVICE_MIN_WORDS}`,
      ).toBeGreaterThanOrEqual(SERVICE_MIN_WORDS);
    });
  }

  for (const [slug, content] of Object.entries(entities.solutions)) {
    it(`решение «${slug}»: ≥ ${SOLUTION_MIN_WORDS} слов RU`, () => {
      expect(
        wordCount(content),
        `${slug}: ${wordCount(content)} слов, нужно ≥ ${SOLUTION_MIN_WORDS}`,
      ).toBeGreaterThanOrEqual(SOLUTION_MIN_WORDS);
    });
  }

  it("пороговые объёмы EN не ниже 90% от RU", () => {
    for (const group of ["services", "solutions"] as const) {
      for (const slug of Object.keys(entities[group])) {
        const ruWords = wordCount(entities[group][slug]);
        const enWords = wordCount(entitiesEn[group][slug]);
        expect(enWords, `${group}.${slug}: EN ${enWords} vs RU ${ruWords}`).toBeGreaterThanOrEqual(
          Math.floor(ruWords * 0.9),
        );
      }
    }
  });
});

describe("AC-7: запрещённые слова и конструкции", () => {
  it("услуги и решения не содержат banned-слов", () => {
    for (const group of ["services", "solutions"] as const) {
      for (const [slug, content] of Object.entries(entities[group])) {
        const text = collectStrings(content).join(" ").toLowerCase();
        for (const word of BANNED_RU) {
          expect(text.includes(word), `${group}.${slug}: запрещено «${word}»`).toBe(false);
        }
      }
    }
  });

  it("услуги и решения не содержат «не просто …, а …»", () => {
    for (const group of ["services", "solutions"] as const) {
      for (const [slug, content] of Object.entries(entities[group])) {
        const text = collectStrings(content).join(" ");
        expect(BANNED_PHRASE.test(text), `${group}.${slug}: «не просто …, а …»`).toBe(false);
      }
    }
  });
});

describe("типографика", () => {
  it("в контенте услуг и решений нет эм-даша (U+2014)", () => {
    for (const group of ["services", "solutions"] as const) {
      for (const [slug, content] of Object.entries(entities[group])) {
        const offenders = collectStrings(content).filter((value) => value.includes(emDash));
        expect(offenders, `${group}.${slug}: эм-даш в ${offenders.length} строке(ах)`).toEqual([]);
      }
    }
  });
});

describe("парити словарей RU/EN", () => {
  it("для каждой сущности набор ключей совпадает", () => {
    for (const group of ["services", "solutions"] as const) {
      for (const slug of Object.keys(entities[group])) {
        expect(keyPaths(entitiesEn[group][slug]).sort(), `${group}.${slug}`).toEqual(
          keyPaths(entities[group][slug]).sort(),
        );
      }
    }
  });
});
