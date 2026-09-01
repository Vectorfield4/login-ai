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
- Tests: Vitest + Testing Library + MSW (mock via `src/mocks/handlers.ts`)
- Storybook stories next to components: `*.stories.tsx`

## i18n — multilingual rule (RU + EN)

**The site supports two languages: Russian (default) and English.** Every new
component, page, and content block MUST be written in ALL supported languages
at the same time. Never hardcode user-facing text.

- UI strings live in `src/i18n/ru.ts` and `src/i18n/en.ts` under the
  `ui.*`, `home.*`, `servicesPage.*`, `servicePage.*`, `solutionPage.*`,
  `contactsPage.*`, `showcase.*` keys. Add the key to BOTH files together.
- Data-driven content (`src/data/solutions.ts`, `src/data/services.ts`) stores
i18n keys (e.g. `solutions.<slug>.title`); the actual text for both languages
lives in the dictionaries. New data fields must be added to `ru.ts` and `en.ts`
and referenced via `t()` in components.
- Components use `useTranslation()` from `react-i18next` and call `t("...")`.
  Interpolation: `t("ui.footer", { year: ... })`.
- The language toggle is in the AppBar (`LanguageToggle`); the selected
  language is persisted in `localStorage` key `lang`.
- Missing a translation for one language is a bug — check both dictionaries
  before submitting changes.

## Cross-sells store

- Relevant solutions shown on other solution pages («How we can help you»)
  live in `src/data/crossSells.ts`. Add cross-sell groups there — never
  hardcode them on a page. The `CrossSells` component renders the block
  automatically on pages whose slug has a group.
