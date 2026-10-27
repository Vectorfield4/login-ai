# Solution catalog expansion

Status: planned. Extracted from `service-catalog-expansion.md` on 2026-10-21.
Covers Waves 10–12: 11 industry and function solutions plus the final
precedent and SEO pass. Waves 0–9 and all 36 services are complete in the
service plan.

## Goal

Own the "AI для <отрасль/функция>" queries with 11 solution pages. A solution
packages existing services for one industry or business function. It does not
repeat a service's process, calculator or price.

Each page ships with three packages, a calculator, one or more precedents, RU
1000+ words, EN ≥90% of RU, audiences, tags, relevants and a raster backdrop.

## Scope

### Wave 10: core (6)

| Slug | Query | Focus | Precedent status |
|---|---|---|---|
| `recruiting` | AI для рекрутинга | screening, interviews, scheduling, ATS | no precedent yet |
| `sales` | AI для отдела продаж | leads, follow-up, forecast, CRM | no precedent yet |
| `customer-support` | AI для поддержки клиентов | deflection, triage, QA, voice | reuse `retail-support-bot` |
| `legal` | AI для юридических фирм | contracts, precedents, due diligence | no precedent yet |
| `finance` | AI для финансов | documents, reconciliation, forecast, compliance | no precedent yet |
| `ecommerce` | AI для e-commerce | product content, search, recommendations, support | no precedent yet |

### Wave 11: extra (5)

| Slug | Query | Focus | Precedent status |
|---|---|---|---|
| `logistics` | AI для логистики | routes, warehouse, demand, documents | no precedent yet |
| `education` | AI для образования | admissions, tutors, content, LMS | no precedent yet |
| `construction` | AI для строительства | estimates, documents, site safety, procurement | no precedent yet |
| `real-estate` | AI для недвижимости | leads, selection, documents, pricing | no precedent yet |
| `restaurants` | AI для ресторанов | bookings, reviews, purchases, menu analytics | no precedent yet |

## Packages

Three packages per solution: Pilot, Implementation, Platform. The implementation
amount is the advertised floor and the solution `price.amount`.

| Solution | Pilot | Implementation | Platform |
|---|---:|---:|---:|
| recruiting | 400 000 | 1 200 000 | 3 000 000 |
| sales | 500 000 | 1 500 000 | 3 500 000 |
| customer-support | 500 000 | 1 500 000 | 3 500 000 |
| legal | 400 000 | 1 200 000 | 3 000 000 |
| finance | 500 000 | 1 500 000 | 3 500 000 |
| ecommerce | 400 000 | 1 200 000 | 3 000 000 |
| logistics | 500 000 | 1 500 000 | 3 500 000 |
| education | 400 000 | 1 200 000 | 3 000 000 |
| construction | 500 000 | 1 500 000 | 3 500 000 |
| real-estate | 400 000 | 1 200 000 | 3 000 000 |
| restaurants | 300 000 | 900 000 | 2 000 000 |

Rules:

- `pricing.packages.pilot`, `pricing.packages.implementation`,
  `pricing.packages.platform` are the only package names.
- Implementation carries `from: true`; Platform carries `from: true`.
- A pilot is credited toward implementation when the client continues.
- VAT is not shown on the page; state it in the contract.
- Package prices are drafts until the first deals close.

## Page model

A solution is a `Solution` fixture plus RU/EN dictionary in
`src/entities/solution/{model/fixtures,i18n/{ru,en}}/<slug>.ts`.

Required shape:

- `slug`, `navTitle`, `title`, `tagline`, `description`, `price`, `ctaBanner`.
- `packages`: exactly 3, names from `pricing.packages.*`.
- `audiences`: at least 1 key from `audiences.*`.
- `tags`: at least 1 technology or capability key.
- `features`: 4.
- `processSteps`: 4, each with `processType`.
- `fitItems`: at least 2, with at least one `positive: false`.
- `faqItems`: 4.
- `precedents`: at least 1 typical result with a metric.
- `sections`: at least 2.
- `relevants`: at least 3, at least 2 types; 3–5 services.
- `calculator`: valid spec with a `setup` term whose default equals the
  implementation package.

A solution links to the services it packages. It does not copy their process,
deliverables or price. Service pages own "разработка/внедрение <offer>";
solution pages own "AI для <industry/function>".

## Content gates

Per solution:

- RU 1000+ words, EN ≥90% of RU.
- 3 packages, 4 features, 4 process steps, 2+ sections, 4 FAQ.
- Precedent block: 1+ typical results with a metric. No client names, no NDA
  label, no guarantee language (`docs/frontend/content-contract.md`).
- Audiences, tags, CTA banner, calculator labels in RU and EN.
- 3–5 service relevants that resolve to published services.
- Unique title, description, H1 and canonical.
- Raster backdrop 1376×768; an SVG hero fallback is optional.

## Precedent policy

The promise block is `precedents`: one typical result per card, past tense, with
a metric. The definition, grammar and anti-patterns live in
`docs/frontend/content-contract.md` §2.

- Only results the delivery repeats. No best case, no forecast, no guarantee.
- No client names, logos or quotes. Industry, scale and range carry the story;
  "под NDA" is not evidence and does not belong in the block.
