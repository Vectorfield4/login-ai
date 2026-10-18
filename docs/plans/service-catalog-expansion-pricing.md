# Service catalog expansion: pricing and calculators

Status: draft. Companion to `docs/plans/service-catalog-expansion.md`.
Started 2026-10-18. Prices are drafts for page generation and need final product
sign-off.

## Price architecture

Position: mid-market plus enterprise. The floor is a real project, not a
teaser. The entry offer is an audit or a narrow pilot, not a full build.

| Step | Offers | Band |
|---|---|---|
| Diagnose | AI consulting, readiness audit, data audit, security audit, rescue | 300k-500k |
| Prove | Chatbot, n8n/Make, Telegram/MAX, AI pilot | 300k-700k |
| Build | Agents, voice, copilot, fine-tuning, integrations | 700k-1.5M |
| Platform | Data engineering, conversational BI, infrastructure, CoE | 1.5M+ |
| Operate | MLOps, support, search visibility, speech analytics | Retainer |

Rules:

- The default calculator estimate equals the advertised floor.
- Support is 15% of setup for priority and 30% for dedicated in the first year.
- A pilot is credited toward implementation everywhere when the client
  continues.
- A multi-scenario project gets a volume discount only after the scope is fixed.
- Retainer offers advertise a monthly floor. The setup is quoted separately and
  shown in the calculator. Search, monitoring, speech analytics and AI support
  are retainers; the rest are projects.
- No "site as a gift", no fake crossed-out prices, no unverifiable guarantees.
- Publish service floors ("от N") and three packages per solution: Pilot,
  Implementation, Platform. Keep custom enterprise quotes off the page.
- Prices are in RUB. VAT is not shown on the page; clarify it in the contract
  and the commercial proposal.
- Floors follow delivery cost and the market bands above. Refine coefficients
  after first deals.

## Service floors

### Agents and assistants

| Slug | Unit | Floor | Base includes | Calculator fields |
|---|---|---|---|---|
| ai-agents | project | 1 200 000 | discovery, 1 agent, tools, evaluation, deployment | agents, integrations, knowledge size, channels, support |
| ai-chatbots | project | 600 000 | 1 channel, 5-10 scenarios, RAG, handoff | channels, scenarios, integrations, languages, support |
| ai-voice-agents | project | 900 000 | 1 voice scenario, telephony, ASR/TTS, handoff | minutes, languages, telephony, scenarios, support |
| corporate-copilot | project | 1 200 000 | 1 data contour, access control, search, deployment | users, sources, access control, on-prem, support |
| ai-support-automation | project | 800 000 | 1 helpdesk, triage, deflection, QA | channels, tickets, integrations, QA, support |
| speech-analytics | month | 150 000 | setup 300k, 1 call source, QA scorecard, dashboard | hours, languages, integrations, QA depth, support |
| ai-sales-agents | project | 900 000 | 1 CRM, qualification, follow-up | leads, CRM, channels, scenarios, support |
| ai-recruiter | project | 700 000 | 1 ATS, screening, scheduling | vacancies, ATS, channels, screening depth, support |
| ai-workflow-automation | project | 600 000 | 1-2 processes, approvals, integrations | processes, integrations, volume, support |

### Data and models

| Slug | Unit | Floor | Base includes | Calculator fields |
|---|---|---|---|---|
| data-engineering | project | 1 200 000 | 3 sources, warehouse, 2 pipelines, quality checks | sources, volume, pipelines, warehouse, SLA |
| data-annotation | project | 300 000 | guidelines, pilot batch, QA | items, modality, quality level, guidelines |
| synthetic-data | project | 500 000 | 1 modality, validation, privacy review | modality, volume, privacy, validation |
| data-readiness-audit | project | 300 000 | 2-3 sources, scorecard, roadmap | sources, volume, PII, scorecard |
| conversational-bi | project | 900 000 | 1 warehouse, semantic layer, 10 questions | sources, users, semantic layer, access |
| llm-fine-tuning | project | 800 000 | 1 model, LoRA/SFT, eval, deployment | model, dataset, method, eval, deployment |
| llm-evaluation | project | 400 000 | golden set, hallucination test, report | models, test sets, red teaming, observability |
| ai-forecasting | project | 700 000 | 1 forecast, history review, accuracy target | history, SKUs, horizon, accuracy |

### Infrastructure and security

| Slug | Unit | Floor | Base includes | Calculator fields |
|---|---|---|---|---|
| ai-security-gateway | project | 600 000 | 1 app, prompt injection, DLP, audit | apps, traffic, DLP, audit, support |

