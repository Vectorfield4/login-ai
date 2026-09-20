import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import stylex from "@stylexjs/unplugin/vite";
import { defineConfig } from "astro/config";

const srcRoot = fileURLToPath(new URL("./src", import.meta.url));

/**
 * Конфиг Astro: SSG-сборка в dist, интеграции react/sitemap, StyleX через
 * unplugin-плагин, алиас `@` → src/.
 */
export default defineConfig({
  site: "https://vectorfield4-loginai-frontend-deploy-309a.twc1.net",
  outDir: "dist",
  srcDir: "./src",
  trailingSlash: "never",
  integrations: [react(), sitemap()],
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
