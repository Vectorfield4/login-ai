# Service catalog expansion

Status: draft. Started 2026-10-18. Strategy only: no implementation in this
session. No keyword or analytics tools are available, so priorities are
qualitative.

## Goal

Grow the service catalog into a three-level structure (direction > group >
service) and take the commercial SEO space around AI agents, data, platform
integrations, governance and industry solutions. Quality gates stay as they are:
unique intent, real proof, RU/EN parity, cover, calculator and tests.

## Decisions from the interviews

- Target: maximum SEO coverage, not a small curated catalog.
- Depth: three levels, direction > group > service.
- Top level: six directions.
- Page types: services, named platforms and industry solutions.
- Platforms become services. Industries become solutions.
- Release in as many waves as quality requires. No fixed upper bound.
- Price tier: mid-market plus enterprise. Entry 300k-500k, core 700k-1.5M,
  platform 2M+.
- Search visibility is a hub plus three services. `seo-aeo` stays as the hub
  and combined program; `seo`, `aeo` and `geo-ai-search` become standalone
  services under `web-growth`. No redirect, no lost link equity.
- Two CTAs on every new page: "получить оценку/аудит" for warm traffic and
  "обсудить внедрение" for hot traffic. No forced single entry offer.
- Every new service ships with a price and a calculator in its own wave.
- Priority comes from competitor coverage, page depth and our readiness. Pages
  ship in waves.
- 35 new services and 11 new industry solutions are the current scope.

## Competitor scan

| Competitor | What they sell | Price signal | What to learn |
|---|---|---|---|
| Adeptum | Audit/strategy, build, support; agents, RAG, CV, document extraction, import substitution, on-prem | No public prices | Strong production/ROI positioning, corporate and industrial proof, FSTEC/on-prem story |
| Insight AI | AI consulting, neuro-assistants, custom AI, forecasting, speech analytics, document flow, chatbots | No public prices | Service + industry matrix, case metrics, warranty/monitoring |
| Pixel Plus | AI hub with 9 services, GEO/AEO cluster, CRM/telephony/BI/1C integrations, ready packages | Services 72k-300k; packages 330k/780k/2.04M | Transparent pricing, productized packages, strong SEO hub, GEO as a separate cluster |
| SPT Tech | AI implementation with 10 industry pages: notaries, lawyers, financiers, technologists, restaurants, sales, logistics, executives, manufacturing, education | No public prices | Industry long tail, on-prem, 4-stage process |
| Artigence | Packages Start/Business/Corporate, KPI guarantees, percent of savings | 500k / 1.2M / 2M | Aggressive guarantees and fast-start promise; also a warning: low-quality copy and unverifiable proof |
| Raketa Digital | AI for business with monthly retainers and niche pages: real estate, dental, beauty, ecommerce, online schools, B2B | 70k-250k per month | SMB productization, fast first scenarios, niche pricing |
| Extyl | Enterprise AI, 1C/Bitrix, security, team composition, T&M/retainer | From 1M, 2+ months | Enterprise delivery model, security, 1C depth |
| Just AI | GenAI consulting, agents, RAG, security, copilot, voice IVR, AI recruiter, lead gen, outbound | Product/platform | Conversational AI depth, voice and contact-center use cases |

`competitor-scout` is created at `.opencode/agent/competitor-scout.md` and loads
on the next OpenCode restart. It builds the coverage matrix from public
sitemaps. It returns clusters, competitor coverage, depth, our readiness and
priority, and writes no files. See the execution plan for the output shape.

Market split:

1. Enterprise integration: Adeptum, Extyl. 1M+, 2-6 months, on-prem, security,
   industry proof.
2. Mid-market AI agencies: Insight AI, SPT Tech. 300k-1.5M, 4-12 weeks,
   services plus industry pages.
3. SMB productized: Pixel Plus, Raketa, Artigence. 70k-500k, monthly retainers,
   fast pilots, public prices.
4. Platform-led conversational AI: Just AI. Agents, voice, RAG, security.

What most competitors already cover:

