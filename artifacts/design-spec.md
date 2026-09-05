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


# Feature: Cases page (Кейсы)

## 1. Scope and decisions
- **Listing-only page** at route `/cases` (request says «cases page», singular — one page, no `/cases/:slug`). Cards do NOT navigate to a detail page; the page converts through the shared bottom `CtaBlock` → `/contacts`. A `/cases/:slug` detail page is a documented future extension (§10) that this key/data structure is designed to support without breaking.
- **6 sample demo cases** (grid 3-col desktop → exactly 2 rows), consistent with repo copy style and honest about being placeholders (site precedent: `showcase.demoText`, `solutions.video-generation.showcase.note` — «появятся на следующем этапе»).
- **No new assets.** Cards are image-less and mirror the `ServicesPage` card visual language (MUI icon in `IconCircle` + chips), not `SolutionCard` (which renders `image` covers). `src/assets` untouched.
- **No new cross-cutting state, no API, no new queries/mutations, no new cross-sells.**
- Nav label RU «Кейсы» / EN «Cases» — one flat menu entry (no dropdown) between «Услуги» and «Контакты» on desktop and in the mobile Drawer.
- Atomic roles are mapped onto the repo's **flat `src/components/` convention** (no atomic folders exist in this project — do not create them; the SEO spec §6 already states the convention).
- Traces to acceptance: listing-only + count 4–6 → §2/§3; exact one route → §3; data model + exact `casesPage.*`/`cases.*` parity keys → §4/§5; SEO keys → §6; tests → §8.

## 2. Page structure & Atomic Design mapping
| Atomic role | Repo artifact | Notes |
|---|---|---|
| Template | `src/layouts/MainLayout.tsx` (existing) | AppBar + nav + Drawer + footer + `<Outlet/>`; only nav rows change |
| Page (organism composition) | `src/pages/CasesPage.tsx` (new) | composes Section/Container/Grid like `ServicesPage.tsx` |
| Organism: hero | inline `<Section>` block | h1 + subtitle + text, centered, `py: { xs: 4, md: 8 }` (ServicesPage/ContactsPage pattern) |
| Organism: demo notice | `<Alert severity="info">` (new key `casesPage.demoNotice`) | under hero, inside same first `Section`; `Alert` styling already themed (`MuiAlert` borderRadius token) |
| Organism: cases grid | `<Section alt>` + `SectionHeader` + `Grid container spacing={3}` | grid cells `xs: 12, sm: 6, md: 4` (identical to services grid) |
| Molecule: case card | `src/components/CaseCard.tsx` (new) | renders one `CaseStudy` (structure below); equal-height Card, `elevation={1}` |
| Molecule: CTA | `CtaBlock` (existing, reused) | `title/text/buttonLabel` from `casesPage.cta*`, `to="/contacts"` |
| Atoms (reused) | `Section`, `SectionHeader`, `IconCircle`, MUI `Typography/Button/Chip/Card/CardContent/Divider/Grid` | no new atoms |

`Section alt` alternation mirrors `ServicesPage` exactly: hero (default bg) → grid `Section alt` (`grey[50]`/dark `grey[900]`) → `CtaBlock` (its own `Section alt`). No GSAP/3D needed — MUI card hover lift/shadow transition already global (theme `MuiCard` overrides). Optional future: scroll animations, out of scope.

### CaseCard structure (guidance for implementer)
- `<Card>` **not** wrapped in RouterLink (no detail route). `height: "100%"`, flex column.
- Header row: `IconCircle` (per-case MUI icon from data, `size={48}` default) + industry `<Chip size="small" variant="outlined" color="secondary">` right-aligned.
- `Typography variant="h6" component="h3"` → case `title`; `body2 color="text.secondary"` → `tagline`.
- `<Divider/>` + metrics block: 3 metrics, each two-line stack (value first: `variant="h6"`/primary; label: `overline`/`text.secondary`), flex wrap, no hardcoded spacing values.
- Footer (only when `relatedSolution` is set): `Button size="small" variant="soft" component={RouterLink}` to `/solutions/<relatedSolution>` with `t("casesPage.cardSolutionLink")`.

