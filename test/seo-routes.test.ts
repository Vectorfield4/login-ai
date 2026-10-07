import { describe, expect, it } from "vitest";
import { BRAND, getRouteMeta, resolvePageMeta } from "@/shared/data/seo";

/**
 * Route to head-text mapping. `test/schema.test.ts` covers schema type
 * classification; the title/description resolution here was unguarded, so a
 * wrong key shipped a broken `<title>`.
 */
describe("route → meta", () => {
  it("индексы и служебные страницы", () => {
    expect(getRouteMeta("/").titleKey).toBe("home.metaTitle");
    expect(getRouteMeta("/services").titleKey).toBe("servicesPage.title");
    expect(getRouteMeta("/cases").titleKey).toBe("casesPage.title");
    expect(getRouteMeta("/solutions").titleKey).toBe("solutionsPage.title");
    expect(getRouteMeta("/investors").titleKey).toBe("investorsPage.title");
    expect(getRouteMeta("/team").titleKey).toBe("teamPage.title");
    expect(getRouteMeta("/news").titleKey).toBe("newsPage.title");
    expect(getRouteMeta("/contacts").titleKey).toBe("contactsPage.title");
  });

  it("группа услуг резолвится из servicesGroups", () => {
    expect(getRouteMeta("/services/group/ml").titleKey).toBe("servicesGroups.ml.title");
    expect(getRouteMeta("/services/group/ml").descriptionKey).toBe("servicesGroups.ml.subtitle");
  });

  it("детальные страницы берут ключи сущности", () => {
    expect(getRouteMeta("/services/software-development").titleKey).toBe(
      "services.software-development.title",
    );
    expect(getRouteMeta("/solutions/computer-vision").titleKey).toBe(
      "solutions.computer-vision.title",
    );
    expect(getRouteMeta("/cases/quality-vision-line").titleKey).toBe(
      "cases.quality-vision-line.title",
    );
  });

  it("неизвестный слаг → fallback секции или home", () => {
    expect(getRouteMeta("/services/nope").titleKey).toBe("servicesPage.title");
    expect(getRouteMeta("/solutions/nope").titleKey).toBe("home.metaTitle");
    expect(getRouteMeta("/unknown").titleKey).toBe("home.metaTitle");
  });

  it("trailing slash нормализуется", () => {
    expect(getRouteMeta("/cases/").titleKey).toBe("casesPage.title");
    expect(getRouteMeta("/services/group/ml/").titleKey).toBe("servicesGroups.ml.title");
  });
});

describe("resolvePageMeta", () => {
  it("форматирует title с брендом и заполняет description", () => {
    const meta = resolvePageMeta("ru", "/services/software-development");
    expect(meta.title).toContain(BRAND);
    expect(meta.title).not.toBe("");
    expect(meta.description.length).toBeGreaterThan(0);
  });

  it("contacts без ogDescriptionKey отдаёт description", () => {
    const meta = resolvePageMeta("ru", "/contacts");
    expect(meta.ogDescription).toBe(meta.description);
  });

  it("EN отдаёт английские строки", () => {
    const ru = resolvePageMeta("ru", "/cases");
    const en = resolvePageMeta("en", "/cases");
    expect(ru.description).not.toBe(en.description);
  });
});
