# Jev expansion plan

Status: Phases 1–4 done (Phase 4 v1; sensor calibration pending). Design source:
the live TypeSafe docs (`docs.typesafe.ai`). Transport, the G1 checklist, the
Phase 2 surfaces, Phase 3 primitive/patterns, and the Phase 4 sensor registry +
circuit-breaker verdict are applied.

## Decisions

- **Transport: Runware only.** `POST https://api.runware.ai/v1/decisions`,
  model `typesafe:jev@1`, key `RUNWARE_API_KEY`. No native `api.typesafe.ai`
  path, no SDK, no alternative backend, no automatic failover backend. Applied:
  `lib/jev/client.mjs` hardcodes model + endpoint; the vendored `typesafe-ai`
  skill is removed.
- **Boundary: tooling only.** `lib/jev` and `lib/prose` are the skills'/CI
  engine; `src/` is not touched and gets no runtime seam.
- **reviewSolution:** a new `write-solution` skill (symmetric to
  `write-service`); the domain lives in `lib/prose`. Prerequisite for the
  Phase 2 solution items.
- **RU↔EN parity:** deterministic claim extraction in code + an advisory Jev
  verdict.
- **Guardrail:** the blocking gate is the `prose-critic` / `service-critic`
  subagent (publish only after its `VERDICT: PASS`). Jev flags are forwarded to
  it and never dropped. No new blocking code.
- **Availability:** documented manual fallback — "Jev unavailable → advisory
  pre-pass skipped → the critic performs the full sweep itself". No code
  fallback; Runware death is unlikely.

## Non-goals

- Jev never blocks CI: on error or a missing key it skips; `verify:dist` never
  calls Jev.
- No automatic failover backend; degradation is visible through a marker.
- `score` triage and `--repeat` are measurement/sorting helpers, not automatic
  actions.

## Invariants

**Design (enforced by code structure / tests):**

- **One request per document.** All questions of a document (all units × all
  filters, metadata, targets) travel in a single payload. Per-unit or
  per-criterion network loops are forbidden. A document too large for the token
  ceiling is the one exception: it is split at unit boundaries, one request per
  chunk, merged into one report (`lib/jev/report.mjs:mergeReports`). `--repeat`
  is exempt: it is a calibration harness, not production.
- **Zero Jev dependencies in `src/`.** No imports or side effects from
  `lib/jev` / `lib/prose` in the app.
- **Domain symmetry.** Solution gates live in their own slice; no
  cross-contamination between solution and service modules.
- **State hydration.** Deterministic per-unit length cap (chars, no tokenizer);
  long documents stay within it. Glossary / dependency fields are never cut.

**Calibration (eval / release, not runtime gates):**

- **Order invariance** for the remaining `choice` gates (genre, structure, code
  principles): shuffle the option order, pass only when label-flip rate and
  confidence-delta stay below target. `noul` is exempt (no options).
- **Dual-harness cutover:** the switch from the legacy `choice` G1 to the `noul`
  checklist is blocked until the two harnesses agree on a controlled baseline
  (agreement and flip-rate targets, sample window).
- **`--repeat N`:** report the modal label and agreement; a low-agreement tie is
  flagged high-variance and handed to review. Never iterate to consensus.

**Runtime (advisory):**

- **Score triage:** normalized sorting helper; weights explicit; `confidence`
  is a routing factor (low → review), never a multiplier inside the composite.
- **Graceful degradation:** distinguishable status. `no-key` is expected
  (exit 0, silent); `error` / `timeout` writes a visible marker with a reason
  code (still exit 0, never blocks). The fallback is the critic.

## Risk register

| # | Risk | Verdict | Coverage |
| - | - | - | - |
| 1 | `choice` position bias | real (choice only) | G1 becomes `noul` (no option order); canonical order + shuffle case in eval for the rest |
| 2 | Batch blowup / attention | myth (limit is `state`, not question count) | one request; unit cap; no sharding |
| 3 | Threshold flapping | real | dead-zone corridors + hysteresis; emit `confidence`; never auto-act |
| 4 | Shard fragmentation | bounded | G1 is per-unit local, not sharded; cross-unit checks are a separate global pass; deferred |
| 5 | Parity illusion | real | deterministic claim tuples; Jev verdict advisory with reordering allowed |
| 6 | Advisory regression loop | real | the critic is the gate; Jev flags forwarded, not dropped |
| 7 | Silent degradation | real | distinguish no-key from failure; visible marker; documented LLM fallback |
| 8 | Score fragility | bounded | advisory sort; normalized; weights in config |
| 9 | `--repeat` ties | myth | measurement: modal + agreement, small-N handling, no loop |

## Phase 1 — stability of the existing gates (done)

Tasks:

