# AGENTS.md

## Project

**login-ai** — AI-powered login page, bilingual marketing site, fully static.
Repository: https://github.com/Vectorfield4/login-ai

## Stack

Astro 7 (SSG) + React 19 + TypeScript 5 (strict) + StyleX 0.19 + lucide-react +
Radix Dialog + GSAP + Vitest 3 + Testing Library + Biome 2 + Storybook 9.

## Commands

- `npm run dev` — dev server (port 4321)
- `npm run build` — `tsc -b && astro build`, prerenders every route into `dist/`
- `npm run preview` — serve the production build
- `npm run test` / `test:watch` — Vitest
- `npm run lint` / `format` — Biome check / write
- `npm run verify:dist` — check built output in `dist/`
- `npm run verify` — `build` + `verify:dist`
- `npm run storybook` / `build-storybook` — port 6006

## Critical rules

1. Biome 2 lints and formats the repo (`biome.json`: 2 spaces, CRLF, double
   quotes). One tool, one config.
2. Styles come from StyleX, through `stylex.create` and `stylex.defineVars`. A
   `.astro` file reaches for the inline `style` attribute when it needs
   one-off layout.
3. Imports flow downward only: shared ← entities ← features ← widgets ← pages.
4. `ui/` splits by level into `atoms/`, `molecules/` and `organisms/`, plus an
   optional `index.ts` barrel. A level folder appears when its first component
   lands. A test sits next to the component it covers.
5. A component takes `lang: AppLang` and calls `useT(lang)`. An `.astro` page
   builds `createT(currentLang, astroDicts)` for itself and passes `lang` down.
   Island props are JSON, so a function arrives as `null` and the block is gone
   by the time it scrolls into view. Types, Biome (`noRestrictedImports`) and
   `verify:dist` each catch it.
6. Every string lands in RU and EN in the same commit. A block receives i18n
   keys and translates them itself.
7. A new content block is an organism in `shared/ui/organisms/` that wraps
   `BlockSection` and renders the keys the page hands it. Data stays in fixtures.
8. State lives in React. Forms use local state and the browser's own
   `elements`/`validity` API, data comes from build-time fixtures, cross-tree
   state uses context. That leaves react-hook-form, zod, react-query, zustand,
   MSW, Three/R3F, i18next and TanStack Query without a job here.
9. Doc comments and `//` explanations in English. Test names and UI/i18n text in
   Russian.

## Layout

```
src/
├── app/        # BaseLayout.astro, global.css, revealHeadings.ts, data/ (only bundler-aware modules)
├── pages/      # thin .astro routes: index, 404, [lang]/**
├── widgets/    # app-bar, {service,solution,case}-ecosystem
├── features/   # case-filters, home-solutions, relevant-items
├── entities/   # case, service, solution, news (model + ui/organisms + i18n + index.ts)
└── shared/     # ui/{atoms,molecules,organisms}, design, config, data, hooks, i18n, types, assets
test/           # Vitest setup, i18n parity, component tests, verify-dist.mjs
stories/        # Storybook
docs/frontend/  # architecture docs (see Deep dives)
```

Domain data lives in its slice: `model/fixtures.ts` is the source of truth,
`model/getters.ts` exposes `getCases()` / `getServices()` / `getSolutions()`,
and `index.ts` is the only public API. Nothing domain-shaped stays in `shared`.
An entity links to another through `relevants?: EntityRef[]` (contract in
`shared/types/relevants.ts`); the "related" section composition is JSX in
`widgets/*-ecosystem`, never data.

`src/entities/AGENTS.md` holds the entity-layer restrictions (no framework
imports, no `ImageMetadata`).

## Deep dives

Read before touching the area, not before every change:

- `docs/frontend/atomic-design.md` — component levels, folder rule, behavior
- `docs/frontend/feature-slice-design.md` — layers, segments, import rule, tree
- `docs/frontend/page-composition.md` — which sections each page renders, islands
- `docs/frontend/i18n.md` — dictionaries, the `lang` contract, its three guards
- `docs/frontend/ssg.md` — build config, routing, head, `verify:dist`
- `docs/frontend/seo.md` — meta tags, JSON-LD, sitemaps
- `docs/frontend/news.md` — news frontmatter, categories, covers, author, media
- `docs/frontend/prose-quality.md` — copy rules, read before editing dictionaries
- `docs/images/image-generation-prompt.txt`, `service-backdrop-prompt.txt` — image generation templates

## Content

Copy follows `prose-quality.md`: concrete numbers, second person, active voice,
honest tradeoffs. Article covers go to `articles/images/<slug>.png` — the
convention picks them up for both locales; update the "Awaiting generation"
table in `articles/images/README.md` in the same commit. Service backdrops go to
`src/shared/assets/images/services/<slug>.png` — one image per service for the
home block, the service hero and `og:image`; update
`src/shared/assets/images/services/README.md` in the same commit. Cover and
backdrop prompts come from the `write-article` skill's `cover-artist` step
(`scripts/image-prompt.mjs`); the pickers glob only `png/jpg/jpeg/webp`, so the
`.prompt.txt` files are ignored.

## Deploy

`.github/workflows/ssg.yaml` on `workflow_dispatch`: `npm run build` →
`npm run verify:dist` → ZIP attached to a GitHub Release → FTP sync of `dist/`.
Credentials come from GitHub secrets (`FTP_HOST`, `FTP_LOGIN`, `FTP_PASS`,
`FTP_PATH`) — never into code or dictionaries.

## Before shipping

```
npm run lint
npm run test
npm run verify   # build + verify:dist
```

The Vitest warning "something prevents Vite server from exiting" at the end is
known Stylex-plugin behavior with exit code 0.
