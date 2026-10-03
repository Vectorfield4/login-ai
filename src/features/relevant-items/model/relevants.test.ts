import { describe, expect, it } from "vitest";
import { getCases } from "@/entities/case";
import { getServices } from "@/entities/service";
import { getSolutions } from "@/entities/solution";
import {
  groupByType,
  relevantBlockTitleKeys,
  relevantNewsBlockTitleKeys,
} from "@/features/relevant-items/model/relevants";
import { resolveRelevantRef } from "@/features/relevant-items/ui/RelevantCard";
import { en } from "@/shared/i18n/en";
import { ru } from "@/shared/i18n/ru";
import type { EntityRef, EntityRefType } from "@/shared/types/relevants";
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

/**
 * Инвариант перелинковки: опубликованная страница не должна быть тупиком.
 * Ссылка засчитывается только если цель резолвится — существует и не черновик
 * (`resolveRelevantRef` отбрасывает черновые цели, как и рендер).
 */
describe("перелинковка опубликованных сущностей", () => {
  const published = [
    ...getServices().map((service) => ({
      id: `service:${service.slug}`,
      relevants: service.relevants,
    })),
    ...getSolutions().map((solution) => ({
      id: `solution:${solution.slug}`,
      relevants: solution.relevants,
    })),
    ...getCases().map((item) => ({ id: `case:${item.slug}`, relevants: item.relevants })),
  ];

  it.each(published)("$id: at least one relation is required", ({ relevants }) => {
    const resolvable = (relevants ?? []).filter((ref) => resolveRelevantRef(ref) !== undefined);
    expect(resolvable.length, "at least one relation is required").toBeGreaterThan(0);
  });
});
