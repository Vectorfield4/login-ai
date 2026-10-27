# Content Contract

One contract for the content of a service and a solution: the promise block,
fixture fields, i18n keys, renderers, gates and JSON-LD. Code that disagrees
with this file is wrong, and so is a page that ships while skipping a gate here.

## 1. Purpose and when to read

Read this before you:

- add a service or a solution;
- write or edit `precedents`;
- move a fixture out of `draft`;
- change a section renderer or a content gate.

Companion docs: `prose-quality.md` (copy rules and volume), `i18n.md`
(dictionary layout), `page-composition.md` (section order on the page),
`../images.md` (backdrops), `src/entities/AGENTS.md` (layer restrictions).

## 2. The one promise block

Service and Solution have exactly one promise field:

```ts
precedents?: PrecedentItem[];
```

`proofItems` and `outcomes` are gone. They were two blocks telling one story:
proof cards with a metric, and a separate "result in numbers" grid. A precedent
merges them.

| Field | i18n key | Rendered | Holds |
|---|---|---|---|
| `title` | yes | no | Stable key: React key and dictionary key. Never shown. |
| `text` | yes | yes | One typical result in past tense, 10+ words. |
| `metricValue` | yes | yes | The number, range or short fact: `18 из 50`, `+30%`, `6 недель`. |
| `metricLabel` | yes | yes | What the number measures, visible next to it. |

Definition: a precedent is a typical result the delivery repeats, stated in the
past tense, with the subject "we" or "the project". It is an average promise
backed by real delivery, not a best case, a forecast or a guarantee.

Grammar:

- Past tense. "Сократили", "the project cut". Never "сократим" or "will cut".
- One result per item. The process that produced it belongs to `mechanism`,
  the included work to `deliverables`.
- The metric states the same result as the text. `metricLabel` names the
  measure, not the client.
- Past work, no attribution: industry, scale and range instead of a name.
- No source taxonomy. There is no `basis`, `source` or `evidenceType` field; the
  result and its metric are the evidence the block carries.
- 1-2 cards are valid. 3+ is normal. The grid wraps; do not cap the count.

| Good | Why |
|---|---|
| "Сократили обработку заявки с 12 минут до 40 секунд" / `40 сек` / `время обработки` | one result, past tense, one number, label names the measure |
| "Проект обработал 3 200 заявок за месяц без роста штата" / `3 200` / `заявок в месяц` | typical scale, subject "the project", no client name |
| "Свели долю ручных проверок документов к 8%" / `8%` / `ручных проверок` | average delivery, not a best case |

| Bad | Why |
|---|---|
| "Клиент X ускорил поддержку в 4 раза" | client name; the model has no client field and does not want one |
| "Под NDA: крупный ритейлер, рост 30%" | "NDA" is not evidence; it hides the result instead of stating it |
| "Гарантируем окупаемость за 3 месяца" | guarantee language; an average promise, not a contract |
| "В 2027 году выйдем на 50 регионов" | forecast; the promise block is past tense only |
| "Скорость, качество, надёжность" | no number, no result |
| Two cards retelling one story with different numbers | inflates the block and breaks trust |

UI keeps the former proof look: `PrecedentsSection` wraps `PrecedentBlock` in
`BlockSection`. The heading stays "Что вы получаете" / "What you get". The card
shows `metricValue`, `metricLabel` and `text`; `title` only feeds `key`.

## 3. Service schema

`Service` lives in `src/entities/service/model/services.ts`.

