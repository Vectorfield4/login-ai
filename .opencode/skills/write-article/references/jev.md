# Jev review (advisory prose gate)

A skill's `scripts/jev-review.mjs` is a cheap, online pre-pass over a draft. It
asks the TypeSafe System One model `Jev` (`typesafe:jev@1`, served by Runware at
`POST https://api.runware.ai/v1/decisions`) a batch of typed questions about one
document and prints candidate findings. It is **advisory**: the candidates are a
shortlist for the `prose-critic` / `service-critic` gate, never a blocker on
their own.

The engine is shared and domain-free: `lib/jev/` holds the transport
(`client.mjs`), the thresholds (`thresholds.mjs`), the question factories
(`questions.mjs`), the answer→finding collectors (`findings.mjs`), the report
(`report.mjs`), the one-call runner (`review.mjs`) and the CLI harness
(`cli.mjs`). The shared content rubrics live in `lib/prose/` — filters,
relevance, strict probes, line extractors, target lookup and the inline
`reviewText`. Both are local npm workspace packages (`@login-ai/jev`,
`@login-ai/prose`), so a skill script imports them by name; each skill owns only
its gates and CLI in its `scripts/`: `write-article` adds genre/structure/AEO,
`write-service` adds the block semantics, `code-quality` adds SOLID/SoC over
source.

## Why it exists

`test/articles.test.ts` and `test/services/prose-quality.test.ts` check volume,
lexicon and typography — deterministic rules. The semantic rules (grounding,
argument, structure, relevance) are judged by the critic subagents, which read
many reference files. Jev collapses that first pass into **one batched request
per document**, so the critic starts from a shortlist instead of a blank page.

## Commands

```
node .opencode/skills/write-article/scripts/jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory] [--strict] [--min-confidence 0.5]
node .opencode/skills/write-service/scripts/jev-review.mjs <slug> [--lang ru|en] [--json] [--advisory] [--strict] [--min-confidence 0.5]
node .opencode/skills/write-article/scripts/jev-review.mjs --stdin [--strict] [--json]
node .opencode/skills/write-service/scripts/jev-review.mjs --stdin [--strict] [--json]
node lib/prose/eval.mjs
```

- `--advisory` forces exit 0 even with candidates; without it the CLI exits 1
  when candidates exist (so `publish.mjs --jev` can gate on it).
- `--stdin` reads the draft from standard input instead of a slug. It runs the
  per-unit filter sweep (G1) only — genre, structure, AEO and the relevance gate
  need the file's frontmatter and linked targets — so a section can be checked
  the moment it is written, before it reaches disk. Findings are reported against
  `(stdin)` with the paragraph line in the pasted text.
- `--strict` adds independent `noul` probes for the negation and grounding
  filters, catching a strong signal the single `choice` merged into `none`.
- Without `RUNWARE_API_KEY` every command prints a skip notice and exits 0 — CI
  and offline runs never touch the network.
- `--lang` defaults to `ru`; the EN mirror is a separate run.

## Gates

One `POST /v1/decisions` carries every question; TypeSafe evaluates them in
parallel and reads `state` once.

| # | Gate | Primitive | Fires when |
| --- | --- | --- | --- |
| G1 | Per-unit prose filters | `choice` | `choice ≠ none` and `confidence ≥ minConfidence` |
| G2 | Relevants fit (article links / service `relevants[]`) | `noul` | `noul ≤ 0.2` (confident "not relevant") |
| G3 | Genre / structure (article only) | `choice` | reads differently from `category`, or a structure the genre forbids |
| G4 | AEO lead hook (article only) | `noul` ×2 | `noul ≤ 0.2` |
| G5 | Service block semantics | `noul` | `mechanism` reads as a fragment, a block title misses its text, or a `sections` item is not a sentence |

The shared G1 rubrics live in `lib/prose/prompts.mjs`; the thresholds in
`lib/jev/thresholds.mjs`. The genre/structure/AEO rubrics live in
`write-article/scripts/jev-prompts.mjs`, the service block rubrics in
`write-service/scripts/jev-prompts.mjs`. Change a rubric in its one home and bump
its prompt version, then run `eval.mjs`.

## Output

```
[articles/<slug>.ru.md:19] SYNTHETIC_DEPTH_CANDIDATE (0.83) — System One-модели …
[articles/<slug>.ru.md:1] STRUCTURE_MISMATCH (0.77) — reads as PSI; technical allows Breakdown/How-To
```

`rule`, `confidence` and the offending text/line. The reason stays with the
critic; Jev only locates candidates.

## Calibration

`lib/prose/eval.mjs` runs `eval-fixtures.json` (synthetic cases from
`references/filters/*` plus real, gate-passed paragraphs as negative controls)
through the exact production shape and prints a per-filter confusion matrix. The
first live run scored 16/16 dominant-label accuracy across RU and EN. A
`choice` below `minConfidence` is dropped: lower the threshold for recall, raise
it for quiet.

## Limits

- Jev does not explain, rank or rewrite; it labels. It cannot replace the critic.
- The inline (`--stdin`) pass covers G1 only; run the file-level review before
  the prose gate so G2–G5 are checked too.
- `noul` gate answers are noisier than `choice`; keep them narrow, keep the
  threshold high, and treat every hit as a question for a human.
- G5 covers `mechanism` paragraphs, block titles and `sections` items; other
  block-level rules stay with `service-critic`.
