import { getCases, getServices, getSolutions } from "./entities";

/**
 * Catalog of clean (locale-free) routes. Same source as the legacy
 * `src/app/routes/routeList.ts` (SUPPORTED_LANGS × paths+slugs), but assembled
 * straight from the fixtures: 5 static paths + service/solution/case slugs.
 * The composition is checked against the fixtures automatically, so routes are
 * never written by hand.
 */
export const STATIC_ROUTE_PATHS = [
  "/",
  "/services",
  "/solutions",
  "/cases",
  "/news",
  "/contacts",
  "/investors",
] as const;

/**
 * Catalog of clean (locale-free) routes. Same source as the legacy
 * `src/app/routes/routeList.ts` (SUPPORTED_LANGS × paths+slugs), but assembled
 * straight from the fixtures: 5 static paths + service/solution/case slugs.
 * The composition is checked against the fixtures automatically, so routes are
 * never written by hand.
 *
 * Article slugs (`/news/<slug>`) are NOT listed: they live in the markdown
 * collection, which is readable only inside the Astro build (see
 * `shared/data/newsCollection.ts`). Route comparison for the nav state uses
 * prefixes, so the list is not needed to highlight the news section.
 */
export const CLEAN_ROUTE_PATHS: string[] = [
  ...STATIC_ROUTE_PATHS,
  ...getServices().map((s) => `/services/${s.slug}`),
  ...getSolutions().map((s) => `/solutions/${s.slug}`),
  ...getCases().map((c) => `/cases/${c.slug}`),
];

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
 * Normalizes `window.location.pathname` to a clean path from the catalog above:
 * drops the locale prefix and the trailing slash, collapses `/`, `/en` and
 * `/ru` to `/`. An empty string (state before hydration) is returned as is, so
 * route comparison yields `false` and the active state never flashes.
 */
export function getCleanPath(pathname: string): string {
  if (!pathname) return "";
  const withoutLocale = pathname.replace(/^\/(?:ru|en)(?=\/|$)/, "");
  const path = withoutLocale || "/";
  return path === "/" ? path : path.replace(/\/+$/, "");
}
