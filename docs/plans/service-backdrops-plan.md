# Service Backdrops — Backlog (generation deferred)

Image-generation budget is exhausted. The reusable prompt lives in
`docs/image-prompts/scene-defined/service.txt` (no active requests).

Publishing rule: a service leaves `draft` only when its backdrop exists and its
copy passes the volume gate in `test/services/prose-quality.test.ts` (RU ≥ 700 words, EN
≥ 90% of RU). Live now: 27 of 36 services; 28 backdrops exist. One draft already
has art and waits on copy — `ai-localization-training`. The remaining 8 stay
`draft: true` until their image is generated. A service page without a backdrop
still builds (icon fallback, no `og:image`), but we keep it hidden.

Template (when generation resumes): `docs/image-prompts/scene-defined/service.txt`
(`Service` / `Visual idea`). Conventions:
`src/shared/assets/images/services/README.md` (1200×630 PNG, 16:9, no legible
text, calm lower third, subject in the upper two-thirds).

## Backlog (8 services without a backdrop)

Every slug here sits in `content/generation-queue.json` (records with
`"kind": "service"`), not in this doc. Order = catalog group order.

## When a backdrop is added

1. Save as `src/shared/assets/images/services/<slug>.png`.
2. Remove the slug's record from `content/generation-queue.json`
   (`node scripts/generation-queue.mjs remove service <slug>`).
3. `npm run verify` — the PNG is rasterized to a 1200×630 `og:image`; `verify:dist`
   must stay green.
