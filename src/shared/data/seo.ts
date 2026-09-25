import type { ImageMetadata } from "astro";
import { astroDicts } from "../i18n/dict";
import { createT } from "../i18n/t";
import { resolveBreadcrumbs } from "./breadcrumbs";
import { getCaseBySlug, getServiceBySlug, getSolutionBySlug } from "./entities";
import { routeUrl } from "./routes";

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

export const resolveOgUrl = (ogImage: ImageMetadata, baseUrl: string): string => {
  return new URL(ogImage.src, baseUrl).href;
};

function isAstroImageAsset(value: unknown): value is ImageMetadata {
  if (typeof value !== "object" || value === null) return false;
  return "src" in value && typeof (value as Record<string, unknown>).src === "string";
}

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

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+\$/, "");
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

  return HOME_META;
}

export function resolvePageMeta(
  lang: "ru" | "en",
  cleanPath: string,
  imageOverride?: ImageMetadata,
): PageSeoData {
  const t = createT(lang, astroDicts);
  const meta = getRouteMeta(cleanPath);
  const path = normalizePath(cleanPath);

  if (imageOverride) {
    return {
      title: formatDocTitle(t(meta.titleKey)),
      description: t(meta.descriptionKey),
      ogDescription: meta.ogDescriptionKey ? t(meta.ogDescriptionKey) : t(meta.descriptionKey),
      ogImage: imageOverride,
    };
  }

  const solutionSlug = matchSlug(path, "/solutions/");
  if (solutionSlug !== undefined) {
    const rawImage = getSolutionBySlug(solutionSlug)?.image;

    if (isAstroImageAsset(rawImage)) {
      return {
        title: formatDocTitle(t(meta.titleKey)),
        description: t(meta.descriptionKey),
        ogDescription: meta.ogDescriptionKey ? t(meta.ogDescriptionKey) : t(meta.descriptionKey),
        ogImage: rawImage,
      };
    }
  }

  return {
    title: formatDocTitle(t(meta.titleKey)),
    description: t(meta.descriptionKey),
    ogDescription: meta.ogDescriptionKey ? t(meta.ogDescriptionKey) : t(meta.descriptionKey),
  };
}

export function resolveSchemaOrg(
  lang: "ru" | "en",
  cleanPath: string,
  canonicalUrl: string,
  baseUrl: string = "https://loginai.ru",
  imageOverride?: ImageMetadata,
): object[] {
  const t = createT(lang, astroDicts);
  const path = normalizePath(cleanPath);
  const seoData = resolvePageMeta(lang, cleanPath, imageOverride);
  const imageUrl = seoData.ogImage ? resolveOgUrl(seoData.ogImage, baseUrl) : undefined;

  const orgSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: "https://loginai.ru",
  };
  if (imageUrl) orgSchema.image = imageUrl;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    url: "https://loginai.ru",
  };

  const schemas: object[] = [orgSchema, websiteSchema];

  const serviceSlug = matchSlug(path, "/services/");
  if (serviceSlug !== undefined) {
    const service = getServiceBySlug(serviceSlug);
    if (service) {
      const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: t(service.title),
        description: t(service.description),
        provider: {
          "@type": "Organization",
          name: BRAND,
        },
        url: canonicalUrl,
      };
      if (imageUrl) schema.image = imageUrl;
      schemas.push(schema);
    }
  }

  const solutionSlug = matchSlug(path, "/solutions/");
  if (solutionSlug !== undefined) {
    const solution = getSolutionBySlug(solutionSlug);
    if (solution) {
      const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: t(solution.title),
        description: t(solution.description),
        brand: {
          "@type": "Organization",
          name: BRAND,
        },
        url: canonicalUrl,
      };
      if (imageUrl) schema.image = imageUrl;
      schemas.push(schema);
    }
  }

  const caseSlug = matchSlug(path, "/cases/");
  if (caseSlug !== undefined) {
    const caseData = getCaseBySlug(caseSlug);
    if (caseData) {
      const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: t(caseData.title),
        description: t(caseData.description),
        publisher: {
          "@type": "Organization",
          name: BRAND,
        },
        url: canonicalUrl,
      };
      if (imageUrl) schema.image = imageUrl;
      schemas.push(schema);
    }
  }

  schemas.push(...breadcrumbSchema(lang, path, baseUrl));

  return schemas;
}

/**
 * `BreadcrumbList` for the visible trail rendered by `Breadcrumbs`. Returns an
 * empty array for pages outside the hierarchy (home, 404) so no script tag is
 * emitted there.
 */
function breadcrumbSchema(lang: "ru" | "en", path: string, baseUrl: string): object[] {
  const t = createT(lang, astroDicts);
  const crumbs = resolveBreadcrumbs(path, t);
  if (!crumbs) return [];

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

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    },
  ];
}
