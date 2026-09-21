# AGENTS.md

## Project

**login-ai** — AI-powered login page. Repository: https://github.com/Vectorfield4/login-ai

## Stack

Astro 7 (SSG) + React 19 + TypeScript 5 (strict) + StyleX 0.19 + lucide-react +
Radix Dialog (Drawer) + GSAP (VideoShowcase) + Vitest 3 + Testing Library +
Biome 2 + Storybook 9.

Стек после миграции: **без** Vite-приложения, MUI, Emotion, i18next, Zustand,
TanStack Query, MSW и react-router. Стили — StyleX через
`@stylexjs/unplugin` (`stylex.create`, токены в `src/shared/design/tokens.stylex.ts`),
переводы — build-time через `createT` (`src/shared/i18n/t.ts`), данные — прямое
чтение фикстур (`src/shared/data/entities.ts`).

## Commands

- `npm run dev` — dev-сервер Astro (порт 4321)
- `npm run build` — typecheck + SSG-пререндер всех страниц в `dist/`:
  `tsc -b && astro build` (58 страниц, см. раздел SSG)
- `npm run preview` — preview production-сборки
- `npm run test` — тесты один раз (Vitest); `npm run test:watch` — watch
- `npm run lint` — Biome check; `npm run format` — Biome format (write)
- `npm run storybook` — Storybook dev (порт 6006); `npm run build-storybook`

## Conventions

- **No Tailwind, no ESLint/Prettier, no MUI** — Biome 2 — единственный
  linter/formatter (`biome.json`: 2 пробела, CRLF, double quotes).
- Стили только StyleX (`stylex.create`/`stylex.defineVars`, `useCSSLayers`).
  Стили в `.astro`-страницах — inline-атрибут `style` для разовой раскладки.
- Функциональные компоненты + хуки, TypeScript strict.
- Анимации: GSAP — только в `VideoShowcase`; 3D/R3F/Three, react-hook-form+zod,
  react-query, zustand и MSW удалены из зависимостей и кода.
- Формы на странице контактов — без react-hook-form/zod (библиотеки удалены).
- Тесты: Vitest + Testing Library; `vitest.config.ts` (алиас `@` → `src/`,
  vite-плагин Stylex, jsdom из `test/environment.ts`). MSW нет — данные
  читаются из фикстур напрямую.
- Storybook stories живут в корневом `stories/` (сейчас пуст, `.gitkeep`).

## Структура (Feature-Sliced)

`src/`: `app/`, `entities/`, `features/`, `pages/`, `shared/`, `widgets/`.
Импорты идут только вниз (shared ← entities ← features ← widgets ← pages).
У срезов публичный API в `index.ts`.

- `app/` — `layouts/BaseLayout.astro`: `<head>` (title/description/canonical/
  hreflang), bootstrap темы (inline-скрипт + StyleX-классы), слот;
  `styles/global.css` — базовые стили.
- `widgets/app-bar/` — `AppBar` (навигация, кнопки темы/языка, Drawer,
  `client:visible`).
- `pages/<name>.astro` и `pages/[lang]/…` — тонкие маршруты: `getStaticPaths`,
  `BaseLayout`, композиция секций (см. ниже). Пути:
  `index.astro` (RU-корень), `404.astro`, `[lang]/index.astro`,
  `[lang]/services.astro`, `[lang]/services/[slug].astro`,
  `[lang]/cases.astro`, `[lang]/cases/[slug].astro`,
  `[lang]/solutions/[slug].astro`, `[lang]/investors.astro`,
  `[lang]/contacts.astro`, `[lang]/404.astro`.
- `entities/` — `case` (модель + `caseSections.ts`, `CaseCard`, `CaseHero`,
  словарь), `service` (`ServiceCard`), `solution` (`SolutionCard`).
- `features/` — `case-filters` (`SolutionFilters`), `home-solutions`
  (`HomeSolutions` — фильтрация решений на главной, `client:visible`),
  `relevant-items` (девять source→target блоков + `RelevantSection`/
  `RelevantCard`, `groupByType`, `relevantBlockTitleKeys`).
