import { describe, expect, it } from "vitest";
import { dictionaryHasKey } from "../../../../test/i18nKeys";
import { modulesEn, modulesRu } from "../i18n";
import { modules } from "./fixtures";

describe("modules fixtures", () => {
  it("slug модулей уникальны", () => {
    const slugs = modules.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("текстовые поля — непустые i18n-ключи пространства modules", () => {
    for (const module of modules) {
      expect(module.navTitle).toMatch(/^modules\.\S+\.navTitle$/);
      expect(module.title).toMatch(/^modules\.\S+\.title$/);
      expect(module.tagline).toMatch(/^modules\.\S+\.tagline$/);
      expect(module.description).toMatch(/^modules\.\S+\.description$/);
      expect(module.features.length, `${module.slug}: features пуст`).toBeGreaterThan(0);
    }
  });

  it("каждый модуль поддерживает SQLite и PostgreSQL", () => {
    for (const module of modules) {
      const supported = module.providers.filter((p) => p.supported).map((p) => p.id);
      expect(supported, `${module.slug}: нет SQLite`).toContain("sqlite");
      expect(supported, `${module.slug}: нет PostgreSQL`).toContain("postgres");
    }
  });

  it("у каждого модуля ровно один провайдер по умолчанию", () => {
    for (const module of modules) {
      const defaults = module.providers.filter((p) => p.isDefault);
      expect(defaults.length, `${module.slug}: провайдеров по умолчанию ${defaults.length}`).toBe(
        1,
      );
    }
  });

  it("note-ключи провайдеров валидны и есть в RU/EN", () => {
    for (const module of modules) {
      for (const provider of module.providers) {
        const expected = `modules.${module.slug}.providers.${provider.id}.note`;
        expect(provider.note, `${module.slug}/${provider.id}`).toBe(expected);
        expect(dictionaryHasKey(modulesRu, provider.note), `${provider.note}: нет в ru`).toBe(true);
        expect(dictionaryHasKey(modulesEn, provider.note), `${provider.note}: нет в en`).toBe(true);
      }
    }
  });
});
