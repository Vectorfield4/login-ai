import type { ImageMetadata } from "astro";
import { getCaseBySlug, getCases } from "@/entities/case";
import { getServiceBySlug, getServices } from "@/entities/service";
import { getSolutionBySlug, getSolutions } from "@/entities/solution";
import { CONTACT_EMAIL } from "../config/constants";
import { astroDicts } from "../i18n/dict";
import { createT } from "../i18n/t";
import type { FaqItem, ProcessItem, ShowcaseItem } from "../types/content";
import { resolveBreadcrumbs } from "./breadcrumbs";
import { routeUrl } from "./routes";
import { SCHEMA_CONTEXT, SCHEMA_TYPE, type SchemaType, schemaIri } from "./schema";

export { SCHEMA_CONTEXT, SCHEMA_TYPE, schemaIri };

export const BRAND = "Login AI";

export function formatDocTitle(pageTitle: string): string {
  return `${pageTitle} | ${BRAND}`;
}

export interface RouteMeta {
  titleKey: string;
  descriptionKey: string;
  ogDescriptionKey?: string;
}

export interface PageSeoData {
  title: string;
  description: string;
  ogDescription: string;
  ogImage?: ImageMetadata;
}

/**
 * Head text a page knows better than the route catalog: article titles and
 * descriptions come from the content collection, which `getRouteMeta` cannot
 * read synchronously. `ogImage` is an override too, so a page that has no
 * `image` prop can still hand over a raster asset.
 */
export interface SeoTextOverrides {
  /** Already formatted with `BRAND` — BaseLayout writes it as is. */
  title?: string;
  description?: string;
  ogDescription?: string;
  ogImage?: ImageMetadata;
}

export const resolveOgUrl = (ogImage: ImageMetadata, baseUrl: string): string => {
  return new URL(ogImage.src, baseUrl).href;
};

const HOME_META: RouteMeta = {
  titleKey: "home.metaTitle",
  descriptionKey: "home.metaDescription",
  ogDescriptionKey: "home.ogDescription",
};

const SERVICES_FALLBACK: RouteMeta = {
  titleKey: "servicesPage.title",
  descriptionKey: "servicesPage.metaDescription",
  ogDescriptionKey: "servicesPage.ogDescription",
};

const CASES_META: RouteMeta = {
  titleKey: "casesPage.title",
  descriptionKey: "casesPage.metaDescription",
  ogDescriptionKey: "casesPage.ogDescription",
} as const;

const SOLUTIONS_META: RouteMeta = {
  titleKey: "solutionsPage.title",
  descriptionKey: "solutionsPage.metaDescription",
  ogDescriptionKey: "solutionsPage.ogDescription",
} as const;

const INVESTORS_META: RouteMeta = {
  titleKey: "investorsPage.title",
  descriptionKey: "investorsPage.metaDescription",
  ogDescriptionKey: "investorsPage.ogDescription",
} as const;

const TEAM_META: RouteMeta = {
  titleKey: "teamPage.title",
  descriptionKey: "teamPage.metaDescription",
  ogDescriptionKey: "teamPage.metaDescription",
} as const;

/** Fallback for the news index and for article pages that pass no override. */
const NEWS_META: RouteMeta = {
  titleKey: "newsPage.title",
  descriptionKey: "newsPage.metaDescription",
  ogDescriptionKey: "newsPage.ogDescription",
} as const;

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function matchSlug(path: string, prefix: string): string | undefined {
  if (!path.startsWith(prefix)) return undefined;
  const rest = path.slice(prefix.length);
  return rest.length > 0 && !rest.includes("/") ? rest : undefined;
}

