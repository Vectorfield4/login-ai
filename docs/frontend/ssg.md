# SSG в Login AI

SSG значит, что `npm run build` кладёт в `dist/` готовый HTML для каждой
страницы: разметку, секции из фикстур, StyleX-CSS и мета-теги. Отдавать его
может любой статический хостинг, серверных рантаймов в проекте нет.

## Одна команда

`npm run build` = `tsc -b && astro build`. Astro пререндерит все маршруты
`src/pages/**/*.astro` в `dist/` (сборка без адаптера — SSG). Итог: 58 HTML,
`dist/index.html` (RU-главная) плюс `dist/ru/*` и `dist/en/*` для всех
маршрутов, `sitemap-index.xml` от `@astrojs/sitemap`.

## Устройство (astro.config.ts)

```ts
export default defineConfig({
  site: "https://…",            // базовый URL для canonical/sitemap
  outDir: "dist",
  trailingSlash: "never",       // /ru/services, без завершающих "/"
  integrations: [react(), sitemap()],
  vite: {
    plugins: [stylex({ useCSSLayers: true, aliases: { "@/*": `${srcRoot}/*` } })],
    resolve: { alias: { "@": srcRoot } },
  },
  i18n: { defaultLocale: "ru", locales: ["ru", "en"], routing: { prefixDefaultLocale: false } },
});
```

Три важные части:

- **Stylex-unplugin** компилирует `stylex.create(...)` в hashed-классы и CSS
  на этапе сборки. Классы помещаются в `@layer`, чтобы не конфликтовать с
  базовыми стилями `app/styles/global.css`. Алиас `@/*` обязателен: бейл-плагин
  резолвит внутренние импорты фикстур/токенов через него.
- **Алиас `@` → `src/`** для Vite — фикстуры/словари/константы импортируются
  относительными путями и через `@/`; оба способа резолвятся.
- **i18n-роутинг Astro**: дефолтная локаль `ru` без префикса. `/` — это
  `src/pages/index.astro` (RU-главная), остальное — `src/pages/[lang]/…`.
  `en`-версии всегда под `/en/…`, `ru` — под `/ru/…` (кроме корня).

## Роутинг и страницы

`src/pages/` — файловая маршрутизация Astro:

- `/` → `index.astro` (RU-главная), `/[lang]/` → `[lang]/index.astro`
  (ru/en-главные; контент идентичен корню, но `getStaticPaths` рендерит
  уже локализованную страницу).
- Статичные разделы: `[lang]/services.astro`, `[lang]/cases.astro`,
  `[lang]/investors.astro`, `[lang]/contacts.astro`.
- Детальные: `[lang]/services/[slug].astro`, `[lang]/solutions/[slug].astro`,
  `[lang]/cases/[slug].astro` — `getStaticPaths()` собирает `{lang, slug}` из
  фикстур (`getCases()/getServices()/getSolutions()`). Неизвестный slug кейса —
  `Astro.redirect("/404")`.
- 404: `404.astro` (статическая) + `[lang]/404.astro`; нематчащиеся пути Astro
  отдаёт 404 автоматически.

## SEO и head

`resolvePageMeta(lang, cleanPath)` из `src/shared/data/seo.ts` возвращает
переведённые `<title>` (формат `«…» | Login AI` через `formatDocTitle`) и
`<meta name="description">`. `BaseLayout.astro` пишет в `<head>`:

- `<title>` + `<meta name="description">`;
- `<link rel="canonical">` — `routeUrl(cleanPath, currentLang)`;
- `<link rel="alternate" hreflang="ru|en">` для зеркальных версий.

Пути в `src/shared/data/routes.ts` (`routeUrl`) кодируют раскладку Astro:
корень `/` для `ru`, `/{ru,en}/…` для остальных — совпадает с эмиссией `[lang]`.

## Темы

`BaseLayout` вставляет inline-скрипт до первого paint: читает
`localStorage["theme"]` (или `prefers-color-scheme`), ставит `data-theme` на
`<html>` и переключает StyleX-классы темы (`darkThemeClassName` из
`src/shared/design/theme.ts`). В `dev` дополнительно подключается
`/virtual:stylex.css` (генерируется unplugin); в продакшене CSS попадает в
статические файлы `/style.css` и `<style>` страниц.

## Hydration (острова)

React-компоненты рендерятся в статику при сборке; интерактив добавляется
директивами Astro:

- `client:visible` — шапка и каталоги с фильтрами (гидратация при появлении
  в viewport);
- `client:load` — слайдеры и полноэкранные превью.

Без JS работают статические секции и fallback-разметка (слайдер рендерит
уровни без элементов управления), то есть контент остаётся доступным.

## Границы

- Не менять `useCSSLayers` и алиасы Stylex-плагина: CSS «сломается» тихо
  (конфликты с global.css или нерезолвленные `@/`-импорты фикстур).
- `trailingSlash: "never"` согласован с `routeUrl`/sitemap — не отключать.
- SEO-резолвер один: `src/shared/data/seo.ts`. Не плодить копии (раньше
  копия жила в `prerender.tsx` — файл удалён при миграции).
- `react-hook-form`, `zod`, R3F/Three, MUI, i18next, Zustand, TanStack Query,
  MSW и `vite-prerender-plugin` больше не существуют в проекте — не
  переиспользовать их паттерны.

## Проверка

- В `dist/` 58 HTML: `/index.html`, `/ru/*`, `/en/*` (главные, статичные
  разделы, списки и детальные slug-страницы обоих языков, 404).
- В каждом HTML: `<html lang>`, один `<title>`, один
  `<meta name="description">`, canonical, hreflang-«зеркало», StyleX-class та
  в `<style>`/`style.css`.
- `sitemap-index.xml` и локализованные `sitemap-*.xml` в `dist/`.
- `npm run preview` отдаёт все маршруты с кодом 200 и пререндеренной
  разметкой.
- CI: `.github/workflows/ssg.yaml` делает `npm ci && npm run build` на
  windows-latest (Node 24) и выкладывает ZIP из `dist/` в GitHub Release.