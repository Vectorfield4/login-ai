# Premium 3D scene-defined standard — templates, style and constants

Manual generations showed the flat "editorial illustration" look reads as cheap
corporate stock. A premium 3D industrial-design / software-interface render (the
Apple–Stripe register) produced a production-ready B2B frame. This plan moves the
existing automated pipeline onto that aesthetic: the shared `{{STYLE}}` block, the
three `scene-defined` frames and the default language constant.

The runtime contract does not change — `image-prompt.mjs` still fills
`scene-defined/<kind>.txt` plus `cover-style.txt` from the queue record, and
`art-agent` still renders through Runware (`google:4@3`, 1376×768, PNG, no resize).

## Scope

`cover-style.txt` is injected into all three scene-defined templates, so the
aesthetic moves for every kind, not only solutions. Article and service frames are
reframed too, to avoid an old "minimal editorial" opener sitting on the new style.

- `{{LANG}}` default drops `Russian (preferred)` — naming a language makes the
  diffusion model hallucinate broken lettering. New default:
  `neutral, no visible text on image`.
- `{{STYLE}}` and the closing composition sentence are two paragraphs, not one
  glued block.
- The opener's "about" subject is a short Latin `topic` (new queue field), not
  the Cyrillic `title`; the builder falls back to `keywords` when none is set.
- The `--ar 16:9` flag is **not** added: Runware gets the ratio from the render
  params and the flag can leak into the frame as text.
- Old committed `<slug>.prompt.txt` files stay untouched; they refresh the next
  time each slug is regenerated. Only the two that have tests
  (`image-generation-brand-lock`, `video-generation-vs-studio`) matter, and both
  match the retiring `instructional` standard, which the change does not touch.

## Changes

| file | change |
| --- | --- |
| `docs/image-prompts/cover-style.txt` | new premium 3D style paragraph |
| `docs/image-prompts/scene-defined/solution.txt` | 3D opener + footer |
| `docs/image-prompts/scene-defined/article.txt` | 3D opener + footer |
| `docs/image-prompts/scene-defined/service.txt` | 3D opener + tail (glass panels allowed) |
| `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs` | `DEFAULT_LANG` + Latin `topic` subject |
| `scripts/generation-queue.mjs` + `generation-queue.d.mts` | `topic` field + `set-topic` |
| `test/image-prompts/helpers.ts` | mirror `LANG` |
| `test/image-prompts/solution.test.ts` | opener + closing assertions |
| `.opencode/agent/art-agent.md` | 3D "Medium" bullet + physical-object constraint |
| `docs/images.md` | note the new standard |

## Acceptance criteria

- [ ] `cover-style.txt` renders the premium 3D block.
- [ ] All three `scene-defined` frames open on the 3D render and close on the
      no-text footer; no `editorial`/`illustration`, no `--ar`.
- [ ] `{{LANG}}` default is `neutral, no visible text on image` in both the
      builder and `helpers.ts`.
- [ ] Openers interpolate a Latin `topic`, never the Cyrillic title.
- [ ] `{{STYLE}}` and the footer render as separate paragraphs.
- [ ] `art-agent` §2 asks for physical objects, not 2D graphic terms.
- [ ] `test/image-prompts/solution.test.ts` matches the new frame.
- [ ] `reputation-management.prompt.txt` compiles from the new template with a
      temporary queue record (no Runware spend).
- [ ] `lint`, `tsc -b`, `test` green.

## Verification

```
node .opencode/skills/generate-image-cover/scripts/image-prompt.mjs solution reputation-management --force --print
npm run lint
npx tsc -b
npm run test
```

## References

- Standard builder: `.opencode/skills/generate-image-cover/scripts/image-prompt.mjs`.
- Style block: `docs/image-prompts/cover-style.txt`.
- Conventions: `docs/images.md`.