## 3. Route registration & nav integration
### App.tsx
Import `CasesPage` and register before the catch-all (route paths are distinct segments; order irrelevant):
```tsx
<Route path="contacts" element={<ContactsPage />} />
<Route path="cases" element={<CasesPage />} />   // new
<Route path="*" element={<Navigate to="/" replace />} />
```
No conflict with existing routes (`services`, `services/:slug`, `solutions/:slug` use fixed prefixes).

### MainLayout.tsx — desktop nav (non-mobile `Box component="nav"`)
Insert between the «Услуги» dropdown `Button` and the «Контакты» `Button`:
```tsx
<Button color="inherit" component={RouterLink} to="/cases">
  {t("ui.menu.cases")}
</Button>
```
Resulting nav text order: `Главная, Решения, Услуги, Кейсы, Контакты` (updates the expectation in `MainLayout.test.tsx`, see §8).

### MainLayout.tsx — mobile Drawer
Insert after the «Услуги» dense `List` + its `<Divider/>` and **before** the «Контакты» `<Divider/><List>` block (keeps «Контакты» the last link so the existing drawer last-link test stays valid):
```tsx
<Divider />
<List>
  <ListItemButton component={RouterLink} to="/cases">
    <ListItemText primary={t("ui.menu.cases")} />
  </ListItemButton>
</List>
```
RU/EN labels come from the single new key `ui.menu.cases` (both dictionaries, §5). No change to `LanguageToggle`, `ThemeToggle`, dropdown `Menu`s, or `RouteMeta`.

## 4. Data model — `src/data/cases.ts` (new)
Same convention as `services.ts` (typed interfaces + `SvgIconComponent` icons in the data file + **i18n keys as string fields**, text lives in dictionaries). One extension vs services: no `navTitle` (no dropdown usage).

```ts
import type { SvgIconComponent } from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { getSolution } from "./solutions";

/** Одна метрика результата кейса. label/value — ключи i18n (cases.<slug>.metrics.N.*). */
export interface CaseMetric {
  label: string;
  value: string;
}

/**
 * Демонстрационный кейс. Все текстовые поля — ключи i18n (см. src/i18n/ru.ts и en.ts).
 * Пока нет реальных клиентских материалов — контент смоделирован по типовым задачам
 * и явно помечен на странице (casesPage.demoNotice).
 */
export interface CaseStudy {
  slug: string;
  title: string;        // cases.<slug>.title
  tagline: string;      // cases.<slug>.tagline
  description: string;  // cases.<slug>.description
  icon: SvgIconComponent; // заглушка вместо скриншота — ассетов не добавляем
  industryKey: string;  // переиспользуем существующие ключи audiences.* (чип отрасли)
  relatedSolution?: string; // slug решения из src/data/solutions.ts (опциональная ссылка)
  metrics: CaseMetric[];    // 3 шт., keys cases.<slug>.metrics.N.{label,value}
}

export const cases: CaseStudy[] = [
  // slug: "retail-support-bot" | "quality-vision-line" | "clinic-ai-assistant"
  //       | "agency-content-pipeline" | "product-launch-video" | "marketplace-reputation"
  // (full entries below in §5 copy; icons/industries/related per table)
];

export function getCase(slug: string | undefined): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
```
Sample-set mapping (icon, industry chip key, related solution slug):

