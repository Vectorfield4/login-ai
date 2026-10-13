# Image assets

Where article covers, service backdrops and solution art live, what shape each
takes, and how a queued record becomes a file.

## Layout

```
assets/images/
  articles/<slug>.png        # article cover
  services/<slug>.png        # service backdrop
  solutions/<slug>.svg       # solution hero
  solutions/<slug>.png       # solution raster
docs/image-prompts/
  cover-style.txt
  scene-defined/{article,service,solution}.txt
  instructional/{article,service}.txt
```

## Kinds

| kind | folder | file | surfaces |
| --- | --- | --- | --- |
| article | `assets/images/articles/` | `<slug>.png` | news card (3:2), `og:image` (1200×630) |
| service | `assets/images/services/` | `<slug>.png` | home spotlight (16:9), service hero, `og:image` |
| solution | `assets/images/solutions/` | `<slug>.svg` hero, `<slug>.png` raster | home card, detail hero, `og:image` |

The file name matches the entity slug. The pickers accept `png`, `jpg`, `jpeg`
and `webp`, and prefer `png` when a slug has several files.

## Wiring

Each picker globs its folder and keys by file name:

- `getNewsCover(slug)` in `src/app/data/newsCollection.ts` globs `assets/images/articles/*`.
- `getServiceImage(slug)` and `getServiceCover(slug)` in `src/app/data/serviceImages.ts` glob `assets/images/services/*`.
- `getSolutionImage(slug)` in `src/app/data/solutionImages.ts` imports `assets/images/solutions/<slug>.svg`.

One image serves every surface and both locales. An explicit `ogImage` in an
article's frontmatter wins over the convention. When a slug has no file, each
surface falls back to its placeholder and the page emits no `og:image`.

## Requirements

| usage | size | ratio |
| --- | --- | --- |
| `og:image` / `twitter:image` | 1200 × 630 | 16:9 |
| card, spotlight, hero | cropped from the same file | 3:2 or 16:9 |

- Format: PNG. `npm run verify:dist` requires a raster `og:image` (PNG, JPG or WebP by file signature) so social networks accept it.
- Keep legible text out of the frame. The title and description sit in the markup, and each platform crops to a different box.
- Abstract motifs belong inside screens, panels or reflections; the rest of the frame stays a physical scene.
- Put the subject in the upper two-thirds and leave the lower third calm for overlaid copy.
- A source under 1200×630 loses detail in OG, so generate at 1376×768.

## Prompt standards

Templates hold `{{SLOT}}` placeholders and live in `docs/image-prompts/`.
`scene-defined/<type>.txt` is the current standard, and `cover-style.txt` is the
shared `{{STYLE}}` block the script injects into it. `instructional/<type>.txt`
is the earlier brief the pipeline moved off; solution has no earlier brief.

`test/image-prompts/helpers.ts` renders both standards for a kind and checks that
a `<slug>.prompt.txt` matches one exactly, so a half-migrated prompt fails. Once
every draft uses `scene-defined`, drop `instructional` from the accepted set.

## Generating an image

A record in `content/generation-queue.json` means the image is pending; removing
the record marks the file landed. Run the `generate-image-cover` skill with
`kind` and `slug`:

1. `cover-artist` reads the copy, authors one scene and writes it to the record's `story`.
2. `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs <kind> <slug> --force` fills the template into `<slug>.prompt.txt` next to the image.
3. `cover-renderer` renders four variants through the Runware MCP (`google:4@3`, 1376×768) into `.cache/covers/<slug>/` and places the first valid one as `<slug>.png`, with no resize.

The `*.prompt.txt` files are prompts, and the picker globs only
`png/jpg/jpeg/webp`, so they stay out of the build.

Inspect pending work with
`node scripts/generation-queue.mjs list [--kind article|service|solution]`. A
published article or service with no file returns to draft (`draft: true`); a
solution record is a worklist entry, not a gate.
