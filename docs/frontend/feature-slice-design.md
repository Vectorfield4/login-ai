# Feature-Sliced Design

Frontend architecture standard for the Astro 7 (SSG) + React 19 / TypeScript
stack with StyleX. Layers divide code by responsibility, slices by domain,
segments by purpose. The standard dropped the `processes` layer; in this
project the layer set is `app` / `pages` / `widgets` / `features` /
`entities` / `shared`. The route shell lives in `app/layouts/`, the global
styles in `app/styles/`. Imports go only downward.

## Rules

1. **Folder whitelist.** `src/` holds: `app`, `pages`, `widgets`, `features`,
   `entities`, `shared`. `shared` and `app` split into segments directly.
   `entities`, `features` and `widgets` split into slices with the segments
   `ui`, `model`, `i18n`, `api`.
   The `ui` segment is always split by level: `ui/atoms/`, `ui/molecules/`,
   `ui/organisms/` (a level folder appears only with at least one component;
   no loose component files inside `ui/`, a barrel may sit next to the level
   folders).
   `test/` and Storybook (`stories/`) live at the project root, outside `src/`.
2. **Import direction.** A slice imports strictly lower layers and its own files.
3. **Public API.** Each slice exposes `index.ts`; every cross-slice import
   resolves it. Exports are named (no `export *`).
4. **Same-layer isolation.** Sibling slices share behavior through a lower layer.
5. **Shared boundaries.** `shared` carries infrastructure and route/i18n/data
   glue; business rules live in entities and features.
6. **Entity links.** Cross-entity relations are referenced by `relevants?`
   fields (see `features/relevant-items`), not by cross-imports between entity
   slices.
7. **Widget restraint.** `widgets/` stays thin; new code prefers features and
   shared until a third place demands a widget home.
8. **Extraction timing.** A slice appears when three places share the same
   behavior or shared state demands a single home.

## Layers

| Layer | Carrier |
|---|---|
| app | `app/layouts/BaseLayout.astro` (route shell), `app/styles/global.css` (base styles), `app/data/` (bundler-aware reads: asset manifests, content collections) |
| widgets | app-shell widgets: nav, theme/language toggles, drawer (island) |
| pages | thin `.astro` routes: `getStaticPaths` + root layout + section composition |
| features | reusable user interactions: filters, home catalog, relation blocks |
| entities | business concepts with model + ui + i18n |
| shared | infrastructure and UI kit |

`app` and `shared` have no slices: they split into segments directly. `app` is
the top layer and imports downwards freely (`widgets`, `entities`, `shared`);
`shared` imports only from itself, so anything in it that needs domain data has
to be re-thought rather than imported.

## Segment anatomy

Slices on widgets, entities and features hold segments:

| Segment | Carrier |
|---|---|
| ui | components, split into `atoms/`, `molecules/`, `organisms/` |
| model | types, entity data (`fixtures.ts`), getters, pure logic |
| i18n | per-entity dictionaries (`<plural>Ru` / `<plural>En`) |
| api | request functions, dto types (segments exist but are empty now — no async IO) |

`model/` files carry domain names: `cases.ts`, `services.ts`, `solutions.ts`.
A domain's content lives in the slice itself: `model/<domain>.ts` (types),
`model/fixtures.ts` (the single source of truth, exported as `cases` /
`services` / `solutions`), `model/getters.ts` (`getCases` / `getServices` /
`getSolutionBySlug`), all re-exported by the slice `index.ts`; consumers import
from `@/entities/<slice>` and never from a shared folder. Display models shared
by content blocks (including `SolutionShowcase`, `CaseMetric`, `CounterItem`,
`TextItem`, `StatItem`, `SliderLevel`) live in `shared/types/content.ts`, so
`shared` never imports entity types.
Level rules for the `ui/` level folders live in `atomic-design.md`.

## Import rule

| Rule | Statement |
|---|---|
| Layer direction | a slice imports only from strictly lower layers and from its own files |
| Same layer | reuse between slices of one layer routes through shared |
| Public API | every slice exposes `index.ts`; cross-slice imports resolve it |

## Public API

`index.ts` re-exports what consumers need, by name. Named exports keep the
contract visible; `export *` hides it until a rename breaks silently.

## Entity relationships