| # | slug | icon | industryKey | relatedSolution |
|---|---|---|---|---|
| 1 | `retail-support-bot` | `SupportAgentIcon` | `audiences.businessOwners` | `agentic-systems` |
| 2 | `quality-vision-line` | `FactCheckIcon` | `audiences.manufacturers` | `computer-vision` |
| 3 | `clinic-ai-assistant` | `LocalHospitalIcon` | `audiences.clinics` | `medical-clinics` |
| 4 | `agency-content-pipeline` | `AutoAwesomeIcon` | `audiences.adAgencies` | `content-generation` |
| 5 | `product-launch-video` | `VideoCameraFrontIcon` | `audiences.businessOwners` | `video-generation` |
| 6 | `marketplace-reputation` | `RateReviewIcon` | `audiences.businessOwners` | `reputation-management` |

Optional `image?: string` field is the documented extension point when real portfolio material arrives (mirrors `Solution.image`); the cases data test must NOT require it (unlike `solutions.test.ts`, because cases ship no covers yet).

## 5. i18n keys — add to BOTH `ru.ts` and `en.ts` (en typed `RuDict` ⇒ structure byte-identical)
Three insertions per file: `ui.menu.cases`, a top-level `casesPage` block (place after `contactsPage`, before `showcase`), and a top-level `cases` block (place after `services`, end of root object). No existing key is touched. `casesPage.title` doubles as the doc-title key and reuses the `home.metaTitle`? — no: reuse the flat static-page convention (like `servicesPage.title`) and add only `casesPage.metaDescription`.

```ts
// ui.menu (both files)
cases: "Кейсы",        // ru.ts
cases: "Cases",        // en.ts
```

```ts
// ru.ts — casesPage (полный блок)
casesPage: {
  title: "Кейсы",
  subtitle: "Подборка проектов с измеримыми результатами — от агентных систем до генерации видео.",
  text: "Опишите свою задачу — покажем, как такой проект выглядит для вашего бизнеса, и подготовим расчёт.",
  sectionEyebrow: "Портфолио",
  sectionTitle: "Примеры работ",
  sectionSubtitle: "Каждый кейс — типовой сценарий внедрения: задача, подход и измеримый результат.",
  demoNotice:
    "Примеры ниже — демонстрационные: они собраны по типовым задачам. Реальные материалы клиентов появятся на следующем этапе — запросите демо, и мы покажем проект на вашей задаче.",
  cardSolutionLink: "Подробнее о решении",
  ctaTitle: "Хотите такой же результат?",
  ctaText: "Расскажите о задаче — предложим решение в духе показанных кейсов и подготовим расчёт.",
  ctaButton: "Обсудить задачу",
  metaDescription:
    "Кейсы внедрения ИИ: агентные системы, компьютерное зрение, генерация контента и видео, управление репутацией. Задачи, подходы и измеримые результаты.",
},
```
```ts
// en.ts — casesPage (identical structure)
casesPage: {
  title: "Cases",
  subtitle: "A selection of projects with measurable results — from agentic systems to video generation.",
  text: "Tell us about your task — we'll show how such a project looks for your business and prepare a quote.",
  sectionEyebrow: "Portfolio",
  sectionTitle: "Work examples",
  sectionSubtitle: "Each case is a typical implementation scenario: task, approach, and measurable result.",
  demoNotice:
    "The examples below are demo cases built from typical tasks. Real client material is coming at the next stage — request a demo and we'll show a project on your task.",
  cardSolutionLink: "More about the solution",
  ctaTitle: "Want a similar result?",
  ctaText: "Tell us about your task — we'll propose a solution in the spirit of the cases above and prepare a quote.",
  ctaButton: "Discuss your task",
  metaDescription:
    "AI implementation cases: agentic systems, computer vision, content and video generation, reputation management. Tasks, approaches, and measurable results.",
},
```

