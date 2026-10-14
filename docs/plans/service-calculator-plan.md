# Service calculator — interactive cost payload for `content-generation`

Status: planned. Row 1 `content-pipeline-economics` (`content/plan/cmo.json`,
`research/ToFu`) points at `service:content-generation`; this makes that
destination functional with a real cost calculator. It is a **feature slice**
`src/features/service-calculator/` (state in React, AGENTS rule 8), not a
translated block; the island takes only `lang`, like `TechStackSection`.

## Cost model (linear rate card + setup)

`model/costModel.ts` exports `RATE_CARD`, `DEFAULT_INPUT`,
`calculateCost(input): output` — pure arithmetic, no i18n. Inputs:
`piecesPerMonth`, `mix` (`text`/`image`/`video` shares), `languages` (1–4),
`editorialReview` (bool); outputs `monthlyRun`, `setup`, `firstYear`, `perPiece`.

    monthlyRun = piecesPerMonth × Σ(rate[type] × share[type]) × languageFactor(languages) × reviewFactor
    setup      = BASE_SETUP            // = content-generation price floor
    firstYear  = setup + monthlyRun × 12
    perPiece   = monthlyRun / piecesPerMonth

`RATE_CARD`, `BASE_SETUP`, `reviewFactor`, `languageFactor` are placeholder
constants in the fixture, **not dictionary keys**; the sum is locale-free.
`BASE_SETUP` must equal `getServiceBySlug("content-generation").price.amount`
(1 200 000 ₽ today), locked by a test. Factors are monotonic; unknown mix shares
fall back to the default. Comment each constant against the market anchors in
the published price fixtures (`src/entities/service/model/fixtures`,
`src/entities/solution/model/fixtures`).

## Placement and mount

`ui/organisms/CostCalculator.tsx` imports `useT`, `tokens`, atoms and
`BlockSection` from `shared`, plus its own `costModel` locally; only `lang` is a
prop. Native `range`/`number`/`select` (like `SolutionFilters`), StyleX layout,
`formatPrice` from `shared/ui/organisms/PricingSection`. One optional field
`calculator?: boolean` on `Service` (`src/entities/service/model/services.ts`),
set on `content-generation.ts`; the page branches on the flag, not a slug
literal. Mount in `src/pages/[lang]/services/[slug].astro` under
`PricingSection`:
`{service.calculator ? <CostCalculator client:visible lang={currentLang} /> : null}`.
Import direction stays `shared ← entities ← features ← pages`; only JSON-safe
`lang` is passed, so the `verify:dist` `[0,null]` guard passes.

## Copy (RU + EN, same commit)

New shared namespace `serviceCalculator` in
`src/shared/i18n/{ru,en}/serviceCalculator.ts`, registered in both `index.ts`.
Labels, input names, output/unit captions are keys; figures come from the
fixture. No hardcoded UI strings. Add `"serviceCalculator"` to `SHARED_NS` in
`test/astro-content.test.ts` (the list is explicit, so parity covers it only
once listed).

## Degradation (JS off / SSG)

No `client:only`: the island is build-time SSR with `DEFAULT_INPUT`, so `dist/`
carries the default estimate as static HTML, styled and crawlable; hydration
upgrades it. A no-JS reader gets the fixed default, recalc is the enhancement —
no duplicated static estimate beside the island. Title, canonical, JSON-LD and
stylesheet are unaffected; estimates never enter meta/JSON-LD.

## Tests and `verify:dist`

1. `model/costModel.test.ts` — determinism, zero/edge input, monotonicity,
   `BASE_SETUP === content-generation price`.
2. `ui/organisms/CostCalculator.test.tsx` — renders in `ru`/`en`; input change
   updates `monthlyRun`/`firstYear`; reads `lang` (mirrors `TechStackSection`).
3. Route/smoke — `services-smoke.test.ts` asserts
   `content-generation.calculator === true`; one `verify:dist` check that the
   heading is in built `/ru|en/services/content-generation/` and absent on a
   non-calculator page.

`registries.test.ts` unchanged (no new icon); all existing `verify:dist` guards
stay, only the assertions above are added.

## Acceptance criteria

- [ ] Both locales render the section; a numeric default estimate is in built HTML.
- [ ] Volume/mix/language/review changes update monthly and first-year figures.
- [ ] RU/EN `serviceCalculator` key sets identical; no hardcoded UI text.
- [ ] `verify:dist` clean; `npm run lint`, `tsc -b`, `test`, `verify` green.

## Steps

1. Add `calculator?: boolean` to `Service`; set it on `content-generation.ts`.
2. Write `model/costModel.ts` + its test; `ui/organisms/CostCalculator.tsx` +
   `index.ts` barrel.
3. Add/register `serviceCalculator` RU/EN; extend `SHARED_NS`.
4. Mount the island behind `service.calculator`.
5. Add the component test and route/smoke assertions; run lint, test, verify.

## Out of scope

No backend/quote/lead capture/analytics; only `content-generation` wired (no
per-service calculators); RUB only, no FX/VAT/currency switch; no persistence,
URL state or charts; `content/plan/*.json` and the article are not edited.

## Open questions

Page gate `calculator?: boolean` (proposed, touches the entity type) vs a slug
literal; rate-card numbers are placeholders pending a market pass; a
`#calculator` fragment needs a plan-data change this plan must not make; the
route check lives in `verify-dist.mjs` or a small `dist`-reading test.

## References

- Row: `content/plan/cmo.json` (number 1), `content/plan/contract.ts`.
- Shape: `docs/plans/solution-backdrops-plan.md`.
- Island: `src/entities/service/ui/organisms/TechStackSection.tsx`,
  `src/shared/hooks/useT.ts`, `src/features/case-filters/ui/SolutionFilters.tsx`.
- Pricing reuse: `src/shared/ui/organisms/PricingSection.tsx` (`formatPrice`);
  gates: `test/astro-content.test.ts`, `test/services/services-smoke.test.ts`,
  `test/verify-dist.mjs`.
