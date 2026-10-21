# Solution catalog expansion

Status: planned. Extracted from `service-catalog-expansion.md` on 2026-10-21.
Covers Waves 10–12: 11 industry and function solutions plus the final proof and
SEO pass. Waves 0–9 and all 36 services are complete in the service plan.

## Goal

Own the "AI для <отрасль/функция>" queries with 11 solution pages. A solution
packages existing services for one industry or business function. It does not
repeat a service's process, calculator or price.

Each page ships with three packages, a calculator, proof, RU 1000+ words,
EN ≥90% of RU, audiences, tags, relevants and a raster backdrop.

## Scope

### Wave 10: core (6)

| Slug | Query | Focus | Proof status |
|---|---|---|---|
| `recruiting` | AI для рекрутинга | screening, interviews, scheduling, ATS | no case yet |
| `sales` | AI для отдела продаж | leads, follow-up, forecast, CRM | no case yet |
| `customer-support` | AI для поддержки клиентов | deflection, triage, QA, voice | case `retail-support-bot` |
| `legal` | AI для юридических фирм | contracts, precedents, due diligence | no case yet |
| `finance` | AI для финансов | documents, reconciliation, forecast, compliance | no case yet |
| `ecommerce` | AI для e-commerce | product content, search, recommendations, support | no case yet |

### Wave 11: extra (5)

| Slug | Query | Focus | Proof status |
|---|---|---|---|
| `logistics` | AI для логистики | routes, warehouse, demand, documents | no case yet |
| `education` | AI для образования | admissions, tutors, content, LMS | no case yet |
| `construction` | AI для строительства | estimates, documents, site safety, procurement | no case yet |
| `real-estate` | AI для недвижимости | leads, selection, documents, pricing | no case yet |
| `restaurants` | AI для ресторанов | bookings, reviews, purchases, menu analytics | no case yet |

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
- `proofItems`: at least 1 own or NDA proof.
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
- Proof block with a real client, an NDA contour, or a named market source.
- Audiences, tags, CTA banner, calculator labels in RU and EN.
- 3–5 service relevants that resolve to published services.
- Unique title, description, H1 and canonical.
- Raster backdrop 1376×768 plus the solution SVG hero.

## Proof policy

- Only real client data. No invented metrics, logos or reviews.
- A solution needs at least one own or NDA proof before it leaves draft. The
  package price implies delivered work.
- Allowed proof: named client, NDA project with industry and ranges, or a
  sourced market outcome with a linked public source.
- A competitor case may be cited as a market example, never as our result.
- Without proof the solution stays `draft: true` and keeps its queue record.

Proof worklist:

1. `customer-support` — reuse the `retail-support-bot` case.
2. `recruiting`, `sales`, `legal`, `finance`, `ecommerce` — collect one NDA
   contour each.
3. `logistics`, `education`, `construction`, `real-estate`, `restaurants` —
   collect one NDA contour each.

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
| 12 | proof, cases, articles, internal linking, SEO audit | growth and conversion review |

Wave gate:

- RU/EN copy pass the prose gates.
- Every solution has proof.
- Packages, calculator and price are consistent.
- Relevants resolve to published services.
- SVG hero and raster backdrop exist.
- `npm run lint`, `npm run test`, `npm run verify` green.
- Sitemap contains both locales of every new route.

## Execution order

1. Proof inventory: list the NDA contour and metric for each of the 11 slugs.
2. Write one compact brief per slug: query, audience, pain, 4 features, 4
   process steps, 2 fit items, 4 FAQ, 3–5 service links, proof, packages,
   calculator fields, backdrop idea.
3. Add fixtures and RU/EN dictionaries in batches, starting with
   `customer-support` because its proof already exists.
4. Add package prices, calculators and shared calculator labels.
5. Wire relevants and internal links.
6. Generate the SVG hero and raster backdrop per slug.
7. Run the solution gate, then the wave gate.

Do not batch Wave 10 and Wave 11 in one pass. Do not publish a solution without
proof.

## Checklist

- [ ] Proof inventory for all 11 solutions.
- [ ] Approve the per-solution briefs.
- [ ] Wave 10: proof, fixtures, copy, packages, calculators, covers, gate.
- [ ] Wave 11: proof, fixtures, copy, packages, calculators, covers, gate.
- [ ] Wave 12: proof, cases, articles, internal linking, SEO audit.
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
  proof.
- `docs/frontend/prose-quality.md` — volume and copy rules.
