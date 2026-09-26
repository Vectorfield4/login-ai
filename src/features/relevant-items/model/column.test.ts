import { describe, expect, it } from "vitest";
import {
  ALL_LINKS,
  COMPACT_LIMIT,
  COMPACT_THRESHOLD,
  columnLimit,
  hasAnyRelation,
  isRowsLayout,
} from "@/features/relevant-items/model/column";
import type { RelevantsByType } from "@/features/relevant-items/model/relevants.types";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

const empty: RelevantsByType = { service: [], solution: [], case: [] };

describe("плотность колонки", () => {
  it("переводит колонку в строки после двух пунктов", () => {
    expect(isRowsLayout(1)).toBe(false);
    expect(isRowsLayout(COMPACT_THRESHOLD)).toBe(false);
    expect(isRowsLayout(COMPACT_THRESHOLD + 1)).toBe(true);
  });

  it("уважает флаг строк из виджета", () => {
    expect(isRowsLayout(1, true)).toBe(true);
  });

  it("карточки ограничены лимитом виджета, строки — большим лимитом", () => {
    expect(columnLimit(2, 2)).toBe(2);
    expect(columnLimit(2, 3)).toBe(COMPACT_LIMIT);
    expect(columnLimit(5, 6, true)).toBeGreaterThanOrEqual(5);
  });
});

describe("ссылки «все …»", () => {
  it("ключи резолвятся в словаре ru и en", () => {
    for (const lang of ["ru", "en"] as const) {
      const t = createT(lang, astroDicts);
      for (const link of Object.values(ALL_LINKS)) {
        expect(t(link.labelKey), `${lang}: ${link.labelKey}`).not.toBe(link.labelKey);
        expect(link.href).toMatch(/^\/(services|solutions|cases)$/);
      }
    }
  });
});

describe("hasAnyRelation", () => {
  it("пустая группировка не даёт секцию", () => {
    expect(hasAnyRelation(empty)).toBe(false);
  });

  it("одна связь любого типа даёт секцию", () => {
    for (const type of ["service", "solution", "case"] as const) {
      expect(hasAnyRelation({ ...empty, [type]: [{ type, slug: "x" }] })).toBe(true);
    }
  });
});
