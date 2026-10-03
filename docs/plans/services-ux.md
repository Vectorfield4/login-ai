# Services UX Plan (grouping + responsive picker)

Two related changes:

- **A. Services grouping** — the Services menu and the home picker group
  services into categories, with a real nested submenu and group landing pages.
- **B. Responsive service picker** — on small screens the vertical tab list
  becomes a horizontal icon slider with arrows; copy sticks to the top, the
  image is covered, and the selected icon uses a new accent color.

Companions: `docs/frontend/atomic-design.md`,
`docs/frontend/feature-slice-design.md`, `docs/frontend/i18n.md`,
`docs/frontend/prose-quality.md`.

## Confirmed decisions

1. Group set and labels: yes (table in A1).
2. Menu: **real nested submenu** with group pages of similar design; a **layout
   refactor** is allowed to share the page shell.
3. Accent color must pass a **contrast check** (light + dark).
4. **Slides are not limited**: no line clamp; full copy stays. A max-length cut
   with the green "Читать далее" is only the fallback for over-long copy.
5. Icon/control sizes follow the **existing scale levels**, not a literal 50%.

## Status rollup (2026-10-03)

Done:

- [x] **A1–A2** `group` on all 24 services, `groupServices.ts`, `servicesGroups`
  i18n (RU/EN, parity test).
- [x] **A3** nested Services submenu: group row links to its page, chevron
  expands its services; the active group opens by default.
- [x] **A4** group pages `/services/group/<group>` (6 × RU/EN) with SEO and
  breadcrumbs.
- [x] **A5** tests: `groupServices`, i18n parity, nav/breadcrumbs.
- [x] **B1** `colorAccent` (teal `#00796B` / `#4DB6AC`) + contrast test; the
  StyleX literals are mirrored in `tokens.stylex.ts` and guarded against
  `accent.ts`.
- [x] **B2–B4** grouped responsive `ServiceTabList` (below `md` → horizontal
  icon strip), prev/next arrows, accent selection, sizes 40→32 / 20→16.
- [x] **B5** `object-fit: cover`, sticky mobile lead, "Читать далее" fallback at
  220 chars; no line clamp (decision 4).
- [x] **B6** tests updated.

Remaining:

- [ ] `ServiceShell` layout refactor: extract the shared service page shell
  (AppBar + breadcrumbs + PageHero + Section + CtaBlock) reused by `/services`,
  `/services/[slug]` and `/services/group/<group>`. Today the group page
  duplicates that structure. Optional — the user allowed it, did not require it.
- [ ] `/services` index grouping — **not planned**: keep the index a flat card
  grid (decision 2026-10-03).

Verification (last run): `lint` clean; `test` 199 passed; `verify` 131 pages,
`verify:dist` ok.

Still open: shared `ServiceShell` layout refactor; the `/services` index is a
flat card grid, not grouped by category.

## Current state

- Type `Service` (`entities/service/model/services.ts`) — no `group` field.
- Menu: `widgets/app-bar/model/nav.ts` (`toChildren(getServices())`, flat),
  rendered by `NavChildrenList.tsx` / `NavDropdown.tsx`.
- Picker: `widgets/service-ecosystem/ui/organisms/ServiceTabsSection.tsx` +
  `entities/service/ui/molecules/ServiceTabList.tsx` +
  `entities/service/ui/organisms/ServiceSpotlight.tsx`.
- Breakpoints (`Grid.tsx`): `sm` 600, `md` 900, `lg` 1200.
- Tokens (`shared/design/tokens.stylex.ts` + `darkTokens`): no accent token.
- Icon scale in use: glyph 14/16/20/24/32; `IconCircle` 28/40/64.

## Part A — Services grouping

### A1. Data

```ts
// services.ts
export type ServiceGroup = "ai-integrations" | "ai-infra" | "ml" | "engineering" | "web-growth" | "training";
export interface Service extends WithRelevants, Publishable {
  group: ServiceGroup;
  ...
}
```