export function getRouteMeta(cleanPath: string): RouteMeta {
  const path = normalizePath(cleanPath);

  if (path === "/") return HOME_META;
  if (path === "/contacts") {
    return { titleKey: "contactsPage.title", descriptionKey: "contactsPage.metaDescription" };
  }
  if (path === "/services") return SERVICES_FALLBACK;
  if (path === "/cases") return CASES_META;
  if (path === "/solutions") return SOLUTIONS_META;
  if (path === "/investors") return INVESTORS_META;
  if (path === "/team") return TEAM_META;
  if (path === "/news") return NEWS_META;

  const groupSlug = matchSlug(path, "/services/group/");
  if (groupSlug !== undefined) {
    return {
      titleKey: `servicesGroups.${groupSlug}.title`,
      descriptionKey: `servicesGroups.${groupSlug}.subtitle`,
    };
  }

  const serviceSlug = matchSlug(path, "/services/");
  if (serviceSlug !== undefined) {
    const service = getServiceBySlug(serviceSlug);
    return service
      ? { titleKey: service.title, descriptionKey: service.description }
      : SERVICES_FALLBACK;
  }

  const solutionSlug = matchSlug(path, "/solutions/");
  if (solutionSlug !== undefined) {
    const solution = getSolutionBySlug(solutionSlug);
    return solution
      ? { titleKey: solution.title, descriptionKey: solution.description }
      : HOME_META;
  }

  const caseSlug = matchSlug(path, "/cases/");
  if (caseSlug !== undefined) {
    const caseData = getCaseBySlug(caseSlug);
    return caseData
      ? { titleKey: caseData.title, descriptionKey: caseData.description }
      : HOME_META;
  }

  // Article titles live in the content collection, so `getRouteMeta` cannot
  // resolve them synchronously: the page passes title/description overrides to
  // BaseLayout. The fallback only keeps the head sane if an override is missed.
  if (matchSlug(path, "/news/") !== undefined) return NEWS_META;

  return HOME_META;
}

export function resolvePageMeta(
  lang: "ru" | "en",
  cleanPath: string,
  imageOverride?: ImageMetadata,
  overrides?: SeoTextOverrides,
): PageSeoData {
  const t = createT(lang, astroDicts);
  const meta = getRouteMeta(cleanPath);
  const title = overrides?.title ?? formatDocTitle(t(meta.titleKey));
  const description = overrides?.description ?? t(meta.descriptionKey);

  return {
    title,
    description,
    ogDescription: overrides?.ogDescription ?? t(meta.ogDescriptionKey ?? meta.descriptionKey),
    ogImage: imageOverride ?? overrides?.ogImage,
  };
}

/**
 * Schema.org type of the page itself. Collection routes (section indexes) get
 * `CollectionPage`, the company pages `AboutPage`, contacts `ContactPage`;
 * every other route is a plain `WebPage`. Detail pages additionally point
 * `mainEntity` at the entity schema.
 */
export function resolvePageSchemaType(cleanPath: string): SchemaType {
  const path = normalizePath(cleanPath);
  if (path === "/services" || path === "/solutions" || path === "/cases" || path === "/news") {
    return SCHEMA_TYPE.collectionPage;
  }
  if (path === "/investors" || path === "/team") return SCHEMA_TYPE.aboutPage;
  if (path === "/contacts") return SCHEMA_TYPE.contactPage;
  return SCHEMA_TYPE.webPage;
}

/** Resolved article data a page passes for a `BlogPosting` node. */
export interface ArticleSchemaInput {
  title: string;
  description: string;
  publishedIso: string;
  updatedIso?: string;
  author?: { name: string; role?: string; avatar?: string };
  section?: string;
  keywords?: string[];
  imageUrl?: string;
}

export interface SchemaOrgOptions {
  entityTitle?: string;
  /** Extra JSON-LD blocks appended after Organization/WebSite. */
  extraSchemas?: object[];
  /** FAQ of the current page (service/solution), rendered as `FAQPage`. */
  faqItems?: FaqItem[];
  /** Process steps of the current page, rendered as `HowTo`. */
  processSteps?: ProcessItem[];
  /** Showcase videos (solution page), rendered as `VideoObject`. */
  videos?: ShowcaseItem[];
  /** Cards of a collection whose data is not in a fixture (news index). */
  listItems?: { title: string; url: string; image?: string }[];
  /** Article data; only for `BlogPosting` pages. */
  article?: ArticleSchemaInput;
}

const LANG_TAG: Record<"ru" | "en", string> = { ru: "ru-RU", en: "en-GB" };

