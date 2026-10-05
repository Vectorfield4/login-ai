# SEO Requirements (Login AI)

This document outlines the Search Engine Optimization (SEO) requirements for the Login AI project.

## 1. Meta Tags & Head Template (`BaseLayout.astro`)

Every page must render the following elements in `<head>` via `BaseLayout`:
- Unique document title (`<title>`) formatted as `<PageTitle> | Login AI` (`formatDocTitle`).
- Meta description (`<meta name="description" content="..." />`) in the corresponding page language.
- Canonical URL (`<link rel="canonical" href="..." />`) based on `https://loginai.ru` with locale prefix and a trailing slash (`trailingSlash: "always"`). The sitemap uses the same shape, so the two always agree.
- Alternative language versions with `hreflang`:
  - `<link rel="alternate" hreflang="ru" href="..." />`
  - `<link rel="alternate" hreflang="en" href="..." />`
  - `<link rel="alternate" hreflang="x-default" href="..." />` (pointing to Russian when published, otherwise to the only language that exists).

  A page passes `alternates` when its translations are not both guaranteed — news articles are language-asymmetric, and an absent `.en.md` means no EN route exists to advertise.

## 2. Open Graph & Social Sharing (OG / Twitter Cards)

To ensure proper rendering when sharing links across messengers and social platforms, each page must include:
- `og:title` (matches `<title>`).
- `og:description` (matches meta description).
- `og:url` (matches canonical URL).
- `og:type` (`website` for the home page, `article` everywhere else).
- `og:locale` (`ru_RU` or `en_US`).
- `twitter:card` (`summary_large_image`).

## 3. Schema.org Structured Data (JSON-LD)

Structured data is injected **in the `<head>`** via `application/ld+json` script
tags and **mirrored in the `<body>`** as microdata (section 3.2). The vocabulary
lives in `src/shared/data/schema.ts` (`SCHEMA_TYPE`, `schemaIri`,
`MicrodataAttributes`); `resolveSchemaOrg` in `src/shared/data/seo.ts` builds the
whole graph and cross-links it with `@id` (`#organization`, `#website`,
`#webpage`, `#service`, `#product`, `#article`, `#faq`, `#process`, …).

- **Every page**: `Organization` (`@id`, logo, email, `contactPoint`) + `WebSite`
  (`publisher`) + a page node whose type comes from `resolvePageSchemaType`:
  `WebPage`, or `CollectionPage` for section indexes, `AboutPage` for
  `/investors` and `/team`, `ContactPage` for `/contacts`. The page node carries
  `isPartOf`, `inLanguage`, `primaryImageOfPage` and `breadcrumb`.
- **Services (`/services/[slug]`)**: `Service` (`provider`) plus `FAQPage` from
  `faqItems` and `HowTo` from `processSteps`.
- **Solutions (`/solutions/[slug]`)**: `Product` (`brand`) plus `FAQPage`,
  `HowTo` and `VideoObject` per showcase item that has a `videoUrl`.
- **Cases (`/cases/[slug]`)**: `CreativeWork` (`creator`, `about`).
- **Articles (`/news/[slug]`)**: `BlogPosting` (`author` as `Person` when
  frontmatter has one, else the `Organization`), `mainEntityOfPage`, dates,
  `articleSection` and `keywords`. The page passes `article`, not a raw schema.
- **Section indexes**: `ItemList` (`itemListElement` + `ListItem`) built from the
  fixtures; the news index passes its cards through `schemaOptions.listItems`.
- **Nested pages**: `BreadcrumbList`, built from the same helper as the visible
  trail, and omitted on home and 404 where the helper returns nothing.

## 3.1 Body Microdata

The body must carry the same vocabulary as attributes, not only the head
scripts: crawlers and AI answer engines that read the DOM find the entities in
place. Every shared atom and molecule accepts `MicrodataAttributes`
(`itemProp`, `itemScope`, `itemType`, `itemID`, `itemRef`) and spreads them onto
its root element, so a block marks up the real element instead of wrapping it.

| Body surface | Markup |
|---|---|
| `Breadcrumbs` | `BreadcrumbList` → `ListItem` (`item`, `name`) |
| `PageHero`, entity heroes | `itemProp="name"` / `"description"` inside the page or entity scope |
| Service / solution / case / news cards | `itemScope itemType` + `itemProp="itemListElement"` inside an `ItemList` grid or list |
| `FaqBlock` | `FAQPage` → `Question` → `Answer` |
| `MechanismSection` | `HowTo` → `HowToStep` |
| `StatTile`, `CountersBlock`, `OutcomeTile`, `BarsBlock` | `PropertyValue` |
| `BlockQuote` | `Quotation` |
| `FeatureCard`, `TileCard`, `ScopeRow`, `FitRow`, `TradeoffRow` | `Thing` inside an `ItemList` |
| `AppBarNav` | `SiteNavigationElement` |
| Widgets (`*EcosystemSection`, `HomeSolutions`, `HomeNews`, `NewsSection`) | `ItemList` around the relation cards and rows |

A card is always rendered inside an `ItemList` parent, so `itemListElement` never
dangles. `resolveSchemaOrg` and the body markup share `SCHEMA_TYPE`, so the head
and the body cannot drift apart.

## 3.2 Files

- Vocabulary and helpers: `src/shared/data/schema.ts`.
- Graph builder and page-type resolver: `src/shared/data/seo.ts`
  (`resolveSchemaOrg`, `resolvePageSchemaType`, `ArticleSchemaInput`,
  `SchemaOrgOptions`).
- Regression tests: `test/schema.test.ts`.

## 4. Metadata Source & Routing

- The single source of truth for route metadata is `src/shared/data/seo.ts` (`getRouteMeta`, `resolvePageMeta`, `resolveSchemaOrg`, `formatDocTitle`, `BRAND`). Do not add a second resolver.
- Metadata translation happens at build time (SSG) via `createT` using the multilingual dictionaries (`astroDicts`).
- `BaseLayout` truncates descriptions to fit: 155 characters for `meta description`, 125 for `og:description`.
- Detail pages (services, solutions, cases) resolve metadata dynamically from the domain data: `getServiceBySlug()` from `@/entities/service`, `getSolutionBySlug()` from `@/entities/solution`, `getCaseBySlug()` from `@/entities/case`.

## 5. Indexing & Sitemaps

- **robots.txt**: written into `dist/robots.txt` by the local `robotsIntegration` in `astro.config.ts` at build time. It allows all bots (`User-agent: *`, `Allow: /`) and points at `sitemap-index.xml`.
- **Sitemap**: generated by `@astrojs/sitemap` (`dist/sitemap-index.xml`, `dist/sitemap-0.xml`), covering every route in both locales. `npm run verify:dist` reads it as the source of truth and walks every URL.

## 6. Content & Structure Quality

- Exactly one `H1` per page.
- Hierarchical headings (`<h2>`, `<h3>`); GSAP animates headings word by word via `app/scripts/revealHeadings.ts`.
- No duplicate content: canonical URLs plus Astro's locale routing (`prefixDefaultLocale: false` for `ru`, `/en/` for English).
