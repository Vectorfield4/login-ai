import { describe, expect, it } from "vitest";
import { en } from "@/shared/i18n/en";
import { ru } from "@/shared/i18n/ru";
import { caseFixtures } from "@/shared/mocks/fixtures/cases";
import { serviceFixtures } from "@/shared/mocks/fixtures/services";
import { solutionFixtures } from "@/shared/mocks/fixtures/solutions";
import { dictionaryHasKey } from "../../../../test/i18nKeys";

describe("services fixtures", () => {
  it("slug услуг уникальны", () => {
    const slugs = serviceFixtures.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("каждая услуга имеет иконку и непустой список фич", () => {
    for (const service of serviceFixtures) {
      expect(service.icon, `услуга "${service.slug}" должна иметь icon`).toBeTruthy();
      expect(service.features.length, `услуга "${service.slug}": features пуст`).toBeGreaterThan(0);
    }
  });

  it("текстовые поля — непустые i18n-ключи пространства services", () => {
    for (const service of serviceFixtures) {
      expect(service.navTitle).toMatch(/^services\.\S+\.navTitle$/);
      expect(service.title).toMatch(/^services\.\S+\.title$/);
      expect(service.tagline).toMatch(/^services\.\S+\.tagline$/);
      expect(service.description).toMatch(/^services\.\S+\.description$/);
      for (const [index, feature] of service.features.entries()) {
        expect(feature.title, `${service.slug}.features.${index}.title`).toMatch(
          /^services\.\S+\.features\.\d+\.title$/,
        );
        expect(feature.text, `${service.slug}.features.${index}.text`).toMatch(
          /^services\.\S+\.features\.\d+\.text$/,
        );
      }
    }
  });

  it("категории (когда заданы) — ключи заголовков и непустые списки технологий", () => {
    for (const service of serviceFixtures) {
      if (!service.categories) continue;
      for (const [index, category] of service.categories.entries()) {
        expect(category.title, `${service.slug}.categories.${index}.title`).toMatch(
          /^services\.\S+\.categories\.\d+\.title$/,
        );
        expect(category.items.length).toBeGreaterThan(0);
      }
    }
  });

  it("relevants услуг: цели известны, note-ключи есть в RU/EN", () => {
    for (const service of serviceFixtures) {
      if (!service.relevants) continue;
      for (const ref of service.relevants) {
        const targets =
          ref.type === "solution"
            ? solutionFixtures
            : ref.type === "case"
              ? caseFixtures
              : serviceFixtures;
        expect(
          targets.some((target) => target.slug === ref.slug),
          `услуга "${service.slug}" → ${ref.type}:${ref.slug}: цель не найдена в фикстурах`,
        ).toBe(true);
        if (ref.noteKey) {
          expect(ref.noteKey, `noteKey услуги "${service.slug}"`).toMatch(/^relevants\.\S+$/);
          expect(dictionaryHasKey(ru, ref.noteKey), `${ref.noteKey}: ключа нет в ru.ts`).toBe(true);
          expect(dictionaryHasKey(en, ref.noteKey), `${ref.noteKey}: ключа нет в en.ts`).toBe(true);
        }
      }
    }
  });
});
