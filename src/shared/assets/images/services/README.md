# Service Backdrops

Every file in this folder is a service backdrop. A backdrop is **one** image per
slug, reused on two surfaces: the visual in the home services block
(`ServiceSpotlight`, cropped to 16:9) and the hero of the service detail page,
where it is also handed to `BaseLayout` as `og:image` / `twitter:image` (the
build rasterizes it to PNG 1200×630).

## Awaiting generation

**This table lists only the slugs that still need a backdrop.** Whenever you add
or delete a file in this folder, update it in the same change: a backdrop added
means removing its row, a backdrop deleted means adding the row back. A slug
with no row and no file is a bug in the table. The full slug list is
`src/entities/service/model/fixtures.ts`.

| Slug | Service | Topic/keywords |
| --- | --- | --- |
| `content-localization` | Локализация контента | локализация, перевод, глоссарий, субтитры, носитель |
| `ai-presentations` | Презентации и документы | презентации, слайды, питч-дек, диаграммы, шаблон |
| `ai-image-training` | Обучение генерации изображений | обучение, изображения, промпты, ретушь, серии |
| `ai-video-training` | Обучение видеопродакшену с ИИ | обучение, видео, сценарий, раскадровка, монтаж |
| `ai-voice-training` | Обучение голосу и аудио | обучение, голос, синтез речи, подкаст, звук |
| `ai-localization-training` | Обучение локализации контента | обучение, локализация, перевод, глоссарий, носитель |
| `ai-presentations-training` | Обучение презентациям и документам | обучение, презентации, слайды, питч-дек, графика |
| `nlp-systems` | Разработка систем обработки естественного языка | NLP, тональность, сущности, классификация, суммаризация |
| `recommendation-systems` | Разработка систем рекомендаций | рекомендации, поведение пользователя, персонализация, ранжирование |
| `speech-recognition-systems` | Разработка систем распознавания речи | ASR, речь в текст, термины, диаризация |
| `reinforcement-learning-systems` | Разработка систем обучения с подкреплением | RL, симулятор, многошаговая цель, вознаграждение |

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
- **No text baked into the image**: the service title and description are
  overlaid in the markup (behind a scrim), so keep the image free of text.
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
[`../../../../../docs/images/service-backdrop-prompt.txt`](../../../../../docs/images/service-backdrop-prompt.txt);
the `write-article` skill's `cover-artist` step writes
`src/shared/assets/images/services/<slug>.prompt.txt` here through
`scripts/image-prompt.mjs`. Those `*.prompt.txt` files are prompts, not
backdrops: the picker globs only `png/jpg/jpeg/webp` and ignores them. Save the
generated image as `src/shared/assets/images/services/<slug>.png`.
