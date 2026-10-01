import { describe, expect, it } from "vitest";
import { cases } from "@/entities/case";
import { solutions } from "@/entities/solution";
import { astroDicts } from "@/shared/i18n/dict";
import { en } from "@/shared/i18n/en";
import { ru } from "@/shared/i18n/ru";
import { createT } from "@/shared/i18n/t";
import { dictionaryHasKey } from "../../../../test/i18nKeys";
import { services } from "./fixtures";

describe("services fixtures", () => {
  it("slug услуг уникальны", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("каждая услуга имеет иконку и непустой список фич", () => {
    for (const service of services) {
      expect(service.icon, `услуга "${service.slug}" должна иметь icon`).toBeTruthy();
      expect(service.features.length, `услуга "${service.slug}": features пуст`).toBeGreaterThan(0);
    }
  });

  it("текстовые поля — непустые i18n-ключи пространства services", () => {
    for (const service of services) {
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

  it("стек (когда задан) — ключи текстов и непустые списки технологий", () => {
    for (const service of services) {
      if (!service.techStack) continue;
      for (const [index, group] of service.techStack.entries()) {
        expect(group.subtitle, `${service.slug}.techStack.${index}.subtitle`).toMatch(
          /^services\.\S+\.techStack\.\d+\.subtitle$/,
        );
        expect(group.description, `${service.slug}.techStack.${index}.description`).toMatch(
          /^services\.\S+\.techStack\.\d+\.description$/,
        );
        expect(group.technologies.length).toBeGreaterThan(0);
        const ids = group.technologies.map((item) => item.id);
        expect(new Set(ids).size, `${service.slug}.techStack.${index}: id не уникальны`).toBe(
          ids.length,
        );
        for (const [techIndex, item] of group.technologies.entries()) {
          expect(item.name, `${service.slug}.techStack.${index}.technologies.${techIndex}`) //
            .toBeTruthy();
          expect(
            item.glossary,
            `${service.slug}.techStack.${index}.technologies.${techIndex}.glossary`,
          ).toMatch(/^services\.\S+\.techStack\.\d+\.technologies\.\d+\.glossary$/);
        }
      }
    }
  });

  it("в стеке услуги каждый термин описания есть среди технологий группы", () => {
    const tRu = createT("ru", astroDicts);
    for (const service of services) {
      for (const [index, group] of (service.techStack ?? []).entries()) {
        const names = new Set(group.technologies.map((item) => item.name));
        for (const [, term] of tRu(group.description).matchAll(/\[([^\]]+)\]/g)) {
          expect(
            names.has(term),
            `${service.slug}.techStack.${index}: термин "${term}" не найден среди технологий`,
          ).toBe(true);
        }
      }
    }
  });

  it("в описаниях стека нет обратных кавычек: только скобочные токены", () => {
    // Раньше термины писали как `[React]` в бэктиках, и бэктики попадали в текст
    // страницы: разметка в словаре должна быть ровно одна.
    const tRu = createT("ru", astroDicts);
    const tEn = createT("en", astroDicts);
    for (const service of services) {
      for (const [index, group] of (service.techStack ?? []).entries()) {
        for (const [lang, t] of [
          ["ru", tRu],
          ["en", tEn],
        ] as const) {
          const text = t(group.description);
          expect(text, `${service.slug}.techStack.${index} (${lang})`).not.toMatch(/`/);
        }
      }
    }
  });

  it("у каждого шага процесса задан processType", () => {
    // Поле опционально в типе (старые данные не ломаются), но в фикстурах
    // заполнено у всех шагов: без него карточка остаётся с нейтральным
    // декором и шаг не отличается от соседнего.
    for (const service of services) {
      for (const [index, step] of (service.processSteps ?? []).entries()) {
        expect(
          step.processType,
          `услуга "${service.slug}".processSteps.${index}: не задан processType`,
        ).toBeTruthy();
      }
    }
  });

  it("типовые части процесса размечены: сбор требований и системный дизайн", () => {
    const types = new Set(
      services.flatMap((service) => service.processSteps ?? []).map((s) => s.processType),
    );
    expect(types.has("requirements"), "нет шага сбора требований").toBe(true);
    expect(types.has("system-design"), "нет шага системного дизайна").toBe(true);
  });

  it("relevants услуг: цели известны, note-ключи есть в RU/EN", () => {
    for (const service of services) {
      if (!service.relevants) continue;
      for (const ref of service.relevants) {
        const targets =
          ref.type === "solution" ? solutions : ref.type === "case" ? cases : services;
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