| group | RU label | services |
|---|---|---|
| `ai-integrations` | ИИ-интеграции | ai-crm-integration, ai-task-tracker-integration, ai-erp-integration, ai-cms-integration |
| `ai-infra` | ИИ-инфраструктура | ai-infrastructure, sovereign-model-deployment, deterministic-rag-systems, ai-infra-cost-optimization, ai-security-audit |
| `ml` | ML-сервисы | computer-vision-systems, predictive-analytics-systems, anomaly-detection-systems, mlops-platforms, nlp-systems, recommendation-systems, speech-recognition-systems, reinforcement-learning-systems |
| `engineering` | Разработка и инфраструктура | software-development, highload-backend |
| `web-growth` | Веб и рост | corporate-websites, landing-pages, seo-aeo, information-monitoring |
| `training` | Обучение | corporate-ai-training |

Group order and item order live in `groupServices.ts` (single source for menu,
group pages and picker).

### A2. i18n

New namespace `servicesGroups` (RU + EN, equal keys):

```
servicesGroups.ai-integrations
servicesGroups.ai-infra
servicesGroups.ml
servicesGroups.engineering
servicesGroups.web-growth
servicesGroups.training
servicesGroups.ml.title / .subtitle (group page hero, one set per group)
```

Registered in `shared/i18n/dict.ts` like `audiences`/`technologies`, and added
to the parity test.

### A3. Nested submenu

- `NavChild` gains `children?: NavChild[]` and `groupKey?: string`.
- `nav.ts` builds Services as groups: each group is a child with `path`
  (`/services/group/<group>`) and `children` (its services).
- `NavDropdown` renders a **second-level flyout**: hovering/clicking a group
  opens its services. Keyboard: the group row is a link to the group page and a
  toggle for the submenu (`aria-haspopup`, `aria-expanded`, arrow keys).
- Applied to Services only; Solutions/Cases stay flat.

### A4. Group pages + layout refactor

- New route `src/pages/[lang]/services/group/[group].astro`: hero
  (`servicesGroups.<group>.title/.subtitle`), the group's services as the same
  cards used by `/services`, CTA.
- **Layout refactor**: extract the shared service shell (AppBar + breadcrumbs +
  `PageHero` + `Section` + `CtaBlock`) into `src/app/layouts/ServiceShell.astro`
  (or a `ServicePage` organism), reused by `/services/index`,
  `/services/[slug]` and the group page, so all three share one design.
- `resolveBreadcrumbs` / `getRouteMeta`: add the `/services/group/<group>` case
  (title from `servicesGroups`, breadcrumb Services → group).
- The picker shows the same group headings as the menu.

### A5. Tests

- `test/astro-content.test.ts`: `servicesGroups` parity.
- `fixtures.test.ts`: every service has an allowed `group`.
- New `groupServices.test.ts`: stable order, covers all services.
- `nav` test: Services has groups with `children`; group slugs valid.
- `routes`/breadcrumbs test: `/services/group/<group>` resolves and appears in
  `getStaticPaths` for all groups.
- `ServiceTabList.test.tsx`: group headings render.

## Part B — Responsive picker (breakpoint `md` 900px)

### B1. Accent token + contrast

Add a unique thematic accent (distinct from red primary), light + dark:

```ts
colorAccent: "#00897B",
colorAccentSoft: "#00897B1A",
colorAccentSoftHover: "#00897B2E",
colorAccentContrastText: "#FFFFFF",
// darkTokens
colorAccent: "#4DB6AC",
colorAccentSoft: "#4DB6AC1A",
colorAccentSoftHover: "#4DB6AC2E",
```

**Contrast requirement (decision 3).** The chosen hue must pass:
- text/icon on `colorAccent` ≥ 4.5:1 (use `colorAccentContrastText`);
- `colorAccent` against `colorSurface`/`colorBg` ≥ 3:1 (UI component).

If teal fails in one theme, adjust the shade until both ratios pass. Add a small
unit test that computes the WCAG ratio from the hex values and asserts the
thresholds, so a future palette edit cannot silently break it.

### B2. `ServiceTabList`

- One level down the existing scale, both layouts: `IconCircle` 40 → 32, glyph
  20 → 16 (decision 5; keep the scale step, not a literal 50%).
- Desktop (≥900px): vertical list, label visible; active uses `colorAccent`
  (`borderColor`/`backgroundColor`/inset bar) instead of `colorPrimary`.
