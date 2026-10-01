# Article Covers

Every file in this folder is a news article cover. A cover is **one** image per
slug, used in two places: the thumbnail in the news card (`NewsCard`, 3:2) and
`og:image` / `twitter:image` on the article page (the build rasterizes it to PNG
1200×630).

## Awaiting generation

**This table lists only the slugs that still need a cover.** Whenever you add or
delete a file in this folder, update it in the same change: a cover added means
removing its row, a cover deleted means adding the row back. A slug with no row
and no file is a bug in the table.

| Slug | Article title | Topic/keywords |
| --- | --- | --- |
| `ai-agents-support-autonomy` | AI Agents in Support: From Answers to Independent Actions | AI agents, customer support, request automation, autonomous agents, action orchestration, agentic execution |
| `computer-vision-line-review` | Computer Vision on the Line: Why Manual Re-Checking Is Needed | computer vision, quality control, production line, conveyor, defect detection, borderline decisions, human in the loop |
| `conversational-bi-architecture` | Conversational BI Architecture: How to Avoid Hallucinated Numbers | conversational BI, Conversational BI, generative BI, RAG, SQL generation, fact checking, data accuracy |
| `deterministic-rag-infrastructure` | Deterministic RAG Infrastructure: Making Answers Predictable | RAG, deterministic answers, AI predictability, hybrid search, vector search, RAG infrastructure, answer quality control |
| `reviews-tone-monitoring` (draft) | Reviews Monitoring: Why the Tone Filter Does Not Work | review monitoring, tone analysis, sentiment analysis, reputation monitoring, review classification, false positives, neutral reviews |

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
- **No text on the image**: different platforms crop differently, and the
  article title is already in the preview.
- **Centered composition**: the card crops through `object-fit: cover` into
  3:2 and OG into 1200×630, so anything important belongs in the center.
- A source smaller than 1200×630 is not upscaled by Astro and goes soft in OG.
- Match the style of the placeholder illustrations in
  `../../src/shared/ui/atoms/illustrations/`.

## Generating an image

The reusable prompt template lives in
[`../../docs/images/image-generation-prompt.txt`](../../docs/images/image-generation-prompt.txt).
Fill in the article title, 3–6 keywords, and one abstract visual idea — the rest
of the prompt is fixed. Save the result here as `<slug>.png`.