# Feature: SEO meta tags (per-route title + meta description, RU/EN)
## 1. Mechanism — React 19 native metadata hoisting (zero dependencies)
**Decision: no new library. Use React 19's built-in document-metadata hoisting.** React 19 (already in `package.json`: `react ^19`, `react-dom ^19`) natively hoists `<title>` and `<meta>` rendered anywhere inside the component tree into `document.head` on the client (`createRoot`). No concrete blocker exists in this codebase (plain CSR SPA, no SSR, no iframe constraints), so per the task preference no dependency is added.
**Rejected: `react-helmet` / `react-helmet-async`.** Helmet pre-dates React 19 hoisting and would fight React's own head management (double `<title>` writes, ordering races). Adding a dep is only justified if hoisting were insufficient — it is not.
### How it behaves
- One shared component `<RouteMeta />` renders `<title>` + `<meta name="description">`. React 19 hoists them to `<head>` and keeps a single managed `<title>` element, replacing the static `index.html` title on first render; hoisted tags are removed if their rendering component unmounts.
- Because `MainLayout` never unmounts between navigations and `<RouteMeta />` is a permanent child of it, **exactly one title/description pair exists in the tree at all times** → no duplicates, no stale head state, deterministic updates.
- **Route change:** `<RouteMeta />` must call `useLocation()` (from `react-router-dom`) — this subscribes the component to navigation and re-renders it on every path change, recomputing the meta.
- **Language switch:** `<RouteMeta />` uses `useTranslation()`, which re-renders on i18next `languageChanged` → the hoisted `<title>`/`<meta>` update **live** when the existing `LanguageToggle` flips RU↔EN (no reload). i18n is configured with `useSuspense: false`, so strings are always synchronously available.
- StrictMode double-render is idempotent (pure resolver + declarative tags). `index.html`'s static `<meta name="description">` is likewise replaced by the first hoisted render.
## 2. Where meta rendering lives
**Placement: layout level, in `MainLayout`** (single insertion point), not per page.
- `MainLayout` wraps every route (`App.tsx`: all five routes are children of `<Route element={<MainLayout />}>`) and already imports `services`/`solutions` data arrays for its nav — it is the data-aware chrome.
- A layout-level resolver **guarantees 100 % route coverage**: any future page added to `App.tsx` automatically gets meta without remembering to render something. Per-page components would silently forget and produce untitled routes.
- Data-driven pages (`ServicePage`, `SolutionPage`) already `Navigate to="/"` on unknown slug, and `App.tsx` has a catch-all `* → <Navigate to="/" replace />`; since meta is resolved in the layout from the current pathname, the redirect resolves to home meta in the same navigation pass. No 404 page exists today — the catch-all redirect is preserved (out of scope to add one; the resolver still has a safe fallback for any unmatched path, see §4).
### Insertion
Inside `MainLayout.tsx`, render `<RouteMeta />` as the first child of the returned root `<Box>` (before `<AppBar>`). Add `useLocation` subscription inside `RouteMeta`, not `MainLayout` (keeps layout diff minimal and the subscription local).
## 3. Title format convention (one, stated)
```
<PageTitle> | Login AI
```
- Literal `Login AI` brand suffix (brand is not translated — matches AppBar/footer typography).
- Single separator `" | "`. Applied to **every route including home**. Home example: `ИИ-решения для бизнеса | Login AI` / `AI Solutions for Business | Login AI`.
- Formatting lives in one pure helper `formatDocTitle()` so it cannot drift. No other format anywhere.
## 4. Per-page content strategy
### Static pages (home, services list, contacts)
Titles reuse **existing page title keys** where they exist (`servicesPage.title`, `contactsPage.title`); home gets one new title key (`home.metaTitle`) because the `home` namespace has no plain title. **New `metaDescription` keys** are added to the three page namespaces (flat-key naming matches those flat namespaces — `metaTitle`/`metaDescription`, not nested `meta.*`, because none of the page namespaces uses nested groups).
### Data-driven detail pages (`/services/:slug`, `/solutions/:slug`)
**Reuse existing per-slug keys — no per-slug meta keys.** The dictionaries already carry purpose-written, translated, per-slug `title` and `description` for all 13 slugs, and the data files store those full i18n keys (`service.title`, `service.description`, `solution.title`, `solution.description`). Resolver maps slug → existing record (via `getService(slug)`/`getSolution(slug)`), reusing its keys, so meta always mirrors the H1/lead paragraph exactly and RU/EN stay in sync structurally by construction. Adding 13 × 2 duplicated meta keys would double maintenance for zero gain.
Per-slug descriptions are ~180–250 chars (longer than the ideal ≈155) — engines truncate; acceptable, noted in residual risks. If a future slug needs a shorter teaser, the resolver config supports a per-slug override map (extension point, not built now).
### Fallbacks
| Match | Title key | Description key |
|---|---|---|
| `/services/:slug` unknown slug (transient frame before page's `Navigate` fires) | `servicesPage.title` | `servicesPage.metaDescription` |
| `/solutions/:slug` unknown slug | `home.metaTitle` | `home.metaDescription` |
| any other/unmatched path (incl. `*` redirect frame) | `home.metaTitle` | `home.metaDescription` |
| trailing-slash variants | normalized (strip trailing `/`, root stays `/`) | same |
Result: every rendered pathname resolves to non-empty meta; never an empty/`undefined` title.
## 5. Dictionary keys to add (BOTH `ru.ts` and `en.ts`; `en` is typed `RuDict` so structure must stay identical)
Four keys in each file — append inside the existing namespace objects (`home`, `servicesPage`, `contactsPage`), mirroring placement in both files:
```ts
// ru.ts
home: {
  // …existing keys…
  metaTitle: "ИИ-решения для бизнеса",
  metaDescription:
    "Разработка и внедрение ИИ под ключ: агентные системы, компьютерное зрение, генерация контента и видео. Автоматизируем процессы и ускоряем рост бизнеса.",
},
servicesPage: {
  // …existing keys…
  metaDescription:
    "Услуги под ключ: разработка ПО и корпоративных сайтов, лендинги, SEO и AEO, мониторинг информации, ИИ-обучение команд. Прозрачный процесс и измеримый результат.",
},
contactsPage: {
  // …existing keys…
  metaDescription:
    "Обсудим задачу, подберём ИИ-решение и подготовим расчёт. Основной канал связи — электронная почта sales@loginai.ru.",
},
// en.ts — identical structure
home: {
  // …existing keys…
  metaTitle: "AI Solutions for Business",
  metaDescription:
    "Custom AI solutions: agentic systems, computer vision, content and video generation. We automate processes and accelerate business growth.",
},
servicesPage: {
  // …existing keys…
  metaDescription:
    "Full-cycle services: software and corporate-site development, landing pages, SEO & AEO, information monitoring, AI training for teams. Transparent process, measurable results.",
},
contactsPage: {
  // …existing keys…
  metaDescription:
    "Tell us about your task — we will find the right AI solution and prepare a quote. Primary contact channel: sales@loginai.ru.",
},
```
Reused keys (already present, no edits): `servicesPage.title`, `contactsPage.title`, and per-slug `solutions.<slug>.title` / `.description` (7 slugs), `services.<slug>.title` / `.description` (6 slugs).
Resulting document titles (RU / EN), e.g.:
| Route | RU | EN |
|---|---|---|
| `/` | `ИИ-решения для бизнеса | Login AI` | `AI Solutions for Business | Login AI` |
| `/services` | `Услуги | Login AI` | `Services | Login AI` |
| `/contacts` | `Контакты | Login AI` | `Contacts | Login AI` |
| `/solutions/computer-vision` | `Внедрение компьютерного зрения \| Login AI`* | per `en.ts` slug title |
| `/services/software-development` | per slug title | per `en.ts` slug title |
\* — exact segment comes from the existing per-slug dictionary entry; the resolver needs no hardcoded copy.
## 6. Files & structure
Follows existing conventions: flat `src/components/` (no atomic folders in this project), root-level helper module mirrors `src/theme.ts`.
- **`src/seo.ts`** (new, pure, no React import)
  - `export const BRAND = "Login AI";`
  - `export function formatDocTitle(pageTitle: string): string` → `${pageTitle} | ${BRAND}`
  - `export function getRouteMeta(pathname: string): { titleKey: string; descriptionKey: string }` — normalize trailing slash; match `/`, `/services`, `/services/:slug`, `/solutions/:slug`, `/contacts`; slug lookups via `getService`/`getSolution` from `src/data/services.ts`/`solutions.ts`; fallbacks per §4.
- **`src/components/RouteMeta.tsx`** (new)
  - `useLocation()` + `useTranslation()`; resolves `getRouteMeta(pathname)`; returns fragment:
    ```tsx
    <>
      <title>{formatDocTitle(t(meta.titleKey))}</title>
      <meta name="description" content={t(meta.descriptionKey)} />
    </>
    ```
    (React 19 hoists both to `<head>`; do not place inside `<head>` manually.)
- **`src/layouts/MainLayout.tsx`** — import and render `<RouteMeta />` as first child of root `<Box>` (1–2 lines).
- **`index.html`** — `lang="ru"` (RU is default; currently `en`), keep `<title>Login AI</title>` as pre-JS floor, add static `<meta name="description" content="…home.metaDescription RU text…" />` so no-JS crawlers/curl see a meaningful RU default on every route (first client render replaces it per locale).
- **`src/i18n/ru.ts` + `src/i18n/en.ts`** — 4 keys each (above).
Optional (extension point, not in scope): OG tags later by adding `<meta property="og:title" …>` to the same fragment.
## 7. Tests (Vitest + Testing Library; jsdom provides `document.head` for React 19 hoisting)
1. **`src/seo.test.ts`** (new, pure):
   - Exhaustive route fixture: `["/", "/services", "/contacts", 6 × /services/<slug>, 7 × /solutions/<slug>]` → `getRouteMeta` returns non-empty keys and **titleKeys are all unique**; spot-check key mapping (e.g. `/solutions/computer-vision` → `solutions.computer-vision.title`).
   - Unknown slug / unknown path / trailing slash → fallback entries, never throws.
   - `formatDocTitle("X") === "X | Login AI"`.
2. **`src/App.seo.test.tsx`** (new; mirrors `renderApp` helper in `App.test.tsx` with `MemoryRouter`):
   - `beforeEach`: reset `document.title = ""` and remove stale `<meta name="description">` (hoisted tags unmount with RTL cleanup, but reset defensively).
   - For each route fixture: render, assert `document.title` non-empty, unique across the fixture set, matches `/ \| Login AI$/`, equals expected RU literal; assert one `<meta name="description">` with non-empty `content`; assert exactly one `<title>` element in `document.head`.
   - Live language switch: render `/`, `i18n.changeLanguage("en")`, assert title flips to the EN literal and description `content` flips too (no reload).
3. Existing `App.test.tsx` / `MainLayout.test.tsx` stay untouched and must keep passing (layout diff is additive).
## 8. Verification
- `npm run lint` (Biome 2) — note: a pre-existing formatting failure can surface in `src/data/solutions.ts` (untouched by this change); if so run `npx biome check --write src` before lint.
- `npm run test` — all suites incl. the two new files.
- `npm run build` (`tsc -b && vite build`).
## 9. Residual SEO risk (CSR SPA — stated)
- This is a client-side-only SPA. Crawlers that don't execute JS (or curl/social fetchers) receive `index.html` for every route: static `Login AI` title + RU home description (Vercel rewrites `/(.*)` → `/index.html`, confirmed in `vercel.json`). JS-capable crawlers (Google/Bing/Yandex) render and see per-route RU/EN meta per their locale state.
- Language is client-selected (RU default), so a crawler sees only the last-rendered locale in head; hreflang/alternate are out of scope.
- Per-slug descriptions exceed the ≈155-char guideline (truncation by engines, not an error); per-slug override map is the documented extension.
- True fix for no-JS routes = prerendering/SSR (e.g. Vite SSR or `vite-plugin-ssr`/static prerender) — recommended future work, out of scope here.
- Micro-delay before first client render replaces the static default (SPA norm; no FOUC beyond head).
