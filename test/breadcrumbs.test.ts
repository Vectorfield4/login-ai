import { describe, expect, it } from "vitest";
import { resolveBreadcrumbs } from "../src/shared/data/breadcrumbs";
import { astroDicts } from "../src/shared/i18n/dict";
import { createT } from "../src/shared/i18n/t";

const tRu = createT("ru", astroDicts);

describe("resolveBreadcrumbs", () => {
  it("не строит крошки для главной и 404", () => {
    expect(resolveBreadcrumbs("/", "ru")).toBeNull();
    expect(resolveBreadcrumbs("/404", "ru")).toBeNull();
    expect(resolveBreadcrumbs("/unknown-page", "ru")).toBeNull();
  });

  it("строит крошки индекса раздела", () => {
    const crumbs = resolveBreadcrumbs("/services", "ru");
    expect(crumbs).not.toBeNull();
    expect(crumbs?.items).toHaveLength(2);
    expect(crumbs?.items[0]).toEqual({ label: "Главная", path: "/" });
    expect(crumbs?.items[1]).toEqual({ label: "Услуги", path: "/services" });
  });

  it("строит крошки детальной страницы с разделом-родителем", () => {
    const crumbs = resolveBreadcrumbs("/solutions/customer-experience", "ru");
    expect(crumbs?.items[1]).toEqual({ label: "Решения", path: "/solutions" });
    expect(crumbs?.items[2]?.path).toBeUndefined();
    expect(crumbs?.items[2]?.label).not.toBe("");
  });

  it("переводит подписи на английский", () => {
    const crumbs = resolveBreadcrumbs("/cases", "en");
    expect(crumbs?.items[0]).toEqual({ label: "Home", path: "/" });
    expect(crumbs?.items[1]).toEqual({ label: "Cases", path: "/cases" });
  });

  it("терпит хвостовой слэш", () => {
    expect(resolveBreadcrumbs("/investors/", "ru")?.items[1].label).toBe("Инвесторам");
    expect(resolveBreadcrumbs("/solutions/", "ru")?.items[1].label).toBe("Решения");
  });

  it("возвращает null для неизвестного слага", () => {
    expect(resolveBreadcrumbs("/cases/no-such-case", "ru")).toBeNull();
  });

  it("строит крошки раздела новостей", () => {
    const crumbs = resolveBreadcrumbs("/news", "ru");
    expect(crumbs?.items).toHaveLength(2);
    expect(crumbs?.items[1]).toEqual({ label: tRu("newsPage.title"), path: "/news" });
  });

  it("статья получает крошку из переданного заголовка, а не из фикстур", () => {
    const crumbs = resolveBreadcrumbs("/news/some-article", "ru", {
      entityTitle: "Заголовок статьи",
    });
    expect(crumbs?.items[1]).toEqual({ label: tRu("newsPage.title"), path: "/news" });
    expect(crumbs?.items[2]).toEqual({ label: "Заголовок статьи" });
  });

  it("статья без переданного заголовка крошек не строит", () => {
    expect(resolveBreadcrumbs("/news/some-article", "ru")).toBeNull();
  });
});
