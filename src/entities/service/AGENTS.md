# Service Authoring Requirements

How to add a service to `src/entities/service`. Read together with
`docs/frontend/prose-quality.md` (copy rules) and `docs/frontend/i18n.md`
(dictionary layout). The service layer is framework-free: no `astro` imports
here (see `src/entities/AGENTS.md`).

## Files to touch

| # | File | What |
|---|---|---|
| 1 | `model/fixtures/<slug>.ts` | new file: `export const <camelSlug>: Service = { ... }` |
| 2 | `model/fixtures.ts` | import the new const and add it to `services` (index file; order = menu order) |
| 3 | `i18n/ru/<slug>.ts` | export `<name>Ru` with Russian copy |
| 4 | `i18n/en/<slug>.ts` | export `<name>En` with the same keys as RU |
| 5 | `i18n/index.ts` | import both and register in `servicesRu` / `servicesEn` |
| 6 | `src/shared/assets/images/services/<slug>.png` | optional backdrop, name = slug |
| 7 | `src/shared/assets/images/services/README.md` | update the "Awaiting generation" table in the same change |
| 8 | `src/shared/i18n/{ru,en}/relevants.ts` | only if `relevants[].noteKey` is used |

`model/fixtures.ts` is an index only: it imports one file per slug from
`model/fixtures/` and composes them into `services`. `model/getters.ts`, routes,
the top menu, sitemap, and SEO resolve services from the fixture automatically.

## Fixture shape

Required (`model/fixtures.test.ts`, `test/services-smoke.test.ts`):

- `slug` unique; `icon`; non-empty `features[]`.
- Text fields hold i18n keys, not copy: `navTitle`, `title`, `tagline`,
  `description`, `features[i].title|text`.
- `ctaBanner.title|text|buttonLabel` are required for **every** service by
  `test/services-smoke.test.ts`, even though the type marks `ctaBanner` optional.

Optional blocks:

- `techStack[]`: each group has `subtitle`, `description`, non-empty
  `technologies[]` with unique `id`s and a `glossary` key per item.
- `sections[]`: `title` + `items[]`.
- `processSteps[]`: each step needs `processType`.
- `faqItems[]`, `fitItems[]` (with `positive`), `proofItems[]`
  (`title`, `text`, `metricValue`, `metricLabel`).
- Typed content blocks, one optional field each: `tradeoffs[]`, `outcomes[]`,
  `scope[]`, `mechanism[]`, `deliverables[]`. `outcomes` needs `value` + `icon`;
  `mechanism` takes an optional diagram slug; `deliverables` needs `title` +
  `text`. Prose guards cover them (`test/prose-quality.test.ts`).
- `relevants[]`: `type: "service" | "solution" | "case"`, the target slug must
  exist; `noteKey` (optional) matches `/^relevants\.\S+$/` and exists in RU + EN.

## i18n keys

Every text field is a key of the `services.<slug>.*` namespace. RU and EN must
have the same key set — the parity test `test/astro-content.test.ts`
(`ENTITY_NS = services`) fails otherwise. Write RU first, then EN.

Key layout, in the order used by existing files:

```
ctaBanner.title|text|buttonLabel
navTitle
title
tagline
description
features.<i>.title|text
techStack.<g>.subtitle|description
techStack.<g>.technologies.<t>.glossary
processSteps.<i>.title|text
fitItems.<i>.title|text
proofItems.<i>.title|text|metricValue|metricLabel
faqItems.<i>.question|answer
outcomes.<i>.title|value|text
mechanism.<i>.title|text
scope.<i>.title|text
deliverables.<i>.title|text
tradeoffs.<i>.title|text
sections.<i>.title
sections.<i>.items.<j>
```

## Content rules

- `prose-quality.md`: RU ≥ 700 words per service, EN ≥ 90% of the RU volume;
  no banned lexicon/phrases; second person; numbers over adjectives; disclose a
  tradeoff.
- Richness floors (relevants ≥3 and ≥2 types, ≥2 specialty blocks, a result
  block, faq ≥4, group rules) live in `test/service-richness.test.ts`. Published
  services must clear them unconditionally. Drafts and soft rules (`proof ≥2`)
  warn, never fail. See `docs/plans/service-richness-audit.md`.
- `techStack` description marks technologies as `[Name]` tokens. Every token must
  match a `name` in the group; backticks are forbidden (a test checks both).

## Icon and backdrop

- `icon` is a string key from `ENTITY_ICONS` (`src/shared/data/iconCatalog.ts`).
  Add a key there if none fits; unknown keys silently fall back to `Sparkles`.
- Backdrop is optional. With a file: PNG 1200×630 16:9, no baked-in text, calm
  lower third, subject in the upper two-thirds. Without a file the surfaces fall
  back (icon, plain hero, no `og:image`).

## Verify

```
npm run lint
npm run test     # fixtures.test, services-smoke, astro-content, service-richness
npm run verify   # build + verify:dist
```