### Engineering and integrations

| Slug | Unit | Floor | Base includes | Calculator fields |
|---|---|---|---|---|
| ai-1c-integration | project | 1 200 000 | 1 contour, documents, assistant, modules | modules, users, documents, support |
| ai-bitrix24-integration | project | 700 000 | 1 portal, CRM, tasks, bot | portals, users, scenarios, support |
| ai-amocrm-integration | project | 600 000 | 1 pipeline, messaging, tasks | pipelines, users, scenarios, support |
| ai-telegram-max | project | 400 000 | 1 bot, 1 channel, payments optional | bots, channels, mini app, payments |
| ai-n8n-make | project | 300 000 | 3 workflows, 2 integrations | workflows, integrations, hosting |
| document-processing | project | 800 000 | 1 document type, extraction, review | types, volume, accuracy, review |
| ai-application-rescue | project | 400 000 | audit, eval, cost review, restart plan | systems, models, data, timeline |

### Content and growth

| Slug | Unit | Floor | Base includes | Calculator fields |
|---|---|---|---|---|
| prompt-engineering | project | 250 000 | prompt library, eval, guardrails | use cases, prompts, eval, training |
| seo | month | 200 000 | audit, semantics, on-page, reporting | pages, queries, competitors, reporting |
| aeo | month | 150 000 | snippets, schema, FAQ, reporting | pages, queries, schema, reporting |
| geo-ai-search | month | 200 000 | monitoring, citations, llms.txt, content plan | engines, queries, competitors, reporting |
| ai-for-site | project | 500 000 | widget, search, lead qualification | pages, products, search, personalization |

### Strategy, governance and training

| Slug | Unit | Floor | Base includes | Calculator fields |
|---|---|---|---|---|
| ai-consulting | project | 300 000 | interviews, use-case map, roadmap | systems, workshops, roadmap |
| ai-readiness-audit | project | 300 000 | maturity score, data review, ROI | systems, data, processes, scorecard |
| ai-governance-compliance | project | 500 000 | policy, risk register, model cards | systems, jurisdictions, documentation |
| ai-pilot | project | 700 000 | 1 scenario, metrics, go/no-go | scenarios, data, integrations, timeline |
| ai-center-of-excellence | program | 2 000 000 | team, regulations, portfolio, training | team size, portfolio, training, support |

## Solution packages

Three packages, same as the existing solutions: Pilot, Implementation,
Platform. The implementation amount is the advertised floor.

| Solution | Pilot | Implementation | Platform |
|---|---|---|---|
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

## Calculator patterns

| Pattern | Fields | Add-ons |
|---|---|---|
| Agentic | agents, integrations, knowledge size, channels, support | CRM, ERP, RAG, security, evaluation |
| Conversational | channels, scenarios, languages, integrations, support | CRM, telephony, RAG, analytics |
| Voice | minutes, languages, telephony, scenarios, support | CRM, analytics, recording, compliance |
| Data | sources, volume, pipelines, warehouse, SLA | quality, governance, observability |
| Annotation | items, modality, quality level, guidelines | synthetic data, RLHF, QA |
| Fine-tuning | model, dataset, method, eval, deployment | RAG, evaluation, security |
| Governance | systems, jurisdictions, documentation, training | audit, gateway, CoE |
| Platform integration | modules, users, documents, support | CRM, ERP, CMS, 1C, Bitrix24, amoCRM |
| Document | types, volume, accuracy, review | RAG, workflow, governance |
| Search visibility | pages, queries, competitors, reporting | AEO, GEO, content, analytics |
| AI for site | pages, products, search, personalization | chatbot, CRM, recommendations |
| Consulting | systems, workshops, roadmap | audit, pilot, CoE |

## Add-ons and coefficients

- Integrations: CRM, ERP, CMS, 1C, Bitrix24, amoCRM, task tracker.
- Channels: Telegram, MAX, WhatsApp, voice, email, web widget.
- AI capabilities: RAG, fine-tuning, evaluation, security gateway, governance.
- Delivery: on-prem, sovereign contour, import substitution, SLA.
- Enablement: training, prompt library, documentation, support.

Coefficients live in the catalog (`technology.pricing`, `capability.pricing`,
`software-type.pricing`) and follow `docs/plans/calculator/rfc.md`. No absolute
prices in the catalog.

## Open questions

None. Price bands, public floors, packages, retainer scope and pilot credit are
settled for the draft. Coefficient tuning stays a product decision before the
numbers are treated as final.
