import { astroDicts } from "../i18n/dict";
import { createT } from "../i18n/t";
import { getCaseBySlug, getServiceBySlug, getSolutionBySlug } from "./entities";

/** SEO-резолвер маршрутов: прямое чтение фикстур через `./entities`. */

/** Бренд-суффикс — не переводится (совпадает с типографикой AppBar/футера). */
export const BRAND = "Login AI";

/** Единый формат document.title: `<PageTitle> | Login AI`. */
export function formatDocTitle(pageTitle: string): string {
  return `${pageTitle} | ${BRAND}`;
}

export interface RouteMeta {
  /** Ключ заголовка страницы (title-часть document.title). */
  titleKey: string;
  /** Ключ текста <meta name="description">. */
  descriptionKey: string;
}

/** Фолбэк для главной и любых нераспознанных путей. */
const HOME_META: RouteMeta = {
  titleKey: "home.metaTitle",
  descriptionKey: "home.metaDescription",
};

/** Фолбэк для нераспознанного slug услуги. */
const SERVICES_FALLBACK: RouteMeta = {
  titleKey: "servicesPage.title",
  descriptionKey: "servicesPage.metaDescription",
};

/** Мета раздела «Кейсы» — статичная листинг-страница. */
const CASES_META: RouteMeta = {
  titleKey: "casesPage.title",
  descriptionKey: "casesPage.metaDescription",
};

/** Мета страницы инвесторов — статичный питч. */
const INVESTORS_META: RouteMeta = {
  titleKey: "investorsPage.title",
  descriptionKey: "investorsPage.metaDescription",
};

/** Нормализация: корень остаётся "/", у остальных путей срезаются хвостовые слэши. */
function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

/** Достаёт slug из `/segment/:slug` (ровно один сегмент после префикса) или undefined. */
function matchSlug(path: string, prefix: string): string | undefined {
  if (!path.startsWith(prefix)) return undefined;
  const rest = path.slice(prefix.length);
  return rest.length > 0 && !rest.includes("/") ? rest : undefined;
}

/**
 * Маппинг чистого пути (без языкового префикса) → ключи мета-тегов.
 * Статичные страницы — существующие ключи; детальные переиспользуют
 * per-slug `services.<slug>.*` / `solutions.<slug>.*` / `cases.<slug>.*`.
 */
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

function extractEntityImage(entity: unknown): string | undefined {
  if (entity == null || typeof entity !== "object") return undefined;
  const img = (entity as Record<string, unknown>).image;
  if (typeof img === "string") return img;
  if (
    img != null &&
    typeof img === "object" &&
    "src" in img &&
    typeof (img as { src?: unknown }).src === "string"
  ) {
    return (img as { src: string }).src;
  }
  return undefined;
}

/**
 * Переведённые `<title>`/`<meta name="description">` для BaseLayout:
 * `formatDocTitle` + `t()` по ключам getRouteMeta (build-time).
 */
export function resolvePageMeta(
  lang: "ru" | "en",
  cleanPath: string,
  baseUrl: string = "https://loginai.ru",
): { title: string; description: string; image?: string } {
  const t = createT(lang, astroDicts);
  const path = normalizePath(cleanPath);
  const meta = getRouteMeta(cleanPath);

  let entityImage: string | undefined;
  const serviceSlug = matchSlug(path, "/services/");
  if (serviceSlug !== undefined) {
    entityImage = extractEntityImage(getServiceBySlug(serviceSlug));
  }
  const solutionSlug = matchSlug(path, "/solutions/");
  if (solutionSlug !== undefined) {
    entityImage = extractEntityImage(getSolutionBySlug(solutionSlug));
  }
  const caseSlug = matchSlug(path, "/cases/");
  if (caseSlug !== undefined) {
    entityImage = extractEntityImage(getCaseBySlug(caseSlug));
  }

  const imageUrl = entityImage ? new URL(entityImage, baseUrl).href : undefined;

  return {
    title: formatDocTitle(t(meta.titleKey)),
    description: t(meta.descriptionKey),
    image: imageUrl,
  };
}

/**
 * Генерация Schema.org JSON-LD объектов для любой страницы (Organization, WebSite, Service, Product, CreativeWork).
 */
export function resolveSchemaOrg(
  lang: "ru" | "en",
  cleanPath: string,
  canonicalUrl: string,
  baseUrl: string = "https://loginai.ru",
): object[] {
  const t = createT(lang, astroDicts);
  const path = normalizePath(cleanPath);
  const meta = resolvePageMeta(lang, cleanPath, baseUrl);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: "https://loginai.ru",
  };

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
        ...(meta.image ? { image: meta.image } : {}),
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
        ...(meta.image ? { image: meta.image } : {}),
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
        ...(meta.image ? { image: meta.image } : {}),
      });
    }
  }

  return schemas;
}