Entities reference each other through the `relevants?: EntityRef[]` field on
the entity data (`WithRelevants`). The contract itself (`EntityRef`,
`EntityRefType`, `WithRelevants`, `RefOf`, `RelevantsByType`) lives in
`shared/types/relevants.ts` — entities declare the field, so the type has to
sit below them; the feature re-exports it from its own public API. Columns of a
"related" section live in the `relevant-items` feature as `ServiceColumn` /
`SolutionColumn` / `CaseColumn`: each resolves `EntityRef[]` into entity records
via the domain getters (`@/entities/<slice>`) and returns `null` when it has no
links. The page-level composition (which columns, in which order, with which
limits) belongs to the page's own widget (`service-ecosystem`,
`solution-ecosystem`, `case-ecosystem`) and is written directly in its JSX — not
in the data. Grouping by type (`groupByType`) happens inside the widget.

Around a column sit `ColumnFrame` (the `h3` plus a "view all …" link) and the
row/card variants `RelationRows` / `RelationRow` / `SolutionRelationCard` /
`CaseRelationCard`, all in `ui/molecules/`. `RelevantSection` and `RelevantCard`
stay for the wider relation blocks outside an ecosystem section (a news article's
three blocks, for instance). A `noteKey` is an optional `relevants.*` key
(RU + EN) for a line of prose above the links.

## Shared

Shared segments: `ui`, `design`, `config`, `data`, `hooks`, `i18n`, `assets`,
`types`. Empty segments are not created: a folder appears only when it holds
code.

- `ui/atoms|molecules|organisms` — domain-free UI kit (see `atomic-design.md`).
- `design/` — StyleX tokens (`tokens.stylex.ts`) and theme (`theme.ts`).
- `config/` — breakpoints and constants.
- `data/` — the data layer: `routes.ts` (`routeUrl`, `getCleanPath`),
   `seo.ts` (`resolvePageMeta`), `breadcrumbs.ts` (`resolveBreadcrumbs`),
   `iconCatalog.ts` (entity icon keys). Domain data and getters live in their
   entity slices, so there is no `entities.ts` here anymore. Bundler-aware
   modules are not here either: asset manifests and content-collection readers
   live in `app/data/` (see above).
- `hooks/` — `useMatchMedia`, `useT`.
- `i18n/` — build-time translations: `t.ts` (`createT`), `dict.ts`
   (`astroDictRu`/`astroDictEn`), `ru/` and `en/` namespace files.
- `types/` — shared display models (`content`, `investors`).

Shared may carry application-aware code (route constants, catalogs, branding).
It holds business rules owned by entities or features and imports nothing from
those layers.

## Widgets

The standard discourages the widgets layer because its role overlaps features.
Prefer a concrete carrier:

| Need | Carrier |
|---|---|
| one-screen user flow | a feature slice |
| layout grouping several routes | the app-level layout |
| app shell across all pages | a widget slice |

A widget slice appears only when an independent composition serves many pages.
Do not grow `src/widgets/` without a third consumer.

## Extraction rule

Give an entity its own slice when domain logic or state reuses across consumers
and needs one authoritative home. Give a feature its own slice when an
interaction reuses across consumers with a focused responsibility. Extraction
happens when a third place needs the same behavior.

## Canonical tree

Astro emits a route for every `{srcDir}/pages/**/*.astro`. Do not put `.astro`
files inside a slice `ui/` folder — thin routes stay directly in `pages/`.

