# Marketing trust & audit gaps — done (2026-10-07)

## Done

- Copy guards, `test/copy-guards.test.ts`: banned lexicon (RU+EN stems),
  banned constructions, straight quotes in EN, no em dash in EN, soft
  "a claim has a number" warning. Sweeps every string of `astroDictRu` /
  `astroDictEn` (shared + entity).
- Copy fixes from the red run: banned lexicon in `ai-cms-integration`,
  `ai-infrastructure`, `software-development`, `sovereign-model-deployment`;
  `ensuring`/`subsequent`, em dash and curly quotes across `ai-infrastructure`,
  `deterministic-rag-systems`, `highload-backend`, `landing-pages`,
  `mlops-platforms`, `software-development`, `computer-vision`, `casesPage`,
  `relevants`, `showcase`, `reputation-monitoring-platform`.
- Solution volume gate, `test/prose-quality.test.ts`: RU ≥ 1000 words, EN ≥ 90%
  of RU. `manufacturers` grew a fourth section "Поддержка и развитие" (fixture +
  RU/EN), 826 → 1000+ words. Hard floors, no baseline.
- Solution richness, `test/solution-richness.test.ts`: `features>=4`,
  `process>=4+processType`, `fit>=2+negative`, `relevants>=3+2types`, `faq>=4`,
  `proof>=1`, `sections>=2`, `audiences>=1`, `tags>=1`, `cta-banner`. Published
  pass all; draft `video-generation` warns only.
- Structural gaps closed: `test/publish-gate.test.ts` (isPublished + draft
  exclusion in service/solution/case getters), `test/seo-routes.test.ts`
  (`getRouteMeta` / `resolvePageMeta`), `test/manifests.test.ts`
  (`getServiceImage` / `getServiceDiagram`), `test/drop-draft-links.test.ts`
  (`unwrapDraftLinks` extracted from `app/integrations/dropDraftLinks.ts`),
  `test/registries.test.ts` (`resolveEntityIcon`, `groupServices`).
- `teamPage` added to `SHARED_NS` in `test/astro-content.test.ts`.
- `test/stubs/astro-assets.ts` + alias in `vitest.config.ts`, so
  `serviceImages` (imports `astro:assets`) is importable in Vitest.
- `docs/frontend/prose-quality.md`: solution volume row is guarded, not a
  writing target.

## Acceptance criteria

- [x] Every copy and richness rule failed before the fix and passed after.
- [x] Zero banned lexicon, banned phrases, EN curly quotes, EN em dash.
- [x] Service and solution volume pass as hard floors.
- [x] Audit gaps covered: publish gate, route→meta, manifests, draft links,
  icon fallback, grouping, `teamPage` parity.
- [x] `lint` clean, `test` green, `verify` green.

## Verification

`lint` clean; `test` 331 passed / 0 failed (66 files); `verify` 122 pages,
`verify:dist` ok (121 from sitemap + `/404.html`).

## References

- Copy rules: `docs/frontend/prose-quality.md`.
- Gate precedent: `docs/plans/service-richness-audit.md`.
- New tests: `copy-guards`, `solution-richness`, `publish-gate`, `seo-routes`,
  `manifests`, `drop-draft-links`, `registries` under `test/`.
