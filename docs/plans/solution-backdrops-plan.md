# Solution Backdrops — format introduced, generation deferred

A solution already ships an SVG hero (`assets/images/solutions/<slug>.svg`) for
the home card, the detail hero and `og:image`. This plan adds the raster backdrop
those surfaces can prefer, through the same `content/generation-queue.json`
pipeline as article covers and service backdrops.

## Format

- Standard: `docs/image-prompts/scene-defined/solution.txt` — slots `{{SOLUTION}}`,
  `{{LANG}}`, `{{VISUAL_IDEA}}`, `{{STYLE}}`. Composition is the article-cover
  one (a centered focal motif with calm space), not the service lower-third band:
  the solution hero sits in a column, so no copy overlays the image.
- Queue kind: `solution` → `assets/images/solutions/<slug>.png`
  (`KIND_DIRS` in `scripts/generation-queue.mjs`).
- Builder: `node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs solution <slug>` (also `--all`).
- Conventions: `docs/images.md`.
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
- [x] `solution` is a queue kind mapped to `assets/images/solutions/`.
- [x] `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs` builds a solution prompt.
- [x] `test/image-prompts/solution.test.ts` locks the template and the mapping.
- [ ] One raster backdrop per published solution; the queue drained — 1 of 8 so
  far (`reputation-management.png`).
- [x] `solutionImages.ts` prefers `<slug>.png` over the SVG.

## Steps when generation resumes

1. Per slug, queue a record (`art-agent` authors its story):
   `node scripts/generation-queue.mjs add --kind solution --slug <slug> --title "<t>" --keywords "a, b"`.
2. Run the `generate-image-cover` skill with `kind=solution` and the slug:
   `art-agent` builds `<slug>.prompt.txt` with
   `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs solution <slug>`
   and renders 1376×768 through Runware into
   `assets/images/solutions/<slug>.png`.
3. While the record is still queued, add `test/image-prompts/<slug>.test.ts`
   calling `expectPromptStandard("solution", "<slug>")` — the helper reads the
   record, so the lock lives only as long as the record does.
4. Drop the record once the file lands:
   `node scripts/generation-queue.mjs remove solution <slug>`; the per-slug test
   goes with it (the standard lock stays in `test/image-prompts/solution.test.ts`).
5. Switch the surfaces: `src/app/data/solutionImages.ts` globs
   `solutions/*.{png,jpg,jpeg,webp}` and prefers the raster, like
   `serviceImages.ts`; the SVG stays the fallback until a backdrop lands.

## Verification

`lint` clean; `tsc -b` clean; `test` green.

## References

- Standard: `docs/image-prompts/scene-defined/solution.txt`.
- Queue: `scripts/generation-queue.mjs`, `content/generation-queue.json`.