- Mobile (<900px): `flexDirection: row`, `overflowX: auto`,
  `scrollSnapType: x mandatory`, items `scrollSnapAlign: start`; label hidden
  (`display: none`), each button gets `aria-label`/`title` with the service
  `navTitle`.

### B3. Arrows

- `chevron-left`/`chevron-right` buttons inside the mobile strip, wired to
  `step(-1)/step(1)`; disabled at the ends; `aria-label` from
  `home.servicesPrev` / `home.servicesNext`.

### B4. Slider layout (flex)

- Mobile container: `display: flex; flexDirection: column;` order: strip
  (with arrows) → spotlight; the spotlight `actions` row pins to the bottom
  (`marginTop: auto`, or `column-reverse` on the spotlight root). The block
  reads as pick → content → act.
- No cap on the number of slides: the strip scrolls horizontally through all
  services of all groups (decision 4).

### B5. `ServiceSpotlight`

- Image: `objectFit: "cover"` with `aspectRatio: "16 / 9"` (currently
  `height: auto`, so `cover` is a no-op).
- Mobile copy sticks to the top: lead block `position: sticky; top: 0; zIndex: 1`
  on a surface background.
- Copy is **not line-clamped** (decision 4). Full text shows; only if a copy
  exceeds a configured max length is it cut with an ellipsis and a green
  "Читать далее" (`colorSuccess`) that expands it. New i18n:
  `home.servicesReadMore`, `home.servicesShowLess`.

### B6. Tests

- `ServiceSpotlight.test.tsx`: with copy above the max length, the button
  appears, expands and collapses; normal copy shows no button.
- `ServiceTabList.test.tsx`: mobile variant hides the label but keeps the
  accessible name; group headings render.
- `ServiceTabsSection.test.tsx`: arrows step and disable at the ends.
- `tokens` contrast test (B1).

## Files to touch

| Area | File |
|---|---|
| Type + data | `entities/service/model/services.ts`, `model/fixtures/<slug>.ts` |
| Group helper | `entities/service/model/groupServices.ts` (+ test) |
| i18n | `shared/i18n/{ru,en}/servicesGroups.ts`, `shared/i18n/dict.ts` |
| Menu | `widgets/app-bar/model/nav.ts`, `ui/molecules/NavChildrenList.tsx`, `ui/molecules/NavDropdown.tsx` |
| Group pages + layout | `pages/[lang]/services/group/[group].astro`, `app/layouts/ServiceShell.astro`, `shared/data/{seo,breadcrumbs}.ts` |
| Picker | `entities/service/ui/molecules/ServiceTabList.tsx`, `organisms/ServiceSpotlight.tsx`, `widgets/service-ecosystem/ui/organisms/ServiceTabsSection.tsx` |
| Tokens | `shared/design/tokens.stylex.ts` (+ contrast test) |
| i18n keys | `home` namespace: `servicesReadMore`, `servicesShowLess`, `servicesPrev`, `servicesNext` |

## Acceptance criteria

- **AC1** Every service has an allowed `group`; helper order is stable and
  covers all 24.
- **AC2** `servicesGroups` exists in RU and EN with equal keys; parity passes.
- **AC3** Services menu is a nested submenu: group → its services; group row
  links to a group page.
- **AC4** Group pages exist for all groups and share one layout with
  `/services` and `/services/[slug]`; breadcrumbs and route meta resolve.
- **AC5** Below `md` the picker is a horizontal icon-only strip with prev/next
  arrows; above `md` it is the current vertical list.
- **AC6** Selected service uses `colorAccent`; the accent passes the WCAG
  contrast checks in light and dark, enforced by a test.
- **AC7** Icons move one step down the existing scale; mobile buttons keep
  accessible names.
- **AC8** Mobile image uses `object-fit: cover`; copy sticks to the top; slides
  are not limited.
- **AC9** Over-long copy cuts with an ellipsis and a green "Читать далее".
- **AC10** `npm run lint`, `npm run test`, `npm run verify` stay green.

## Open sub-question

- The exact max length for the "Читать далее" fallback (B5): propose 220
  characters on mobile.
