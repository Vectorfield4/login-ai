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
- `npm run test:integration` — live Jev contour (Runware, burns tokens; not in CI)
- `npm run lint` / `format` — Biome check / write
- `npm run verify:dist` — check built output in `dist/`
- `npm run verify` — `build` + `verify:dist`
- `npm run storybook` / `build-storybook` — port 6006
- `npm run release [patch|minor|major]` — cut a version (see Release)
- `npm run version:bump` / `npm run changelog` — bump or preview the changelog

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
├── entities/   # case, llm-model, module, news, service, software-type, solution, stack, technology (model + ui + i18n + index.ts)
└── shared/     # ui/{atoms,molecules,organisms}, design, config, data, hooks, i18n, types, assets
lib/            # local workspace packages: jev (engine), prose (content domain)
test/           # Vitest setup, i18n parity, component tests, verify-dist.mjs
stories/        # Storybook
scripts/        # release.mjs, changelog.mjs, version.mjs, commit-msg.mjs, generation-queue.mjs
.husky/         # pre-commit (patch bump) and commit-msg (prefix) hooks
docs/frontend/  # architecture docs (see Deep dives)
docs/plans/     # working plans and the calculator add-on RFC
docs/releases/  # vX.Y.Z.md changelogs — the GitHub Release bodies
```

Domain data lives in its slice: `model/fixtures.ts` is the source of truth,
`model/getters.ts` exposes `getCases()` / `getServices()` / `getSolutions()`,
and `index.ts` is the only public API. Nothing domain-shaped stays in `shared`.
An entity links to another through `relevants?: EntityRef[]` (contract in
`shared/types/relevants.ts`); the "related" section composition is JSX in
`widgets/*-ecosystem`, never data.

`entities/technology` holds capabilities (LLM, RAG, computer vision);
`entities/stack` holds implementation items with explicit `kind` and `category`
axes (`PyTorch` is a library in ML, `PostgreSQL` a data-store in the database
area, `Kafka` a broker in messaging, `pgvector` an extension in the database
area); `entities/llm-model` holds trained models (`Qwen`, `Llama`);
`entities/software-type` holds the software kinds (ERP, CRM, CMS, MES, WMS, task
tracker) and their vendor products. All four are shared
targets for filters, service pages and the future calculator add-ons. A service
is never stored in `technology`, `stack` or `llm-model`: services stay offerings.
`test/entities/enabler-coverage.test.ts` guards the catalogs; the calculator
add-on RFC lives in `docs/plans/calculator/rfc.md`, and the calculator stays
frozen until that RFC is accepted.

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
- `docs/frontend/prose-quality.md` — copy rules, read before editing dictionaries
- `docs/image-prompts/{scene-defined,instructional}/{article,service}.txt`, `scene-defined/solution.txt`, `cover-style.txt` — image prompt standards and the shared `{{STYLE}}` block
- `docs/images.md` — where covers and backdrops live, their shape, and the generation pipeline

## Content

Copy follows `prose-quality.md`: concrete numbers, second person, active voice,
honest tradeoffs. Article covers go to `assets/images/articles/<slug>.png` — the
convention picks them up for both locales. Service backdrops go to
`assets/images/services/<slug>.png` — one image per service for the
home block, the service hero and `og:image`. Solution backdrops go to
`assets/images/solutions/<slug>.png` — the raster stand-in for the SVG
hero and `og:image`; a solution ships with its SVG, so a solution record is a
worklist entry, not a draft gate (`docs/plans/solution-backdrops-plan.md` is
retired — every published solution already has a raster backdrop).
Images still to generate are tracked
in `content/generation-queue.json` (one record per slug: `kind`, `title`, ten
English `keywords`, `topic`, `visual_config`); a record means pending, remove it
once the file lands. Each keyword is a key of
`docs/image-prompts/keyword-motifs.mjs`; the builder injects its motif object
into the scene next to the compiled `visual_config`. Cover and backdrop prompts
are built by the `generate-image-cover`
skill: the `art-agent` subagent derives the record's `visual_config`, builds
`<slug>.prompt.txt` with
`.opencode/skills/generate-image-cover/scripts/image-prompt.mjs`, then renders
one image through the Runware MCP (`google:4@3`, 1376×768, no resize) and places
it as `<slug>.png`. Running this cover gate is mandatory: an article or service
is unfinished until `<slug>.png` exists — never hand back a cover-less draft as
done. The Runware MCP reads `RUNWARE_API_KEY` from the environment
(`opencode.json`); never commit the key. The advisory Jev gates (`typesafe:jev@1`)
share a domain-free engine in `lib/jev/` — Jev is a Runware *compatible* model on
`POST /v1/decisions`, not on the MCP, so each skill calls its own
`scripts/jev-review.mjs` by slug, or with `--stdin` on a fragment while a section
is still being written. `lib/jev` and `lib/prose` are local npm workspace
packages (`@login-ai/jev`, `@login-ai/prose`), so skill scripts import them by
name, never by a deep relative path. `write-article`, `write-service` and
`code-quality` add only their own rubrics and wiring (rules and thresholds:
`.opencode/skills/write-article/references/jev.md`). Runware is the only
transport. The pickers glob only `png/jpg/jpeg/webp`, so the `.prompt.txt`
files are ignored.

Both content pipelines leave `draft` the same way: only after the cover/backdrop,
the volume floor and every relevant target pass. `write-article` and
`write-service` each run `scripts/audit.mjs` for readiness, then
`scripts/publish.mjs` to flip the flag and drop the queue record; `prose-critic`
and `service-critic` are the editorial gates. `code-quality` is a fourth Jev
skill with no publication pipeline: an advisory SOLID/SoC gate over source
(`.opencode/skills/code-quality/`).

## Release

The version is `package.json` `version` — the one source `ssg.yaml` reads. A
husky `pre-commit` hook (`node scripts/version.mjs hook`) bumps `patch` on every
commit, unless a release commit already staged the number. A husky `commit-msg`
hook (`scripts/commit-msg.mjs`) enforces the prefix; the accepted prefixes and
their changelog groups live in `scripts/commit-convention.mjs` (Conventional
types plus the repo areas `content`, `skill`, `agent`, `news`, `diagrams`, …).

`npm run release [patch|minor|major]` defaults to `minor` and runs
`scripts/release.mjs`: bump, write `docs/releases/vX.Y.Z.md` (commits since the
last `vX.Y.Z` tag, grouped with emoji, English), delete finished plans
(checklist fully checked — the `rollup` condition), commit
`chore(release): vX.Y.Z`, tag, push. `--dry-run` previews; `major` needs `--yes`.
The `release` skill drives this. Never hand-edit the version or pass one to
`ssg.yaml`.

## Deploy

`.github/workflows/ssg.yaml` runs on a `v*` tag push (or `workflow_dispatch`):
it reads the version from `package.json`, then `npm run build` →
`npm run verify:dist` → FTP sync of `dist/` → GitHub Release tagged
`v<version>`, named `v<version>`, with `docs/releases/v<version>.md` as its body
and `ssg-site.zip` attached. Credentials come from GitHub secrets (`FTP_HOST`,
`FTP_LOGIN`, `FTP_PASS`, `FTP_PATH`) — never into code or dictionaries.

## Before shipping

```
npm run lint
npm run test
npm run verify   # build + verify:dist
```

The Vitest warning "something prevents Vite server from exiting" at the end is
known Stylex-plugin behavior with exit code 0.
