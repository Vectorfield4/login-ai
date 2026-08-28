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