### `cases.<slug>.*` — per-case content (full RU block; EN block mirrors 1:1)
```ts
// ru.ts
cases: {
  "retail-support-bot": {
    title: "Агентная поддержка интернет-магазина",
    tagline: "Заявки, заказы и документы — без участия оператора",
    description:
      "ИИ-агент принимает обращения из чата и почты, уточняет детали, оформляет заказы и передаёт их в CRM. Операторы подключаются только к нестандартным ситуациям.",
    metrics: [
      { label: "Время обработки обращения", value: "−70 %" },
      { label: "Обращения без оператора", value: "82 %" },
      { label: "Доступность", value: "24/7" },
    ],
  },
  "quality-vision-line": {
    title: "Контроль качества на производственной линии",
    tagline: "Компьютерное зрение видит брак раньше человека",
    description:
      "Камеры проверяют каждую единицу продукции в реальном времени и останавливают линию при браке. Модель обучали на архиве дефектов предприятия — и продолжают дообучать на новых данных.",
    metrics: [
      { label: "Пропущенный брак", value: "−90 %" },
      { label: "Скорость проверки", value: "в 5 раз быстрее" },
      { label: "Окупаемость", value: "8 месяцев" },
    ],
  },
  "clinic-ai-assistant": {
    title: "ИИ-ассистент для врачей клиники",
    tagline: "Меньше бумажной работы — больше времени на пациента",
    description:
      "Ассистент готовит записи приёма, подсказывает протоколы и ведёт дневник пациента между визитами. Документация заполняется автоматически — врач только проверяет.",
    metrics: [
      { label: "Время врача на документы", value: "−40 %" },
      { label: "Удержание пациентов на лечении", value: "+25 %" },
      { label: "Доступность ассистента", value: "24/7" },
    ],
  },
  "agency-content-pipeline": {
    title: "Контент-конвейер для рекламного агентства",
    tagline: "Посты, баннеры и рассылки в фирменном стиле",
    description:
      "Генерируем материалы по брифам, проверяем редактором и тональностью и публикуем по календарю. Агентство выпускает в разы больше контента без расширения команды.",
    metrics: [
      { label: "Объём публикаций", value: "×3" },
      { label: "Время на подготовку поста", value: "−60 %" },
      { label: "Вовлечённость аудитории", value: "+30 %" },
    ],
  },
  "product-launch-video": {
    title: "Проморолик запуска продукта",
    tagline: "От сценария до монтажа — за неделю",
    description:
      "Собрали референсы, сгенерировали кадры и смонтировали ролик под площадки: 16:9, 9:16 и 1:1. Согласование стиля с брендбуком заняло три итерации вместо обычных недель.",
    metrics: [
      { label: "Срок производства", value: "7 дней" },
      { label: "Версии под площадки", value: "5" },
      { label: "Стоимость ролика", value: "−50 %" },
    ],
  },
  "marketplace-reputation": {
    title: "Управление репутацией на маркетплейсах",
    tagline: "Мониторинг отзывов и ответы в тоне бренда",
    description:
      "Собираем отзывы с площадок, определяем тональность и отвечаем на каждый: негатив обрабатывается в течение часа. Разбор тем показывает, что улучшить в продукте и карточке товара.",
    metrics: [
      { label: "Время ответа на отзыв", value: "< 1 часа" },
      { label: "Доля негативных отзывов", value: "−35 %" },
      { label: "Рейтинг магазина", value: "4,8 из 5" },
    ],
  },
},
```
```ts
// en.ts — cases (identical structure)
cases: {
  "retail-support-bot": {
    title: "Agentic support for an online store",
    tagline: "Requests, orders and documents — no operator involved",
    description:
      "An AI agent picks up inquiries from chat and email, clarifies details, places orders and pushes them to the CRM. Operators step in only for edge cases.",
    metrics: [
      { label: "Request handling time", value: "−70%" },
      { label: "Inquiries without an operator", value: "82%" },
      { label: "Availability", value: "24/7" },
    ],
  },
  "quality-vision-line": {
    title: "Quality control on a production line",
    tagline: "Computer vision catches defects before a human does",
    description:
      "Cameras inspect every unit in real time and stop the line when a defect appears. The model was trained on the plant's defect archive and keeps learning from new data.",
    metrics: [
      { label: "Escaped defects", value: "−90%" },
      { label: "Inspection speed", value: "5× faster" },
      { label: "Payback", value: "8 months" },
    ],
  },
  "clinic-ai-assistant": {
    title: "An AI assistant for clinic doctors",
    tagline: "Less paperwork — more time with patients",
    description:
      "The assistant drafts visit notes, suggests clinical protocols, and keeps the patient diary between visits. Documentation is filled in automatically — the doctor just reviews it.",
    metrics: [
      { label: "Doctor time on paperwork", value: "−40%" },
      { label: "Patients staying in treatment", value: "+25%" },
      { label: "Assistant availability", value: "24/7" },
    ],
  },
  "agency-content-pipeline": {
    title: "A content pipeline for an ad agency",
    tagline: "Posts, banners and mailings in brand style",
    description:
      "We generate material from briefs, validate it with an editor and a tone check, and publish on a calendar. The agency ships several times more content without growing the team.",
    metrics: [
      { label: "Publishing volume", value: "×3" },
      { label: "Time to prepare a post", value: "−60%" },
      { label: "Audience engagement", value: "+30%" },
    ],
  },
  "product-launch-video": {
    title: "A promo video for a product launch",
    tagline: "From script to final edit in a week",
    description:
      "We gathered references, generated shots and cut the video for every platform: 16:9, 9:16 and 1:1. Brand-book alignment took three iterations instead of the usual weeks.",
    metrics: [
      { label: "Production time", value: "7 days" },
      { label: "Platform versions", value: "5" },
      { label: "Cost per video", value: "−50%" },
    ],
  },
  "marketplace-reputation": {
    title: "Reputation management on marketplaces",
    tagline: "Review monitoring and on-brand replies",
    description:
      "We collect reviews across platforms, detect sentiment, and reply to every one: negative feedback is handled within the hour. Topic analysis shows what to improve in the product and the listing.",
    metrics: [
      { label: "Time to reply to a review", value: "< 1 hour" },
      { label: "Share of negative reviews", value: "−35%" },
      { label: "Store rating", value: "4.8 out of 5" },
    ],
  },
},
```
Parity note: `en.ts` is typed `RuDict = Widen<typeof ru>` — key structure (incl. array positions `metrics.0/1/2`) must match exactly; ordering inside objects may differ but keep mirrored for maintainability.

