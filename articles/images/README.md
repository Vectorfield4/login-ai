# Article Covers

Every file in this folder is a news article cover. A cover is **one** image per
slug, used in two places: the thumbnail in the news card (`NewsCard`, 3:2) and
`og:image` / `twitter:image` on the article page (the build rasterizes it to PNG
1200×630).

## Awaiting generation

The covers still to generate live in
[`../../content/generation-queue.json`](../../content/generation-queue.json),
records with `"kind": "article"`: a slug, its title, topic keywords and the
visual `story`. A record means the cover is pending; remove it once the file
lands. Inspect it with `node scripts/generation-queue.mjs list --kind article`.
A slug with no record and no file is a bug in the queue.


## Wiring

```
articles/images/<slug>.png
```

The file name must match the article slug exactly (`../<slug>.ru.md` /
`../<slug>.en.md` → `<slug>.png`). Nothing else has to change: the cover is
picked up by the "file is named after the slug" convention in
`../../src/app/data/newsCollection.ts` (`getNewsCover`).

One image serves both locales — the RU and EN pages get it independently of
whether `.en.md` exists in the pair. An explicit `ogImage: ./images/…` in
frontmatter always wins over the convention.

Supported extensions: `png`, `jpg`, `jpeg`, `webp`. When several files exist
for one slug, `png` wins.

With no file, pages and cards build exactly as before: the card falls back to
the per-category placeholder illustration (`NewsPlaceholder`) and no
`og:image` is emitted.

## Requirements

| Usage | Size | Ratio |
| --- | --- | --- |
| `og:image` / `twitter:image` | 1200 × 630 | 16:9 |
| Card thumbnail (`NewsCard`) | cropped from the same file | 3:2 |

- **Format**: PNG (Jpeg/WebP are also accepted). Generate in PNG.
- **No SVG**: social networks do not accept SVG as OG, and
  `npm run verify:dist` requires a raster `og:image` (PNG/JPG/WebP by file
  signature).
- **No legible text on the image**: captions, subtitles, readable labels and
  watermarks are out, and different platforms crop differently, while the article
  title is already in the preview. A blurred, unreadable screen with no
  discernible text is acceptable.
- **Abstract in context**: abstract motifs may appear inside screens, interfaces
  and TV panels, in the air, sky or space, on water, or in reflections; the rest
  of the frame stays a physical scene.
- **Centered composition**: the card crops through `object-fit: cover` into
  3:2 and OG into 1200×630, so anything important belongs in the center.
- A source smaller than 1200×630 is not upscaled by Astro and goes soft in OG.
- Match the style of the placeholder illustrations in
  `../../src/shared/ui/atoms/illustrations/`.

## Generating an image

The prompt template is
[`../../docs/image-prompts/scene-defined/article.txt`](../../docs/image-prompts/scene-defined/article.txt);
the `cover-artist` subagent writes `articles/images/<slug>.prompt.txt` here
through `scripts/image-prompt.mjs`. The `cover-renderer` subagent then renders
four variants through the Runware MCP (`google:4@3`, 1376×768) into
`.cache/covers/<slug>/`, and places the chosen one here as `<slug>.png` — raster
only, no resize. Those `*.prompt.txt` files are prompts, not covers: the picker
globs only `png/jpg/jpeg/webp` and ignores them.