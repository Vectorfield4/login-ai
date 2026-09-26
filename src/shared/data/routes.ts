/**
 * Localized route URL. Astro emission for `[lang]/…` prefixes every locale
 * (including the default one): `/ru/…` and `/en/…`, while the root `/` is
 * served by the default RU home page directly, and EN gets `/en`. Matches the
 * legacy `localizePath` layout: `/` + `/ru/*` + `/en/*`.
 */
export function routeUrl(path: string, lang: "ru" | "en"): string {
  if (path === "/") {
    return lang === "ru" ? "/" : "/en";
  }
  return lang === "ru" ? `/ru${path}` : `/en${path}`;
}

/**
 * Normalizes `window.location.pathname` to a clean (locale-free, slash-free)
 * path: drops the locale prefix and the trailing slash, collapses `/`, `/en` and
 * `/ru` to `/`. An empty string (state before hydration) is returned as is, so
 * route comparison yields `false` and the active state never flashes.
 */
export function getCleanPath(pathname: string): string {
  if (!pathname) return "";
  const withoutLocale = pathname.replace(/^\/(?:ru|en)(?=\/|$)/, "");
  const path = withoutLocale || "/";
  return path === "/" ? path : path.replace(/\/+$/, "");
}
