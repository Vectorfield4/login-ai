import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import stylex from "@stylexjs/unplugin/vite";
import { defineConfig } from "astro/config";

/**
 * Конфиг Astro (этап миграции): прототип собирается в dist-astro, чтобы не
 * перезаписывать dist текущей vite-сборки. Полный переход на Astro закрепляет
 * этап 5 плана (docs/frontend/astro-migration.md).
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
    plugins: [stylex({ useCSSLayers: true })],
    // Алиас для чтения фикстур/словарей/констант из src: фикстуры используют
    // внутренние `@/...` импорты (constants, svg-ассеты), ссылки идут в src/.
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