- `shared/` —
  `ui/atoms|molecules|organisms` (атомы регистрируются в
  `src/shared/ui/atoms/index.ts`), `design/` (tokens.stylex.ts, theme.ts),
  `config/` (breakpoints, constants), `data/` (entities, routes, seo,
  iconCatalog, serviceCatalog), `hooks/` (useMatchMedia, useT), `i18n/`
  (dict.ts, t.ts, ru+en), `mocks/fixtures/` (+ тесты), `types/`
  (content, investors), `assets/images/`.
- Блоки переводят свои i18n-ключи внутри (они получают ключи, не строки).

## Композиция страниц

- Детальные услуги/решения: `[lang]/services/[slug].astro` и
  `[lang]/solutions/[slug].astro` собирают секции явно (hero/фичи/блоки/CTA).
- Кейсы (`[lang]/cases/[slug].astro`): hero (`CaseHero`) → «Результат»
  (`StatGrid` по `case.metrics`) → для `reputation-monitoring-platform`
  (Chasovoy) и `retail-support-bot` — свои секции из
  `src/entities/case/model/caseSections.ts` (`CountersSection`, `TileSection`,
  `StatsSection`, `SliderSection`); все остальные кейсы — без доп. секций →
  relevants (`CaseServices`, `CaseSolutions`, `SimilarCases`) → `CtaBlock`.
  Неизвестный slug — `Astro.redirect("/404")`. **Генерик-payload для секций
  (`ContentBlock[]` и т.п.) не вводить.**
- `InvestorsPage` (`[lang]/investors.astro`): секции перечислены явно
  (`CountersSection`, `TileSection`, `StatsSection`, `TableSection`,
  `QuoteSection`, `BarsSection`) с данными-ключами `investorsPage.*`.
- Чередование фоновой заливки секций: с первой секции каждый следующий блок
  flip: 1-я без `alt`, 2-я `alt`, 3-я без, 4-я `alt`, …

## i18n — правило двух языков (RU + EN)

**Сайт поддерживает русский (по умолчанию) и английский.** Любой новый
компонент, страница и контент-блок пишутся сразу на всех языках. Никогда не
зашивайте пользовательский текст в код.

- UI-ключи лежат в `src/shared/i18n/ru/<ns>.ts` и `src/shared/i18n/en/<ns>.ts`
  (зеркальные файлы по неймспейсам: `ui.*`, `home.*`, `servicesPage.*`,
  `servicePage.*`, `solutionPage.*`, `casePage.*`, `casesPage.*`,
  `contactsPage.*`, `investorsPage.*`, `showcase.*`, `audiences.*`,
  `technologies.*`, `relevants.*`, `notFoundPage.*`). Ключ добавляется в ОБА
  файла сразу.
- Словари сущностей — в срезах: `src/entities/{solution,service,case}/i18n/*`
  (`<plural>Ru`/`<plural>En`). Типы — `typeof` без `as const` (рекурсивный
  `Widen` не вводить).
- Полный словарь собирается в `src/shared/i18n/dict.ts`:
  `astroDictRu`/`astroDictEn` (shared-неймспейсы + словари сущностей,
  спредом). Фасад перевода — `createT(lang, astroDicts)` из
  `src/shared/i18n/t.ts`: точечная навигация по ключам + интерполяция
  `{{var}}`/`{var}`. `useT`/`useMatchMedia` — в `shared/hooks`.
- Компоненты получают `t` пропом (страница создаёт `createT(currentLang, …)`
  и передаёт вниз); `.astro`-строки используют ту же `t`.
- Переключатель языка — в AppBar (`LanguageToggle`); язык хранится в
  `localStorage["lang"]`, тема — в `localStorage["theme"]`.
- Отсутствие перевода на одном из языков — баг. Паритет объёмов RU/EN —
  `test/astro-content.test.ts` (импортирует `astroDicts` из `@/shared/i18n/dict`).

## Контент и качество

- Копирайт следует `docs/frontend/prose-quality.md` (читать перед правкой
  словарей). Чек-лист на каждый блок: конкретные числа, второе лицо,
  активный залог, без запрещённых слов, честный tradeoff.
- Структура компонентов/страниц — `docs/frontend/atomic-design.md` и
  `docs/frontend/feature-slice-design.md`. Новые контент-блоки — организмы в
  `shared/ui/organisms/`, оборачивающие `BlockSection` и рендерящие массивы
  i18n-ключей, переданных страницей. Интерфейсы данных — в `shared/types/`.

## Relevants (релевантные ссылки)