- audit and strategy;
- chatbots and agents;
- document processing;
- speech analytics;
- forecasting;
- CRM/ERP/1C integrations;
- support and scaling;
- industry pages;
- public prices or price ranges;
- cases with metrics, ratings and client logos.

What few cover well:

- AI governance and compliance (EU AI Act, ISO 42001, model cards, risk register);
- LLM evaluation, red teaming and observability;
- data annotation, synthetic data and data readiness as separate offers;
- fine-tuning as a standalone service;
- runtime AI security (prompt injection, DLP, PII masking);
- honest tradeoffs and reproducible engineering detail.

This is where the site can differ: production-grade AI with proof, security and
governance, not another generic AI landing page.

## Gaps found against the current plan

Resolved after the competitor scan:

- Speech analytics is a separate commercial service for Insight AI and Pixel
  Plus. Added `speech-analytics`.
- AI forecasting is productized by Insight AI and Pixel Plus. Added
  `ai-forecasting`.
- GEO/AI search visibility is a whole cluster for Pixel Plus. Added
  `geo-ai-search`.

Gap status:

- Industry pages: closed. The plan has 11 new solutions.
- Prices: closed. Service floors and three packages per solution are public.
- Proof: open. The site needs proof assets for the new directions.

## Positioning

Working line: "AI-интегратор, который доводит до продакшена".

Three proof pillars:

1. Production, not demos: evaluation, observability, security, governance.
2. Your data and your contour: 1C, Bitrix24, amoCRM, on-prem, sovereign models.
3. Full path: audit, pilot, build, operate, enable.

Offer ladder:

| Step | Offers | Price band |
|---|---|---|
| Diagnose | AI consulting, readiness audit, data audit, security audit, rescue | 300k-500k |
| Prove | Chatbot, n8n/Make, Telegram/MAX, AI pilot | 300k-700k |
| Build | Agents, voice, copilot, fine-tuning, integrations | 700k-1.5M |
| Platform | Data engineering, conversational BI, infrastructure, CoE | 1.5M+ |
| Operate | MLOps, support, search visibility, speech analytics | Retainer |

## Information architecture

Six directions:

1. Agents and assistants, direction `agents`: groups `agentic`, `conversational`.
2. Data and models, direction `data-models`: groups `data`, `models`, `ml`.
3. Infrastructure and security, direction `infra-security`: groups `ai-infra`, `security`.
4. Engineering and integrations, direction `engineering`: groups `engineering`,
   `ai-integrations`.
5. Content and growth, direction `content-growth`: groups `content`, `web-growth`.
6. Strategy, governance and training, direction `strategy-governance`: groups
   `strategy`, `governance`, `training`.

Menu model:

- One "Услуги" item in the header.
- Inside: six directions, each with two or three groups.
- Services live on the group page, not in the dropdown. A 71-item dropdown is
  unreadable.
- `/services` becomes a hub: six directions, group cards, A-Z service index.
- Breadcrumbs: home > services > direction > group > service.

URLs:

- Service: `/services/<slug>` (flat, keeps link equity).
- Group: `/services/group/<group>`.
- Direction: `/services/direction/<direction>`.

## New services

### Agents and assistants (9)

| Slug | Query | Angle | Priority |
|---|---|---|---|
| ai-agents | разработка AI-агентов | tools, memory, evaluation, production guardrails | P1 |
| ai-chatbots | разработка чат-ботов с AI | support and sales, RAG, human handoff | P1 |
| ai-voice-agents | голосовые AI-агенты | inbound/outbound calls, IVR, ASR + TTS | P1 |
| corporate-copilot | корпоративный AI-ассистент | knowledge search, access control, on-prem | P1 |
| ai-support-automation | автоматизация поддержки | triage, deflection, QA, helpdesk | P1 |
| speech-analytics | речевая аналитика | call quality, QA, sales insights, compliance | P1 |
| ai-sales-agents | AI-агент для продаж | qualification, follow-up, CRM | P1 |
| ai-recruiter | AI-рекрутер | screening, scheduling, candidate comms | P1 |
| ai-workflow-automation | автоматизация процессов с AI | routing, approvals, documents | P1 |

### Data and models (8)