/** Canonical URLs always carry a trailing slash; keep schema URLs in step. */
function absoluteUrl(cleanPath: string, lang: "ru" | "en", baseUrl: string): string {
  const localized = routeUrl(cleanPath, lang);
  return new URL(localized.endsWith("/") ? localized : `${localized}/`, baseUrl).href;
}

function node(type: SchemaType, props: Record<string, unknown>): Record<string, unknown> {
  return { "@type": type, ...props };
}

export function resolveSchemaOrg(
  lang: "ru" | "en",
  cleanPath: string,
  canonicalUrl: string,
  baseUrl: string = "https://loginai.ru",
  imageOverride?: ImageMetadata,
  options?: SchemaOrgOptions,
): object[] {
  const t = createT(lang, astroDicts);
  const path = normalizePath(cleanPath);
  const seoData = resolvePageMeta(lang, cleanPath, imageOverride);
  const imageUrl = seoData.ogImage ? resolveOgUrl(seoData.ogImage, baseUrl) : undefined;
  const pageName = seoData.title.replace(` | ${BRAND}`, "");
  const orgId = `${baseUrl}#organization`;
  const siteId = `${baseUrl}#website`;
  const pageId = `${canonicalUrl}#webpage`;

  const orgSchema: Record<string, unknown> = node(SCHEMA_TYPE.organization, {
    "@id": orgId,
    name: BRAND,
    url: baseUrl,
    logo: new URL("/loginai-mark.png", baseUrl).href,
    email: CONTACT_EMAIL,
    contactPoint: node(SCHEMA_TYPE.contactPoint, {
      "@id": `${baseUrl}#contact`,
      contactType: "sales",
      email: CONTACT_EMAIL,
      availableLanguage: ["ru", "en"],
    }),
  });
  if (imageUrl) orgSchema.image = imageUrl;

  const websiteSchema = node(SCHEMA_TYPE.webSite, {
    "@id": siteId,
    name: BRAND,
    url: baseUrl,
    inLanguage: LANG_TAG[lang],
    publisher: { "@id": orgId },
  });

  const pageSchema: Record<string, unknown> = {
    "@context": SCHEMA_CONTEXT,
    ...node(resolvePageSchemaType(path), {
      "@id": pageId,
      url: canonicalUrl,
      name: pageName,
      description: seoData.description,
      inLanguage: LANG_TAG[lang],
      isPartOf: { "@id": siteId },
    }),
  };
  if (imageUrl) {
    pageSchema.primaryImageOfPage = node(SCHEMA_TYPE.imageObject, {
      "@id": `${canonicalUrl}#primaryimage`,
      url: imageUrl,
      width: 1200,
      height: 630,
    });
  }

  const schemas: object[] = [
    { "@context": SCHEMA_CONTEXT, ...orgSchema },
    { "@context": SCHEMA_CONTEXT, ...websiteSchema },
    pageSchema,
  ];

  // Breadcrumb of the visible trail, linked from the page node.
  const breadcrumbs = breadcrumbSchema(lang, path, baseUrl, options?.entityTitle);
  if (breadcrumbs) {
    pageSchema.breadcrumb = { "@id": breadcrumbs["@id"] };
    schemas.push({ "@context": SCHEMA_CONTEXT, ...breadcrumbs });
  }

  // Detail pages: the entity is the page's main entity.
  const entity = entitySchema(t, path, canonicalUrl, orgId, imageUrl);
  if (entity) {
    pageSchema.mainEntity = { "@id": entity["@id"] };
    schemas.push({ "@context": SCHEMA_CONTEXT, ...entity });

    if (options?.faqItems?.length) {
      schemas.push({ "@context": SCHEMA_CONTEXT, ...faqSchema(t, canonicalUrl, options.faqItems) });
    }
    if (options?.processSteps?.length) {
      const processTitleKey =
        matchSlug(path, "/services/") !== undefined
          ? "servicePage.processTitle"
          : "solutionPage.processTitle";
      schemas.push({
        "@context": SCHEMA_CONTEXT,
        ...howToSchema(t, canonicalUrl, t(processTitleKey), options.processSteps),
      });
    }
    if (options?.videos?.length) {
      schemas.push(
        ...videosSchema(t, options.videos).map((video) => ({
          "@context": SCHEMA_CONTEXT,
          ...video,
        })),
      );
    }
  }

  // Collection pages: an `ItemList` of the cards shown on the index.
  const list = collectionList(t, lang, baseUrl, path, options?.listItems);
  if (list) {
    pageSchema.mainEntity = { "@id": list["@id"] };
    schemas.push({ "@context": SCHEMA_CONTEXT, ...list });
  }

  // Contacts: expose the business contact point as the page's main entity.
  if (path === "/contacts") {
    pageSchema.mainEntity = { "@id": `${baseUrl}#contact` };
  }

  // Articles: `BlogPosting` replaces the generic entity of a detail page.
  if (options?.article) {
    const article = articleSchema(canonicalUrl, orgId, options.article);
    pageSchema.mainEntity = { "@id": article["@id"] };
    schemas.push({ "@context": SCHEMA_CONTEXT, ...article });
  }

  if (options?.extraSchemas) schemas.push(...options.extraSchemas);

  return schemas;
}