- Любая сущность (solution, service, case) ссылается на любую другую полем
  `relevants?: EntityRef[]` (наследование `WithRelevants`;
  `src/features/relevant-items/model/relevants.types.ts`). Ссылки — в
  фикстурах сущностей, никогда не хардкодить блоки на странице.
- Каждое отношение (source → target) — отдельный render-блок в
  `src/features/relevant-items/ui/`: `RelatedServices`, `PartOfSolutions`,
  `ServiceCases`, `SolutionServices`, `RelatedSolutions`, `SolutionCases`,
  `CaseServices`, `CaseSolutions`, `SimilarCases` — тонкие обёртки над
  `RelevantSection` + `RelevantCard`.
- Страницы группируют `relevants` через `groupByType()`
  (`src/features/relevant-items/model/relevants.ts`) и рендерят три блока для
  своего source-типа. Заголовки блоков — `relevants.blocks.<source>.<target>`
  (RU + EN); исчерпывающая матрица — `relevantBlockTitleKeys`.
- Заголовок/ссылка карточки резолвятся в `RelevantCard` через
  `src/shared/data/entities` (фикстуры), не через сторы.
- `noteKey` (опционально) — i18n-ключ под `relevants.*` (Ru+En).

## SSG (статическая генерация)

- `npm run build` = `tsc -b && astro build`. `outDir: "dist"`, `astro build`
  пререндерит все страницы: 58 HTML в `dist/` (корневой `/` — RU-главная,
  `/{ru,en}/…`). Как устроено — `docs/frontend/ssg.md`.
- `astro.config.ts`: `site`, `trailingSlash: "never"`, интеграции `react()`,
  `sitemap()`; `vite.plugins` — Stylex-unplugin (`useCSSLayers: true`,
  алиас `@/*`), `vite.resolve.alias` `@` → `src/`. Про роутинг: `i18n` с
  `defaultLocale: "ru"`, `prefixDefaultLocale: false` → `/` рендерит RU-главную
  на месте (`src/pages/index.astro`), остальное под `/{ru,en}/…`.
- Детальные `[slug]`-страницы генерируют `getStaticPaths` из фикстур
  (`getCases()/getServices()/getSolutions()`).
- SEO: `src/shared/data/seo.ts` (`resolvePageMeta`, `getRouteMeta`,
  `formatDocTitle`, `BRAND = "Login AI"`) → `BaseLayout` пишет `<title>`,
  `<meta name="description">`, canonical, hreflang ru/en.
- `<script>`/`<style>` и ход hydration — стандартный Astro:

  - `.astro`-компоненты рендерятся в статику при сборке;
  - интерактивные React-острова подключаются директивой
    `client:visible`/`client:load` (AppBar, HomeSolutions, SliderSection,
    VideoShowcase) — гидратация в браузере, на JS-less работают статические
    содержиния (секции, fallback слайдера).
- 404: `src/pages/404.astro` (статическая) + `[lang]/404.astro`; неизвестные
  маршруты Astro отдаёт 404 автоматически.

## Релиз и FTP-деплой

- `.github/workflows/ssg.yaml`: `workflow_dispatch` → `npm run build` →
  ZIP (`ssg-site.zip`) прикрепляется к GitHub Release → деплой `dist/` по
  FTP в `server-dir` (значение из секрета `FTP_PATH`).
- Креды FTP берутся из GitHub secrets: `FTP_HOST`, `FTP_LOGIN`, `FTP_PASS`,
  `FTP_PATH`. В код и словари их не добавлять.
- Деплой — `SamKirkland/FTP-Deploy-Action@v4.4.0` (синхронизация): удаляет на
  сервере файлы прошлых релизов, которых больше нет в `dist/`. Для этого
  экшен авто-коммитит `.ftp-deploy-sync-state.json` в корень репо (нужен
  `contents: write`, он есть); файл не добавлять в `.gitignore`.

## Проверка перед сдачей

- `npm run test` — Vitest зелёный (RU/EN-паритет, фикстурные тесты,
  компонентные тесты). Безвредное предупреждение от Vitest в конце
  («something prevents Vite server from exiting») — известное поведение
  Stylex-плагина, exit code 0.
- `npm run lint` — Biome чистый.
- `npm run build` — `tsc -b` + Astro SSG без ошибок; в `dist/` 58 страниц.