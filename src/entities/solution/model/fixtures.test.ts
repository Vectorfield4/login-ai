import { describe, expect, it } from "vitest";
import { cases } from "@/entities/case";
import { services } from "@/entities/service";
import { en } from "@/shared/i18n/en";
import { ru } from "@/shared/i18n/ru";
import type { EntityRefType } from "@/shared/types/relevants";
import { dictionaryHasKey } from "../../../../test/i18nKeys";
import { solutions } from "./fixtures";

const relevantTargets: Record<EntityRefType, { slug: string }[]> = {
  solution: solutions,
  case: cases,
  service: services,
};

describe("solutions fixtures", () => {
  it("slug решений уникальны", () => {
    const slugs = solutions.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("текстовые поля — непустые i18n-ключи пространства solutions", () => {
    for (const solution of solutions) {
      expect(solution.navTitle).toMatch(/^solutions\.\S+\.navTitle$/);
      expect(solution.title).toMatch(/^solutions\.\S+\.title$/);
      expect(solution.tagline).toMatch(/^solutions\.\S+\.tagline$/);
      expect(solution.description).toMatch(/^solutions\.\S+\.description$/);
    }
  });

  it("аудитории и технологии заданы и имеют допустимый префикс ключа", () => {
    for (const solution of solutions) {
      expect(solution.audiences.length, `${solution.slug}: audiences пуст`).toBeGreaterThan(0);
      expect(solution.tags.length, `${solution.slug}: tags пуст`).toBeGreaterThan(0);
      for (const audience of solution.audiences) {
        expect(audience).toMatch(/^audiences\.\S+$/);
      }
      for (const tag of solution.tags) {
        expect(tag).toMatch(/^technologies\.\S+$/);
      }
    }
  });

  it("relevants: цели известны, нет self-reference и дублей, note-ключи есть в RU/EN", () => {
    for (const solution of solutions) {
      if (!solution.relevants) continue;
      const pairs = solution.relevants.map((ref) => `${ref.type}:${ref.slug}`);
      expect(
        new Set(pairs).size,
        `решение "${solution.slug}": relevants содержат дубли (type, slug)`,
      ).toBe(pairs.length);
      for (const ref of solution.relevants) {
        expect(
          relevantTargets[ref.type].some((target) => target.slug === ref.slug),
          `решение "${solution.slug}" → ${ref.type}:${ref.slug}: цель не найдена в фикстурах`,
        ).toBe(true);
        if (ref.type === "solution") {
          expect(ref.slug, `решение "${solution.slug}": self-reference в relevants`).not.toBe(
            solution.slug,
          );
        }
        if (ref.noteKey) {
          expect(ref.noteKey, `noteKey решения "${solution.slug}"`).toMatch(/^relevants\.\S+$/);
          expect(dictionaryHasKey(ru, ref.noteKey), `${ref.noteKey}: ключа нет в ru.ts`).toBe(true);
          expect(dictionaryHasKey(en, ref.noteKey), `${ref.noteKey}: ключа нет в en.ts`).toBe(true);
        }
      }
    }
  });
});