/** Entity node for a service/solution/case detail route, else `undefined`. */
function entitySchema(
  t: (key: string) => string,
  path: string,
  canonicalUrl: string,
  orgId: string,
  imageUrl?: string,
): Record<string, unknown> | undefined {
  const serviceSlug = matchSlug(path, "/services/");
  if (serviceSlug !== undefined) {
    const service = getServiceBySlug(serviceSlug);
    if (!service) return undefined;
    const schema = node(SCHEMA_TYPE.service, {
      "@id": `${canonicalUrl}#service`,
      name: t(service.title),
      description: t(service.description),
      serviceType: t(service.title),
      url: canonicalUrl,
      provider: { "@id": orgId },
    });
    if (imageUrl) schema.image = imageUrl;
    return schema;
  }

  const solutionSlug = matchSlug(path, "/solutions/");
  if (solutionSlug !== undefined) {
    const solution = getSolutionBySlug(solutionSlug);
    if (!solution) return undefined;
    const schema = node(SCHEMA_TYPE.product, {
      "@id": `${canonicalUrl}#product`,
      name: t(solution.title),
      description: t(solution.description),
      url: canonicalUrl,
      brand: { "@id": orgId },
      category: t(solution.navTitle),
    });
    if (imageUrl) schema.image = imageUrl;
    return schema;
  }

  const caseSlug = matchSlug(path, "/cases/");
  if (caseSlug !== undefined) {
    const caseData = getCaseBySlug(caseSlug);
    if (!caseData) return undefined;
    const schema = node(SCHEMA_TYPE.creativeWork, {
      "@id": `${canonicalUrl}#creativework`,
      name: t(caseData.title),
      description: t(caseData.description),
      url: canonicalUrl,
      creator: { "@id": orgId },
      about: t(caseData.industryKey),
    });
    if (imageUrl) schema.image = imageUrl;
    return schema;
  }

  return undefined;
}

/**
 * `ItemList` for a section index. Services, solutions and cases resolve from
 * their fixtures; the news index passes `fallback` because its data is async.
 */
function collectionList(
  t: (key: string) => string,
  lang: "ru" | "en",
  baseUrl: string,
  path: string,
  fallback?: { title: string; url: string; image?: string }[],
): Record<string, unknown> | undefined {
  let id: string | undefined;
  let items: { name: string; url: string; image?: string }[] | undefined;

  if (path === "/services") {
    id = "services";
    items = getServices().map((service) => ({
      name: t(service.navTitle),
      url: absoluteUrl(`/services/${service.slug}`, lang, baseUrl),
    }));
  } else if (path === "/solutions") {
    id = "solutions";
    items = getSolutions().map((solution) => ({
      name: t(solution.navTitle),
      url: absoluteUrl(`/solutions/${solution.slug}`, lang, baseUrl),
    }));
  } else if (path === "/cases") {
    id = "cases";
    items = getCases().map((caseData) => ({
      name: t(caseData.title),
      url: absoluteUrl(`/cases/${caseData.slug}`, lang, baseUrl),
    }));
  } else if (path === "/news" && fallback?.length) {
    id = "news";
    items = fallback.map((item) => ({ name: item.title, url: item.url, image: item.image }));
  }

  if (!id || !items?.length) return undefined;

  return node(SCHEMA_TYPE.itemList, {
    "@id": `${baseUrl}${routeUrl(path, lang)}#itemlist`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) =>
      node(SCHEMA_TYPE.listItem, {
        position: index + 1,
        name: item.name,
        url: item.url,
        ...(item.image ? { image: item.image } : {}),
      }),
    ),
  });
}

