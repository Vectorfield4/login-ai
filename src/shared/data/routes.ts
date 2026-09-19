import { getCases, getServices, getSolutions } from "./entities";

/**
 * Каталог чистых (без языкового префикса) маршрутов. Тот же источник, что был
 * в легаси `src/app/routes/routeList.ts` (SUPPORTED_LANGS × пути+slugs), но
 * собрано прямо из фикстур: 5 статичных + slugs услуг/решений/кейсов.
 * Состав сверяется с фикстурами автоматически — маршруты не пишутся руками.
 */
export const STATIC_ROUTE_PATHS = ["/", "/services", "/cases", "/contacts", "/investors"] as const;

export const CLEAN_ROUTE_PATHS: string[] = [
  ...STATIC_ROUTE_PATHS,
  ...getServices().map((s) => `/services/${s.slug}`),
  ...getSolutions().map((s) => `/solutions/${s.slug}`),
  ...getCases().map((c) => `/cases/${c.slug}`),
];

/**
 * URL маршрута в локали. Astro-эмиссия для `[lang]/…` префиксит локаль всех
 * (в т.ч. дефолтной): `/ru/…` и `/en/…`; корень `/` отдаётся дефолтной RU
 * главной напрямую (`/`), для en — `/en`. Итог совпадает с легаси-раскладкой
 * `localizePath`: `/` + `/ru/*` + `/en/*`.
 */
export function routeUrl(path: string, lang: "ru" | "en"): string {
  if (path === "/") {
    return lang === "ru" ? "/" : "/en";
  }
  return lang === "ru" ? `/ru${path}` : `/en${path}`;
}
