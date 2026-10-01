# SSG — Login AI

SSG means `npm run build` writes finished HTML for every page into `dist/`:
markup, sections rendered from fixtures, StyleX CSS, meta tags. Any static host
can serve it; the project has no server runtime.

## One command

`npm run build` = `tsc -b && astro build`. Astro prerenders every route in
`src/pages/**/*.astro` (a build with no adapter — SSG). Output:
`dist/index.html` (the RU home), then `/ru/*` and `/en/*` for every route, plus
`sitemap-index.xml` and `robots.txt` from `@astrojs/sitemap` and a local
integration. `dist/404.html` is emitted next to the localized 404 routes.

Do not count pages in prose. `npm run verify:dist` derives the expected count
from the sitemap and compares it against the HTML on disk, so the number stays
correct without anyone updating a doc.

## Configuration (astro.config.ts)

```ts
export default defineConfig({
  site: "https://loginai.ru",
  outDir: "dist",
  trailingSlash: "always",      // /ru/services/ — matches routeUrl + canonical
  image: { dangerouslyProcessSVG: true },
  integrations: [react(), sitemap(), robotsIntegration()],
  vite: {
    plugins: [stylex({ useCSSLayers: true, aliases: { "@/*": `${srcRoot}/*` } })],
    resolve: { alias: { "@": srcRoot } },
  },
  i18n: { defaultLocale: "ru", locales: ["ru", "en"], routing: { prefixDefaultLocale: false } },
});
```

Three parts matter:

- **Stylex unplugin** compiles `stylex.create(...)` into hashed classes and CSS
  at build time. Classes land in `@layer` so they do not fight the base styles in
  `app/styles/global.css`. The `@/*` alias is required: the plugin resolves the
  internal imports of fixtures and tokens through it.
- **`@` → `src/`** for Vite — fixtures, dictionaries and constants import each
  other through `@/`; both relative and aliased paths resolve.
- **Astro i18n routing**: default locale `ru` without a prefix. `/` is served by
  `src/pages/index.astro` (the RU home), everything else by
  `src/pages/[lang]/…`. EN always lives under `/en/…`, RU under `/ru/…` except
  at the root.

`trailingSlash: "always"` is what `routeUrl` emits and what canonical URLs,
hreflang links and the sitemap contain. Turning it off breaks all three at once
without failing the build, so leave it alone.

## Routing

`src/pages/` is Astro's file routing:

- `/` → `index.astro` (RU home); `/[lang]/` → `[lang]/index.astro`.
- Section indexes: `[lang]/services.astro`, `[lang]/solutions/index.astro`,
  `[lang]/cases.astro`, `[lang]/news/index.astro`, `[lang]/investors.astro`,
  `[lang]/contacts.astro`.
- Detail pages: `[lang]/services/[slug].astro`, `[lang]/solutions/[slug].astro`,
  `[lang]/cases/[slug].astro` — `getStaticPaths()` builds `{lang, slug}` from
  domain data (`getServices()` from `@/entities/service`, `getSolutions()` from
  `@/entities/solution`, `getCases()` from `@/entities/case`). An unknown slug is
  `Astro.redirect("/404")`.
- Articles: `[lang]/news/[slug].astro`. Language asymmetry is deliberate — a
  `<slug>.ru.md` with no `<slug>.en.md` simply produces no EN route, and neither
  the page nor the build fails. `alternates` carries only the published
  translations so an asymmetric article never advertises a 404 to crawlers.
- 404: `404.astro` (static) + `[lang]/404.astro`; unmatched paths get a 404
  automatically.

## Bundler-aware modules

Two modules know about the bundler, and both live in `app/data/`:

- `solutionImages.ts` — the solution raster manifest (`Record<slug, ImageMetadata>`
  + `getSolutionImage`). Entities store `image?: string` and must not import it
  themselves.
- `newsCollection.ts` — the only module importing `astro:content`. The virtual
  module does not exist outside Astro's bundler, so any file importing it cannot
  join a Vitest graph; collection access therefore happens only from `.astro`
  frontmatter, while all logic over `NewsItem` lives in
  `entities/news/model/news.ts` and is unit-tested.

`src/vite-env.d.ts` references `astro/client`, not `vite/client`: only
`astro/client` declares `*.svg` and `*.png` as `ImageMetadata`. Under
`vite/client` an asset's type degrades to `string` and `typeof`/`as` shims appear
in the data. No `?url` suffixes, no `as ImageMetadata`, no ambient declarations
needed.

## SEO and head

`resolvePageMeta(lang, cleanPath)` from `src/shared/data/seo.ts` returns the
translated `<title>` (format `«…» | Login AI` via `formatDocTitle`) and
`<meta name="description">`. `BaseLayout.astro` writes into `<head>`:

- `<title>` and `<meta name="description">`;
- `<link rel="canonical">` — the emitted URL, trailing slash included;
- `<link rel="alternate" hreflang="ru|en">` for existing translations, plus
  `x-default` pointing at Russian when published, otherwise at the only language
  that exists;
- `og:title` / `og:description` / `og:url` / `og:type` / `og:locale`, and
  `twitter:card=summary_large_image`;
- `og:image` only when an image is resolved: 1200×630 PNG through `getImage`,
  with `og:image:type` and `twitter:image` alongside.

Paths in `src/shared/data/routes.ts` (`routeUrl`) encode Astro's layout: `/` for
RU, `/{ru,en}/…` for the rest.

## Theme

`BaseLayout` injects an inline script before first paint: reads
`localStorage["theme"]` (or `prefers-color-scheme`), sets `data-theme` on `<html>`
and toggles the StyleX theme classes (`darkThemeClassName` from
`src/shared/design/theme.ts`). In `dev` it also links `/virtual:stylex.css`
(generated by the unplugin); in production CSS ships as `/style.css` plus page
`<style>` blocks.

## Islands

React components render to static HTML at build time; interactivity is added by
Astro directives. Per-island choices and the reason they differ are documented in
`page-composition.md` — notably why `ProcessHorizontal` is `client:load` and not
`client:visible`.

Without JS the static sections and fallback markup still render (a slider emits
its levels without controls), so content stays accessible.

## Boundaries

- Do not change `useCSSLayers` or the StyleX plugin aliases: CSS breaks silently
  (layer conflicts with `global.css`, or unresolved `@/` imports in fixtures).
- Do not change `trailingSlash`.
- One SEO resolver only: `src/shared/data/seo.ts`. Do not add copies.
- `react-hook-form`, `zod`, R3F/Three, MUI, i18next, Zustand, TanStack Query,
  MSW and `vite-prerender-plugin` are gone — do not reintroduce those patterns.

## Verification

`npm run verify:dist` (`test/verify-dist.mjs`) walks the sitemap and checks each
page: the file exists, `[object Object]` is absent, island props contain no
`null` (a serialized function), `title`/canonical/`og:*` are present, hreflang
entries resolve inside `dist`, at least one stylesheet is linked and resolves,
every local `href`/`src` resolves, `og:image` is a real raster (solution pages
must have one), and every JSON-LD block parses.

Unit tests never see `dist/`, which is why og:image coverage and asset
resolution live here and nowhere else. In CI the step runs right after the build
and fails the release.

`npm run verify` = `npm run build` + `npm run verify:dist`.
