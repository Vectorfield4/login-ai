import { describe, expect, it } from "vitest";
import { en } from "../../i18n/en";
import { ru } from "../../i18n/ru";
import { dictionaryHasKey } from "../../test/i18nKeys";
import type { EntityRefType } from "../../types/entityRef";
import { caseFixtures } from "./cases";
import { serviceFixtures } from "./services";
import { solutionFixtures } from "./solutions";

const relevantTargets: Record<EntityRefType, { slug: string }[]> = {
  solution: solutionFixtures,
  case: caseFixtures,
  service: serviceFixtures,
};

describe("case fixtures", () => {
  it("slug кейсов уникальны", () => {
    const slugs = caseFixtures.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("каждый кейс имеет иконку и industryKey из пространства audiences", () => {
    for (const caseData of caseFixtures) {
      expect(caseData.icon, `кейс "${caseData.slug}" должен иметь icon`).toBeTruthy();
      expect(
        caseData.industryKey.startsWith("audiences."),
        `industryKey кейса "${caseData.slug}" должен начинаться с "audiences."`,
      ).toBe(true);
    }
  });

  it("текстовые поля — непустые i18n-ключи пространства cases", () => {
    for (const caseData of caseFixtures) {
      for (const field of [caseData.title, caseData.tagline, caseData.description]) {
        expect(field, `поле кейса "${caseData.slug}"`).toMatch(
          /^cases\.\S+\.(title|tagline|description)$/,
        );
      }
      expect(caseData.metrics).toHaveLength(3);
      for (const [index, metric] of caseData.metrics.entries()) {
        expect(
          metric.label,
          `label метрики ${index} кейса "${caseData.slug}" должен быть ключом cases.*`,
        ).toMatch(/^cases\.\S+\.metrics\.\d+\.label$/);
        expect(
          metric.value,
          `value метрики ${index} кейса "${caseData.slug}" должен быть ключом cases.*`,
        ).toMatch(/^cases\.\S+\.metrics\.\d+\.value$/);
      }
    }
  });

  it("кейс «Часовой» — с демо-ссылкой", () => {
    const chasovoy = caseFixtures.find((c) => c.slug === "reputation-monitoring-platform");
    expect(chasovoy?.demoUrl).toBeTruthy();
  });

  it("relevants кейсов: цели известны, нет self-reference, note-ключи есть в RU/EN", () => {
    for (const caseData of caseFixtures) {
      if (!caseData.relevants) continue;
      for (const ref of caseData.relevants) {
        expect(
          relevantTargets[ref.type].some((target) => target.slug === ref.slug),
          `кейс "${caseData.slug}" → ${ref.type}:${ref.slug}: цель не найдена в фикстурах`,
        ).toBe(true);
        if (ref.type === "case") {
          expect(ref.slug, `кейс "${caseData.slug}": self-reference в relevants`).not.toBe(
            caseData.slug,
          );
        }
        if (ref.noteKey) {
          expect(ref.noteKey, `noteKey кейса "${caseData.slug}"`).toMatch(/^relevants\.\S+$/);
          expect(dictionaryHasKey(ru, ref.noteKey), `${ref.noteKey}: ключа нет в ru.ts`).toBe(true);
          expect(dictionaryHasKey(en, ref.noteKey), `${ref.noteKey}: ключа нет в en.ts`).toBe(true);
        }
      }
    }
  });
});
