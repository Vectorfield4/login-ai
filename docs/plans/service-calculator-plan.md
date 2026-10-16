# Cost calculators — typed estimator platform for services and solutions

Status: planned. Supersedes the earlier single-service `CostCalculator` sketch:
this is a **generic, typed platform**, not one translated block. A calculator is
declarative data (`CalculatorSpec`) attached to a service or a solution fixture;
one engine and one island render every calculator. The commercial driver is
`content/plan/cmo.json` row 1 (`content-pipeline-economics`, ToFu), whose
`linkMatrix`/`ctaRoute` point at `service:content-generation`; the platform makes
that destination functional and extends to every estimator the catalog needs.

## Goal

Give each service and each solution its own isolated budget estimator, driven by
a typed spec in its fixture. Output is a **range**, money and timeline, framed as
a ballpark that protects margin and filters unqualified traffic. Growth to N
calculators must not touch `shared` beyond one contract file.

## Locked decisions

1. **Platform, not one block.** One generic engine + island; per-entity specs.
2. **Declarative terms.** No per-calculator code in components; the spec is data.
3. **Contract in `shared/types`, spec in the fixture.** Mirrors `WithRelevants`
   (`src/shared/types/relevants.ts`): the type lives in `shared`, the entity
   declares the field.
4. **`Estimate` = money + timeline, both as ranges.**
5. **Field kinds:** `segmented | toggle | slider | multiselect | stepper`. No
   free number input (per the pricing-calculator standard: discrete selectors).
6. **Coexist with `price`/`packages`**, with tests that lock the coupling; the
   price floor stays as the static anchor, the calculator adds the range.
7. **Both templates.** Mount under `PricingSection` in
   `services/[slug].astro` and `solutions/[slug].astro`; the gate is the
   presence of a spec, never a slug literal or a boolean.
8. **Bundles by slug.** A package can include a service (e.g. video generation
   with and without training); the spec references the service by slug and the
   engine resolves its `price.amount` from the service entity. No duplicated
   prices.
9. **SSG-first, `client:visible`.** The default estimate is numeric static HTML;
   hydration upgrades it. Estimates never enter meta or JSON-LD.
10. **CTA = `mailto:` with the configuration + redirect to `/contacts`.** No
    backend now; `encodeConfig(state)` is a seam a future CRM form will reuse.
11. **One shared namespace, RUB-only.** Labels are i18n keys; numbers and `unit`
    are locale-free fixture data.
12. **`features/calculator` + generic atoms in `shared/ui`.** Domain data never
    enters `shared`.

## Layers and import direction

`pages ← widgets ← features ← entities ← shared` (AGENTS rule 3).

- `shared/types/calculator.ts` — contract only, no entity imports.
- `entities/{service,solution}/model/fixtures/<slug>.ts` — the spec data.
- `features/calculator/` — engine (`model/`) and the island (`ui/`); the only
  place that reads entity prices for bundle resolution.
- `pages/[lang]/{services,solutions}/[slug].astro` — mount.

The island takes `{ kind: "service" | "solution"; slug: string; lang: AppLang }`
— JSON-safe, so `verify:dist`'s `[0,null]` guard passes. It imports its spec
from the entity getters itself; no function crosses the island boundary.

## Type contract — `src/shared/types/calculator.ts`

```ts
export type CalculatorField =
  | { kind: "segmented"; id: string; label: string; options: FieldOption[]; default: string }
  | { kind: "toggle"; id: string; label: string; default: boolean }
  | { kind: "slider"; id: string; label: string; min: number; max: number; step: number; default: number }
  | { kind: "stepper"; id: string; label: string; min: number; max: number; default: number }
  | { kind: "multiselect"; id: string; label: string; options: FieldOption[]; default: string[] };

/** A number or an explicit band; low ≤ high. */
export type Band = number | { low: number; high: number };

export type CalculatorTerm =
  | { kind: "setup"; amount: Band; weeks?: Band } // = the entity price floor
  | { kind: "perUnit"; field: string; rate: Band; weeksPerUnit?: Band }
  | { kind: "perOption"; field: string; rates: Record<string, Band> }
  | { kind: "perSelection"; field: string; rates: Record<string, Band> } // sum of the chosen options
  | { kind: "multiplier"; field: string; factors: Record<string, number> }
  | { kind: "bundle"; ref: string; when?: { field: string; equals: string } };

export interface CalculatorSpec {
  /** Reuses PriceUnit: project | program | month | language. */
  unit: PriceUnit;
  /** Recurring periods folded into firstPeriod (e.g. 12 months). */
  horizon: number;
  fields: CalculatorField[];
  terms: CalculatorTerm[];
}

export interface WithCalculator {
  calculator?: CalculatorSpec;
}
```

`Service` and `Solution` add `WithCalculator`. `FIELD_OPTION` labels and field
`label` are i18n keys under the `calculator` namespace; rates, factors, `amount`
and `unit` are fixture numbers, identical in RU and EN.

## The engine — `features/calculator/model/`

- `types.ts` — `Range`, `Estimate`, `CalculatorState`, resolved spec.
- `estimate.ts` — pure `estimate(spec, state, resolveBundle): Estimate`.
  Folds terms into `setup`, `runPerPeriod`, `timelineWeeks`; derives
  `firstPeriod = setup + runPerPeriod × horizon` and
  `unitCost = runPerPeriod / volume`. Enforces `low ≤ high`, monotone factors,
  unknown option ids fall back to the field default, zero/edge input is safe.
- `resolveBundle.ts` — `resolveBundle(ref)` reads `price.amount` from
  `getServiceBySlug`; a `program`-unit service contributes a one-off to `setup`.
  This is the sole cross-entity read; it lives in `features`, never `shared`.