| Group | Field | Required | Rule |
|---|---|---|---|
| Identity | `slug` | yes | unique across services |
| Identity | `group` | yes | one `ServiceGroup`; drives menu, group pages, home picker |
| Identity | `navTitle`, `title`, `tagline`, `description` | yes | i18n keys under `services.<slug>.*` |
| Identity | `icon` | yes | key of `ENTITY_ICONS` in `src/shared/data/iconCatalog.ts` |
| Catalog | `features` | yes | 1+ in the type; 4+ for a published page |
| Catalog | `ctaBanner` | yes in practice | `title`, `text`, `buttonLabel`; type optional, smoke test requires it |
| Promise | `precedents` | no | the only promise block; 3+ in practice, 1-2 allowed |
| Blocks | `processSteps` | no | 4+ for a published page, each with `processType` |
| Blocks | `fitItems` | no | 2+, at least one `positive: false` |
| Blocks | `mechanism` | no | `diagram` slug when the group rule asks for one |
| Blocks | `scope` | no | `title` + optional `text` |
| Blocks | `deliverables` | no | `title` + `text`; second half of the result block |
| Blocks | `tradeoffs` | no | `title` + `text`; the honest limitation |
| Blocks | `faqItems` | no | 4+ for a published page |
| Blocks | `sections` | no | `title` + `items[]` |
| Blocks | `techStack` | no | groups with `subtitle`, `description`, `technologies[]` |
| Commercial | `price` | yes | `amount` > 0, unit from `project`, `program`, `month`, `language` |
| Commercial | `calculator` | no | valid `CalculatorSpec` with a `setup` term |
| Media | `examples`, `archvizExamples` | no | build-time portfolios, resolved by the app layer |
| Links | `relevants` | no | 3+ over 2+ types for a published page; targets must exist |
| Publication | `draft` | no | `true` keeps the page out of routes, menu and sitemap |

Groups: `design`, `agentic`, `conversational`, `data`, `models`, `ml`,
`ai-infra`, `security`, `engineering`, `ai-integrations`, `content`,
`web-growth`, `strategy`, `governance`, `training`. Each group belongs to one
direction: `agents`, `data-models`, `infra-security`, `engineering`,
`content-growth`, `strategy-governance`.

## 4. Solution schema differences

`Solution` lives in `src/entities/solution/model/solutions.ts`. Same promise
block, different package.

| Concern | Service | Solution |
|---|---|---|
| Promise block | `precedents` | `precedents`; at least 1 is a hard rule |
| Catalog placement | `group` + `icon` | none; solutions are not in the service menu |
| `features` | required | optional in the type, 4+ for a published page |
| `sections` | `ContentSection` (`title` + `items[]`) | `SolutionSection` (`title` + `items[]`), 2+ for a published page |
| `processSteps`, `fitItems`, `faqItems`, `ctaBanner` | optional, gated | optional, gated the same way |
| `price` | one threshold | required; equals the Implementation package |
| `packages` | absent | exactly 3: Pilot, Implementation, Platform |
| `audiences` | absent | required, keys under `audiences.*` |
| `tags` | absent | required, keys under `technologies.*` or `capabilities.*` |
| `showcase` | absent | optional; feeds `VideoShowcase` and `VideoObject` |
| `technologies`, `businessCategories`, `referencesNote` | absent | optional page blocks |
| `image` | backdrop only | optional inline image; the raster backdrop still comes from the manifest |
| `techStack` | optional | absent |
| `mechanism`, `scope`, `deliverables`, `tradeoffs` | optional | absent |
| `examples`, `archvizExamples` | optional | absent |
| `calculator`, `relevants` | optional | optional |

A solution packages services. It never repeats a service process, deliverables
or price; it links to the services instead.

## 5. Block catalog

