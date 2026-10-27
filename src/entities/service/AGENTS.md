# Service Entity

How a service lands in `src/entities/service`. The schema, the promise block,
i18n keys, gates, renderers and JSON-LD live in the content contract:
`docs/frontend/content-contract.md`. Read it first; this file only lists where a
service touches code.

Read also `docs/frontend/prose-quality.md` (copy and volume),
`docs/frontend/i18n.md` (dictionary layout) and
`docs/frontend/page-composition.md` (section order). The service layer is
framework-free: no `astro` imports here (`src/entities/AGENTS.md`).

## Files to touch

| # | File | What |
|---|---|---|
| 1 | `model/fixtures/<slug>.ts` | new file: `export const <camelSlug>: Service = { ... }` |
| 2 | `model/fixtures.ts` | import the new const and add it to `services` (index only; order = menu order) |
| 3 | `i18n/ru/<slug>.ts` | export `<name>Ru` with Russian copy |
| 4 | `i18n/en/<slug>.ts` | export `<name>En` with the same keys as RU |
| 5 | `i18n/index.ts` | import both and register in `servicesRu` / `servicesEn` |
| 6 | `assets/images/services/<slug>.png` | backdrop, named by slug |
| 7 | `content/generation-queue.json` | the slug's record (`kind: "service"`) while the backdrop is missing |
| 8 | `src/shared/i18n/{ru,en}/relevants.ts` | only if `relevants[].noteKey` is used |

Add `price` and `calculator` to the fixture; new calculator labels go to
`src/shared/i18n/{ru,en}/calculator.ts`.

## Service-only notes

- `model/fixtures.ts` composes the fixtures; `model/getters.ts`, routes, menu,
  sitemap and SEO resolve services from it automatically.
- `group` is a `ServiceGroup`; the group-to-direction map lives in
  `model/groupServices.ts`.
- `icon` is a key of `ENTITY_ICONS` (`src/shared/data/iconCatalog.ts`). Add a key
  there if none fits; an unknown key falls back to `Sparkles`.
- The backdrop serves the home services block, the service hero and `og:image`.
  `src/app/data/serviceImages.ts` is the only `ImageMetadata`-aware layer; the
  entity stores nothing image-shaped.
- Do not add `proofItems` or `outcomes`. The promise block is `precedents`.

## Verify

```
npm run lint
npm run test
npm run verify
```
