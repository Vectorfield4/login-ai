# RFC: calculator add-ons

Status: accepted — add-on coefficients, the Included block and the Add-ons UI are
implemented. Coefficient sign-off is the only question left.
Related: `docs/plans/technology-software-type-enabler.md`

## Context

The calculator is a declarative `CalculatorSpec` attached to a service or a
solution. The old model pulled another service's full price floor:

```ts
{ kind: "bundle"; ref: "ai-crm-integration"; when: { field: "integration"; equals: "true" } }
```

That double-charged the shared stack and base capability. The current model uses
an `addon` term with a catalog coefficient:

```ts
{ kind: "addon"; field: "integration"; ref: "crm" }
```

The site has five catalogs — technologies (`technology`), business capabilities
(`capability`), implementation items (`stack`), models (`llm-model`) and software
types (`software-type`) — plus the offering itself (`service`). The calculator
offers a capability, a technology feature or an integration as an add-on instead
of bundling a whole service. This document records the decisions and the one
remaining open question.

## Taxonomy

| Layer | Entity | Examples | Is it an add-on? |
|---|---|---|---|
| AI family / feature | `technology` | LLM, RAG, text-to-video, object-detection | yes, when priced |
| Business capability | `capability` | content, reputation, monitoring, localization, `seo-reputation`, sovereign models | yes |
| Implementation | `stack` (`kind`, `category`) | TypeScript (language, frontend), PyTorch (library, ML), PostgreSQL (data-store, database), pgvector (extension, database), Kafka (broker, messaging) | no |
| Model | `llm-model` | Qwen, Llama | no |
| Business software | `software-type` | ERP, CRM, CMS, task tracker | yes |
| Offering | `service` | `ai-presentations`, `ai-security-audit`, `video-generation` | no; it is the delivery vehicle |

A `bundle.ref` is always a service. Only `ai-video-training` is still priced as a
bundle: it is a standalone training program, not a coefficient of the video
production base. `ai-presentations` and `ai-security-audit` are services, not
technologies.

On `stack`, `kind` is the broad artifact family and `category` is the specific
product area; they never repeat each other. `PostgreSQL` is a `data-store` in
`database`, `pgvector` an `extension` in `database`, `Kafka` a `broker` in
`messaging`.

A model is **not** an add-on. Picking `Qwen` over `Llama` is an implementation
choice inside the base; a private model contour is the `sovereign-models`
capability. The catalog in `entities/llm-model` (`qwen`, `llama`) is for display,
included blocks and future filtering, not pricing.

## Pricing model (decided)

The base is the reference price and already includes the stack, models and base
capabilities. Add-ons are **coefficients of that base**, not full service prices:

```
base = spec setup + perUnit/perOption/perSelection terms
addon delta = base setup × setupFactor
            + base recurring × recurringFactor
            + base timeline × weeksFactor
```

- Coefficients live in `technology.pricing`, `capability.pricing` and
  `software-type.pricing`; the spec references the catalog slug. The catalog
  stays free of absolute prices. The current values are the fixtures, not a
  second table in this document.
- A multiselect add-on group is one field plus one `addon` term per option; the
  engine sums the active deltas. `perSelection` is not used for add-ons because
  it stores absolute rates, while add-on prices stay catalog coefficients.
- Add-on groups are enabled by a toggle; the group's multiselect is hidden until
  the toggle is on, defaults to one option (`text-to-video`, `text-to-image`,
  `text-to-speech`) and keeps at least one selected (`minSelected: 1`). Add-on
  terms carry a `when` gate so a hidden selection never prices.
- The calculator shows an **Included** block (grouped by offering, technology,
  capability and software type, with checkmarks) and a separate **Add-ons**
  section with the coefficient delta.
- The home filter is family-based: `technologies.video` is the "Video inference"
  family, not a single generation record.
- RAG in `agentic-systems` is always included; its price is tiered by knowledge
  base size.
- MLOps in `computer-vision` is an add-on with a discounted coefficient.
- Monitoring and sentiment are base in `reputation-management`.
- Computer vision is base in `manufacturers`; documents and speech recognition
  are add-ons in `medical-clinics`.
- An integration is priced twice in two different shapes, on purpose:
  `ai-crm-integration`, `ai-erp-integration`, `ai-cms-integration` and
  `ai-task-tracker-integration` are standalone services with their own
  calculator; the same integration inside a solution is a `software-type`
  add-on delta. The landing page sells the integration as the deliverable; the
  solution sells the solution.

