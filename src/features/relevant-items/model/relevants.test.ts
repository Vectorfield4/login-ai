import { describe, expect, it } from "vitest";
import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";
import {
  groupByType,
  relevantBlockTitleKeys,
  relevantNewsBlockTitleKeys,
} from "@/features/relevant-items/model/relevants";
import { en } from "@/shared/i18n/en";
import { ru } from "@/shared/i18n/ru";
import { dictionaryHasKey } from "../../../../test/i18nKeys";

const solutionRef: EntityRef = { type: "solution", slug: "agentic-systems", noteKey: "n.k" };
const caseRef: EntityRef = { type: "case", slug: "reputation-monitoring-platform" };
const serviceRef: EntityRef = { type: "service", slug: "software-development" };

describe("groupByType", () => {
  it("раскладывает ссылки по типу цели, все ключи всегда присутствуют", () => {
    const grouped = groupByType([solutionRef, caseRef, serviceRef]);
    expect(grouped.case).toEqual([caseRef]);
    expect(grouped.solution).toEqual([solutionRef]);
    expect(grouped.service).toEqual([serviceRef]);
  });

  it("пустой/отсутствующий список даёт пустые массивы", () => {
    expect(groupByType()).toEqual({ case: [], solution: [], service: [] });
    expect(groupByType([])).toEqual({ case: [], solution: [], service: [] });
  });
});

describe("relevantBlockTitleKeys", () => {
  it("содержит полную матрицу 3×3 и все ключи есть в RU/EN", () => {
    const sources: EntityRefType[] = ["service", "solution", "case"];
    const targets: EntityRefType[] = ["service", "solution", "case"];
    for (const source of sources) {
      for (const target of targets) {
        const key = relevantBlockTitleKeys[source][target];
        expect(key, `${source} → ${target}: ключ пуст`).toBeTruthy();
        expect(dictionaryHasKey(ru, key), `${key}: нет в ru.ts`).toBe(true);
        expect(dictionaryHasKey(en, key), `${key}: нет в en.ts`).toBe(true);
      }
    }
  });
});

describe("relevantNewsBlockTitleKeys", () => {
  it("покрывает все три коммерческих источника, ключи есть в RU/EN", () => {
    const sources: EntityRefType[] = ["service", "solution", "case"];
    for (const source of sources) {
      const key = relevantNewsBlockTitleKeys[source];
      expect(key, `${source} → news: ключ пуст`).toBeTruthy();
      expect(dictionaryHasKey(ru, key), `${key}: нет в ru.ts`).toBe(true);
      expect(dictionaryHasKey(en, key), `${key}: нет в en.ts`).toBe(true);
    }
  });

  it("новости не добавлены в матрицу 3×3: направления «новость → новость» нет", () => {
    expect(Object.keys(relevantBlockTitleKeys)).not.toContain("news");
    expect(Object.keys(relevantBlockTitleKeys.service)).not.toContain("news");
  });
});
