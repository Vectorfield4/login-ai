# Content plan

The publishing calendar as data. This folder is the source of truth for the
schedule: `contract.ts` holds the shared types, and `index.json` lists every row
by `pubDate`.

## Layout

```
content/plan/
├── contract.ts            # shared types + enum lists
├── index.json             # every row, sorted by pubDate
├── cmo.json               # one file per buyer persona
├── cto.json
├── coo-operations.json
├── coo-plant.json
├── head-of-content.json
└── legal-compliance.json
```

Each persona file is `{ "persona": "...", "entries": [ ... ] }`. An entry is one
calendar slot: `number`, `pubDate`, `slug`, `genre`, `structure`, `funnel`,
`persona`, `query`, `links`, `languages`, and the four operational fields
`primaryGoal`, `linkMatrix`, `ctaRoute`, `successMetric`. A spoke adds `pillar`
and a pillar adds `spokes`.

## Two axes

`genre` and `funnel` are independent.

- Genre is the assembly format: the structure and volume the write-article references enforce. Eight values, same as `NewsCategory`.
- Funnel is the business goal: `ToFu` reach, `MoFu` consideration, `BoFu` conversion, `HoFu` retention. A release stays `product` in genre and `PSI` in structure while its funnel is `HoFu`, not `BoFu`.

`primaryGoal` and `successMetric` restate the funnel for humans. Nothing enforces
them; the build has no analytics.

## Hub and spoke

A pillar is a broad `research` or `industry` hub; a spoke is a tactical
`technical`, `case-study` or `product` piece. A spoke names its hub in `pillar`;
a hub lists its children in `spokes`. The two are kept in step by the test:
`spokes` must equal the rows whose `pillar` points at the hub, and a hub's
`pubDate` precedes its spokes'. An article obeys the same shape through its
frontmatter bridge (`src/content.config.ts`, `test/article-plan.test.ts`).

## Personas

`PlanPersona` carries six buyers: `CMO`, `CTO`, `COO-Operations`, `COO-Plant`,
`Head-of-Content` (editorial loop latency, glossary adherence, style match) and
`Legal-Compliance` (copyright risk, data leakage, consent logging). An article
argues in its row persona's metrics — `write-article/references/filters/PersonaVoiceTextFilter.md`.

## Change it

Edit the persona file, keep `index.json` in sync, and run `npm run test`. A date
is a Tuesday or Thursday, two slots a week. `test/content-plan.test.ts` checks
the enums, the unique slugs, the weekday rule, the hub/spoke graph and the index
parity.