## 6. SEO wiring (existing per-route mechanism — `src/seo.ts` + `RouteMeta`)
No mechanism change (React 19 hoisting stays in `MainLayout` → `RouteMeta`). Only the resolver gains one static branch:
```ts
/** Мета раздела «Кейсы» — статичная страница (без detail-маршрута на этом этапе). */
const CASES_META: RouteMeta = {
  titleKey: "casesPage.title",
  descriptionKey: "casesPage.metaDescription",
};
// в getRouteMeta, рядом с другими статичными путями:
if (path === "/cases") return CASES_META;
```
- Title reuses `casesPage.title` (flat static-page convention, like `servicesPage.title`/`contactsPage.title`) → document titles `Кейсы | Login AI` / `Cases | Login AI` via existing `formatDocTitle`.
- No `/cases/:slug` resolver branch yet: `/cases/unknown` falls through to the existing `HOME_META` fallback (documented; revisit when a detail page ships — then map slug via `getCase(slug)` reusing `cases.<slug>.title/description` for meta exactly like `solutions`/`services` do, which is why per-case `title`+`description` already exist).
- Trailing-slash: existing `normalizePath` already handles `/cases/`.

## 7. Files & structure
- `src/pages/CasesPage.tsx` (new) — hero Section (title/subtitle/text) + `Alert demoNotice` + `Section alt` grid (`SectionHeader` eyebrow/sectionTitle/sectionSubtitle + `CaseCard` × `cases`) + `CtaBlock`; `useTranslation` + map over `cases` from data.
- `src/components/CaseCard.tsx` (new) — single `CaseStudy` card (see §2).
- `src/data/cases.ts` (new) — §4 model, 6 demo entries, `getCase`.
- `src/data/cases.test.ts` (new) — §8.
- `src/i18n/ru.ts` / `src/i18n/en.ts` — §5 insertions (3 spots each).
- `src/App.tsx` — route `cases` + import.
- `src/layouts/MainLayout.tsx` — desktop Button + Drawer item (`ui.menu.cases`).
- `src/seo.ts` — `CASES_META` + `/cases` branch.
- `src/seo.test.ts`, `src/App.seo.test.tsx`, `src/layouts/MainLayout.test.tsx`, `src/App.test.tsx` — updates per §8.
No Storybook stories exist for existing components (no `*.stories.tsx` in repo) — do not add one.

