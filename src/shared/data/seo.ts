import { astroDicts } from "../i18n/dict";
import { createT } from "../i18n/t";
import { getCaseBySlug, getServiceBySlug, getSolutionBySlug } from "./entities";

export const BRAND = "Login AI";

export function formatDocTitle(pageTitle: string): string {
  return `${pageTitle} | ${BRAND}`;
}

export interface RouteMeta {
  titleKey: string;
  descriptionKey: string;
}

export interface PageSeoData {
  title: string;
  description: string;
  ogImage: string;
}

export const DEFAULT_SEO_CONFIG = {
  siteName: BRAND,
  defaultImage: "/og-image.png",
} as const;

const HOME_META: RouteMeta = {
  titleKey: "home.metaTitle",
  descriptionKey: "home.metaDescription",
};

const SERVICES_FALLBACK: RouteMeta = {
  titleKey: "servicesPage.title",
  descriptionKey: "servicesPage.metaDescription",
};

const CASES_META: RouteMeta = {
  titleKey: "casesPage.title",
  descriptionKey: "casesPage.metaDescription",
};

const INVESTORS_META: RouteMeta = {
  titleKey: "investorsPage.title",
  descriptionKey: "investorsPage.metaDescription",
};

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
  imageOverride?: string,
): PageSeoData {
  const t = createT(lang, astroDicts);
  const meta = getRouteMeta(cleanPath);

  let entityImage: string | undefined = imageOverride;
  const path = normalizePath(cleanPath);

  if (!entityImage) {
    const solutionSlug = matchSlug(path, "/solutions/");
    if (solutionSlug !== undefined) {
      entityImage = getSolutionBySlug(solutionSlug)?.image;
    }
  }

  return {
    title: formatDocTitle(t(meta.titleKey)),
    description: t(meta.descriptionKey),
    ogImage: entityImage ?? DEFAULT_SEO_CONFIG.defaultImage,
  };
}

export function resolveSchemaOrg(
  lang: "ru" | "en",
  cleanPath: string,
  canonicalUrl: string,
  baseUrl: string = "https://loginai.ru",
  imageOverride?: string,
): object[] {
  const t = createT(lang, astroDicts);
  const path = normalizePath(cleanPath);
  const seoData = resolvePageMeta(lang, cleanPath, imageOverride);
  const imageUrl = new URL(seoData.ogImage, baseUrl).href;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: "https://loginai.ru",
    image: imageUrl,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    url: "https://loginai.ru",
    image: imageUrl,
  };

  const schemas: object[] = [orgSchema, websiteSchema];

  const serviceSlug = matchSlug(path, "/services/");
  if (serviceSlug !== undefined) {
    const service = getServiceBySlug(serviceSlug);
    if (service) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: t(service.title),
        description: t(service.description),
        provider: {
          "@type": "Organization",
          name: BRAND,
        },
        url: canonicalUrl,
        image: imageUrl,
      });
    }
  }

  const solutionSlug = matchSlug(path, "/solutions/");
  if (solutionSlug !== undefined) {
    const solution = getSolutionBySlug(solutionSlug);
    if (solution) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: t(solution.title),
        description: t(solution.description),
        brand: {
          "@type": "Organization",
          name: BRAND,
        },
        url: canonicalUrl,
        image: imageUrl,
      });
    }
  }

  const caseSlug = matchSlug(path, "/cases/");
  if (caseSlug !== undefined) {
    const caseData = getCaseBySlug(caseSlug);
    if (caseData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: t(caseData.title),
        description: t(caseData.description),
        publisher: {
          "@type": "Organization",
          name: BRAND,
        },
        url: canonicalUrl,
        image: imageUrl,
      });
    }
  }

  return schemas;
}
