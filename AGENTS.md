# AGENTS.md

## Project

**login-ai** — AI-powered login page. Repository: https://github.com/Vectorfield4/login-ai

## Stack

React 19 + Vite 7 + TypeScript 5 + MUI 7 + Zustand 5 + TanStack Query 5 + GSAP 3 + Three.js/R3F 9 + Vitest + MSW + Biome 2 + Storybook 9

## Commands

- `npm run dev` — start dev server
- `npm run build` — typecheck + production build (dist/)
- `npm run preview` — preview production build
- `npm run test` — run tests once (Vitest)
- `npm run test:watch` — watch mode
- `npm run lint` — Biome check
- `npm run format` — Biome format (write)
- `npm run storybook` — Storybook dev server (port 6006)
- `npm run build-storybook` — build Storybook

## Conventions

- **No Tailwind, no ESLint/Prettier** — Biome 2 is the single linter/formatter
- MUI components with `sx` / `styled` API
- Functional components + hooks, TypeScript strict mode
- Forms: `react-hook-form` + `zod` validation
- Data fetching: TanStack Query; global state: Zustand
- Animations: GSAP; 3D: React Three Fiber
- Tests: Vitest + Testing Library + MSW (mock via `src/shared/mocks/handlers.ts`)
- Storybook stories live at the repo root `stories/` dir, outside the layers:
  `stories/*.stories.tsx`

## Feature-Sliced Design + Atomic structure

`src/` is organized in FSD layers (shared → entities → features → pages →
app), imports only point downward (shared ← entities ← features ← pages ←
app). Each slice carries a public API in `index.ts`.

- `app/` — app shell: `App.tsx` (routing via `app/routes/index.tsx`),
  `seo.ts`, layout in `app/layouts/` (`MainLayout`, `Footer`).
- `pages/<name>/` — one slice per route segment (`home`, `cases`, `services`,
  `solutions`, `contacts`, `investors`); static pages keep `ui/` segment,
  dynamic ones `list/ui/` + `[slug]/ui/` (+ `model/` for page-local
  registry/types).
- `features/` — `relevant-items` (relevants resolver/model in `model/`,
  `RelevantCard`, `RelevantSection` and the nine source→target wrapper blocks
  in `ui/`), `case-filters` (`SolutionFilters`).
- `entities/` — `case`, `service`, `solution`, each with `api/`, `model/`
  (types + store), `ui/organisms/` (domain cards/heroes: `CaseCard`,
  `CaseHero`, `ServiceCard`, `SolutionCard`).
- `shared/` — reusable atomics: `ui/atoms|molecules|organisms` (flat props,
  never a `type` discriminator), `config/` (theme, constants,
  `useAppStore`), `i18n/` (RU+EN dictionaries), `mocks/` (MSW + fixtures),
  `assets/images/`, `types/` (`investors` display models shared by
  `BarsBlock`/`TableBlock`).
- Blocks translate their own i18n keys internally (they receive keys, not
  translated strings).

## Case details

- `Case` carries only shared fields (title, tagline, description, metrics,
  relevants, demoUrl) — **there is no typed `CaseDetails` and no
  `details` field**. Do NOT reintroduce a generic sections payload
  (`ContentBlock[]`, `CaseDetails`, …) for cases.
- **Specific sections live on the case pages themselves**
  (`src/pages/cases/[slug]/ui/`): `Chasovoy` and `RetailSupportBot` compose
  their own sections from the blocks (`CountersSection`, `TileSection`,
  `StatsSection`, `SliderSection`) with explicit i18n keys and pass the result
  through the `sections` slot of `CasePageLayout`.
- `CasePageLayout` (`src/pages/cases/[slug]/ui/CasePageLayout.tsx`) is a
  **pure template** — it never knows the case content: hero → «Результат»
  (metrics) → `sections` slot → relevants blocks → CTA. Cases without a
  registry entry render via `DefaultCasePage` (just the template).
- **Case pages inherit the base composition through the `sections` slot**
  (`src/pages/cases/[slug]/model/types.ts`): a specialized page adds its own
  sections and never forks/rewrites the base composition.
- `CaseCard` decides its link by membership in `casePages` (`hasOwnPage`
  passed from `CasesPage`) — the grid links cases with a dedicated page to
  `/cases/:slug`, others to their first solution relevant.
- `InvestorsPage` (`src/pages/investors/ui/InvestorsPage.tsx`) also composes
  its sections explicitly (`CountersSection`, `TileSection`, `StatsSection`,
  `TableSection`, `QuoteSection`, `BarsSection`) — there is **no
  `ContentBlock[]` union and no `RenderContentBlocks`**; sections data (i18n
  keys) is declared on the page.
- Section background alternation starts from the first section and flips every
  next one: 1st no alt, 2nd alt, 3rd no alt, 4th alt, …

## i18n — multilingual rule (RU + EN)

**The site supports two languages: Russian (default) and English.** Every new
component, page, and content block MUST be written in ALL supported languages
at the same time. Never hardcode user-facing text.

- UI strings live in `src/shared/i18n/ru.ts` and `src/shared/i18n/en.ts`
  under the `ui.*`, `home.*`, `servicesPage.*`, `servicePage.*`,
  `solutionPage.*`, `contactsPage.*`, `showcase.*` keys. Add the key to BOTH
  files together.
- Data-driven content (`src/shared/mocks/fixtures/solutions.ts`,
  `src/shared/mocks/fixtures/services.ts`) stores i18n keys (e.g.
  `solutions.<slug>.title`); the actual text for both languages lives in the
  dictionaries. New data fields must be added to `ru.ts` and `en.ts` and
  referenced via `t()` in components.
- Components use `useTranslation()` from `react-i18next` and call `t("...")`.
  Interpolation: `t("ui.footer", { year: ... })`.
- The language toggle is in the AppBar (`LanguageToggle`); the selected
  language is persisted in `localStorage` key `lang`.
- Missing a translation for one language is a bug — check both dictionaries
  before submitting changes.

## Relevants (релевантные ссылки)

- Any entity (solution, service, case) links to any other via a single
  `relevants?: EntityRef[]` field; interfaces inherit `WithRelevants`
  (`src/features/relevant-items/model/relevants.types.ts`). Add links in the
  entity fixtures, never hardcode blocks on a page.
- Each relationship (source → target) is its own render block in
  `src/features/relevant-items/ui/`: `RelatedServices` (service → service),
  `PartOfSolutions` (service → solution), `ServiceCases` (service → case),
  `SolutionServices` (solution → service), `RelatedSolutions` (solution →
  solution), `SolutionCases` (solution → case), `CaseServices` (case →
  service), `CaseSolutions` (case → solution), `SimilarCases` (case → case).
  All nine are thin wrappers over `RelevantSection` and the shared
  `RelevantCard` (same slice `ui/`).
- Pages group their `relevants` with `groupByType()`
  (`src/features/relevant-items/model/relevants.ts`) and render the three
  blocks for their own source type. Block titles live in
  `relevants.blocks.<source>.<target>` (RU + EN); the exhaustive matrix is
  `relevantBlockTitleKeys` in
  `src/features/relevant-items/model/relevants.ts`.
- `noteKey` (optional) is an i18n key under `relevants.*` (e.g.
  `relevants.<source>.<target>`), added to both RU and EN dictionaries.
