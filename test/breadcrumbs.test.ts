import { describe, expect, it } from "vitest";
import { resolveBreadcrumbs } from "../src/shared/data/breadcrumbs";
import { astroDicts } from "../src/shared/i18n/dict";
import { createT } from "../src/shared/i18n/t";

const tRu = createT("ru", astroDicts);
const tEn = createT("en", astroDicts);

describe("resolveBreadcrumbs", () => {
  it("не строит крошки для главной и 404", () => {
    expect(resolveBreadcrumbs("/", tRu)).toBeNull();
    expect(resolveBreadcrumbs("/404", tRu)).toBeNull();
    expect(resolveBreadcrumbs("/unknown-page", tRu)).toBeNull();
  });

  it("строит крошки индекса раздела без backTo", () => {
    const crumbs = resolveBreadcrumbs("/services", tRu);
    expect(crumbs).not.toBeNull();
    expect(crumbs?.items).toHaveLength(2);
    expect(crumbs?.items[0]).toEqual({ label: "Главная", path: "/" });
    expect(crumbs?.items[1]).toEqual({ label: "Услуги", path: "/services" });
    expect(crumbs?.backTo).toBeUndefined();
  });

  it("строит крошки детальной страницы с backTo в раздел", () => {
    const crumbs = resolveBreadcrumbs("/solutions/customer-experience", tRu);
    expect(crumbs?.backTo).toBe("/solutions");
    expect(crumbs?.items[1]).toEqual({ label: "Решения", path: "/solutions" });
    expect(crumbs?.items[2]?.path).toBeUndefined();
    expect(crumbs?.items[2]?.label).not.toBe("");
  });

  it("переводит подписи на английский", () => {
    const crumbs = resolveBreadcrumbs("/cases", tEn);
    expect(crumbs?.items[0]).toEqual({ label: "Home", path: "/" });
    expect(crumbs?.items[1]).toEqual({ label: "Cases", path: "/cases" });
  });

  it("терпит хвостовой слэш", () => {
    expect(resolveBreadcrumbs("/investors/", tRu)?.items[1].label).toBe("Инвесторам");
    expect(resolveBreadcrumbs("/solutions/", tRu)?.items[1].label).toBe("Решения");
  });

  it("возвращает null для неизвестного слага", () => {
    expect(resolveBreadcrumbs("/cases/no-such-case", tRu)).toBeNull();
  });
});
