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
`docs/frontend/prose-quality.md` before writing any copy. The editorial gate
below judges against `references/service-prose.md`, which is self-contained on
purpose — it does not load another skill's rules.

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
3. **Prose gate:** dispatch the `service-critic` subagent with the slug. It reads
   the RU and EN copy and returns a violation log or `VERDICT: PASS`. Fix the log
   and re-run until it passes. A service does not leave draft while the critic
   has an open finding.
4. `node .opencode/skills/publish-service/scripts/publish.mjs <slug> …`.
5. `npm run lint && npm run test && npm run verify`.

## Prose gate

`service-critic` is the read-only semantic editor, the counterpart of the
article pipeline's `prose-critic`. It owns what a regex cannot judge: grounding,
voice, argument, structure, density and the two-reader test. Its rules live in
`references/service-prose.md` inside this skill; the agent reads only that file
and the slug's `i18n/{ru,en}` copy. After adding the agent file it loads only on
the next OpenCode restart.

## Acceptance criteria

- [ ] Backdrop is a raster 16:9 image, ≥1200×630, no baked-in text, calm lower
      third; the page emits a raster `og:image` / `twitter:image`.
- [ ] RU copy ≥ 700 words and EN ≥ 90% of RU (`test/prose-quality.test.ts`).
- [ ] RU and EN key sets match (`test/astro-content.test.ts`).
- [ ] Every `relevants[]` target exists and is published — no card resolves to a
      draft.
- [ ] `service-critic` returns `VERDICT: PASS` for the slug's RU and EN copy.
- [ ] `draft: true` is gone; the slug is gone from
      `src/shared/assets/images/services/README.md` and
      `docs/plans/service-backdrops-plan.md`.
- [ ] `lint`, `test`, `verify` are green; `verify:dist` route count grows by two.

## Failure modes

- `awaiting-generation.test.ts` fails: a published service has no backdrop —
  generate the file or set `draft: true` and restore the README row.
- `prose-quality.test.ts` fails: RU under 700 words or EN under 90% — write more
  copy; this is a publication gate, not a warning.
- `service-critic` returns a finding: fix the RU/EN copy and re-run it until
  `VERDICT: PASS`; a finding blocks publication, it is not a warning.
- `astro-content.test.ts` fails: an RU key has no EN pair.
- `services-smoke.test.ts` fails: a base key or a `ctaBanner` key is missing.
- `verify:dist` fails on `og:image`: the backdrop is SVG or smaller than
  1200×630 — regenerate as PNG.
- A relevant card disappears: its target service is still `draft: true`.