## Implementation

- `CalculatorSpec.included` lists the base services, technologies, capabilities
  and software types for the Included block. `CalculatorSpec.terms` accepts
  `addon` terms that reference a `technology`, `capability` or `software-type`
  slug.
- `widgets/cost-calculator` resolves the catalog coefficients and renders the
  Included/Add-ons UI; `features/calculator` stays the pure estimate engine.
- `bundle` remains only for a separate service (`ai-video-training` on the
  `video-generation` page).
- `encodeConfig` keeps the field-id state string for the CTA URL and the
  `mailto:` body. Add-on slugs are not duplicated there: they derive from the
  selected spec. A future CRM form should receive `kind`, `slug` and `config`
  together.
- A `software-types` field resolves the `software-type` catalog inside the
  widget: each card carries its icon, vendor products or a one-line description,
  and the block has an info tooltip. Selecting a type activates its `addon` term.
- Integration controls are priced per connected system; action limits add a fixed
  first-year fee. This is not the `ai-security-audit` service: that is a separate
  full audit engagement with its own page and calculator.
- A field with `showOnResults` repeats its chosen value in the result panel; the
  RAG size is the first user.
- Support is a segmented field injected by the widget for every spec by default.
  The first year costs 15% of the setup for `priority` and 30% for `dedicated`;
  the selected level's deliverables are described under the control. A one-time
  offer sets `support: false` instead of repeating the field in its fixture.

## Current add-on inventory

| Spec | Add-ons |
|---|---|
| `agentic-systems` | `crm`, `erp`, `ai-security` |
| `app-development-systems` | `ai-security`, `sovereign-models` |
| `computer-vision` | `mlops`, `ai-security` |
| `content-generation` (solution) | `crm`, `text-to-video`, `image-to-video`, `video-to-video`, `text-to-image`, `image-to-image`, `inpainting`, `text-to-speech`, `voice-cloning`, `music-generation`, `localization`, `presentations` |
| `content-generation` (service) | `text-to-video`, `image-to-video`, `video-to-video` |
| `customer-experience` | `crm`, `monitoring` |
| `manufacturers` | `erp`, `crm` |
| `medical-clinics` | `computer-vision`, `speech-recognition`, `crm`, `ai-security` |
| `reputation-management` | `seo-reputation` |
| `video-generation` | bundle `ai-video-training` |

The coverage test fails when an `addon` ref has no catalog pricing or an
`included` item does not resolve.

## Resolved

- **Term shape:** `addon` term with a catalog slug.
- **Price ownership:** coefficients live in the catalog; the spec references
  them. Absolute prices stay out of the catalog.
- **Capability or service:** the add-on target is a technology, capability or
  software type; the service is the delivery vehicle, not the priced unit.
- **Multiple add-ons:** one multiselect plus one `addon` term per option. The
  engine sums active deltas; `perSelection` stays for inline absolute one-off
  work.
- **Models:** never add-ons. The model choice is implementation; a private
  contour is the `sovereign-models` capability.
- **Training:** `ai-video-training` stays a service bundle. A coefficient would
  underprice a standalone program with its own deliverable.
- **Integration pages:** keep the standalone services and their calculators.
  Inside a solution the same integration is priced as a delta, not a second
  full service.
- **Composite labels:** renamed to plain `ERP` and `CRM`. `mes` and `wms`
  remain catalog types and can become explicit add-ons when the pages sell them;
  a label must not promise scope the coefficient does not price.
- **Config compatibility:** `encodeConfig` keeps field ids and values. Add-on
  slugs are derived from the spec, not written into the URL.
- **Libraries and tools:** never add-ons.
- **Widget split:** `widgets/cost-calculator` owns the UI and resolvers;
  `features/calculator` owns the engine.
- **Migration:** the 18 bundle terms were replaced; only `ai-video-training`
  remains a service bundle.
- **Testing:** the coverage test checks add-on pricing and included references.

## Remaining questions

1. **Coefficient tuning.** The starting factors live in the catalog fixtures and
   are a shape, not a price decision. Product must confirm them before the
   numbers are treated as final. `weeksFactor` is defined in the contract but no
   catalog entry uses it yet; decide whether timeline should scale with add-ons.

## Collected while building the enabler

