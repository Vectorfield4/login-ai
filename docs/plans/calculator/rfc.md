# RFC: calculator add-ons

Status: draft — filled while the technology / stack / software-type enabler lands
Related: `docs/plans/technology-software-type-enabler.md`

## Context

The calculator is a declarative `CalculatorSpec` attached to a service or a
solution. A `bundle` term pulls another service's price floor into the estimate:

```ts
{ kind: "bundle"; ref: "ai-crm-integration"; when: { field: "integration"; equals: "true" } }
```

The site now has four catalogs — capabilities (`technology`), implementation
items (`stack`), models (`llm-model`) and software types (`software-type`) — so a
future calculator can
offer a capability or an integration as an add-on instead of bundling a whole
service. The calculator is out of scope for the enabler; this document collects
the decisions and open questions.

## Taxonomy

| Layer | Entity | Examples | Is it an add-on? |
|---|---|---|---|
| Capability | `technology` | LLM, RAG, computer vision, MLOps | candidate |
| Implementation | `stack` (`kind`, `category`) | TypeScript (language, frontend), PyTorch (library, ML), PostgreSQL (data-store, database), pgvector (extension, database), Kafka (broker, messaging) | usually not |
| Model | `llm-model` | Qwen, Llama | open |
| Business software | `software-type` | ERP, CRM, CMS, task tracker | candidate |
| Offering | `service` | `ai-presentations`, `ai-security-audit`, `video-generation` | candidate |

A `bundle.ref` is always a service. The add-on bridge says whether it becomes a
software type, stays a service that delivers a capability, or is still open.
`ai-presentations` and `ai-security-audit` are services, not technologies.

On `stack`, `kind` is the broad artifact family and `category` is the specific
product area; they never repeat each other. `PostgreSQL` is a `data-store` in
`database`, `pgvector` an `extension` in `database`, `Kafka` a `broker` in
`messaging`.

A model is **not** a technology. It is a trained artifact you deploy; the catalog
stores it in `entities/llm-model` (`qwen`, `llama`). Whether a model can be an
add-on is an open question.

## Current bundle inventory

| `bundle.ref` | What it is | Future target | Status |
|---|---|---|---|
| `ai-crm-integration` | service | software-type `crm` | mapped |
| `ai-erp-integration` | service | software-type `erp` | mapped |
| `ai-presentations` | service | capability `presentations` | mapped |
| `ai-security-audit` | service | capability `ai-security` | mapped |
| `ai-video-training` | service | — | open |
| `computer-vision-systems` | service | capability `computer-vision` | mapped |
| `content-localization` | service | capability `localization` | mapped |
| `deterministic-rag-systems` | service | capability `rag` | mapped |
| `image-generation` | service | capability `image` | mapped |
| `information-monitoring` | service | capability `monitoring` | mapped |
| `mlops-platforms` | service | capability `mlops` | mapped |
| `nlp-systems` | service | capability `nlp` | mapped |
| `recommendation-systems` | service | capability `recommendations` | mapped |
| `seo-aeo` | service | capability `seo` | mapped |
| `sovereign-model-deployment` | service | capability `sovereign-models` | mapped |
| `speech-recognition-systems` | service | capability `speech-recognition` | mapped |
| `video-generation` | service | capability `video` | mapped |
| `voice-audio-generation` | service | capability `audio` | mapped |

The machine-readable copy lives in `test/entities/addonTargets.ts`; the coverage
test fails when a new `bundle.ref` appears without an entry.

## Open questions

1. **Term shape.** Replace `bundle` with `perOption` / `perSelection` keyed by a
   capability or software-type slug, introduce an `addon` term, or keep `bundle`
   with a temporary bridge to the legacy service?
2. **Price ownership.** Rates stay in the spec (project-specific), move into the
   catalog (capability/type price), or resolve through the legacy service while
   both models coexist?
3. **Multiple add-ons.** One `multiselect` field plus `perSelection` instead of a
   set of toggle + bundle pairs?
4. **Capability or service.** Does the calculator offer the capability (`video`)
   or the service that delivers it (`video-generation`)? The bridge currently
   records both.
5. **Models as add-ons.** Can a model (`Qwen`, `Llama`) be sold as an add-on? If
   yes, what is the price source and who owns the deployment?
6. **Libraries and tools as add-ons.** Should a stack item (`PyTorch`,
   `PostgreSQL`) ever be customer-facing, or is it always an implementation
   choice behind a capability?
7. **Training and other service bundles.** Does `ai-video-training` become an
   add-on, stay a service, or disappear from the calculator?
8. **Integration pages.** Keep `ai-*-integration` as landing pages while the
   calculator stops bundling them as services?
9. **Labels.** Resolve option labels from the catalog (`technologies.llm`,
   `softwareTypes.crm.name`) or keep inline i18n keys?
10. **Widget split.** Preliminary: UI/composition in `widgets`, engine in
    `features/calculator`. Not implemented in the enabler.
11. **Config compatibility.** `encodeConfig` and CTA links currently carry field
    ids; switching to add-on slugs changes the query shape.
12. **Migration.** How to move the 18 bundle terms and their specs without
    changing the current estimates.
13. **Testing.** Extend the coverage test to assert that every add-on target has
    a label, a price source and a delivery owner.

## Collected while building the enabler

- Catalogs: 19 capabilities (17 AI, 1 ML, 1 security), 34 stack items across 10
  kinds and 13 product areas, 2 LLM models, 6 software types and 12 vendor
  products.
- 18 `bundle.ref` values: 2 map to software types, 15 stay services with a
  capability, `ai-video-training` is open.
- Services are never stored in `technology` or `stack`; the coverage test
  enforces it. `ai-presentations` and `ai-security-audit` are services.
- Libraries are `stack`, not `technology`: `pytorch`, `scikit-learn`,
  `tensorrt`, `react`, `nextjs`, `tokio`, `axum` and friends.
- Models live in `entities/llm-model`: `qwen`, `llama`.
- Composite labels stay inline: `manufacturers.erp` ("ERP и MES") and
  `content-generation.crm` ("CRM и склад") need a content/UX decision before
  they can map to one type.
- `SoftwareType.products` is display text, not an entity: `1С`, `SAP`,
  `Битрикс24` and `Jira` are products of a type, not types themselves.
- The coverage gate is `test/entities/enabler-coverage.test.ts`; the target map
  is `test/entities/addonTargets.ts`.

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-10-17 | `technology` holds capabilities only | PyTorch is a library, not a technology |
| 2026-10-17 | New `stack` entity with `kind` and `category` | languages, frameworks, libraries, stores and tools share consumers but not semantics |
| 2026-10-17 | `kind` is the broad artifact family, `category` the specific area | prevents `database`/`database` duplication and gives `pgvector` a `database` area without pretending it is a database |
| 2026-10-17 | `stack.kind` and `stack.category` never repeat | the axes answer different questions |
| 2026-10-17 | A model has its own `llm-model` entity | it is a trained artifact, not a technology or a library |
| 2026-10-17 | A `bundle.ref` is a service | `ai-presentations` and `ai-security-audit` are offerings, not technologies |
