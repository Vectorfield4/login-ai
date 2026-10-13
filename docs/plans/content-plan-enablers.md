# Content plan enablers — hub/spoke, HoFu, personas, AEO linter, Changelog

Status: planned, not implemented. The calendar itself is now data —
`content/plan/*.json` with the contract in `content/plan/contract.ts` and the
gate in `test/content-plan.test.ts`. This plan adds the four enablers that
need a decision before they touch the contract, plus one new structure.

## 1. Hub-and-spoke (pillar → spoke)

**What.** A pillar is a broad `research` or `industry` hub; a spoke is a
tactical `technical`, `case-study` or `product` piece. A spoke links back to its
pillar; a pillar carries a list of its spokes.

**Contract.** Add to `ContentPlanEntry`: `pillar?: string` (a spoke's hub slug)
and `spokes?: string[]` (a pillar's children). Derive `spokes` from the
`pillar` values so the two cannot drift.

**Rule.** A spoke may not go live while its pillar is unpublished, and every
pillar links to at least one spoke and back. Calendar order follows the graph:
a pillar's `pubDate` precedes its spokes' (`content/plan/index.json` is sorted
by `pubDate`, so a violated graph is visible).

**Verify.** `test/content-plan.test.ts`: every `pillar` resolves to a row in the
same plan; the two directions agree; a pillar precedes its spokes. Article-level
enforcement waits on the frontmatter bridge (see
`docs/plans/article-config-in-articles.md`).

**Cost.** Contract + data + one test block. No runtime code.

## 2. HoFu

**What.** A fourth funnel value: retention/advocacy — changelogs, API upgrades,
ecosystem optimizations for existing accounts. Already in the contract and on
row 6 (`content-pipeline-release-fall`, genre `product`, structure `PSI`,
funnel `HoFu`).

**Axis rule.** Genre and funnel are independent (see `docs/content-plan.md`).
The genre table in `write-article/SKILL.md` describes assembly, not goal; it no
longer claims `product ⇒ выбор/решение`.

**Follow-ups.** `references/spec-template.md` section 2 lists the stage as
`охват / выбор / решение` — add `удержание` (`HoFu`). `primaryGoal` /
`successMetric` stay documentation; nothing enforces them.

## 3. Personas

**What.** Today: `CMO`, `CTO`, `COO-Operations`, `COO-Plant`. Add two business
voices the proposal needs while keeping COO:

- `Head-of-Content` — editorial-loop latency, glossary adherence, style match.
- `Legal-Compliance` — copyright risk, data leakage, consent logging.

**Reassignment (draft).** Rows 2–3 move to `Head-of-Content`; row 8
(`voice-cloning-boundaries`, a draft) to `Legal-Compliance`. COO keeps
training and the plant rows (20–25, 70).

**Contract + data.** Extend `PlanPersona`, add the two JSON files, extend
`PLAN_PERSONA_FILES`, update `docs/content-plan.md` and the test.

**Voice.** A persona lexicon lives in a new
`references/filters/PersonaVoiceTextFilter.md`, wired into `prose-critic`
alongside the other filters. Metric vocabulary per persona:

| Persona | Vocabulary |
| --- | --- |
| CMO | CAC, LTV, velocity, channel conversion |
| Head-of-Content | editorial loop latency, glossary adherence, style match |
| CTO | latency, throughput, token economy, on-prem limits |
| Legal-Compliance | copyright risk, data leakage, consent logging |
| COO | operational errors, automation ROI, throughput, utilization |

## 4. AEO linter

**What.** Require an entity definition inside the first 300 characters, so a
parser can lift it. `references/filters/AeoTextFilter.md` already requires the
answer in the lead hook; this adds the numeric window.

**Split.** Deterministic half: a test that the target query (from the plan row)
appears in the title, `excerpt` or the first 300 characters — needs the query on
the article, so it lands with the frontmatter bridge. Semantic half: the extra
`AEO_VIOLATION` line in `AeoTextFilter.md`.

## 5. Changelog structure

**What.** A sixth structure next to PSI / Breakdown / Comparison / How-To /
Journey: `references/structures/changelog.md` — dated entries, each
what-changed / who-it-affects / rollback. It targets `HoFu` releases that
describe a change to an existing account.

**Scope.** Row 6 keeps `PSI` (the table is authoritative for structure). The
new structure applies on the next HoFu release, once we want changelog shape.

## Rejected — no artifacts

- **Cannibalization linter (embedding overlap > 75%).** No embedding model in a
  static build and no reproducible offline threshold. Replaced, if wanted, by a
  lexical overlap check (title + tags + target query) in
  `test/content-plan.test.ts`.
- **Funnel targets = impressions / scroll depth / CTR / sticky rate.** No
  analytics in the repo; not machine-checkable. `successMetric` stays a declared
  string, never a gate.
- **Interactive sandbox (row 10).** A product feature, not a content rule. Out
  of scope here.

## Acceptance criteria

- [ ] `contract.ts` carries `pillar` / `spokes` and the extended `PlanPersona`.
- [ ] `content/plan/*.json` validates: graph reciprocity, pillar precedes
      spokes, persona files match the enum.
- [ ] `spec-template.md` and `AeoTextFilter.md` name `HoFu` and the 300-char
      window.
- [ ] `PersonaVoiceTextFilter.md` exists and `prose-critic` lists it.
- [ ] `structures/changelog.md` exists.

## References

- Contract: `content/plan/contract.ts`, `docs/content-plan.md`.
- Gate: `test/content-plan.test.ts`.
- Bridge: `docs/plans/article-config-in-articles.md`.
- Proposal source: the Q4 2026 marketing-agent RFC (this conversation).
