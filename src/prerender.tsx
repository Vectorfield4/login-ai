import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { AppTree } from "@/app/AppTree";
import { routes } from "@/app/routes/config";
import { getPrerenderRoutes } from "@/app/routes/routeList";
import { getLangFromPath, setLanguage } from "@/shared/i18n";

import "@/app/i18n";

const HOISTABLE_RE = /^<(title|meta|link|base)\b[^>]*\/?>/;
const TITLE_CLOSE_RE = /<title>([\s\S]*?)<\/title>/;

/**
 * Извлекает критический CSS из emotion-кэша (аналог createExtractCriticalToChunks
 * из @emotion/server, но без тяжёлых stream-зависимостей, которые ломают
 * клиентскую сборку: events/stream стабаются Vite в пустые заглушки).
 */
function extractCriticalStyles(cache: EmotionCache, html: string): string[] {
  const idRegex = new RegExp(`${cache.key}-([a-zA-Z0-9-_]+)`, "gm");
  const idsInHtml: Record<string, boolean> = {};
  let m: RegExpExecArray | null;

  while ((m = idRegex.exec(html)) !== null) {
    idsInHtml[m[1]] = true;
  }

  const regularCssIds: string[] = [];
  let regularCss = "";
  const globalStyleTags: string[] = [];

  for (const id of Object.keys(cache.inserted)) {
    const css = cache.inserted[id];
    if (css === true) continue;

    const useRegular =
      idsInHtml[id] !== undefined || cache.registered[`${cache.key}-${id}`] === undefined;

    if (useRegular) {
      if (cache.registered[`${cache.key}-${id}`]) {
        regularCssIds.push(id);
        regularCss += css;
      } else {
        globalStyleTags.push(
          `<style data-emotion="${cache.key} ${id}">${css}</style>`,
        );
      }
    }
  }

  const tags = [...globalStyleTags];
  if (regularCss) {
    tags.push(
      `<style data-emotion="${cache.key} ${regularCssIds.join(" ")}">${regularCss}</style>`,
    );
  }

  return tags;
}

function splitHead(html: string): { tags: string[]; title: string; body: string } {
  const tags: string[] = [];
  let cursor = html;
  let title = "";

  while (cursor.length > 0) {
    const match = cursor.match(HOISTABLE_RE);
    if (!match) break;

    if (match[1] === "title") {
      const full = cursor.match(TITLE_CLOSE_RE);
      if (!full) break;
      title = full[1];
      tags.push(full[0]);
      cursor = cursor.slice(full[0].length);
    } else {
      tags.push(match[0]);
      cursor = cursor.slice(match[0].length);
    }
  }

  return { tags, title, body: cursor.trimStart() };
}

export function prerender({ url }: { url: string }): { html: string; links: string[]; head: { lang: string; title: string; elements: string[] } } {
  const lang = getLangFromPath(url);
  setLanguage(lang);

  const router = createMemoryRouter(routes, { initialEntries: [url] });
  const queryClient = new QueryClient();
  const cache = createCache({ key: "css" });

  const html = renderToString(
    <CacheProvider value={cache}>
      <AppTree queryClient={queryClient}>
        <RouterProvider router={router} />
      </AppTree>
    </CacheProvider>,
  );

  const styleTags = extractCriticalStyles(cache, html);
  const { tags, title, body } = splitHead(html);

  const elements = [
    ...tags.filter((t) => !t.startsWith("<title")),
    ...styleTags,
  ];

  return {
    html: body,
    links: getPrerenderRoutes(),
    head: { lang, title, elements },
  };
}