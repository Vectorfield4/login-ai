# Content Expansion Plan — done (2026-10-05)

## Done

- Menu restructure: Company dropdown with News, Team, Contacts, Investors; a
  path-less group trigger in `src/widgets/app-bar`.
- `/team` page RU/EN (`src/pages/[lang]/team.astro`, `teamPage` i18n).
- 16 new services scaffolded (fixtures, RU/EN dictionaries, registry, routes),
  24 services in total.
- 4 new cases: `aeo-ai-visibility`, `comment-sentiment-scoring`,
  `erp-data-reconciliation`, `packaging-cv-inspection`.
- Fixture split to `model/fixtures/<slug>.ts` + index for services, solutions,
  cases.
- i18n split to `i18n/index.ts` + `i18n/ru|en/<slug>.ts` for services,
  solutions, cases.
- 35 in-text service links across articles: 6 existing-service CTAs, 24
  new-service CTAs, 5 block links. A link renders while the target is published
  and unwraps to text while it is a draft.
- Publication gates: `draft` + `updatedAt`, getter filtering, `RelevantCard`
  drop, post-build `dropDraftLinks` pass.
- `updatedAt` staleness report (`src/shared/data/staleness.ts`,
  `test/staleness.test.ts`).
- Prose guard `test/prose-quality.test.ts`: taglines reject negation and
  contrast; a published service needs RU ≥ 700 words and EN ≥ 90% of RU.
- Publish-by-backdrop: 15 of 24 services live, 9 waiting for a backdrop.
- `solutions.manufacturers` RU rewritten from a raw-key stub, EN completed.

## Acceptance criteria

- [x] Articles link to services, solutions, and cases through in-text CTAs and
      related blocks.
- [x] 16 new services and 4 new cases have RU/EN copy and routes.
- [x] The top menu groups Company: News, Team, Contacts, Investors.
- [x] A draft entity is not generated and every link to it is dropped until it
      is published.

## Verification

`lint` clean; `test` 253 passed / 0 failed; `verify` 114 pages, `verify:dist` ok
(113 sitemap pages + `/404.html`).

## References

- Backdrop backlog: `docs/plans/service-backdrops-plan.md`.
- Prose rules: `docs/frontend/prose-quality.md`; i18n layout:
  `docs/frontend/i18n.md`.
- URL patterns: `src/shared/data/routes.ts`.
