# Acceptance

Run twice: on the spec before writing, on the article before publishing.

## Spec

- [ ] All 12 sections of `references/spec-template.md` are filled.
- [ ] One structure and one funnel stage are named.
- [ ] Numbers are concrete, sourced, or marked «нужен замер».
- [ ] Target queries and the AEO question are written out.
- [ ] Link targets exist as fixtures (drafts allowed).
- [ ] `category` and `excerpt` match the schema in `src/content.config.ts`
      (guide: `docs/frontend/news.md`).
- [ ] Anti-examples name real failures, not generalities.
- [ ] The acceptance checklist is verifiable without taste.

## Article

- [ ] RU meets the genre floor; an EN pair, when present, is ≥ 90% of RU.
- [ ] Headline and first sentence work alone.
- [ ] Every claim carries a number, source, or stated limit.
- [ ] The text names who the solution is not for, or states a hard boundary.
- [ ] A comparison ends with a verdict by fit, on a stated scale.
- [ ] A case metric reads as value, delta, and measurement window.
- [ ] Terminology is introduced once, then reused; no synonym cycling.
- [ ] At least one commercial link; internal links to adjacent breakdowns.
- [ ] One funnel stage, one action.
- [ ] No banned lexicon, no negation-based reasoning.
- [ ] `prose-critic` returns `VERDICT: PASS`.
- [ ] Cover `articles/images/<slug>.png`, 1200×630, no text; until it exists the
      article stays a draft (no `draft: false`) and keeps its "Awaiting
      generation" row.
- [ ] `mediaUrl` set for `media`, absent otherwise.
- [ ] `author` left empty; default team applies by locale.
- [ ] `npm run lint`, `npm run test`, `npm run verify` green.

## Syntax lint

- [ ] No three consecutive sentences of the same length and structure. A
      paragraph follows a rhythm: long (20+ words, the claim) → medium (10–15
      words, the development) → short (≤7 words, the punch).
- [ ] No more than two sentence openings repeat within one screen of text. The
      anaphora «Если… / Если… / Если…» is the failure, not a device.
- [ ] No five consecutive body paragraphs of comparable length (within ~15 words
      of each other). Break the run with a short paragraph (≤15 words) or a long
      one (45+); a wall of equal blocks is the paragraph-level tell.

## Table logic

- [ ] A table carries the structural inventory and the raw data. The prose
      under it repeats neither the data nor the total; its job is the edge case
      that did not fit the table.

## Action loop

- [ ] The action section is a micro-procedure, not a list of tips. It names
      four things: the input artifact (the quarterly video map), the baseline
      metric measured before, the checkpoint measured after (e.g. 14 days), and
      the scale-or-stop condition for the pilot.
