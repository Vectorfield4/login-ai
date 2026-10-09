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

## Architectural grid & cadence (`GRID_CADENCE_VALIDATION`)

### Syntax & paragraph rhythm
- [ ] Paragraphs within an H2 section must follow a varied wave pattern: alternate between dense anchor blocks (3–4 sentences detailing mechanics, metrics, or limitations) and dynamic breather blocks (1–2 sentences delivering blunt conclusions or direct operational steps).
- [ ] Sentence variance inside dense blocks must follow a rolling cadence: open with a macro-proposition (18–25 words), develop it with a conditional variable (10–15 words), and resolve it with a punchy constraint or metric outcome (4–8 words).
- [ ] Maintain structural diversity across consecutive clauses by varying initial grammatical components (alternating between active verbs, nouns, and conditional modifiers across neighboring sentences).
- [ ] Break up structural monotony across extended text files by injecting a high-density operational break (a short, single-sentence paragraph of ≤15 words or a comprehensive data block of 45+ words) after every 3–4 standard paragraphs.

### Component autonomy
- [ ] The prose surrounding a matrix or markdown table is reserved exclusively for the analysis of edge-case scenarios, configuration anomalies, or high-risk human factors that fall outside standard database rows. 

### Language decoupling
- [ ] Evaluate the English translation layout as an autonomous technical document written directly in native engineering diction (Active Voice, direct analytical clauses). 
- [ ] Leverage the structural agility of English by fragmenting complex Russian compound sentences into distinct, fast-paced analytical statements. The EN layout is expected to naturally diverge from the RU baseline by a 10–15% margin in sentence and paragraph boundaries.


## Action loop (`ACTION_LOOP_VALIDATION`)
- [ ] The action section functions as a closed operational feedback loop. It specifies four sequential production components:
  - **Input Artifact:** The name of the specific document, map, architecture schema, or configuration file from which the reader starts execution.
  - **Baseline Metric:** The quantitative metric value and its verification protocol captured before initialization.
  - **Checkpoint Deadline:** A designated timeframe for the follow-up inspection (e.g., 7 or 14 days) alongside the target efficiency bracket.
  - **Scale-or-Stop Condition:** A deterministic boundary rule that explicitly defines whether the pilot sequence expands to production or reverts to structural debugging.