/** `FAQPage` from the FAQ block of the current detail page. */
function faqSchema(
  t: (key: string) => string,
  canonicalUrl: string,
  items: FaqItem[],
): Record<string, unknown> {
  return node(SCHEMA_TYPE.faqPage, {
    "@id": `${canonicalUrl}#faq`,
    mainEntity: items.map((item) =>
      node(SCHEMA_TYPE.question, {
        name: t(item.question),
        acceptedAnswer: node(SCHEMA_TYPE.answer, { text: t(item.answer) }),
      }),
    ),
  });
}

/** `HowTo` from the process block of the current detail page. */
function howToSchema(
  t: (key: string) => string,
  canonicalUrl: string,
  name: string,
  steps: ProcessItem[],
): Record<string, unknown> {
  return node(SCHEMA_TYPE.howTo, {
    "@id": `${canonicalUrl}#process`,
    name,
    step: steps.map((step, index) =>
      node(SCHEMA_TYPE.howToStep, {
        position: index + 1,
        name: t(step.title),
        text: t(step.text),
      }),
    ),
  });
}

/** `VideoObject` nodes for the showcase items that carry a URL. */
function videosSchema(
  t: (key: string) => string,
  items: ShowcaseItem[],
): Record<string, unknown>[] {
  return items
    .filter((item) => item.videoUrl)
    .map((item) =>
      node(SCHEMA_TYPE.videoObject, {
        name: t(item.title),
        contentUrl: item.videoUrl,
      }),
    );
}

/** `BlogPosting` for an article page. */
function articleSchema(
  canonicalUrl: string,
  orgId: string,
  article: ArticleSchemaInput,
): Record<string, unknown> {
  return node(SCHEMA_TYPE.blogPosting, {
    "@id": `${canonicalUrl}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedIso,
    dateModified: article.updatedIso ?? article.publishedIso,
    mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
    author: article.author
      ? node(SCHEMA_TYPE.person, {
          name: article.author.name,
          ...(article.author.role ? { jobTitle: article.author.role } : {}),
          ...(article.author.avatar ? { image: article.author.avatar } : {}),
        })
      : { "@id": orgId },
    publisher: { "@id": orgId },
    ...(article.section ? { articleSection: article.section } : {}),
    ...(article.keywords?.length ? { keywords: article.keywords.join(", ") } : {}),
    ...(article.imageUrl ? { image: article.imageUrl } : {}),
  });
}

/**
 * `BreadcrumbList` for the visible trail rendered by `Breadcrumbs`. Returns
 * `null` for pages outside the hierarchy (home, 404) so no script tag is
 * emitted there.
 */
function breadcrumbSchema(
  lang: "ru" | "en",
  path: string,
  baseUrl: string,
  entityTitle?: string,
): Record<string, unknown> | null {
  const crumbs = resolveBreadcrumbs(path, lang, { entityTitle });
  if (!crumbs) return null;

  const itemListElement = crumbs.items.map((item, index) => {
    const entry: Record<string, unknown> = {
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
    };
    if (item.path) {
      const href = routeUrl(item.path, lang);
      entry.item = new URL(href.endsWith("/") ? href : `${href}/`, baseUrl).href;
    }
    return entry;
  });

  return {
    "@id": `${baseUrl}${routeUrl(path, lang)}#breadcrumb`,
    "@type": SCHEMA_TYPE.breadcrumbList,
    itemListElement,
  };
}
