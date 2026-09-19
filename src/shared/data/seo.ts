import { astroDicts } from "../i18n/dict";
import { createT } from "../i18n/t";
import { getCaseBySlug, getServiceBySlug, getSolutionBySlug } from "./entities";

/**
 * SEO-резолвер маршрутов Astro-стороны. Портируемый модуль из
 * `src/app/seo.ts` (чистый, без React/zustand): вместо store-геттеров —
 * прямое чтение фикстур через `./entities`.
 */

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

/**
 * Переведённые `<title>`/`<meta name="description">` для BaseLayout:
 * `formatDocTitle` + `t()` по ключам getRouteMeta (build-time).
 */
export function resolvePageMeta(
  lang: "ru" | "en",
  cleanPath: string,
): { title: string; description: string } {
  const t = createT(lang, astroDicts);
  const meta = getRouteMeta(cleanPath);
  return { title: formatDocTitle(t(meta.titleKey)), description: t(meta.descriptionKey) };
}
