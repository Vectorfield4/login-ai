# Solution Backdrops — format introduced, generation deferred

A solution already ships an SVG hero (`src/shared/assets/images/<slug>.svg`) for
the home card, the detail hero and `og:image`. This plan adds the raster backdrop
those surfaces can prefer, through the same `content/generation-queue.json`
pipeline as article covers and service backdrops.

## Format

- Standard: `docs/image-prompts/scene-defined/solution.txt` — slots `{{SOLUTION}}`,
  `{{LANG}}`, `{{VISUAL_IDEA}}`, `{{STYLE}}`. Composition is the article-cover
  one (a centered focal motif with calm space), not the service lower-third band:
  the solution hero sits in a column, so no copy overlays the image.
- Queue kind: `solution` → `src/shared/assets/images/solutions/<slug>.png`
  (`KIND_DIRS` in `scripts/generation-queue.mjs`).
- Builder: `node scripts/image-prompt.mjs solution <slug>` (also `--all`).
- Conventions: `src/shared/assets/images/solutions/README.md`.
- Tests: `test/image-prompts/solution.test.ts` locks the template shape and the
  queue mapping; `test/image-prompts/helpers.ts` already accepts `solution`.

## Why a solution record is not a draft gate

The queue's "a record means the entity waits as a draft" rule holds for articles
and services because their image is the publication trigger. A solution is
already published and its SVG serves every surface, so a missing raster is not a
gate — the record is a worklist entry only. `test/generation-queue.test.ts` skips
the draft assertion for `kind: "solution"`.

## Acceptance criteria

- [x] `docs/image-prompts/scene-defined/solution.txt` renders the solution standard.
- [x] `solution` is a queue kind mapped to `src/shared/assets/images/solutions/`.
- [x] `scripts/image-prompt.mjs` builds a solution prompt.
- [x] `test/image-prompts/solution.test.ts` locks the template and the mapping.
- [ ] One raster backdrop per published solution; the queue drained.
- [ ] `solutionImages.ts` prefers `<slug>.png` over the SVG.

## Steps when generation resumes

1. Per slug, queue a record with its story (authored by `cover-artist`):
   `node scripts/generation-queue.mjs add --kind solution --slug <slug> --title "<t>" --keywords "a, b"`.
2. `node scripts/image-prompt.mjs solution <slug>` → `<slug>.prompt.txt`.
3. `cover-renderer` renders 1280×672 through Runware and places
   `src/shared/assets/images/solutions/<slug>.png`, then drops the record
   (`node scripts/generation-queue.mjs remove solution <slug>`).
4. Add `test/image-prompts/<slug>.test.ts` calling
   `expectPromptStandard("solution", "<slug>")`.
5. Switch the surfaces: `src/app/data/solutionImages.ts` globs
   `solutions/*.{png,jpg,jpeg,webp}` and prefers the raster, like
   `serviceImages.ts`; the SVG stays the fallback until a backdrop lands.

## Verification

`lint` clean; `tsc -b` clean; `test` green.

## References

- Standard: `docs/image-prompts/scene-defined/solution.txt`.
- Queue: `scripts/generation-queue.mjs`, `content/generation-queue.json`.
- Sibling: `docs/plans/service-backdrops-plan.md`.