| Slug | Query | Angle | Priority |
|---|---|---|---|
| data-engineering | data engineering | pipelines, warehouse, dbt, Airflow, quality | P2 |
| data-annotation | разметка данных | text, image, audio, RLHF, QA | P2 |
| synthetic-data | синтетические данные | rare cases, privacy, augmentation | P2 |
| data-readiness-audit | аудит данных для AI | quality, coverage, PII, scorecard | P2 |
| conversational-bi | чат с данными | NL to SQL, semantic layer, access control | P2 |
| llm-fine-tuning | дообучение LLM | LoRA, SFT, DPO, distillation | P2 |
| llm-evaluation | оценка качества LLM | golden sets, hallucination, red teaming | P2 |
| ai-forecasting | прогнозирование спроса | demand, sales, load, inventory | P2 |

### Infrastructure and security (1)

| Slug | Query | Angle | Priority |
|---|---|---|---|
| ai-security-gateway | защита AI-приложений | prompt injection, DLP, PII, traffic audit | P2 |

### Engineering and integrations (7)

| Slug | Query | Angle | Priority |
|---|---|---|---|
| ai-1c-integration | AI для 1С | documents, reconciliation, assistant, modules | P1 |
| ai-bitrix24-integration | AI для Bitrix24 | CRM, tasks, portal, bots | P1 |
| ai-amocrm-integration | AI для amoCRM | leads, messages, tasks, pipeline | P1 |
| ai-telegram-max | AI-боты в Telegram и MAX | bots, mini apps, payments, support | P1 |
| ai-n8n-make | автоматизация на n8n и Make | low-code workflows, integrations, AI nodes | P1 |
| document-processing | обработка документов AI | OCR, extraction, contracts, invoices | P2 |
| ai-application-rescue | спасение AI-проекта | audit, eval, cost, restart | P2 |

### Content and growth (5)

| Slug | Query | Angle | Priority |
|---|---|---|---|
| prompt-engineering | промпт-инжиниринг | prompt library, eval, guardrails | P3 |
| seo | SEO-продвижение | technical SEO, semantics, on-page, links, local | P1 |
| aeo | AEO-оптимизация | snippets, schema, FAQ, voice answers | P1 |
| geo-ai-search | продвижение в нейросетях | visibility in ChatGPT, Perplexity, Gemini, Alisa | P1 |
| ai-for-site | ИИ на сайт | smart search, widget, lead qualification, personalization | P1 |

`seo-aeo` remains the hub and combined program. It compares SEO, AEO and GEO,
links to the three services and sells the combined engagement with its own
price, calculator and packages. The three services sell the individual modules.

### Strategy, governance and training (5)

| Slug | Query | Angle | Priority |
|---|---|---|---|
| ai-consulting | AI-консалтинг | strategy, roadmap, use-case selection | P2 |
| ai-readiness-audit | аудит готовности к AI | maturity, data, process, ROI | P2 |
| ai-governance-compliance | AI governance и комплаенс | EU AI Act, ISO 42001, risk, model cards | P2 |
| ai-pilot | AI-пилот | 6-8 weeks, metrics, go/no-go | P3 |
| ai-center-of-excellence | AI-центр компетенций | team, regulations, portfolio | P3 |

## New solutions

| Slug | Query | Focus |
|---|---|---|
| recruiting | AI для рекрутинга | screening, interviews, scheduling, ATS |
| sales | AI для отдела продаж | leads, follow-up, forecast, CRM |
| customer-support | AI для поддержки клиентов | deflection, triage, QA, voice |
| legal | AI для юридических фирм | contracts, precedents, due diligence |
| finance | AI для финансов | documents, reconciliation, forecast, compliance |
| ecommerce | AI для e-commerce | product content, search, recommendations, support |
| logistics | AI для логистики | routes, warehouse, demand, documents |
| education | AI для образования | admissions, tutors, content, LMS |
| construction | AI для строительства | estimates, documents, site safety, procurement |
| real-estate | AI для недвижимости | leads, selection, documents, pricing |
| restaurants | AI для ресторанов | bookings, reviews, purchases, menu analytics |