- Catalogs: 39 technology records — 5 broad AI families plus 34 granular
  features (`text-to-video`, `image-to-video`, `video-to-video`, `inpainting`,
  `text-to-speech`, `object-detection`, …) — and 10 business capabilities
  (`content`, `reputation`, `monitoring`, `localization`, `seo-reputation`,
  `sovereign-models`, …). A capability is the discrete add-on scope, not the
  full-cycle service: `seo-reputation` is the reputation-SEO add-on, while
  `seo-aeo` remains the full service. `video`, `image` and `audio` are family
  keys, not records. Also 34 stack items across 10 kinds and 13 product areas,
  2 LLM models, 6 software types and 12 vendor products.
- The 18 `bundle.ref` values were replaced by `addon` terms; only
  `ai-video-training` remains a service bundle.
- Services are never stored in `technology` or `stack`; the coverage test
  enforces it. `ai-presentations` and `ai-security-audit` are services.
- Libraries are `stack`, not `technology`: `pytorch`, `scikit-learn`,
  `tensorrt`, `react`, `nextjs`, `tokio`, `axum` and friends.
- Models live in `entities/llm-model`: `qwen`, `llama`.
- `SoftwareType.products` is display text, not an entity: `1С`, `SAP`,
  `Битрикс24` and `Jira` are products of a type, not types themselves.
- The coverage gate is `test/entities/enabler-coverage.test.ts`.

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-10-17 | `technology` holds AI families and features only | PyTorch is a library, not a technology |
| 2026-10-17 | New `stack` entity with `kind` and `category` | languages, frameworks, libraries, stores and tools share consumers but not semantics |
| 2026-10-17 | `kind` is the broad artifact family, `category` the specific area | prevents `database`/`database` duplication and gives `pgvector` a `database` area without pretending it is a database |
| 2026-10-17 | `stack.kind` and `stack.category` never repeat | the axes answer different questions |
| 2026-10-17 | A model has its own `llm-model` entity | it is a trained artifact, not a technology or a library |
| 2026-10-17 | A `bundle.ref` is a service | `ai-presentations` and `ai-security-audit` are offerings, not technologies |
| 2026-10-17 | Add-ons are coefficients of the base | the client pays for the solution, not the shared stack/base capability |
| 2026-10-17 | `bundle` retired for capabilities/integrations | full service prices double-charge the stack and core capability |
| 2026-10-17 | RAG is included and tiered in agentic systems | it is always part of the solution; only the knowledge base size scales |
| 2026-10-17 | MLOps is a discounted add-on in CV | deployment support is optional there |
| 2026-10-17 | Monitoring and sentiment are base in reputation | they define the solution, not an extra |
| 2026-10-17 | CV is base in manufacturers; documents/speech are add-ons in clinics | the production vision line is core; clinic document/speech recognition is optional |
| 2026-10-17 | `addon` term + catalog `pricing` implemented | coefficients of the base, not full service prices |
| 2026-10-17 | `included` block groups every included kind | the client sees what the base already covers |
| 2026-10-17 | Calculator UI moved to `widgets/cost-calculator` | the engine stays pure in `features/calculator` |
| 2026-10-17 | Models and services are never add-ons | model choice is implementation; the service is the delivery vehicle |
| 2026-10-17 | One multiselect + one `addon` term per option | the engine sums deltas; coefficients stay in the catalog |
| 2026-10-17 | Training stays a service bundle | standalone program, not a coefficient |
| 2026-10-17 | Integration pages keep their own calculators | the standalone service sells a different deliverable |
| 2026-10-17 | Composite labels renamed to `ERP` / `CRM` | the coefficient prices one type, so the label must not promise MES or WMS |
| 2026-10-17 | Config stays a field-state string | add-on refs derive from the spec; the URL carries no duplicate slugs |
| 2026-10-18 | Integrations use a `software-types` field | the catalog supplies icons, products and descriptions; the label stops hiding which systems are meant |
| 2026-10-18 | `showOnResults` mirrors tiers in the result | a chosen RAG size changes the price, so it belongs next to the price |
| 2026-10-18 | Support is first-year 15% / 30% of setup | one-off add-on prices were arbitrary; the levels now state what the client gets |
| 2026-10-18 | The widget injects support, specs opt out | three identical options in 33 fixtures were noise; one-time offers set `support: false` |
| 2026-10-18 | Integration controls are not the security-audit service | the add-on checks access per connected system; the full `ai-security-audit` engagement stays a service |