- `state.ts` — initial state from field defaults; `encodeConfig(state)` for the
  CTA URL/`mailto:` body (reused later by the CRM form).

```ts
export interface Range { low: number; high: number }
export interface Estimate {
  setup: Range;
  runPerPeriod: Range;
  firstPeriod: Range;
  unitCost: Range;
  timelineWeeks: Range;
}
```

## UI

Generic atoms in `src/shared/ui/atoms` (not domain-shaped, added per the
atomic-design rule with a test beside each): `SegmentedControl`, `Slider`
(discrete), `Stepper`, `Switch`. `Chip` already covers `multiselect`.

The island `features/calculator/ui/CostCalculator.tsx` renders fields by `kind`,
recomputes on change, and prints `setup` / `runPerPeriod` / `firstPeriod` /
`unitCost` / `timelineWeeks` via `formatPrice` from
`shared/ui/organisms/PricingSection`. `client:visible`, default state SSR'd.

## Placement, anchor, CTA

- Both `[slug].astro` mount under `PricingSection`, behind
  `{entity.calculator ? … : null}`. Section carries `id="calculator"`.
- Deep link: `routeUrl` gains a thin fragment helper (it handles only paths
  today) so a plan row can point at `/services/content-generation#calculator`;
  the `content/plan` contract/`ctaRoute` usage is updated accordingly.
- CTA builds a `mailto:` (config in the subject/body) and links to
  `/contacts`; state is carried in the URL. No automatic submission, no
  analytics. `encodeConfig` is the seam for the future CRM form.

## i18n

New shared namespace `calculator` in `src/shared/i18n/{ru,en}/calculator.ts`,
registered in both `index.ts`, and added to `SHARED_NS` in
`test/astro-content.test.ts` (the list is explicit). RU and EN key sets must be
identical. Field/option labels are keys; all figures stay in fixtures.

## Build order (staged, per decision)

1. **Contract + engine** for both kinds: `shared/types/calculator.ts`, the
   `features/calculator/model/` engine and bundle resolver, field atoms, the
   island. Authored generic — no service wired yet.
2. **Tests** for the engine and island (see below), green before any migration.
3. **Services migration** — a separate step: attach `calculator` specs to
   `Service` fixtures and mount in `services/[slug].astro`, including at least
   one service-level bundle (`video-generation` + `ai-video-training`).
4. **Solutions migration** — a separate step: attach specs to `Solution`
   fixtures (packages composing services) and mount in `solutions/[slug].astro`.

## Tests and gates

1. `model/estimate.test.ts` — determinism, `low ≤ high`, monotone factors,
   zero/edge input, `setup.low == entity.price.amount` for every calculator
   entity (the lock from decision 6).
2. `model/resolveBundle.test.ts` — the bundle pulls the service `price.amount`;
   `when` gate on/off.
3. `ui/CostCalculator.test.tsx` — renders in `ru`/`en`; a field change moves
   `runPerPeriod` / `firstPeriod` / `timelineWeeks`; reads `lang`.
4. Route/smoke — `services-smoke` / `solutions-smoke` assert a calculator entity
   carries a valid spec and a non-calculator page does not.
5. `verify:dist` — a calculator page's built HTML contains a numeric band; a
   non-calculator page's does not. All existing guards stay.

`registries.test.ts` unchanged (no new icon).

## Steps

1. Add `shared/types/calculator.ts`; extend `Service` and `Solution` with
   `WithCalculator`.
2. Build `features/calculator/model/` (types, state, estimate, resolveBundle).
3. Add field atoms (`SegmentedControl`, `Slider`, `Stepper`, `Switch`) + tests.
4. Build the `CostCalculator` island + `index.ts` barrel + test.
5. Add and register `calculator` RU/EN; extend `SHARED_NS`.
6. Engine tests green (step 2 of the build order).
7. Services migration: specs in fixtures, mount, anchors, CTA, deep-link helper.
8. Solutions migration: specs (packages composing services), mount.
9. Route/smoke + `verify:dist`; run `npm run lint`, `tsc -b`, `test`, `verify`.

## Acceptance criteria

- [ ] Both locales render the section on every calculator page; a numeric
      default estimate is in built HTML.
- [ ] Volume/option/language/review/bundle changes update money and timeline.
- [ ] `setup.low == price.amount` for every calculator entity; bundle prices
      resolve from the service entity, never duplicated.
- [ ] RU/EN `calculator` key sets identical; no hardcoded UI text.
- [ ] Islands take only `{ kind, slug, lang }`; `verify:dist` clean.
- [ ] `npm run lint`, `tsc -b`, `test`, `verify` green.

## Out of scope

No backend, CRM, quote submission or analytics (the `mailto:`/`encodeConfig`
seam is the boundary); no multi-currency, FX or VAT switch; no persistence,
URL state or charts; solutions' copy and `content/plan/*.json` stay untouched
beyond the `#calculator` deep-link wiring.

## References

- Shape: `src/shared/types/relevants.ts` (`WithRelevants`), `content.ts`.
- Prices: `src/entities/service/model/fixtures/`, `src/entities/solution/model/fixtures/`.
- Pricing reuse: `src/shared/ui/organisms/PricingSection.tsx` (`formatPrice`).
- Island contract: `src/entities/service/ui/organisms/TechStackSection.tsx`,
  `src/shared/hooks/useT.ts`, `src/features/case-filters/ui/SolutionFilters.tsx`.
- Gates: `test/astro-content.test.ts`, `test/services/services-smoke.test.ts`,
  `test/verify-dist.mjs`.
- Commercial driver: `content/plan/cmo.json` row 1, `content/plan/contract.ts`.
