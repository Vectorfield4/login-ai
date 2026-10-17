# Technology, stack, model & software-type enabler

Status: done — catalog split, i18n, coverage and docs landed; `npm run lint`,
`npm run test` and `npm run verify` pass.

## Goal

Extract the domain catalogs the site already uses, so the calculator can later
treat capabilities, technologies and integrations as add-ons instead of bundling
whole services. The calculator itself is out of scope: its add-on model is
collected in `docs/plans/calculator/rfc.md` while this enabler lands.

## Taxonomy

Four catalogs and one existing entity keep the layers apart:

- `entities/technology` — a **capability**: what the company can do (`LLM`,
  `RAG`, `компьютерное зрение`). Not a library and not a service.
- `entities/stack` — an **implementation item** with two explicit axes:
  `kind` (language, runtime, framework, library, extension, inference,
  data-store, broker, platform, api) and `category` (frontend, backend, mobile,
  database, cache, search, messaging, storage, ml, ai, infra, security,
  observability). `TypeScript`, `PyTorch`, `PostgreSQL`, `Kafka`.
- `entities/llm-model` — a **trained artifact**: `Qwen`, `Llama`. A model is not
  a technology and not a library; it is weights you deploy.
- `entities/software-type` — a **business software type** (ERP, CRM, CMS, MES,
  WMS, task tracker) with vendor products (`1С`, `SAP`, `Битрикс24`, `Jira`).
- `entities/service` — an **offering** (`ai-presentations`, `ai-security-audit`,
  `video-generation`), which stays a service until the calculator RFC says
  otherwise.

## Decisions

- Consumers: calculator (later), solution filters, service pages.
- `technology.category` holds capability buckets (`ai`, `ml`, `security`).
  On `stack`, `kind` is the broad artifact family and `category` is the specific
  product area; the two never repeat each other. `PostgreSQL` is a `data-store`
  in `database`, `pgvector` an `extension` in `database`, `Kafka` a `broker` in
  `messaging`, `PyTorch` a `library` in `ml`. Presentation groups stay with the
  consumer.
- A `bundle.ref` is always a service. The add-on bridge says whether it is
  replaced by a software type, stays a service (optionally delivering a
  capability), or is still open.
- The calculator is frozen: no `CalculatorSpec`, UI or `widgets` changes.
- Existing `technologies.*` i18n keys keep working; ownership moves to the
  capability entity, copy does not change.

## Checklist

- [x] Create `entities/technology` for capabilities (types, fixtures, getters, i18n, index).
- [x] Create `entities/stack` with the expanded `kind` / `category` axes.
- [x] Create `entities/llm-model` for trained models (`Qwen`, `Llama`).
- [x] Create `entities/software-type` (types, fixtures, getters, i18n, index).
- [x] Move `technologies.*` i18n namespace into `entities/technology`.
- [x] Register the dictionaries in `shared/i18n/dict.ts`.
- [x] Update i18n parity namespaces in `test/astro-content.test.ts`.
- [x] Add the add-on target map and coverage tests (18 `bundle.ref`).
- [x] Fill the calculator RFC inventory, taxonomy and open questions.
- [x] Update `docs/frontend/feature-slice-design.md` and `AGENTS.md`.
- [x] Run `npm run lint`, `npm run test`, `npm run verify`.

## Coverage gates

- Every `TechItem.name` in `service.techStack` resolves to a stack item, a
  software-type product or an LLM model.
- Every `ModuleProvider.name` resolves to a stack item.
- Every `solutions[].tags` value resolves to a capability.
- Every `bundle.ref` in a calculator spec has an entry in the add-on target map;
  a `service` target exists as a service, a `software-type` target exists as a
  type.
- Service slugs never appear in `technology`, `stack` or `llm-model`.
- Slugs are unique across `technology`, `stack`, `llm-model` and
  `software-type`.
- `stack.kind` and `stack.category` never repeat each other.
- Every capability has exactly one of `name` / `nameKey`.
- RU/EN dictionaries have the same keys.

## Out of scope

- `features/calculator`, `widgets/*`, `CalculatorSpec`.
- Migrating `solutions[].tags` to slugs, replacing `TechItem.name` with a stack
  slug, moving glossary prose.
- Relations between catalogs, UI cards/chips.
- Any add-on implementation: see `docs/plans/calculator/rfc.md`.

## Outcome

- `entities/technology`: 19 capabilities (17 AI, 1 ML, 1 security).
- `entities/stack`: 34 records across 10 kinds and 13 product areas — 6
  languages, 2 runtimes, 5 frameworks, 2 libraries, 2 inference engines,
  1 extension, 7 data stores, 1 broker, 7 platforms, 1 API.
- `entities/llm-model`: 2 trained models (`Qwen`, `Llama`).
- `entities/software-type`: 6 types and 12 vendor products.
- The `technologies.*` namespace moved into the capability entity without copy
  changes; 11 new capability keys cover the capability bundles.
- 18 calculator `bundle.ref` values are inventoried: 2 software types, 15
  services with a capability, 1 open (`ai-video-training`).
- `features/calculator`, `widgets/*` and `CalculatorSpec` are untouched.

## Verification

```
npm run lint   # 707 files
npm run test   # 108 files, 506 tests
npm run verify # build + verify:dist
```