Solution pages own "AI для <industry/function>". Service pages own
"разработка/внедрение <offer>". A solution links to the services it packages and
does not repeat their process or price.

## Proof strategy

- `outcomes` carries market numbers and sector statistics. The source is named
  in the text ("по данным Upwork", "в открытом кейсе рынка") with a link where
  possible, without a separate benchmark badge or a new field.
- Any public source with a link is allowed: research, ratings, industry reports,
  competitor case pages. Filter by sample size, date and relevance.
- `proofItems` carries only our projects: named clients where allowed, NDA
  projects with industry and ranges where not.
- A competitor case can be cited as a market example with a link, never as our
  result.
- A service can publish with sourced market outcomes when it has no own case
  yet. A solution needs at least one own or NDA proof because its package price
  implies delivered work.

## Competitor patterns to reuse

- A contrarian hero: "most pilots never reach production", "AI is not a demo".
- Three-stage offer: audit and strategy, build, support and scale.
- Transparent price bands and packages.
- Industry pages with concrete workflows, not generic "AI for business".
- Tech stack, integration list and model choice on the page.
- FAQ that answers cost, timeline, data security and "will AI replace people".
- A free audit or consultation as the low-friction CTA.
- "Start with one scenario, then scale" as the delivery narrative.
- On-prem, import substitution and security as a proof pillar.
- A GEO cluster with pages for ChatGPT, Perplexity, Gemini and Alisa.

Do not copy: fake reviews, unverifiable guarantees, "site as a gift", crypto
payment noise, competitor cases as our own, or prices we cannot deliver.

## SEO rules

Intent map:

| Page type | Intent | Example |
|---|---|---|
| Service | commercial | разработка AI-агентов |
| Platform | branded | AI для 1С |
| Solution | industry | AI для рекрутинга |
| Group | category | AI-интеграции |
| Direction | overview | агенты и ассистенты |
| Hub | combined category | SEO, AEO и GEO |
| Article | informational | RAG или fine-tuning |
| Case | proof | кейс AI-поддержки |

Rules:

- One primary query per URL. The intent map is a reviewed file, not memory.
- The intent map is a working draft.
- No two pages share the same H1 or title.
- Service pages link to 3+ relevants and at least 2 types.
- Solution pages link to 3-5 services.
- Articles link to 1 service, 1 solution and 1 case.
- Direction and group pages link down and never compete for the service query.
- `seo-aeo` owns the combined "SEO, AEO и GEO" query. `seo`, `aeo` and
  `geo-ai-search` own their specific queries. The hub links to them and does not
  repeat their deliverables.
- Flat service URLs, canonical self, hreflang RU/EN, Service/FAQ/HowTo/
  Breadcrumb schema.

## Generation priorities

A page ships when the intent is unique, the copy passes the gates, the price and
calculator are consistent, and the cover exists.

Priority comes from three signals:

1. Competitor coverage: 3+ competitors with a page means P1, 1-2 means P2, 0
   means P3.
2. Depth: pricing, cases, 1000+ words, subpages and blog frequency show how
   hard a competitor bets on the cluster.
3. Our readiness: an existing article, case or solution lowers the cost to ship.

The intent map is a working draft.

## Content and quality gates

Per service:

- RU 700+ words, EN at least 90%.
- 4 features, 4 process steps, 2 fit items with a negative, 3 relevants,
  2 specialty blocks, a result block, 4 FAQ.
- Price, calculator, cover 1200x630, diagrams where the group requires them.
- Two CTAs: estimate/audit and discuss implementation.
- Real proof, an NDA case, or a sourced market outcome.

Per solution:

- RU 1000+ words, EN at least 90%.
- 3 packages, 4 features, 4 process steps, 2 sections, 4 FAQ, proof, audiences,
  tags, CTA.

Cases:

- Only real client data. No invented metrics.
- If data is missing, use a proof block and an article, and postpone the case.

## Waves

