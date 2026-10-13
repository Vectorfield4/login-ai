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
└── coo-plant.json
```

Each persona file is `{ "persona": "...", "entries": [ ... ] }`. An entry is one
calendar slot: `number`, `pubDate`, `slug`, `genre`, `structure`, `funnel`,
`persona`, `query`, `links`, `languages`, and the four operational fields
`primaryGoal`, `linkMatrix`, `ctaRoute`, `successMetric`.

## Two axes

`genre` and `funnel` are independent.

- Genre is the assembly format: the structure and volume the write-article references enforce. Eight values, same as `NewsCategory`.
- Funnel is the business goal: `ToFu` reach, `MoFu` consideration, `BoFu` conversion, `HoFu` retention. A release stays `product` in genre and `PSI` in structure while its funnel is `HoFu`, not `BoFu`.

`primaryGoal` and `successMetric` restate the funnel for humans. Nothing enforces
them; the build has no analytics.

## Change it

Edit the persona file, keep `index.json` in sync, and run `npm run test`. A date
is a Tuesday or Thursday, two slots a week. `test/content-plan.test.ts` checks
the enums, the unique slugs, the weekday rule and the index parity.

## Planned

Hub and spoke links, the persona set beyond these four, the AEO linter and a
`Changelog` structure are planned. See `docs/plans/content-plan-enablers.md`.
