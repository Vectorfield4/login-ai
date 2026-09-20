import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import stylex from "@stylexjs/unplugin/vite";
import { defineConfig } from "astro/config";

const srcRoot = fileURLToPath(new URL("./src", import.meta.url));

const robotsIntegration = () => ({
  name: "robots-txt",
  hooks: {
    "astro:build:done": async ({ dir, site }: { dir: URL; site?: URL }) => {
      const baseUrl = site?.href ?? "https://loginai.ru";
      const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", baseUrl).href}\n`;
      await writeFile(new URL("robots.txt", dir), robotsContent, "utf-8");
    },
  },
});

/**
 * Конфиг Astro: SSG-сборка в dist, интеграции react/sitemap/robots, StyleX через
 * unplugin-плагин, алиас `@` → src/.
 */
export default defineConfig({
  site: "https://loginai.ru",
  outDir: "dist",
  srcDir: "./src",
  trailingSlash: "never",
  integrations: [react(), sitemap(), robotsIntegration()],
  vite: {
    // StyleX-плагин: компилирует stylex.create/build в CSS на этапе сборки.
    // useCSSLayers держит вывод в @layer, чтобы не конфликтовать с легаси-CSS.
    // aliases: бейл-плагин резолвит тему через относительный/абсолютный путь,
    // поэтому `@/*` маппится на абсолютный каталог src (как resolve.alias ниже).
    plugins: [stylex({ useCSSLayers: true, aliases: { "@/*": `${srcRoot}/*` } })],
    // Алиас для чтения фикстур/словарей/констант из src: фикстуры используют
    // внутренние `@/...` импорты (constants, svg-ассеты), ссылки идут в src/.
    resolve: {
      alias: { "@": srcRoot },
    },
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
