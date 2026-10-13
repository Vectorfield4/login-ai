# Content tech-debt: rework rows 1, 2, 8 to the Q4 2026 plan

Status: planned. Plan-only — no article markdown edited here.
Truth: `content/plan/*.json` + `contract.ts`, gate `test/content-plan.test.ts`.
Pipeline: `.opencode/skills/write-article/SKILL.md`. Copy: `docs/frontend/prose-quality.md`.

## Facts that bound the work (verified)

- Plan `genre` drives the RU floor (`research`/`industry` = 900) and the allowed
  `structure` (SKILL.md): `research` allows PSI|Breakdown|Journey, **not Comparison**;
  only `industry` allows Comparison.
- `content-plan.test.ts`: enums, unique `slug`+`number` across all personas, Tue/Thu
  `pubDate`, `linkMatrix`/`ctaRoute`, index↔persona parity (docs/content-plan.md: two slots/week,
  not enforced by the test).
- `articles.test.ts`: `category` present; RU ≥ floor; EN pair ≥ 90% RU; banned
  lexicon/EN typography; published ⇒ cover PNG; published links only published
  entities. `GRANDFATHERED_FLOOR` lists 5 other slugs.
- Staleness is inert (no entity fixture has `updatedAt`; edges skip missing dates);
  `prose-quality.test.ts` (solutions) and `news.test.ts` don't read `articles/`.
- `Legal-Compliance` persona is NOT in `contract.ts`; `pillar`/`spokes` NOT
  implemented (enablers #1/#3, `content-plan-enablers.md`, planned).
- Covers exist for rows 1, 2, 8. No `content-pipeline-release-fall.*` file or prompt —
  only its plan + queue rows (nothing on disk to rename).

## Tickets

### T1 — Reclassify `content-pipeline-economics` (PUBLISHED) as MoFu/BoFu Comparison
Scope: reframe row 1 as a Manual-vs-machine-assisted cost comparison bridge.
- Plan `content/plan/cmo.json` row 1: `genre research→industry`,
  `structure Breakdown→Comparison`, `funnel ToFu→MoFu|BoFu` (one), refresh
  `query`, `primaryGoal`, `successMetric`. `content/plan/index.json`: row 1 `funnel`.
- Article `articles/content-pipeline-economics.{ru,en}.md`: `category research→industry`;
  rebuild body as one Comparison (Criterion → Manual → Machine-assisted → Verdict);
  keep `publishedAt`; add `updatedAt` only per D6.
- Verify: `node .opencode/skills/write-article/scripts/audit.mjs content-pipeline-economics`;
  `npx vitest run test/content-plan.test.ts test/articles.test.ts`; prose-critic → PASS; `npm run test`.
- Risk: published ⇒ re-index; floor stays 900 but Comparison forces `genre industry`,
  so genre+structure move together.

### T2 — Split `text-pipeline-editorial-loop` (PUBLISHED) into two articles
Scope: (2a) automated drafting velocity; (2b) strict QA filters, style-guide
linting, automated error catching.
- Keep the published slug `text-pipeline-editorial-loop` = 2a (preserve URL + cover);
  add a NEW slug for 2b (e.g. `text-pipeline-qa-filters`) with a free `number` and a
  free Tue/Thu `pubDate` (D2).
- Plan: rewrite `cmo.json` row 2 for 2a; append a full entry for 2b; add both to
  `index.json`, keep sorted. Genre `technical` (How-To) fits both.
- Articles: trim `articles/text-pipeline-editorial-loop.ru.md` to 2a; create
  `articles/<new-slug>.ru.md` for 2b; each needs its own cover PNG; add a queue
  record for the new slug; EN floor applies only if `.en.md` is written.
- Sequencing: two peer spokes OR pillar + spoke (D2); `pillar`/`spokes` don't exist
  yet, so order + cross-links are manual.
- Verify: `audit.mjs text-pipeline-editorial-loop <new-slug>`;
  `npx vitest run test/content-plan.test.ts test/articles.test.ts`; prose-critic on
  both; `npm run test`.

### T3 — Retarget `voice-cloning-boundaries` (DRAFT) to Legal/Compliance
Scope: reframe the industry/Breakdown draft for a compliance buyer with verified
global IP legal case studies and compliance checks.
- Blocked by D1: needs the `Legal-Compliance` persona (contract + new persona file
  + `PLAN_PERSONA_FILES` + docs/content-plan.md).
- Plan: move row 8 into that persona file; set `funnel` (D3); keep
  `genre industry`/`structure Breakdown`; point `links`/`linkMatrix`/`ctaRoute` at
  compliance-relevant entities.
- Article `articles/voice-cloning-boundaries.ru.md`: rewrite with named, sourced
  case law + compliance steps; stay `draft: true` until audit passes.
- Cover regen (if the brief changes): delete the PNG →
  `node scripts/generation-queue.mjs add --kind article --slug voice-cloning-boundaries --title "…" --keywords "…"`
  → `node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs article voice-cloning-boundaries`
  → render → remove the record (record + existing image fails `generation-queue.test.ts`).
- Verify: `audit.mjs voice-cloning-boundaries`;
  `npx vitest run test/content-plan.test.ts test/articles.test.ts test/generation-queue.test.ts`;
  prose-critic; `npm run test`.

### T4 — Rename `content-pipeline-release-fall` → `content-pipeline-update-q4-2026`
Scope: rename a plan row + queue record only; no article file or cover exists (no
SEO cost).
- `content/plan/cmo.json` row 6 `slug`; `content/plan/index.json` row 6 `slug`;
  `content/generation-queue.json` record `slug` (and `title`, D5).
- No prompt file exists today; after the rename run
  `node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs article content-pipeline-update-q4-2026`.
- Verify: `node scripts/generation-queue.mjs get article content-pipeline-update-q4-2026`;
  `npx vitest run test/content-plan.test.ts test/generation-queue.test.ts`; `npm run test`.

## Decisions (human)

- D1: enable `Legal-Compliance` now (enabler #3) or keep T3 on `CMO` until it lands?
- D2: T2 — two peer spokes or pillar + spoke? Which half keeps the published URL?
  Which free `number` and `pubDate` go to the new row?
- D3: T1/T3 funnel — the RFC says "MoFu/BoFu bridge"; pick one value each.
- D4: T2 2b language — RU only or RU+EN (the 90% EN floor then applies)?
- D5: T4 title for the renamed release, and does the queue `story` still fit?
- D6: `updatedAt` convention for reworked published articles (inert today).

## Risks / hidden cost

- Published edits: URL survives only if the slug is untouched; decide `publishedAt`
  vs `updatedAt`; expect re-crawl. Sitemap `lastmod` was not verified here
  (`docs/frontend/seo.md` not read).
- Any slug change on a published article also renames its cover PNG (cover gate maps
  by slug) — treat as a publish-time change, not a rename.
- The split risks cannibalizing the original query/traffic: keep one canonical URL,
  cross-link, do not rename the live slug.
- A new article needs a cover ≥ 1200×630 (`audit.mjs`) or it stays a draft; remove
  its queue record once the PNG lands.
- Plan edits must keep `number`/`slug` unique and `index.json` sorted; a new row also
  bends the two-slots-a-week cadence.
- Rewritten copy must clear banned lexicon and the prose gates.