| Block | Type | Field | Item fields | i18n key pattern | Renderer | Page |
|---|---|---|---|---|---|---|
| Hero | - | `navTitle`, `title`, `description`, `tagline` | - | `<ns>.<slug>.title` etc. | `ImageHero`, fallback hero | both |
| Features | `ServiceFeature`, `SolutionFeature` | `features` | `title`, `text` | `<ns>.<slug>.features.<i>.title\|text` | `FeatureCard` grid | both |
| Process | `ProcessItem` | `processSteps` | `title`, `text`, `processType` | `<ns>.<slug>.processSteps.<i>.title\|text` | `ProcessHorizontal` | both |
| Fit | `FitItem` | `fitItems` | `title`, `text`, `positive` | `<ns>.<slug>.fitItems.<i>.title\|text` | `FitSection` | both |
| Precedents | `PrecedentItem` | `precedents` | `title`, `text`, `metricValue`, `metricLabel` | `<ns>.<slug>.precedents.<i>.title\|text\|metricValue\|metricLabel` | `PrecedentsSection` → `PrecedentBlock` | both |
| Deliverables | `DeliverableItem` | `deliverables` | `title`, `text` | `<ns>.<slug>.deliverables.<i>.title\|text` | `DeliverablesSection` | service |
| Scope | `ScopeItem` | `scope` | `title`, `text?` | `<ns>.<slug>.scope.<i>.title\|text` | `ScopeSection` | service |
| Mechanism | `MechanismItem` | `mechanism` | `title`, `text`, `diagram?` | `<ns>.<slug>.mechanism.<i>.title\|text` | `MechanismSection` | service |
| Tradeoffs | `TradeoffItem` | `tradeoffs` | `title`, `text` | `<ns>.<slug>.tradeoffs.<i>.title\|text` | `TradeoffsSection` | service |
| FAQ | `FaqItem` | `faqItems` | `question`, `answer` | `<ns>.<slug>.faqItems.<i>.question\|answer` | `FaqSection` | both |
| Sections | `ContentSection`, `SolutionSection` | `sections` | `title`, `items[]` | `<ns>.<slug>.sections.<i>.title`, `items.<j>` | `SectionsBlock` | both |
| Tech stack | `TechGroup` | `techStack` | group `subtitle`, `description`, `technologies[]` | `<ns>.<slug>.techStack.<g>.subtitle\|description`, `technologies.<t>.glossary` | `TechStackSection` (island) | service |
| Project examples | `ExamplesBlock` | `examples`, `archvizExamples` | build-time asset refs | - | `ProjectExamplesSection` | service |
| Price | `PriceItem` | `price` | `amount`, `unit` | shared `pricing.*` | `PricingSection` | both |
| Packages | `PricePackage` | `packages` | `name`, `amount` | `pricing.packages.*` | `PricingSection` | solution |
| Calculator | `CalculatorSpec` | `calculator` | `fields`, `terms` | shared `calculator.*` | `CostCalculator` (island) | both |
| Ecosystem | `EntityRef` | `relevants` | `type`, `slug`, `noteKey?` | `relevants.<key>` | `ServiceEcosystemSection`, `SolutionEcosystemSection` | both |
| CTA | `CtaItem` | `ctaBanner` | `title`, `text`, `buttonLabel` | `<ns>.<slug>.ctaBanner.*` | `CtaBlock` | both |
| Media | `SolutionShowcase` | `showcase` | video items | `showcase.*` | `VideoShowcase` | solution |

`<ns>` is `services` or `solutions`. Section heads are page-level keys, not
entity keys: the service page passes `servicePage.*`, the solution page
`solutionPage.*`. Precedents use the existing "Что вы получаете" / "What you
get" heading.

## 6. i18n layout and RU/EN parity

| What | Path |
|---|---|
| Service fixture | `src/entities/service/model/fixtures/<slug>.ts` |
| Solution fixture | `src/entities/solution/model/fixtures/<slug>.ts` |
| Service copy | `src/entities/service/i18n/{ru,en}/<slug>.ts` |
| Solution copy | `src/entities/solution/i18n/{ru,en}/<slug>.ts` |
| Registration | `src/entities/<slice>/i18n/index.ts` (`<plural>Ru` / `<plural>En`) |
| Composed dictionary | `src/shared/i18n/dict.ts` |

Key tree for a service; a solution uses the same shape under `solutions` and
drops `techStack`:

```
services.<slug>.ctaBanner.title | text | buttonLabel
services.<slug>.navTitle | title | tagline | description
services.<slug>.features.<i>.title | text
services.<slug>.processSteps.<i>.title | text
services.<slug>.fitItems.<i>.title | text
services.<slug>.precedents.<i>.title | text | metricValue | metricLabel
services.<slug>.deliverables.<i>.title | text
services.<slug>.scope.<i>.title | text
services.<slug>.mechanism.<i>.title | text
services.<slug>.tradeoffs.<i>.title | text
services.<slug>.faqItems.<i>.question | answer
services.<slug>.sections.<i>.title | items.<j>
services.<slug>.techStack.<g>.subtitle | description
services.<slug>.techStack.<g>.technologies.<t>.glossary
```

Rules:

