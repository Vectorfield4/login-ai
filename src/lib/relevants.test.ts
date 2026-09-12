import { describe, expect, it } from "vitest";
import { en } from "../i18n/en";
import { ru } from "../i18n/ru";
import { dictionaryHasKey } from "../test/i18nKeys";
import type { EntityRef, EntityRefType } from "../types/entityRef";
import {
  groupByType,
  relevantBlockTitleKeys,
  resolveRelevant,
  resolveRelevants,
} from "./relevants";

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

describe("resolveRelevants", () => {
  it("резолвит цели в карточки с адресами", () => {
    const resolved = resolveRelevants([solutionRef, caseRef], "/");
    expect(resolved).toHaveLength(2);
    expect(resolved[0]?.href).toBe("/solutions/agentic-systems");
    expect(resolved[1]?.href).toBe("/cases/reputation-monitoring-platform");
  });

  it("отбрасывает ссылку на текущую страницу (самоссылку)", () => {
    const resolved = resolveRelevants([caseRef], "/cases/reputation-monitoring-platform");
    expect(resolved).toHaveLength(0);
  });

  it("отбрасывает неизвестные цели", () => {
    const resolved = resolveRelevants([{ type: "case", slug: "ghost-case" }], "/");
    expect(resolved).toHaveLength(0);
    expect(resolveRelevant({ type: "solution", slug: "ghost" })).toBeUndefined();
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
