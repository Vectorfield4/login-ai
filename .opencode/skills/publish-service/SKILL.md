---
name: publish-service
description: Use when publishing a service from draft in the login-ai repo, that is removing `draft: true` from a service fixture and confirming the backdrop gate, i18n parity, relevants, and build. Triggers: "publish service", "draft exit", "услугу из драфта", "draft: true", "service backdrop", "awaiting generation", "/services/<slug>".
---

# Publish a service from draft

A service is scaffolded but hidden: `draft: true` in
`src/entities/service/model/fixtures/<slug>.ts`. Publishing flips that one flag,
but the repo only lets you flip it when the backdrop exists and the docs move
with it. This skill covers one service from draft to live.

Authoring new copy is a different job: read `src/entities/service/AGENTS.md`,
`docs/frontend/i18n.md`, and `docs/frontend/prose-quality.md` first.

## Preconditions

- Fixture exists at `src/entities/service/model/fixtures/<slug>.ts` and is
  imported into `model/fixtures.ts`.
- RU and EN dictionaries exist under `i18n/ru/<slug>.ts` / `i18n/en/<slug>.ts`
  and are registered in `i18n/index.ts`.
- A backdrop sits at `src/shared/assets/images/services/<slug>.png` (or
  `.jpg` / `.jpeg` / `.webp`). PNG 1200x630, 16:9, no baked-in text, calm lower
  third. A published service without this file fails `test/awaiting-generation.test.ts`.

If the backlog rows are gone but a file is missing, treat the table as the
truth: a slug with no file and no row is a doc bug, restore the row.

## Acceptance criteria

- AC1. `getServices()` includes the slug and `getServiceBySlug(slug)` resolves
  it (`src/entities/service/model/getters.ts`).
- AC2. `npm run build` generates `/ru/services/<slug>` and `/en/services/<slug>`
  and the route count in `verify:dist` grows by two.
- AC3. The slug reaches the menu, the services group page, the home services
  block, the sitemap, and the JSON-LD for its group.
- AC4. The hero renders the backdrop and the page emits raster `og:image` /
  `twitter:image` at 1200x630.
- AC5. `npm run lint`, `npm run test`, and `npm run verify` are green.
  `test/services-smoke.test.ts`, `test/astro-content.test.ts`,
  `test/prose-quality.test.ts`, and `test/awaiting-generation.test.ts` pass.
- AC6. Every `relevants[]` target exists and is itself published; no card in
  the page resolves to a draft.
- AC7. Inline article CTAs that point at the service stop being unwrapped:
  once live, `dropDraftLinks` keeps the `<a>` and the link shows.
- AC8. RU copy reaches 700 words and EN reaches 90% of the RU volume.
  `test/prose-quality.test.ts` fails the suite while either is short.
- AC9. `docs/plans/service-backdrops-plan.md` and the "Awaiting generation"
  table in `src/shared/assets/images/services/README.md` no longer list the slug.

## Procedure

1. Confirm the backdrop file and its dimensions.
2. Flip the flag in the fixture: remove the `draft: true` line, or set
   `draft: false`. Published services omit the field, so removing it matches
   the rest of the catalog.
3. Remove the slug's row from both the services README table and the
   `service-backdrops-plan.md` backlog.
4. Run the verification command and read the output.

## Checklist

Fixture and copy:

- [ ] `slug` is unique and matches the file name and both dictionary keys.
- [ ] `icon` is a key in `src/shared/data/iconCatalog.ts` (`ENTITY_ICONS`),
      otherwise it silently falls back to `Sparkles`.
- [ ] `group` is a valid `ServiceGroup`.
- [ ] `features[]`, `ctaBanner`, and every `processSteps[].processType` are set.
- [ ] `techStack[].description` `[Name]` tokens each match a `name` in the group.
- [ ] RU and EN key sets match. `test/astro-content.test.ts` defines the namespace
      `services` and fails on drift.
- [ ] RU copy is at the 700-word target and EN is at least 90% of it
      (`docs/frontend/prose-quality.md`). `test/prose-quality.test.ts` enforces
      both, so write the copy up until it passes.
- [ ] No banned words, phrases, or em dashes from `prose-quality.md`.
- [ ] Limitations and tradeoffs are stated.

Assets:

- [ ] Backdrop is 16:9, at least 1200x630, raster, and free of text.
- [ ] The subject sits in the upper two-thirds; the lower third stays calm for
      the title overlay.

Relevants and links:

- [ ] Every `relevants[]` target exists and is published; check `solution`,
      `service`, and `case` fixtures.
- [ ] Article CTAs that name the service (Table 3 in
      `docs/plans/content-expansion-plan.md`) will now render as links.

Docs:

- [ ] Removed from `src/shared/assets/images/services/README.md`.
- [ ] Removed from `docs/plans/service-backdrops-plan.md`.

## Commands

```
npm run lint
npm run test
npm run verify
```

## Failure modes

- `test/awaiting-generation.test.ts` fails after the flip: the backdrop file is
  missing or misnamed. The file name must be the slug exactly, extension lower
  case. Fix the file, or set `draft: true` and add the row back.
- `astro-content.test.ts` fails: an RU key has no EN pair, or a raw key leaked
  into a dictionary value.
- `services-smoke.test.ts` fails: a base key or a `ctaBanner` key is missing.
- `prose-quality.test.ts` fails: the RU copy is under 700 words or the EN mirror
  is under 90% of it. Write the copy up; this is a publication gate, not a
  warning.
- `verify:dist` fails on `og:image`: the backdrop is SVG, or the raster is
  smaller than 1200x630. Regenerate as PNG.
- A relevant card disappears: the target is `draft: true`, so `RelevantCard`
  drops it by design. Publish the target or pick another.
- An article link stays plain text: the service is still `draft: true`, or the
  build was not rerun.