| Wave | Scope | Exit |
|---|---|---|
| 0 | IA: six directions, 14 groups, mapping of 36 services, nav, routes, dictionaries, `/services` hub, tests | Framework without new pages |
| 1 | Agents core: ai-agents, ai-chatbots, ai-voice-agents, corporate-copilot | 4 P1 published |
| 2 | Platforms: 1C, Bitrix24, amoCRM, Telegram/MAX, n8n/Make | 5 P1 published |
| 3 | Agents scale: support, speech analytics, sales, recruiter, workflow | 5 P1 published |
| 4 | Data: engineering, annotation, synthetic, audit, conversational BI | 5 P2 published |
| 5 | Models and forecasting: fine-tuning, evaluation, ai-forecasting | 3 P2 published |
| 6 | Trust: consulting, readiness, governance, security gateway | 4 P2 published |
| 7 | Engineering: document processing, rescue, prompt engineering | 3 published |
| 8 | Search and site: rewrite the `seo-aeo` hub, add seo, aeo, geo-ai-search, ai-for-site | 4 published plus hub |
| 9 | Scale: pilot, CoE | 2 published |
| 10 | Solutions core: recruiting, sales, support, legal, finance, ecommerce | 6 published |
| 11 | Solutions extra: logistics, education, construction, real estate, restaurants | 5 published |
| 12 | Proof: real cases, articles, internal linking, SEO audit | Growth and conversion |

Wave 0 precedes publishing. Wave 1 copy can be drafted in parallel; only
publishing waits for the IA foundation.

Definition of done per wave:

- RU/EN copy passes the prose gates.
- Cover exists, queue record removed.
- Price and calculator are consistent.
- Relevants resolve, internal links added.
- `npm run lint`, `npm run test`, `npm run verify` green.
- Titles, descriptions, H1 and canonical are unique.
- Sitemap contains the new routes.

## Open questions

1. Which sources pass the quality filter for each claim, and who owns the final
   fact-check?
2. Do we need a dedicated ecommerce storefront page under `ai-for-site`, or is
   the `ecommerce` solution enough?

## Checklist

- [ ] Track open questions 1-2.
- [x] Positioning and draft price architecture set for page generation.
- [x] Draft intent map: `docs/plans/service-catalog-expansion-intents.md`.
- [x] Intent map treated as a working draft, not a publishing gate.
- [ ] Re-check the intent map after 90 days.
- [x] Draft pricing and calculator architecture:
  `docs/plans/service-catalog-expansion-pricing.md`.
- [x] Draft linear execution:
  `docs/plans/service-catalog-expansion-execution.md`.
- [ ] Approve the linear execution order.
- [x] Draft price bands and packages for page generation.
- [ ] Final coefficient sign-off after first deals.
- [x] Calculator coverage per wave approved.
- [ ] Wave 0: IA foundation.
- [ ] Wave 1: agents core.
- [ ] Wave 2: platforms.
- [ ] Wave 3: agents scale.
- [ ] Wave 4: data.
- [ ] Wave 5: models.
- [ ] Wave 6: trust.
- [ ] Wave 7: engineering.
- [ ] Wave 8: search and site hub and services.
- [ ] Wave 9: scale offers.
- [ ] Wave 10: industry solutions core.
- [ ] Wave 11: industry solutions extra.
- [ ] Wave 12: proof and SEO audit.

## Verification

Not run yet. The plan is a draft.

## References

- Interview decisions, 2026-10-18.
- `docs/plans/service-catalog-expansion-intents.md`: intent map and query
  ownership matrix.
- `docs/plans/service-catalog-expansion-pricing.md`: price bands, packages,
  calculator patterns and add-ons.
- `docs/plans/service-catalog-expansion-execution.md`: linear phases, per-service
  loop, wave gates and proof coverage.
- `AGENTS.md`, `docs/frontend/prose-quality.md`,
  `src/entities/service/AGENTS.md`.
- Competitor pages:
  - https://adeptum.ru/ai-solutions
  - https://insightai.ru/services/custom-ii/
  - https://pixelplus.ru/vnedrenie-ii/dlya-biznesa/
  - https://spttech.ru/vnedrenie-ii/
  - https://artigence.ru/services/vnedrenie-ii-pod-klyuch
  - https://raketadigital.com/services_new/ai-dlya-biznesa/
  - https://www.extyl-pro.ru/services/ai/
  - https://just-ai.com/
