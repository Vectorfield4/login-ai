# Solution Backdrops

Every file in this folder is a solution backdrop. A solution already ships an SVG
hero (`../<slug>.svg`) for the home card and the detail hero; a backdrop here is
the raster replacement for those surfaces plus `og:image`, once generated.

## Wiring

```
src/shared/assets/images/solutions/<slug>.png
```

The file name must match the solution slug exactly. The queue
([`../../../../../content/generation-queue.json`](../../../../../content/generation-queue.json))
lists the slugs still to generate, one record per slug with
`"kind": "solution"`. Inspect it with
`node scripts/generation-queue.mjs list --kind solution`. A record means pending;
remove it once the file lands. See `docs/plans/solution-backdrops-plan.md`.

## Requirements

| Usage | Size | Ratio |
| --- | --- | --- |
| `og:image` / `twitter:image` | 1200 × 630 | 16:9 |
| Home card / detail hero | scaled from the same file | 16:9 |

- **Format**: PNG (Jpeg/WebP are also accepted). Generate in PNG.
- **No SVG**: social networks do not accept SVG as OG, and `npm run verify:dist`
  requires a raster `og:image`.
- **No legible text baked into the image**: the title and tagline sit in the
  markup, so keep the image free of readable text.
- **Centered composition**: the card and hero crop through `object-fit: cover`,
  so the focal motif belongs in the center.
- Match the palette and line weight of the existing solution art in `../`.

## Generating an image

The prompt template is
[`../../../../../docs/image-prompts/scene-defined/solution.txt`](../../../../../docs/image-prompts/scene-defined/solution.txt);
the `cover-artist` subagent writes `<slug>.prompt.txt` here through
`scripts/image-prompt.mjs`, and `cover-renderer` renders the backdrop through the
Runware MCP. Those `*.prompt.txt` files are prompts, not backdrops: the picker
globs only `png/jpg/jpeg/webp` and ignores them.
