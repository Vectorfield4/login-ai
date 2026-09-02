import { getService } from "./data/services";
import { getSolution } from "./data/solutions";

/**
 * SEO-резолвер маршрутов (чистый модуль, без React).
 * Возвращает i18n-ключи для <title> и <meta name="description">
 * по текущему pathname. Локализует заголовок при рендере RouteMeta
 * через `t()` — русский/английский без перезагрузки.
 */

/** Бренд-суффикс — не переводится (совпадает с типографикой AppBar/футера). */
export const BRAND = "Login AI";

/** Единый формат document.title: `<PageTitle> | Login AI`. */
export function formatDocTitle(pageTitle: string): string {
  return `${pageTitle} | ${BRAND}`;
}

export interface RouteMeta {
  /** i18n-ключ заголовка страницы (title-часть document.title). */
  titleKey: string;
  /** i18n-ключ текста <meta name="description">. */
  descriptionKey: string;
}

/** Фолбэк для главной и любых нераспознанных путей (включая кадр редиректа `*`). */
const HOME_META: RouteMeta = {
  titleKey: "home.metaTitle",
  descriptionKey: "home.metaDescription",
};

/** Фолбэк для нераспознанного slug услуги (до срабатывания Navigate на странице). */
const SERVICES_FALLBACK: RouteMeta = {
  titleKey: "servicesPage.title",
  descriptionKey: "servicesPage.metaDescription",
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
 * Маппинг pathname → i18n-ключи мета-тегов.
 * Статичные страницы — существующие ключи + новые meta-ключи (§5 спеки);
 * детальные страницы переиспользуют per-slug ключи `services.<slug>.title/description`
 * и `solutions.<slug>.title/description` из данных.
 */
export function getRouteMeta(pathname: string): RouteMeta {
  const path = normalizePath(pathname);

  if (path === "/") return HOME_META;
  if (path === "/contacts") {
    return { titleKey: "contactsPage.title", descriptionKey: "contactsPage.metaDescription" };
  }
  if (path === "/services") return SERVICES_FALLBACK;

  const serviceSlug = matchSlug(path, "/services/");
  if (serviceSlug !== undefined) {
    const service = getService(serviceSlug);
    if (service) {
      return { titleKey: service.title, descriptionKey: service.description };
    }
    // Неизвестный slug услуги: страница сама сделает Navigate на "/",
    // до этого момента показываем фолбэк раздела «Услуги».
    return SERVICES_FALLBACK;
  }

  const solutionSlug = matchSlug(path, "/solutions/");
  if (solutionSlug !== undefined) {
    const solution = getSolution(solutionSlug);
    if (solution) {
      return { titleKey: solution.title, descriptionKey: solution.description };
    }
    // Неизвестный slug решения → фолбэк главной (туда ведёт Navigate).
    return HOME_META;
  }

  // Любой другой/неизвестный путь (в т.ч. кадр `*` → Navigate на "/") — фолбэк главной.
  return HOME_META;
}
