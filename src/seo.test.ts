import { describe, expect, it } from "vitest";
import { services } from "./data/services";
import { solutions } from "./data/solutions";
import { BRAND, formatDocTitle, getRouteMeta } from "./seo";

/**
 * Маршрутный фикстура строится из реальных данных (services/solutions),
 * поэтому покрывает все фактические slug-маршруты, а не захардкоженный список.
 */
const ROUTE_FIXTURE: string[] = [
  "/",
  "/services",
  "/contacts",
  "/cases",
  ...services.map((service) => `/services/${service.slug}`),
  ...solutions.map((solution) => `/solutions/${solution.slug}`),
];

const HOME_META = { titleKey: "home.metaTitle", descriptionKey: "home.metaDescription" };
const SERVICES_PAGE_META = {
  titleKey: "servicesPage.title",
  descriptionKey: "servicesPage.metaDescription",
};

describe("formatDocTitle", () => {
  it("применяет единый формат «<PageTitle> | Login AI»", () => {
    expect(formatDocTitle("X")).toBe("X | Login AI");
    expect(formatDocTitle("ИИ-решения для бизнеса")).toBe("ИИ-решения для бизнеса | Login AI");
  });

  it("бренд — литерал Login AI (не переводится)", () => {
    expect(BRAND).toBe("Login AI");
  });
});

describe("getRouteMeta — известные маршруты", () => {
  it("все маршруты фикстуры дают непустые ключи и уникальные titleKey", () => {
    expect(ROUTE_FIXTURE.length).toBeGreaterThan(0);
    const metas = ROUTE_FIXTURE.map((route) => ({ route, ...getRouteMeta(route) }));

    for (const meta of metas) {
      expect(meta.titleKey, `titleKey для ${meta.route}`).toBeTruthy();
      expect(meta.descriptionKey, `descriptionKey для ${meta.route}`).toBeTruthy();
    }

    const titleKeys = metas.map((meta) => meta.titleKey);
    expect(new Set(titleKeys).size).toBe(titleKeys.length);
  });

  it("маппит статичные страницы на свои ключи", () => {
    expect(getRouteMeta("/")).toEqual(HOME_META);
    expect(getRouteMeta("/services")).toEqual(SERVICES_PAGE_META);
    expect(getRouteMeta("/cases")).toEqual({
      titleKey: "casesPage.title",
      descriptionKey: "casesPage.metaDescription",
    });
    expect(getRouteMeta("/contacts")).toEqual({
      titleKey: "contactsPage.title",
      descriptionKey: "contactsPage.metaDescription",
    });
  });

  it("маппит slug-маршруты на per-slug ключи данных (spot-check)", () => {
    expect(getRouteMeta("/solutions/computer-vision")).toEqual({
      titleKey: "solutions.computer-vision.title",
      descriptionKey: "solutions.computer-vision.description",
    });
    expect(getRouteMeta("/services/software-development")).toEqual({
      titleKey: "services.software-development.title",
      descriptionKey: "services.software-development.description",
    });
  });

  it("каждый slug-маршрут фикстуры ссылается на ключи своей записи в данных", () => {
    for (const service of services) {
      expect(getRouteMeta(`/services/${service.slug}`)).toEqual({
        titleKey: service.title,
        descriptionKey: service.description,
      });
    }
    for (const solution of solutions) {
      expect(getRouteMeta(`/solutions/${solution.slug}`)).toEqual({
        titleKey: solution.title,
        descriptionKey: solution.description,
      });
    }
  });
});

describe("getRouteMeta — фолбэки и нормализация", () => {
  it("неизвестный slug услуги → фолбэк раздела «Услуги»", () => {
    expect(getRouteMeta("/services/unknown-slug")).toEqual(SERVICES_PAGE_META);
  });

  it("неизвестный slug решения → фолбэк главной", () => {
    expect(getRouteMeta("/solutions/unknown-slug")).toEqual(HOME_META);
  });

  it("нет detail-маршрута /cases/:slug → фолбэк главной", () => {
    expect(getRouteMeta("/cases/unknown-slug")).toEqual(HOME_META);
  });

  it("любой другой/нераспознанный путь → фолбэк главной, никогда не бросает", () => {
    expect(() => getRouteMeta("/totally/unmatched/path")).not.toThrow();
    expect(getRouteMeta("/totally/unmatched/path")).toEqual(HOME_META);
    expect(getRouteMeta("/services/foo/bar")).toEqual(HOME_META);
    expect(getRouteMeta("/solutions")).toEqual(HOME_META);
    expect(getRouteMeta("/nope/")).toEqual(HOME_META);
    expect(getRouteMeta("/")).toEqual(HOME_META);
  });

  it("срезает хвостовые слэши (корень остаётся «/»)", () => {
    expect(getRouteMeta("/services/")).toEqual(SERVICES_PAGE_META);
    expect(getRouteMeta("/services/software-development/")).toEqual(
      getRouteMeta("/services/software-development"),
    );
    expect(getRouteMeta("/solutions/video-generation/")).toEqual(
      getRouteMeta("/solutions/video-generation"),
    );
    expect(getRouteMeta("/contacts/")).toEqual(getRouteMeta("/contacts"));
    expect(getRouteMeta("/cases/")).toEqual(getRouteMeta("/cases"));
    expect(getRouteMeta("/")).toEqual(HOME_META);
  });
});