- Text fields hold keys, not copy. Fixtures carry `services.<slug>.*`; copy
  lives in the RU and EN files.
- RU first, then EN with the same key set. `test/astro-content.test.ts` compares
  RU/EN key paths per namespace; a missing EN key fails the suite.
- All four precedent fields need a key in both languages. `title` is a key even
  though nothing renders it: it owns the React key and the dictionary entry.
- Volume: service RU >= 700 words, solution RU >= 1000, EN >= 90% of RU
  (`prose-quality.md`).

## 7. Generation flow

| # | Step | Artifact | Done when |
|---|---|---|---|
| 1 | Brief | none | slug, query, audience, 5 blocks (tradeoffs, precedents, mechanism, scope, deliverables), 1-3 precedent drafts |
| 2 | Queue | `content/generation-queue.json` | record with `kind: "service"` / `"solution"`, `slug`, `title`, keywords, `visual_config` |
| 3 | Fixture | `src/entities/service/model/fixtures/<slug>.ts`, registered in `model/fixtures.ts` | `draft: true`, keys for every block |
| 4 | RU | `src/entities/service/i18n/ru/<slug>.ts` | full copy, precedents in past tense |
| 5 | EN | `src/entities/service/i18n/en/<slug>.ts`, both registered in `i18n/index.ts` | same key set as RU |
| 6 | Price and calculator | fixture `price` + `calculator`, labels in `src/shared/i18n/{ru,en}/calculator.ts` | `price.amount` > 0, `setup` term present |
| 7 | Relevants | fixture `relevants`, notes in `src/shared/i18n/{ru,en}/relevants.ts` | 3+ over 2+ types, every target published |
| 8 | Cover | `assets/images/services/<slug>.png` via `generate-image-cover` | PNG >= 1200x630, no legible text; queue record removed |
| 9 | Audit | `write-service` skill `scripts/audit.mjs` | no blocker |
| 10 | Critic | `service-critic`; Jev review advisory | `VERDICT: PASS`, no open finding |
| 11 | Publish | `write-service` skill `scripts/publish.mjs` | `draft` removed, queue record dropped |
| 12 | Verify | - | `npm run lint`, `npm run test`, `npm run verify` green |

A solution follows the same path with `src/entities/solution/*`,
`assets/images/solutions/<slug>.png` and the solution gate.

## 8. Gate matrix

Severity: hard means the suite fails; warn prints and does not fail.

| Rule | Test | Severity |
|---|---|---|
| Slug unique, icon present, `features` non-empty | `src/entities/service/model/fixtures.test.ts` | hard |
| Precedent keys match `precedents.<i>.title\|text\|metricValue\|metricLabel` | `src/entities/service/model/fixtures.test.ts`; same rule in the solution fixture test | hard |
| `ctaBanner` keys exist in RU and EN | `test/services/services-smoke.test.ts` | hard |
| `price` > 0 with a known unit | `test/pricing.test.ts` | hard |
| Calculator spec valid, `setup` present, labels resolve | `test/services/services-smoke.test.ts`, `test/services/calculators.test.ts` | hard |
| Published service has a backdrop | `test/services/awaiting-generation.test.ts` | hard |
| RU >= 700 words, EN >= 90% | `test/services/prose-quality.test.ts` | hard for publishable |
| Precedent `text` >= 10 words | `test/services/prose-quality.test.ts` | hard |
| No negation or contrast in `tradeoffs`, `mechanism`, `deliverables` | `test/services/prose-quality.test.ts` | hard |
| Title/text share a root | `test/services/prose-quality.test.ts`, `LENGTH_COLLECTIONS` | hard; precedents are not in this list, because their title is a key and their text is a narrative |
| Mechanism `text` >= 20 words | `test/services/prose-quality.test.ts` | hard |
| SPECIALTY: 2+ of `tradeoffs`, `precedents`, `mechanism`, `scope`, `deliverables` | `test/services/service-richness.test.ts` | hard for published |
| Result block: `precedents` + `deliverables` >= 1 | `test/services/service-richness.test.ts` | hard for published |
| `block>=3items` for specialty blocks | `test/services/service-richness.test.ts` | hard; `precedents` exempt, 1-2 allowed |
| `precedents` >= 1 | `test/services/service-richness.test.ts` | warn for services |
| `precedents` >= 1 | `test/solution-richness.test.ts` | hard for solutions |
| Solution package: features 4, process 4, fit 2 + negative, faq 4, sections 2, audiences 1, tags 1, cta | `test/solution-richness.test.ts` | hard for published |
| Solution RU >= 1000, EN >= 90% | `test/prose-quality.test.ts` | hard for published |
| RU/EN key parity | `test/astro-content.test.ts` | hard |
| Diagram slug resolves in RU and EN | `test/services/service-richness.test.ts`, `test/services/diagram-quality.test.ts` | hard |

