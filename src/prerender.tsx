import type { EmotionCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { AppTree } from "@/app/AppTree";
import { routes } from "@/app/routes/config";
import { getPrerenderRoutes } from "@/app/routes/routeList";
import i18n, { getLangFromPath, getPathWithoutLang } from "@/shared/i18n";

import "@/app/i18n";

const BRAND = "Login AI";

type HeadElement = {
  type: string;
  props?: Record<string, unknown>;
  children?: unknown;
};

function formatDocTitle(pageTitle: string): string {
  return `${pageTitle} | ${BRAND}`;
}

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function getPathMeta(url: string): { titleKey: string; descriptionKey: string } {
  const path = normalizePath(url);

  if (path === "/") return { titleKey: "home.metaTitle", descriptionKey: "home.metaDescription" };
  if (path === "/contacts")
    return { titleKey: "contactsPage.title", descriptionKey: "contactsPage.metaDescription" };
  if (path === "/services")
    return { titleKey: "servicesPage.title", descriptionKey: "servicesPage.metaDescription" };
  if (path === "/cases")
    return { titleKey: "casesPage.title", descriptionKey: "casesPage.metaDescription" };
  if (path === "/investors")
    return { titleKey: "investorsPage.title", descriptionKey: "investorsPage.metaDescription" };

  const serviceSlug = path.match(/^\/services\/([^/]+)$/)?.[1];
  if (serviceSlug)
    return {
      titleKey: `services.${serviceSlug}.title`,
      descriptionKey: `services.${serviceSlug}.description`,
    };

  const solutionSlug = path.match(/^\/solutions\/([^/]+)$/)?.[1];
  if (solutionSlug)
    return {
      titleKey: `solutions.${solutionSlug}.title`,
      descriptionKey: `solutions.${solutionSlug}.description`,
    };

  const caseSlug = path.match(/^\/cases\/([^/]+)$/)?.[1];
  if (caseSlug)
    return { titleKey: `cases.${caseSlug}.title`, descriptionKey: `cases.${caseSlug}.description` };

  return { titleKey: "home.metaTitle", descriptionKey: "home.metaDescription" };
}

/**
 * Извлекает критический CSS из emotion-кэша как head-дескрипторы
 * vite-prerender-plugin ({ type, props }): вызов плагина сериализует их в
 * <style data-emotion="...">css</style> внутри <head>.
 */
function extractCriticalStyles(cache: EmotionCache, html: string): HeadElement[] {
  const idRegex = new RegExp(`${cache.key}-([a-zA-Z0-9-_]+)`, "gm");
  const idsInHtml: Record<string, boolean> = {};
  let m = idRegex.exec(html);
  while (m !== null) {
    idsInHtml[m[1]] = true;
    m = idRegex.exec(html);
  }

  const elements: HeadElement[] = [];
  const regularCssIds: string[] = [];
  let regularCss = "";

  for (const id of Object.keys(cache.inserted)) {
    const css = cache.inserted[id];
    if (css === true) continue;
    if (!css) continue;

    const useRegular =
      idsInHtml[id] !== undefined || cache.registered[`${cache.key}-${id}`] === undefined;

    if (useRegular) {
      if (cache.registered[`${cache.key}-${id}`]) {
        regularCssIds.push(id);
        regularCss += css;
      } else {
        elements.push({
          type: "style",
          props: { "data-emotion": `${cache.key} ${id}`, children: css },
        });
      }
    }
  }

  if (regularCss) {
    elements.push({
      type: "style",
      props: { "data-emotion": `${cache.key} ${regularCssIds.join(" ")}`, children: regularCss },
    });
  }

  return elements;
}

export async function prerender({ url }: { url: string }): Promise<{
  html: string;
  links: string[];
  head: { lang: string; title: string; elements: Set<HeadElement> };
}> {
  const lang = getLangFromPath(url);
  await i18n.changeLanguage(lang);

  // Корня "/" как страницы нет: все URL живут под "/:lang". Плагин стартует
  // с "/", поэтому рендерим для него дефолтный русский дом (как раньше).
  const routeUrl = url === "/" ? "/ru" : url;

  const router = createMemoryRouter(routes, { initialEntries: [routeUrl] });
  const queryClient = new QueryClient();
  const cache = createCache({ key: "css" });
  // createEmotionServer(@emotion/server) переключает кэш в compat-режим,
  // чтобы SSR-стили складывались в cache.inserted как готовый CSS (а не true).
  // Мутация ниже повторяет ровно этот шаг, не подтягивая в бандл стриминговые
  // зависимости @emotion/server.
  (cache as { compat?: boolean }).compat = true;

  const { renderToString } = await import("react-dom/server.edge");
  const html = renderToString(
    <CacheProvider value={cache}>
      <AppTree queryClient={queryClient}>
        <RouterProvider router={router} />
      </AppTree>
    </CacheProvider>,
  );

  const styleTags = extractCriticalStyles(cache, html);
  const { titleKey, descriptionKey } = getPathMeta(getPathWithoutLang(url));
  const title = formatDocTitle(i18n.t(titleKey));
  const description = i18n.t(descriptionKey);

  // RouteMeta рендерит <title>/<meta> внутри дерева; на SSR React 19 не
  // переносит их в <head>, поэтому убираем из body — head собирается ниже.
  const body = html
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, "");

  const elements = new Set<HeadElement>([
    ...styleTags,
    { type: "meta", props: { name: "description", content: description } },
  ]);

  return {
    html: body,
    links: getPrerenderRoutes(),
    head: { lang, title, elements },
  };
}
