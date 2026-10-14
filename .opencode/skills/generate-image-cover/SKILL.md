---
name: generate-image-cover
description: Use when producing a login-ai cover or backdrop image — an article cover (assets/images/articles/<slug>.png), a service backdrop (assets/images/services/<slug>.png) or a solution backdrop (assets/images/solutions/<slug>.png). Dispatches the art-agent subagent, which authors the scene, builds <slug>.prompt.txt from the generation-queue record with this skill's image-prompt.mjs, and renders the PNG through the Runware MCP. Triggers: "GenerateImageCover", "generate cover", "cover gate", "article cover", "service backdrop", "solution backdrop", "image prompt", "сгенерировать обложку", "обложка", "бэкдроп".
---

# GenerateImageCover

Owns the cover/backdrop pipeline for all three content kinds. This skill holds
the prompt templates and the prompt builder; `art-agent` runs the pipeline end to
end — author, gate, build, render, place — so the procedure lives in one place.

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

1. **Dispatch `art-agent`** with `kind` and `slug`. It reads the finished copy,
   inventories the concrete entities, authors one scene into the record's
   `story`, runs the advisory story gate
   (`.opencode/skills/generate-image-cover/scripts/story-gate.mjs`), builds
   `<slug>.prompt.txt` with `image-prompt.mjs --force`, renders through the
   Runware MCP, verifies real pixels (≥1200×630, no resize) and places the first
   valid variant as `<slug>.png`.
2. Report the placed `<slug>.png`. The queue record stays until the publishing
   pipeline drops it — this skill never removes it.

## Builder

```
node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs <kind> <slug> [--idea "..."] [--lang "..."] [--force] [--print]
node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs <kind> --all [--force]
```

The visual idea comes from the record's `story`; `--idea` overrides it for a
one-off. An entry with no story gets a `[TODO: ...]` marker, never a guess. The
pickers glob only `png/jpg/jpeg/webp`, so `.prompt.txt` files never ship.
