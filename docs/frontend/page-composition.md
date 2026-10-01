# Page Composition

A page is a thin `.astro` route: `getStaticPaths`, `BaseLayout`, and an explicit
list of sections. No data in markup — content arrives from domain fixtures
through getters, text through `createT`/`useT` (see `i18n.md`).

## Shared frame

```
<AppBar client:visible />
<main class="page-main">
  <Breadcrumbs … />        // except home and 404
  …sections…
  <CtaBlock … />
</main>
```

- The first block of every page except home and 404 is `Breadcrumbs`
  (`shared/ui/organisms/Breadcrumbs.tsx`): a `nav > ol` chain with
  `aria-current="page"` on the current crumb. There is no back icon.
- Crumb data is never hardcoded on a page. `resolveBreadcrumbs(path, lang)`
  (`shared/data/breadcrumbs.ts`) builds the chain from a clean path, a language
  and domain data, and returns `null` for home, 404 and unknown paths — the page
  then renders `null`. The same helper feeds `BreadcrumbList` into
  `resolveSchemaOrg`. The chain always starts at home: a section index gets two
  crumbs, a detail page adds the entity. For news articles the leaf is a plain
  title string rather than a dictionary key, so the page passes
  `entityTitle: item.title`.
- Section backgrounds alternate. Starting from the first section every block
  flips: 1st no `alt`, 2nd `alt`, 3rd none, 4th `alt`, …
- The last block of any page except 404 is `CtaBlock` pointing at `/contacts`.

## Routes

| File | Sections |
|---|---|
| `index.astro`, `[lang]/index.astro` | home: hero → blocks → `HomeSolutions` (island, `client:visible`) |
| `404.astro`, `[lang]/404.astro` | no breadcrumbs, no CTA |
| `[lang]/services.astro` | `PageHero` → `ServiceCard` grid → CTA |
| `[lang]/solutions/index.astro` | `PageHero` → `SolutionCard` grid → CTA |
| `[lang]/cases.astro` | `PageHero` → `CaseIndexList` + `SolutionFilters` → CTA |
| `[lang]/news/index.astro` | `PageHero` → `NewsIndexList` (or `NewsEmptyState`) → CTA |
| `[lang]/investors.astro` | hero → `CountersSection` → `TileSection` → `StatsSection` → `TileSection` → `TableSection` → `QuoteSection` → `BarsSection` → CTA |
| `[lang]/contacts.astro` | `PageHero` → three cards (email, turnaround, account manager) |
| `[lang]/services/[slug].astro` | hero → features → `ProcessHorizontal` → `FitSection` → `ProofSection` → `sections[]` → `TechStackSection` → `ServiceEcosystemSection` → `FaqSection` → CTA |
| `[lang]/solutions/[slug].astro` | hero (+ cover) → features → `ProcessHorizontal` → `FitSection` → `ProofSection` → `sections[]` → technologies → references → categories → `VideoShowcase` → `SolutionEcosystemSection` → `FaqSection` → CTA |
| `[lang]/cases/[slug].astro` | `CaseHero` → "Result" (`StatGrid`) → per-slug sections → `CaseEcosystemSection` → CTA |
| `[lang]/news/[slug].astro` | `NewsArticleHeader` → `<Content />` in `.prose` → three news blocks → CTA |

Data-dependent sections render conditionally (`service.fitItems?.length ? …`),
so a page with thin fixtures leaves no empty shells. On detail service and
solution pages `FaqSection` is the last block before the CTA.

## Per-slug case sections

A case page is the honest one: inventing filler blocks is not allowed, but two
cases genuinely have their own structure.

`[lang]/cases/[slug].astro` opens with `CaseHero` and a "Result" section
(`StatGrid` over `caseItem.metrics`). Then:

- `reputation-monitoring-platform` (Chasovoy) — `CountersSection` → problem and
  solution (`TileSection`) → dashboard (`StatsSection`) → implementation depth
  (`SliderSection`, `client:load`) → audiences (`TileSection`);
- `retail-support-bot` — the same blocks minus the depth slider;
- every other case — no extra sections.

The data lives in `src/entities/case/model/caseSections.ts` and is exported by
name (`chasovoyCounters`, `retailProblem`, …); the page picks a set on
`caseItem.slug`. **Do not introduce a generic section payload** (`ContentBlock[]`
and friends): the page enumerates its sections explicitly.

## The related section

Three columns — `ServiceColumn` / `SolutionColumn` / `CaseColumn` from
`features/relevant-items`. A column resolves `RefOf<T>[]` into domain records
itself and returns `null` when there are no links, so a page can render it
unconditionally. Which columns appear, and in what order, is decided by the
widget (`widgets/{service,solution,case}-ecosystem`), not by data.

Density and limits live in `features/relevant-items/model/column.ts`
(`COMPACT_THRESHOLD`, `COMPACT_LIMIT`, `isRowsLayout`, `columnLimit`,
`ALL_LINKS`, `hasAnyRelation`). Column headings are `ui.ecosystem.<source>.<target>`,
the section heading is `ui.ecosystem.heading.<source>`, the region label is
`ui.ecosystem.columns`.

## Islands and hydration

Only interactive parts hydrate:

| Directive | What |
|---|---|
| `client:visible` | `AppBar`, `HomeSolutions`, `TechStackSection` |
| `client:load` | `ProcessHorizontal`, `SliderSection` |
| `client:only="react"` | `VideoShowcase` (GSAP plus video, no static markup) |

`ProcessHorizontal` must not hydrate on `client:visible`: the switch from column
to ribbon halves or doubles the section height, and the jump would land exactly
when the user reaches the block. So CSS defaults to the column and the ribbon is
switched on from `useEffect`, only above `min-width: 900px` and only without
`prefers-reduced-motion`. There is no second copy of the markup: without JS a
list of steps remains, text is not duplicated, and the pin measures real widths
after hydration (`scrollWidth - clientWidth`).

`FaqBlock` is an accordion on native `<details>`/`<summary>`: opening works
without JS and without hydration, answers stay in the HTML, the first question
starts open.

## Solution covers

Solution assets live in `src/shared/assets/images/` and are imported **only** by
`src/app/data/solutionImages.ts` (`Record<slug, ImageMetadata>` +
`getSolutionImage`). That is the single layer aware of `ImageMetadata`: entities
forbid it (`src/entities/AGENTS.md`), and `shared` is neither domain nor
bundler-aware.

Entities store `image?: string`; pages inject the real thing in frontmatter —
`getSolutionImage(slug)?.src` for cards, `getSolutionImage(slug)` for
`BaseLayout image={…}` (og:image at 1200×630 via `getImage`; social platforms
do not eat SVG, so og must be raster).