- A solution needs at least one precedent before it leaves draft
  (`test/solution-richness.test.ts`).
- A competitor case is a market example, never our precedent.
- Without a precedent the solution stays `draft: true` and keeps its queue
  record.

Precedent worklist:

1. `customer-support` — reuse the `retail-support-bot` case as a typical result.
2. `recruiting`, `sales`, `legal`, `finance`, `ecommerce` — write one typical
   result each with a measured range.
3. `logistics`, `education`, `construction`, `real-estate`, `restaurants` —
   write one typical result each with a measured range.

## Per-solution briefs

| Slug | Audience | Core workflows | Service links |
|---|---|---|---|
| recruiting | HR leads, agencies | resume screening, interview scheduling, candidate comms | `ai-recruiter`, `ai-chatbots`, `ai-workflow-automation` |
| sales | sales directors, B2B | lead qualification, follow-up, forecast, CRM notes | `ai-sales-agents`, `ai-amocrm-integration`, `ai-bitrix24-integration` |
| customer-support | support leads, retail | triage, deflection, QA, voice handoff | `ai-support-automation`, `ai-chatbots`, `ai-voice-agents` |
| legal | law firms, in-house legal | contract review, precedent search, due diligence | `document-processing`, `deterministic-rag-systems`, `corporate-copilot` |
| finance | CFO, finance ops | document extraction, reconciliation, forecast, compliance | `document-processing`, `ai-forecasting`, `ai-governance-compliance` |
| ecommerce | ecommerce leads | product content, site search, recommendations, support | `ai-for-site`, `recommendation-systems`, `ai-chatbots` |
| logistics | logistics directors | route planning, warehouse ops, demand, documents | `ai-forecasting`, `document-processing`, `ai-workflow-automation` |
| education | universities, edtech | admissions, tutoring, content, LMS | `ai-chatbots`, `content-generation`, `corporate-copilot` |
| construction | contractors, developers | estimates, documents, site safety, procurement | `document-processing`, `computer-vision-systems`, `ai-workflow-automation` |
| real-estate | agencies, developers | lead handling, property selection, documents, pricing | `ai-sales-agents`, `document-processing`, `ai-forecasting` |
| restaurants | chains, local owners | bookings, reviews, purchases, menu analytics | `ai-chatbots`, `speech-analytics`, `information-monitoring` |

## Waves

| Wave | Scope | Exit |
|---|---|---|
| 10 | recruiting, sales, customer-support, legal, finance, ecommerce | 6 published |
| 11 | logistics, education, construction, real-estate, restaurants | 5 published |
| 12 | precedents, cases, articles, internal linking, SEO audit | growth and conversion review |

Wave gate:

- RU/EN copy pass the prose gates.
- Every solution has at least one precedent.
- Packages, calculator and price are consistent.
- Relevants resolve to published services.
- Raster backdrop exists; an optional SVG hero fallback may exist.
- `npm run lint`, `npm run test`, `npm run verify` green.
- Sitemap contains both locales of every new route.

## Execution order

1. Precedent inventory: list the typical result and metric for each of the 11
   slugs.
2. Write one compact brief per slug: query, audience, pain, 4 features, 4
   process steps, 2 fit items, 4 FAQ, 3–5 service links, precedents, packages,
   calculator fields, backdrop idea.
3. Add fixtures and RU/EN dictionaries in batches, starting with
   `customer-support` because its precedent source already exists.
4. Add package prices, calculators and shared calculator labels.
5. Wire relevants and internal links.
6. Generate the raster backdrop per slug; an SVG hero fallback is optional.
7. Run the solution gate, then the wave gate.

Do not batch Wave 10 and Wave 11 in one pass. Do not publish a solution without
a precedent.

## Checklist

- [ ] Precedent inventory for all 11 solutions.
- [ ] Approve the per-solution briefs.
- [ ] Wave 10: precedents, fixtures, copy, packages, calculators, covers, gate.
- [ ] Wave 11: precedents, fixtures, copy, packages, calculators, covers, gate.
- [ ] Wave 12: precedents, cases, articles, internal linking, SEO audit.
- [ ] Internal linking from services, cases and articles.
- [ ] SEO audit: titles, descriptions, H1, canonical, sitemap.
- [ ] Mark the wave complete in this plan.

## Verification

Not started. The first verification entry lands when `customer-support`
publishes.

## References

- `docs/plans/service-catalog-expansion.md` — service catalog, Waves 0–9.
- `docs/plans/service-catalog-expansion-pricing.md` — service floors and
  calculator rules.
- `docs/plans/service-catalog-expansion-intents.md` — intent map and query
  ownership.
- `docs/plans/service-catalog-expansion-execution.md` — service execution
  phases.
- `src/entities/solution/model/fixtures/customer-experience.ts` — template
  fixture.
- `src/entities/case/model/fixtures/retail-support-bot.ts` — `customer-support`
  precedent source.
- `docs/frontend/content-contract.md` — the promise block, schema and gates.
- `docs/frontend/prose-quality.md` — volume and copy rules.
