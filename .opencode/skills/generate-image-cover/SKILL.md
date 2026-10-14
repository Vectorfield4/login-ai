---
name: generate-image-cover
description: Use when producing a login-ai cover or backdrop image — an article cover (assets/images/articles/<slug>.png), a service backdrop (assets/images/services/<slug>.png) or a solution backdrop (assets/images/solutions/<slug>.png). Authors the scene through the cover-artist subagent, builds <slug>.prompt.txt from the generation-queue record with its own image-prompt.mjs, and renders the PNG through the cover-renderer subagent. Triggers: "GenerateImageCover", "generate cover", "cover gate", "article cover", "service backdrop", "solution backdrop", "image prompt", "сгенерировать обложку", "обложка", "бэкдроп".
---

# GenerateImageCover

Owns the cover/backdrop pipeline for all three content kinds. This skill holds
the procedure and the prompt builder; the two cognition steps are subagents, so
each keeps its own model, temperature and permissions.

`write-article` and `write-service` delegate their cover gate to this skill
instead of reaching into each other's folders.

## Kinds

| kind | prompt file | image |
| --- | --- | --- |
| `article` | `assets/images/articles/<slug>.prompt.txt` | `assets/images/articles/<slug>.png` |
| `service` | `assets/images/services/<slug>.prompt.txt` | `assets/images/services/<slug>.png` |
| `solution` | `assets/images/solutions/<slug>.prompt.txt` | `assets/images/solutions/<slug>.png` |

## Input

`kind` and `slug`. The slug must already have a record in
`content/generation-queue.json` — its `title` and `keywords` feed the prompt.

## Procedure

1. **Author the scene.** Dispatch the `cover-artist` subagent with `kind` and
   `slug`. It reads the finished copy, inventories the concrete entities, authors
   one scene idea, and stores it as the record's `story`
   (`node scripts/generation-queue.mjs set-story <kind> <slug> "<idea>"`).
2. **Story gate (advisory).** `node
   .opencode/skills/generate-image-cover/scripts/story-gate.mjs <kind> <slug>`.
   Jev judges the `story`: three to five concrete entities, one scene, no
   readable text, no faces. A weak story exits 1 — re-author it (step 1) before
   spending Runware credits. Skips without `RUNWARE_API_KEY`.
3. **Build the prompt.** `node
   .opencode/skills/generate-image-cover/scripts/image-prompt.mjs <kind> <slug>
   --force`. It fills `docs/image-prompts/scene-defined/<kind>.txt` (plus the
   shared `{{STYLE}}` from `docs/image-prompts/cover-style.txt`) from the record
   and writes `<slug>.prompt.txt` next to the image.
4. **Render and place.** Dispatch the `cover-renderer` subagent with `kind` and
   `slug`. It renders through the Runware MCP, verifies real pixels (≥1200×630,
   no resize) and places the first valid variant as `<slug>.png`.
5. Report the placed `<slug>.png`. The queue record stays until the publishing
   pipeline drops it — this skill never removes it.

## Builder

```
node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs <kind> <slug> [--idea "..."] [--lang "..."] [--force] [--print]
node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs <kind> --all [--force]
```

The visual idea comes from the record's `story`; `--idea` overrides it for a
one-off. An entry with no story gets a `[TODO: ...]` marker, never a guess. The
pickers glob only `png/jpg/jpeg/webp`, so `.prompt.txt` files never ship.