## 8. Tests
1. **`src/data/cases.test.ts`** (new; mirrors `src/data/solutions.test.ts` style — pure data validation, RU strings, Vitest):
   - slugs unique;
   - every case has a truthy `icon` and a `industryKey` starting with `audiences.`;
   - every `title`/`tagline`/`description` and `metrics[].label`/`metrics[].value` is a non-empty string starting with `cases.`;
   - each `relatedSolution` (when set) resolves via `getSolution(slug)` to an existing solution (import from `./solutions`).
   - explicit note: **no** image requirement (unlike `solutions.test.ts`).
2. **`src/layouts/MainLayout.test.tsx`** (edit 2 tests + 1 new):
   - desktop test «в desktop-навигации …»: expected labels become `["Главная", "Решения", "Услуги", "Кейсы", "Контакты"]`; add assertion that the nav link named «Кейсы» has `href="/cases"`;
   - mobile Drawer test: keep (last link stays «Контакты»), optionally extend with link «Кейсы» → `/cases`;
   - new RU/EN label check: after `i18n` switch to EN the nav contains «Cases» (mirrors the existing language-switch test, which asserts «Home»).
   - dropdown/key-leak tests untouched and must still pass.
3. **`src/seo.test.ts`** (edit): add `"/cases"` to `ROUTE_FIXTURE`; static-mapping test adds `expect(getRouteMeta("/cases")).toEqual({ titleKey: "casesPage.title", descriptionKey: "casesPage.metaDescription" })`; trailing-slash test adds `"/cases/"`; fallback test adds `"/cases/unknown-slug"` → `HOME_META` (no detail route yet). Unique-titleKey assertion keeps passing (key set unchanged in count +1).
4. **`src/App.seo.test.tsx`** (edit): add `"/cases"` to `ROUTE_FIXTURE` and `"/cases": "Кейсы"` to `ROUTE_RU_TITLE` (both files build fixtures from real arrays + static strings, mirroring `services`/`contacts`).
5. **`src/App.test.tsx`** (edit): new «renders the cases page» test — `renderApp(["/cases"])`, assert h1 «Кейсы», demo notice text, and that the per-card links («Подробнее о решении») count equals `cases.length` and point to existing `/solutions/<slug>` hrefs.

## 9. Verification
- `npm run test` — all suites incl. new/updated files above.
- `npm run lint` (Biome 2); if the pre-existing formatting failure in `src/data/solutions.ts` surfaces (untouched by this change), run `npx biome check --write src` first.
- `npm run build` (`tsc -b && vite build`).

## 10. Residual risks / future extension
- Sample cases are demo content: invented but deliberately generic (no fake client names/emails — consistent with ContactsPage discipline), and the page itself discloses this via `demoNotice`.
- Cards are informational (no per-card link target) — the only navigation affordances are the related-solution footer buttons and the final CTA. If a `/cases/:slug` detail page is requested later: add route + `getCase`-driven resolver branch (keys already compatible), then CaseCard can become a RouterLink like SolutionCard.
- Real portfolio will eventually need images: add optional `image` (extension point documented in §4) and only then tighten the data test.
- Every new user-facing string lives in both dictionaries by construction (`RuDict`); no runtime parity test exists repo-wide, TS typing is the guard.
