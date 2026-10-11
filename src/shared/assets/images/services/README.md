# Service Backdrops

Every file in this folder is a service backdrop. A backdrop is **one** image per
slug, reused on two surfaces: the visual in the home services block
(`ServiceSpotlight`, cropped to 16:9) and the hero of the service detail page,
where it is also handed to `BaseLayout` as `og:image` / `twitter:image` (the
build rasterizes it to PNG 1200×630).

## Awaiting generation

The backdrops still to generate live in
[`../../../../../content/generation-queue.json`](../../../../../content/generation-queue.json),
records with `"kind": "service"`: a slug, its title, topic keywords and the
visual `story`. A record means the backdrop is pending; remove it once the file
lands. Inspect it with `node scripts/generation-queue.mjs list --kind service`.
A slug with no record and no file is a bug in the queue. The full slug list is
`src/entities/service/model/fixtures.ts`.

## Wiring

```
src/shared/assets/images/services/<slug>.<ext>
```

The file name must match the service slug exactly. Nothing else has to change:
the backdrop is picked up by the "file is named after the slug" convention in
`../../app/data/serviceImages.ts` (`getServiceImage`), and the pages read it
from there.

One image serves every surface, so it must read well both as a wide hero banner
and as the smaller home visual. Supported extensions: `png`, `jpg`, `jpeg`,
`webp`; when several exist for one slug, `png` wins.

With no file, everything builds as before: the home visual falls back to the
service icon (`ServiceSpotlight`), the detail hero renders without a backdrop,
and no `og:image` is emitted for that page.

## Requirements

| Usage | Size | Ratio |
| --- | --- | --- |
| `og:image` / `twitter:image` | 1200 × 630 | 16:9 |
| Home visual (`ServiceSpotlight`) | cropped from the same file | 16:9 |
| Service hero (`<Image>`) | scaled from the same file | 16:9 |

- **Format**: PNG (Jpeg/WebP are also accepted). Generate in PNG.
- **No SVG**: social networks do not accept SVG as OG, and `npm run verify:dist`
  requires a raster `og:image` (PNG/JPG/WebP by file signature).
- **No legible text baked into the image**: the service title and description are
  overlaid in the markup (behind a scrim), so keep the image free of readable
  text; a blurred, unreadable screen with no discernible text is acceptable.
- **Abstract in context**: abstract motifs may appear inside screens, interfaces
  and TV panels, in the air, sky or space, on water, or in reflections; the rest
  of the frame stays a physical scene.
- **Calm lower third**: the title and one line of description sit along the
  bottom of the home visual and the hero. Leave the lower band dark-ish or
  uncluttered so white copy stays readable.
- **Centered composition**: the home visual and the hero crop through
  `object-fit: cover`, so the main subject belongs in the upper two-thirds.
- A source smaller than 1200×630 goes soft in OG; do not upscale.
- Keep the palette and line weight close to the solution art in
  `../` (see `../../../ui/atoms/illustrations/` for the placeholder style).

## Generating an image

The prompt template is
[`../../../../../docs/image-prompts/scene-defined/service.txt`](../../../../../docs/image-prompts/scene-defined/service.txt);
the `cover-artist` subagent writes
`src/shared/assets/images/services/<slug>.prompt.txt` here through
`scripts/image-prompt.mjs`. The `cover-renderer` subagent then renders four
variants through the Runware MCP (`runware:400@1`, 1280×672) into
`.cache/covers/<slug>/`, and places the chosen one here as `<slug>.png` — raster
only, no resize. Those `*.prompt.txt` files are prompts, not backdrops: the
picker globs only `png/jpg/jpeg/webp` and ignores them.
