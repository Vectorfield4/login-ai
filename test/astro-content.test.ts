import { describe, expect, it } from "vitest";
import { astroDictEn, astroDictRu, astroDicts } from "../astro/shared/i18n/dict";
import { createT } from "../astro/shared/i18n/t";
import { collectStrings, keyPaths } from "./words";

const SHARED_NS = [
  "ui",
  "home",
  "servicesPage",
  "servicePage",
  "solutionPage",
  "casePage",
  "casesPage",
  "investorsPage",
  "contactsPage",
  "notFoundPage",
  "audiences",
  "technologies",
  "relevants",
  "showcase",
] as const;

const ENTITY_NS = ["services", "solutions", "cases"] as const;

describe("astro dict: паритет RU/EN через createT", () => {
  it("entity-неймспейсы имеют идентичный набор ключей", () => {
    for (const ns of ENTITY_NS) {
      expect(keyPaths(astroDictEn[ns]).sort(), `${ns}.en`).toEqual(
        keyPaths(astroDictRu[ns]).sort(),
      );
    }
  });

  it("shared-неймспейсы идентичны по ключам в обоих языках", () => {
    for (const ns of SHARED_NS) {
      expect(keyPaths(astroDictEn[ns]).sort(), `${ns}.en`).toEqual(
        keyPaths(astroDictRu[ns]).sort(),
      );
    }
  });

  it("createT резолвит ключи и интерполирует {var}", () => {
    const t = createT("ru", astroDicts);
    expect(t("services.software-development.title")).toContain("Разработка");
    expect(t("ui.footer", { year: 2026 })).toBe("© 2026 Login AI");
  });

  it("в словарях нет сырых ключей (значений-ссылок вида ns.slug.field)", () => {
    const resolve = (node: unknown, key: string): unknown =>
      key
        .split(".")
        .reduce<unknown>(
          (acc, segment) => (acc == null ? undefined : (acc as Record<string, unknown>)[segment]),
          node,
        );

    for (const lang of ["ru", "en"] as const) {
      const dict = lang === "ru" ? astroDictRu : astroDictEn;
      const keyLike = /^[a-zA-Z][a-zA-Z0-9-]*\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
      const raw = collectStrings(dict).filter(
        (value) => keyLike.test(value) && typeof resolve(dict, value) === "string",
      );
      expect(raw, `${lang}: сырые ключи в значениях словаря`).toEqual([]);
    }
  });
});
