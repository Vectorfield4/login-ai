import { describe, expect, it } from "vitest";
import { getCases } from "../src/entities/case";
import { getServices } from "../src/entities/service";
import { getSolutions } from "../src/entities/solution";
import { SCHEMA_TYPE } from "../src/shared/data/schema";
import { resolvePageSchemaType, resolveSchemaOrg } from "../src/shared/data/seo";

const BASE = "https://loginai.ru";
const url = (cleanPath: string, lang: "ru" | "en" = "ru") => {
  const path = cleanPath === "/" ? (lang === "ru" ? "/" : "/en/") : `/${lang}${cleanPath}/`;
  return new URL(path, BASE).href;
};

const types = (schemas: object[]) =>
  schemas.map((schema) => (schema as { "@type": string })["@type"]);

const find = <T extends object>(schemas: object[], type: string): T | undefined =>
  schemas.find((schema) => (schema as { "@type"?: string })["@type"] === type) as T | undefined;

describe("resolvePageSchemaType", () => {
  it("классифицирует индексные и статические страницы", () => {
    expect(resolvePageSchemaType("/")).toBe(SCHEMA_TYPE.webPage);
    expect(resolvePageSchemaType("/services")).toBe(SCHEMA_TYPE.collectionPage);
    expect(resolvePageSchemaType("/news")).toBe(SCHEMA_TYPE.collectionPage);
    expect(resolvePageSchemaType("/team")).toBe(SCHEMA_TYPE.aboutPage);
    expect(resolvePageSchemaType("/contacts")).toBe(SCHEMA_TYPE.contactPage);
  });
});

describe("resolveSchemaOrg", () => {
  it("для главной отдаёт Organization + WebSite + WebPage", () => {
    const schemas = resolveSchemaOrg("ru", "/", url("/"), BASE);
    const list = types(schemas);
    expect(list).toContain(SCHEMA_TYPE.organization);
    expect(list).toContain(SCHEMA_TYPE.webSite);
    expect(list).toContain(SCHEMA_TYPE.webPage);
  });

  it("Organization несёт контактную точку и logo", () => {
    const schemas = resolveSchemaOrg("ru", "/", url("/"), BASE);
    const org = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.organization);
    expect(org?.logo).toBe(`${BASE}/loginai-mark.png`);
    const contactPoint = org?.contactPoint as Record<string, unknown> | undefined;
    expect(contactPoint?.["@type"]).toBe(SCHEMA_TYPE.contactPoint);
  });

  it("индекс услуг отдаёт CollectionPage и ItemList со всеми карточками", () => {
    const schemas = resolveSchemaOrg("ru", "/services", url("/services"), BASE);
    const list = types(schemas);
    expect(list).toContain(SCHEMA_TYPE.collectionPage);
    expect(list).toContain(SCHEMA_TYPE.itemList);

    const itemList = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.itemList);
    expect(itemList?.numberOfItems).toBe(getServices().length);
    const elements = itemList?.itemListElement as { "@type": string; url: string }[];
    expect(elements[0]["@type"]).toBe(SCHEMA_TYPE.listItem);
    expect(elements[0].url).toMatch(/\/services\/.+\/$/);
  });

  it("страница услуги получает Service, FAQPage и HowTo", () => {
    const service = getServices().find(
      (item) => item.faqItems?.length && item.processSteps?.length,
    );
    expect(service).toBeDefined();
    if (!service) return;

    const schemas = resolveSchemaOrg(
      "ru",
      `/services/${service.slug}`,
      url(`/services/${service.slug}`),
      BASE,
      undefined,
      {
        faqItems: service.faqItems,
        processSteps: service.processSteps,
      },
    );
    const list = types(schemas);
    expect(list).toContain(SCHEMA_TYPE.service);
    expect(list).toContain(SCHEMA_TYPE.faqPage);
    expect(list).toContain(SCHEMA_TYPE.howTo);

    const serviceSchema = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.service);
    expect(serviceSchema?.provider).toMatchObject({ "@id": `${BASE}#organization` });
  });

  it("страница решения получает Product и VideoObject", () => {
    const solution = getSolutions()[0];
    const schemas = resolveSchemaOrg(
      "ru",
      `/solutions/${solution.slug}`,
      url(`/solutions/${solution.slug}`),
      BASE,
      undefined,
      {
        videos: [{ title: "Демо", videoUrl: "https://example.com/demo.mp4" }],
      },
    );
    expect(types(schemas)).toContain(SCHEMA_TYPE.product);
    expect(types(schemas)).toContain(SCHEMA_TYPE.videoObject);
  });

  it("страница кейса получает CreativeWork", () => {
    const caseItem = getCases()[0];
    const schemas = resolveSchemaOrg(
      "ru",
      `/cases/${caseItem.slug}`,
      url(`/cases/${caseItem.slug}`),
      BASE,
    );
    expect(types(schemas)).toContain(SCHEMA_TYPE.creativeWork);
  });

  it("статья получает BlogPosting с автором-персоной", () => {
    const schemas = resolveSchemaOrg("ru", "/news/example", url("/news/example"), BASE, undefined, {
      entityTitle: "Пример",
      article: {
        title: "Пример статьи",
        description: "Описание",
        publishedIso: "2025-01-01T00:00:00.000Z",
        author: { name: "Иван", role: "CTO" },
        keywords: ["ai", "seo"],
      },
    });
    const article = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.blogPosting);
    expect(article?.headline).toBe("Пример статьи");
    const author = article?.author as Record<string, unknown> | undefined;
    expect(author?.["@type"]).toBe(SCHEMA_TYPE.person);
    expect(article?.keywords).toBe("ai, seo");
  });

  it("вложенная страница получает BreadcrumbList и ссылку с WebPage", () => {
    const schemas = resolveSchemaOrg("ru", "/services", url("/services"), BASE);
    const crumbs = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.breadcrumbList);
    expect(crumbs).toBeDefined();
    const page = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.collectionPage);
    expect(page?.breadcrumb).toEqual({ "@id": crumbs?.["@id"] });
  });

  it("страница контактов ссылается на контактную точку", () => {
    const schemas = resolveSchemaOrg("ru", "/contacts", url("/contacts"), BASE);
    const page = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.contactPage);
    expect(page?.mainEntity).toEqual({ "@id": `${BASE}#contact` });
  });

  it("страница новостей берёт ItemList из переданных карточек", () => {
    const schemas = resolveSchemaOrg("ru", "/news", url("/news"), BASE, undefined, {
      listItems: [{ title: "Статья", url: `${BASE}/ru/news/a/` }],
    });
    const itemList = find<Record<string, unknown>>(schemas, SCHEMA_TYPE.itemList);
    expect(itemList?.numberOfItems).toBe(1);
  });
});
