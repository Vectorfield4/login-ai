# Image Prompts

The prompt standards behind article covers (`articles/images/<slug>.png`),
service backdrops (`src/shared/assets/images/services/<slug>.png`) and solution
backdrops (`src/shared/assets/images/solutions/<slug>.png`).

## Layout

```
<standard>/<type>.txt
```

- `<standard>` — `scene-defined` (current) or `instructional` (the legacy brief
  the pipeline migrated off).
- `<type>` — `article`, `service` or `solution`. Solution has no legacy brief,
  so it carries only `scene-defined`.
- `cover-style.txt` — the shared style paragraph, injected as `{{STYLE}}` into
  the `scene-defined` templates (the `instructional` brief carries its own).

Templates hold `{{SLOT}}` placeholders. `scripts/image-prompt.mjs` fills them from
a record in `content/generation-queue.json` (its `title`, `keywords` and `story`)
and writes `<slug>.prompt.txt` next to the image. The `cover-artist` subagent
authors the `story`; `cover-renderer` renders the file.

## Tests

`test/image-prompts/<slug>.test.ts` locks one draft's `<slug>.prompt.txt` to a
standard; `test/image-prompts/helpers.ts` renders both and asserts the file
matches one exactly, so a half-migrated prompt fails. Once every draft is on
`scene-defined`, drop `instructional` from the accepted set.
`test/image-prompts/solution.test.ts` locks the solution standard itself until a
`kind: "solution"` record and its `<slug>.prompt.txt` exist.