Drafts report warnings only; a published page clears every hard rule.

## 9. JSON-LD

Built in `src/shared/data/seo.ts` by `resolveSchemaOrg`.

| Node | Source | Entity |
|---|---|---|
| `Service` | `title`, `description`, `url`, `image` | service |
| `Product` | `title`, `description`, `navTitle`, `url`, `image` | solution |
| `AggregateOffer` | `price.amount`; solution packages give the range | both |
| `FAQPage` / `Question` / `Answer` | `faqItems` | both |
| `HowTo` / `HowToStep` | `processSteps` plus the page process title | both |
| `VideoObject` | `showcase` item with `videoUrl` | solution |
| `BreadcrumbList`, `WebPage`, `Organization`, `WebSite` | route and site data | both |

Never generated from content: `precedents`, `tradeoffs`, `deliverables`,
`scope`, `mechanism`, `sections`, `audiences`, `tags`. Do not map a precedent
to `review`, `aggregateRating`, `award` or `subjectOf`: the promise block is
editorial, not structured data, and a review node would turn an average result
into a claimed rating.

## 10. File touch list for a new service

| # | File | Change |
|---|---|---|
| 1 | `content/generation-queue.json` | add the slug record while the backdrop is missing |
| 2 | `src/entities/service/model/fixtures/<slug>.ts` | new `Service` fixture, `draft: true` |
| 3 | `src/entities/service/model/fixtures.ts` | import and add to `services`; position = menu order |
| 4 | `src/entities/service/i18n/ru/<slug>.ts` | `<name>Ru` copy |
| 5 | `src/entities/service/i18n/en/<slug>.ts` | `<name>En` copy, same keys |
| 6 | `src/entities/service/i18n/index.ts` | register both in `servicesRu` / `servicesEn` |
| 7 | `src/shared/i18n/{ru,en}/calculator.ts` | only for new calculator labels |
| 8 | `src/shared/i18n/{ru,en}/relevants.ts` | only for a new `relevants[].noteKey` |
| 9 | `assets/images/services/<slug>.png` | cover, named by slug |
| 10 | `src/entities/service/model/fixtures/<slug>.ts` | remove `draft: true` in the publish step |

No route, menu, sitemap, SEO or test file changes: getters and gates read the
fixture by slug.

## 11. Anti-patterns

| Pattern | Why it fails | Instead |
|---|---|---|
| Client name, logo or quote in a precedent | the model has no client field; consent does not scale | industry, scale and range, subject "the project" |
| "Под NDA" / "under NDA" as evidence | hides the result, adds nothing verifiable | state the typical result and the metric |
| "Гарантируем", "guarantee", "100%" | a promise block is an average, not a contract | "в среднем", "на проекте", the measured range |
| One story told twice with different numbers | inflates the block, breaks trust | one story, one card; update the number in place |
| Best case presented as typical | misleads the buyer | median delivery across projects |
| Future tense or forecast | the block is past delivery | move it to `deliverables` or `tradeoffs` |
| Process or feature text in `text` | duplicates `mechanism` and `features` | one result with one number |
| Number without a label | reader cannot tell what was measured | `metricLabel` names the measure |
| `proofItems` or `outcomes` in a fixture | removed fields; type and tests reject them | `precedents` |
| A `basis`, `source` or `evidenceType` field | the block has no source taxonomy: a precedent is a result, not a citation | industry and metric in `text` and `metricLabel` |
| Precedent without a metric | the card loses its anchor | `metricValue` + `metricLabel` in the same card |