```
src/
├── app/
│   ├── layouts/
│   │   └── BaseLayout.astro       # route shell: head (SEO), theme bootstrap, slot
│   ├── data/
│   │   ├── solutionImages.ts      # solution asset manifest (ImageMetadata)
│   │   └── newsCollection.ts      # the only astro:content reader (NewsPageItem)
│   ├── styles/                   # global.css (base) + prose.css (article body)
│   └── scripts/
│       └── revealHeadings.ts     # GSAP word cascade, wired once from BaseLayout
├── widgets/
│   ├── app-bar/
│   │   ├── model/nav.ts          # navigation data
│   │   ├── ui/                   # the app shell: nav, theme/language toggles, drawer
│   │   │   ├── atoms/            # brand, nav link
│   │   │   ├── molecules/        # dropdown, disclosure
│   │   │   └── organisms/        # bar shell, desktop nav, drawer content
│   │   └── index.ts
│   ├── service-ecosystem/        # "related" section on a service page
│   ├── solution-ecosystem/       # ... on a solution page
│   └── case-ecosystem/           # ... on a case page (one widget per page type)
├── pages/
│   ├── index.astro               # RU root home (SSG `/${lang}` → `/`)
│   ├── 404.astro
│   └── [lang]/
│       ├── index.astro           # ru/en home
│       ├── services.astro        # services list
│       ├── services/[slug].astro
│       ├── solutions/index.astro
│       ├── solutions/[slug].astro
│       ├── cases.astro           # cases list + filter
│       ├── cases/[slug].astro    # hero → results → per-slug sections → relations
│       ├── news/index.astro      # articles list
│       ├── news/[slug].astro     # article + rendered markdown
│       ├── investors.astro       # explicit section composition
│       ├── contacts.astro
│       └── 404.astro
├── features/
│   ├── case-filters/             # ui/SolutionFilters.tsx (see deviation below)
│   ├── home-solutions/
│   │   ├── model/                # HomeSolution + toHomeSolution (island input)
│   │   ├── ui/organisms/         # home catalog: filtering grid (+ test)
│   │   └── index.ts
│   └── relevant-items/
│       ├── model/                # relation types, grouping, block-title keys, column density
│       ├── ui/                   # relation columns, cards and rows
│       │   ├── molecules/        # column frame, relation row, relation card
│       │   └── organisms/        # ServiceColumn / SolutionColumn / CaseColumn
│       └── index.ts
├── entities/
│   ├── case/
│   │   ├── model/                # types + fixtures (source of truth) + getters + per-case sections
│   │   ├── ui/organisms/         # case card, case hero, case index list
│   │   ├── i18n/                 # casesRu / casesEn
│   │   └── index.ts
│   ├── news/
│   │   ├── model/                # NewsItem + mapping/sorting (no framework imports)
│   │   ├── ui/organisms/         # news card, index list, article header, empty state
│   │   └── index.ts
│   ├── service/
│   │   ├── model/                # types + fixtures (source of truth) + getters
│   │   ├── ui/organisms/         # service card, tech stack block
│   │   ├── i18n/                 # servicesRu / servicesEn
│   │   └── index.ts
│   └── solution/
│       ├── model/                # types + fixtures (source of truth) + getters
│       ├── ui/organisms/         # solution card
│       ├── i18n/                 # solutionsRu / solutionsEn
│       └── index.ts
├── shared/
│   ├── ui/atoms|molecules|organisms/   # domain-free blocks (see atomic-design.md)
│   │   └── atoms/illustrations/        # per-category placeholder art
│   ├── design/                   # StyleX tokens + theme
│   ├── config/                   # breakpoints, constants
│   ├── data/                     # routes, seo, breadcrumbs, iconCatalog
│   ├── hooks/                    # useMatchMedia, useT
│   ├── i18n/                     # t.ts (createT), dict.ts (astroDicts), ru/, en/
│   ├── types/                    # content (display models), relevants (EntityRef), investors
│   └── assets/images/            # solution rasters, imported only by app/data/
```

Known deviation from the folder rule: `features/case-filters/ui/SolutionFilters.tsx`
and the news blocks in `features/relevant-items/ui/` sit directly in `ui/` instead
of a level folder. Moving them is a separate cleanup, not a reason to add another.

File names inside slices are roles, not a contract — the structure above is
the reference; component names may change without a doc edit.

Every slice carries `index.ts`. Outside the layers the repo root holds `test/`
(Vitest setup, i18n parity, component tests, `verify-dist.mjs`), `stories/`
(Storybook), `articles/` (markdown sources for the news collection, plus
`images/` for covers) and `public/` (brand files served as-is by path, such as
`/loginai-mark.png`).

## Validation

`npm run lint` runs the Biome check, which covers code style and the import
hygiene rules in `biome.json` (including the `noRestrictedImports` guard behind
the `lang`-not-translator contract). The import rule, public API and folder
structure are followed by hand — the tree above is the reference. `npm run test`
(Vitest) guards RU/EN parity (`test/astro-content.test.ts`), entity data and
component behaviour.