---
name: publish-service
description: Use when publishing a service from draft in the login-ai repo, that is removing `draft: true` from a service fixture and confirming the backdrop gate, i18n parity, relevants, and build. Triggers: "publish service", "draft exit", "услугу из драфта", "draft: true", "service backdrop", "awaiting generation", "/services/<slug>".
---

# Publish a service from draft

A service is scaffolded but hidden: `draft: true` in
`src/entities/service/model/fixtures/<slug>.ts`. It leaves draft only when a
backdrop exists and the copy clears the volume gate. This skill takes one or
more services from draft to live.

Read `src/entities/service/AGENTS.md`, `docs/frontend/i18n.md`, and
`docs/frontend/prose-quality.md` before writing any copy.

## Scripts

Run from the repo root. Both take slugs; with no slugs `audit.mjs` checks every
`draft: true` service.

```
node .opencode/skills/publish-service/scripts/audit.mjs [slug ...]
node .opencode/skills/publish-service/scripts/publish.mjs [--dry-run] [--force] <slug ...>
```

- **`audit.mjs`** — readiness check: backdrop file and PNG size (≥1200×630),
  RU ≥ 700 words, EN ≥ 90% of RU, every `relevants[]` target exists and is
  published, and whether the doc rows are still present. Prints a table, exits
  non-zero while a blocker remains.
- **`publish.mjs`** — runs the audit, then drops the `draft: true` line from the
  fixture and removes the slug's row from the services README and the backdrops
  plan. Skips a slug that fails audit unless `--force`; `--dry-run` prints the
  edits without writing.

The volume numbers in `audit.mjs` mirror `test/words.ts`; `npm run test` stays
the source of truth.

## Procedure

1. Generate the backdrop (`docs/images/service-backdrop-prompt.txt`) and save it
   as `src/shared/assets/images/services/<slug>.png` (1200×630, 16:9, no baked-in
   text, calm lower third, subject in the upper two-thirds).
2. `node .opencode/skills/publish-service/scripts/audit.mjs <slug> …` — clear
   every ✗. In practice this is RU copy under 700 words: write it up, then
   re-run the audit.
3. `node .opencode/skills/publish-service/scripts/publish.mjs <slug> …`.
4. `npm run lint && npm run test && npm run verify`.

## Acceptance criteria

- [ ] Backdrop is a raster 16:9 image, ≥1200×630, no baked-in text, calm lower
      third; the page emits a raster `og:image` / `twitter:image`.
- [ ] RU copy ≥ 700 words and EN ≥ 90% of RU (`test/prose-quality.test.ts`).
- [ ] RU and EN key sets match (`test/astro-content.test.ts`).
- [ ] Every `relevants[]` target exists and is published — no card resolves to a
      draft.
- [ ] `draft: true` is gone; the slug is gone from
      `src/shared/assets/images/services/README.md` and
      `docs/plans/service-backdrops-plan.md`.
- [ ] `lint`, `test`, `verify` are green; `verify:dist` route count grows by two.

## Failure modes

- `awaiting-generation.test.ts` fails: a published service has no backdrop —
  generate the file or set `draft: true` and restore the README row.
- `prose-quality.test.ts` fails: RU under 700 words or EN under 90% — write more
  copy; this is a publication gate, not a warning.
- `astro-content.test.ts` fails: an RU key has no EN pair.
- `services-smoke.test.ts` fails: a base key or a `ctaBanner` key is missing.
- `verify:dist` fails on `og:image`: the backdrop is SVG or smaller than
  1200×630 — regenerate as PNG.
- A relevant card disappears: its target service is still `draft: true`.
