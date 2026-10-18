# Image assets

Where article covers, service backdrops and solution art live, what shape each
takes, and how a queued record becomes a file.

## Layout

```
assets/images/
  articles/<slug>.png        # article cover
  articles/<slug>.prompt.txt # prompt + <slug>.meta.json sidecars
  services/<slug>.png        # service backdrop
  solutions/<slug>.svg       # solution hero
  solutions/<slug>.png       # solution raster
docs/image-prompts/
  cover-style.txt            # {{STYLE}} for articles and services
  cover-style-solution.txt   # {{STYLE}} for solutions: brand, no fixed framing
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
- `getSolutionImage(slug)` and the `solutionImages` manifest in `src/app/data/solutionImages.ts` glob `assets/images/solutions/*` and prefer `<slug>.png`; the SVG hero stays the fallback until a raster lands.

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
`scene-defined/<type>.txt` is the current standard, and the script injects a
`{{STYLE}}` block from `cover-style.txt` — or `cover-style-solution.txt` for
solutions. The standard is a premium 3D industrial-design / software-interface
render: frosted glass panels, anodized slate blocks, cinematic studio light, one
crimson accent. The article/service style pins the centered composition; the
solution style leaves framing to `visual_config.composition`, which picks one of
the camera/staging archetypes in `ui-primitives.mjs` (orbital hub, corridor,
macro lens, flat lay, side-profile console, isometric line, threshold, diagonal).
`instructional/<type>.txt` is the earlier brief the pipeline moved off; solution
has no earlier brief.

`test/image-prompts/helpers.ts` renders both standards for a kind and checks that
a `<slug>.prompt.txt` matches one exactly, so a half-migrated prompt fails. Once
every draft uses `scene-defined`, drop `instructional` from the accepted set.

## Generating an image

A record in `content/generation-queue.json` means the image is pending; removing
the record marks the file landed. Run the `generate-image-cover` skill with
`kind` and `slug`:

1. `art-agent` reads the copy, derives a structured `visual_config`, exactly ten English `keywords` (each a key of `docs/image-prompts/keyword-motifs.mjs`) and a short Latin `topic`, writes them to the record, then runs `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs <kind> <slug> --force` to fill the template into `<slug>.prompt.txt` next to the image.
2. It renders once through the Runware MCP (`google:4@3`, 1376×768) into `.cache/covers/<slug>/` and places it as `<slug>.png`, with no resize.

Each image ships with two sidecars next to it: `<slug>.prompt.txt` (the prompt
that produced it) and `<slug>.meta.json` (the queue record — `title`, `keywords`,
`topic`, `object`, `visual_config`). `object` is the short Latin subject the frame
is about; the `solution` template leads its scene body with it
(`The scene centers on {{OBJECT}}.`) and the catalog lists it. The picker globs only `png/jpg/jpeg/webp`, so both
stay out of the build; the metadata lives with the asset rather than in the
queue, which keeps only what is still pending. `scripts/image-catalog.mjs` folds
those sidecars into one list (`npm run catalog`, or `[--kind solution] [--json]
[--out <path>]`) for review and tooling.

Inspect pending work with
`node scripts/generation-queue.mjs list [--kind article|service|solution]`. A
published article or service with no file returns to draft (`draft: true`); a
solution record is a worklist entry, not a gate.