- [x] G1: per-unit `noul` checklist (one question per filter), combined in code;
  `noul` polarity = probability the unit violates the rule
  (`lib/prose/prompts.mjs`, `lib/prose/findings.mjs`, `lib/jev/findings.mjs`).
- [x] `FILTER_IDS` and the rule names (`FAKE_DEPTH_CANDIDATE`, …) unchanged;
  `references/filters/*.md` untouched. The structured `FILTERS`
  (`what` / `examples` / `not_for`) replaces the old one-line criteria.
- [x] `strict` dropped (`strictFilterQuestions` / `strictFindings`, plus
  `--strict` from both CLIs, `SKILL.md`, `references/jev.md`).
- [x] Corridors in `lib/jev/thresholds.mjs`: `act 0.8`, `review 0.65`; a
  `_UNSURE` is skipped under six words to keep the report quiet.
- [x] State hydration: `UNIT_CHUNK = 20`, `UNIT_CAP = 1200`; an oversized
  document splits at unit boundaries (`lib/jev/report.mjs:mergeReports`).
- [x] Dual-harness in `lib/prose/eval.mjs`: `noul` + legacy `choice` over the
  same fixtures.
- [ ] Order-invariance case for the remaining `choice` gates (deferred; G1 is
  `noul`, so it has no option order).

Measured (first dual run):

- `noul 15/16`, `legacy 15/16`, agreement `15/16` (the single miss is one
  fixture whose label is genuinely ambiguous).
- Live: inline G1 caught `FAKE_DEPTH_CANDIDATE (0.86)`; the case-study article
  yields two `NEGATIVE_CONNOTATION_UNSURE`; the 83-unit service was over the
  token ceiling as one request and now runs chunked.

Acceptance:

- [x] Both harnesses agree on the fixtures; the one gap is a fixture-label
  ambiguity, not a harness divergence. `noul` is production; the legacy harness
  stays for comparison.
- [x] CLI / SKILL / references updated for the removed `--strict`.

## Phase 2 — new surfaces (done)

- [x] `story` gate before the cover render:
  `generate-image-cover/scripts/story-gate.mjs` (a skill CLI, not a runtime
  hook). A weak story exits 1 so the scene is re-authored before the render.
- [x] `write-solution` skill: `SKILL.md` + `scripts/{jev-lines,jev-solution,jev-review}.mjs`;
  G1 checklist + G2 relevants + G6 FAQ answers + a deterministic note-key check.
- [x] Article metadata `noul` (title / description / excerpt) folded into the
  same article request (G7): `TITLE_WEAK_CANDIDATE` / `DESCRIPTION_WEAK_CANDIDATE`
  / `EXCERPT_WEAK_CANDIDATE`.
- [x] `dedup.mjs`: a deterministic token-overlap shortlist of the existing
  `articles/*.ru.md` (the plan index carries no headlines), then one Jev verdict
  per candidate. Skips cleanly with no candidates.
- [x] RU↔EN parity: `lib/prose/parity.mjs` compares normalized numeric claims in
  code; `write-article/scripts/parity.mjs` adds one advisory Jev verdict
  (`PARITY_FACT_MISMATCH`). Skips without an EN pair.
- [x] Relevants `noteKey` presence check (`RELEVANT_NOTE_MISSING`) + FAQ answers
  (`FAQ_UNANSWERED_CANDIDATE`) in the solution review.
- [x] Shared TS parsers moved to `lib/prose/ts.mjs` (`tsStrings`, `tsPairs`,
  bracket helpers), shared by the service and solution skills.

Observed on live runs:

- Article: `EXCERPT_WEAK_CANDIDATE (0.17)` — the excerpt restated the
  description, a real gap the metadata gate caught.
- Solution `content-generation` (106 units): two `_UNSURE`, chunked.
- `story-gate`, `dedup`, `parity`: clean on the sampled inputs.

Acceptance:

- [x] Every surface is advisory (exit 0 without a key; `--advisory` never fails a
  build) and forwards findings to the human/editorial read.
- [x] Parity flags numbers only, never localization or punctuation.

## Phase 3 — primitive + patterns (done)

- [x] `score` triage (`write-article/scripts/triage.mjs`): three `score`
  dimensions (grounding / argument / readiness), each normalized by its top
  level, combined with `WEIGHTS`; `confidence` is a routing factor only — any
  dimension under 0.5 flags the article `review` without touching the composite.
  Advisory: it sorts a reviewer's queue, it never stops.
- [x] `--repeat N` in `lib/prose/eval.mjs`: runs the `noul` harness N times and
  reports each item's modal label and agreement; low agreement (`< 1`) is
  flagged. A measurement, not a loop — no convergence re-runs, ties go to the
  first-seen label.
- [x] Speculative fan-out: a document's questions already travel in one request
  (Phase 1); the only fan-out is the oversized-document chunking, which merges
  back into one report.

Measured on live runs:

- `--repeat 3`: `stable: 16/16; low-agreement: 0` — the checklist is stable
  (the earlier `choice` flapping is gone).
- `triage content-pipeline-case-agency`: composite `0.969`, confidence `0.74`,
  route `ok`.

## Phase 4 — sensor registry + circuit breaker (v1 done; calibration pending)

- [x] `lib/jev/sensors.mjs`: declarative sensors (`unit` / `document` scope),
  `availableSensors`, `sensorQuestions`, `collectSensorFindings`.
- [x] `lib/prose/sensors.mjs`: the shared catalog — two readers, grounding, AEO,
  argument, and the `argument_holds` residue.
- [x] Findings carry `severity` (`fail` / `review` / `advisory`); `makeReport`
  computes `verdict` (`fail` / `review` / `clean`).
- [x] `--gate` in `lib/jev/cli.mjs` maps the verdict to exit `0 / 10 / 20`.
- [x] The article review wires the sensors plus plan context (`query`, `persona`,
  `entity` from the plan row); the skill procedures branch on the verdict.
- [x] Offline tests (`test/jev-sensors.test.mjs`, 11 cases, 0 tokens).

Measured (live, `speech-recognition-domain`):

- G1 corridors drive the verdict: no `_CANDIDATE` and no genre/structure
  mismatch → `verdict: clean`, matching the critic's `PASS`.
- The sensors over-fire on the first calibration: the per-unit ideals
  (`point_first`, `claim_supported`, `section_advances`) return mid probabilities
  on normal prose, so they are **`advisory`** — reported and forwarded to the
  critic, but not gating — until a calibration pass promotes the trustworthy
  signals.

Calibration applied:

- G4 (AEO lead hook) promoted to `review`: on a real draft its low `aeo_problem`
  matched the critic's `AEO_VIOLATION`, so a weak lead now routes to the critic.
- `story-gate` threshold raised to the 0.8 strong-yes bar: it no longer fails a
  render-ready story that already names its entities.

Open — the calibration that lets the remaining sensors gate:

- Drop or violation-frame the per-unit idealistic sensors; keep the
  document-level ones.
- Measure per-sensor precision against critic outcomes on a labeled corpus;
  promote only the sensors that clear a bar to `fail` / `review`.
- Then the `clean` path narrows to `argument_holds` + the light confirm.

## Testing strategy

- **CI = 0 tokens.** `npm run test` runs only deterministic suites; the Jev
  engine is never imported by a `.test.ts` that ships in it. Gate logic is
  covered with `vi.stubGlobal("fetch", fake)`.
- **Live, outside CI:** `npm run test:integration` (config
  `vitest.integration.config.ts`, excluded from `vitest.config.ts`) spawns every
  Jev CLI, asserts exit 0 and writes `.cache/jev-integration/jev-<stamp>.log`.
  Gated on `RUNWARE_API_KEY`: without the key every case is skipped.
- **Response cache:** a real response is recorded once and replayed in tests, so
  there is no repeated token spend.
- Jev is not a CI gate; the critic is.

New architecture tests (cheap, enforce the design invariants):

- [ ] No `@login-ai/jev` / `@login-ai/prose` imports under `src/`.
- [ ] Service modules do not import solution rubrics, and vice versa.
- [ ] The client pins endpoint + model.

## Boundary and module map (SOLID/SoC)

- `lib/jev` — engine, no domain: `noulFinding` / `noulYes`, choice/score
  selectors, the repeat harness, transport, thresholds, report, CLI.
- `lib/prose` — the content domain: filters, parity, dedup rubrics.
- Skills — thin clients: rubrics + CLI wiring. `write-solution` mirrors
  `write-service`; `story-gate` is a skill script.
- SRP per gate; OCP: a new gate is a new rubric module plus the generic
  collector, with no engine edits.

## Rollout / rollback

- Rollout: the dual-harness window → cutover by the metrics → the next phase
  only after `lint` / `tsc` / `test` / live / harness agreement are green.
- Feature flags are the thresholds / rubric config.
- Rollback: restore thresholds and disable the new gate; no data migration (the
  legacy fixtures are kept).

## Transport audit

- grep: no `@typesafe-ai/*` imports, no `api.typesafe.ai` / `docs.typesafe.ai`
  / `jev-latest`; the client test pins endpoint + model.

## Verification

- [ ] Per phase: `npm run lint` · `npx tsc -b` · `npm run test` · live
  `jev-review.mjs` + `lib/prose/eval.mjs` (dual) · `--repeat 5` on G1.
- [ ] Final: `npm run verify`.

## References

- `docs.typesafe.ai`: system-one · primitives · choice · noul · score ·
  confidence · api · model-jaggedness/jev-1.13 · patterns/fan-out ·
  cookbooks/consistency_noul_cookbook.
- `lib/jev/`, `lib/prose/`, `.opencode/skills/write-article/references/jev.md`.
