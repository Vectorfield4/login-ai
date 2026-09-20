import { describe, expect, it } from "vitest";
import {
  chasovoyAudiences,
  chasovoyCounters,
  chasovoyDashboard,
  chasovoyDepth,
  chasovoyProblem,
  chasovoySolution,
  retailAudiences,
  retailCounters,
  retailDashboard,
  retailProblem,
  retailSolution,
} from "@/entities/case/model/caseSections";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { dictionaryHasKey } from "../../../../test/i18nKeys";

type Keyed = { label?: string; value?: string; title?: string; text?: string };

function assertKeys(item: Keyed, context: string) {
  for (const field of ["label", "value", "title", "text"] as const) {
    const key = item[field];
    if (typeof key !== "string") continue;
    expect(dictionaryHasKey(astroDictRu, key), `${context}.${field}: ключ отсутствует в ru`).toBe(
      true,
    );
    expect(dictionaryHasKey(astroDictEn, key), `${context}.${field}: ключ отсутствует в en`).toBe(
      true,
    );
  }
}

const collections = [
  chasovoyCounters,
  chasovoyProblem,
  chasovoySolution,
  chasovoyDashboard,
  chasovoyDepth,
  chasovoyAudiences,
  retailCounters,
  retailProblem,
  retailSolution,
  retailDashboard,
  retailAudiences,
];

describe("caseSections", () => {
  it("все коллекции секций непустые", () => {
    for (const collection of collections) {
      expect(collection.length, "коллекция секций пуста").toBeGreaterThan(0);
    }
  });

  it("все ключи существуют в RU и EN словарях", () => {
    for (const collection of collections) {
      for (const item of collection) {
        assertKeys(item as Keyed, JSON.stringify(item));
      }
    }
  });
});
