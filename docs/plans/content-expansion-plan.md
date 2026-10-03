# Content Expansion Plan

Working plan for linking articles to services, adding new services/cases, and
restructuring the top menu. Companions: `docs/frontend/prose-quality.md`,
`docs/frontend/i18n.md`.

## Status rollup (2026-10-03)

Done:

- [x] Menu restructure (section 6): **Company** dropdown → News, Team, Contacts,
  Investors; nav model supports a path-less grouping menu (button trigger).
- [x] `/team` page (RU/EN): founders block (Co-founder & CTO, Co-founder & CCO)
  plus the "project team" block for hired roles.
- [x] Table 3a (existing services): 6 CTA insertions across articles, 11
  paragraphs counting both locales.
- [x] `src/entities/service/AGENTS.md`: service authoring requirements.
- [x] `model/fixtures.ts` refactored into `model/fixtures/<slug>.ts` per service
  plus an index that composes `services` (24 services, order preserved).
- [x] New services — integration batch: `ai-crm-integration`,
  `ai-task-tracker-integration`, `ai-erp-integration`, `ai-cms-integration`.
- [x] New services — AI-infrastructure batch: `ai-infra-cost-optimization`,
  `sovereign-model-deployment`, `deterministic-rag-systems`, `ai-security-audit`.
- [x] New services — ML batch: `computer-vision-systems`,
  `predictive-analytics-systems`, `anomaly-detection-systems`, `mlops-platforms`.
- [x] New services — final batch: `nlp-systems`, `recommendation-systems`,
  `speech-recognition-systems`, `reinforcement-learning-systems`.
- [x] Table 5 complete: all 16 new services scaffolded (fixture + RU/EN i18n +
  registry, routes built).
- [x] i18n split for all entities: `services`, `solutions`, `cases` now use
  `i18n/index.ts` + `i18n/ru/<slug>.ts` + `i18n/en/<slug>.ts`.
- [x] Fixed `solutions.manufacturers`: RU dictionary rewritten from a raw-key
  stub to real copy, EN completed; parity and raw-key tests pass.
- [x] `test/prose-quality.test.ts`: service taglines reject negation and
  contrast framing in RU and EN.
- [x] Table 3 (new services): 24 CTA insertions across articles — 35 service
  links total together with Table 3a.
- [x] Section 7: publication gates (`draft` + `updatedAt` + post-build link pass).
- [x] Table 4: 4 new cases — `aeo-ai-visibility`, `comment-sentiment-scoring`,
  `erp-data-reconciliation`, `packaging-cv-inspection` (fixture + RU/EN i18n +
  relevants, routes built).
- [x] Model fixtures for `solutions` and `cases` split into
  `model/fixtures/<slug>.ts` + index (services were already split).
- [x] Services publish-by-backdrop: a new service leaves `draft` only when its
  backdrop PNG exists. Live now: `ai-crm-integration`, `deterministic-rag-systems`
  (+ the 7 original services). The other 15 new services stay `draft: true`
  until their image lands — backlog in `docs/plans/service-backdrops-plan.md`.
- [x] `updatedAt` staleness report: `src/shared/data/staleness.ts` + unit tests,
  and `test/staleness.test.ts` runs it over real articles and fixtures.

Pending:

- None.

Table 2.2 (existing services per article) targets the same article lines as
Table 3, so it is not applied: existing services are already linked via Table 3a.

Verification (last run): `lint` clean; `test` 197 passed / 0 failed;
`verify` 119 pages, `verify:dist` ok.

## URL patterns

- Articles: `https://loginai.ru/ru/news/<slug>` / `https://loginai.ru/en/news/<slug>`
- Services: `https://loginai.ru/ru/services/<slug>` / `https://loginai.ru/en/services/<slug>`
- Solutions: `https://loginai.ru/ru/solutions/<slug>` / `https://loginai.ru/en/solutions/<slug>`
- Locale is always prefixed (`src/shared/data/routes.ts`).

## Table 1. Existing services (already in `relatedServices`)

| Article | Old service | Insert line |
|---|---|---|
| `ai-agents-era-chatbots-obsolescence` | `software-development` | RU 49 / EN 49 |
| `ai-agents-support-autonomy` | — | — |
| `computer-vision-line-review` | — | — |
| `conversational-bi-architecture` | `software-development` | RU 99 / EN 97 |
| `deterministic-rag-infrastructure` | `ai-infrastructure` | RU 102 / EN 102 |
| `reviews-tone-monitoring` | `information-monitoring` | RU 11 |
| `system-one-primitives-agents` | `ai-infrastructure` | RU 52 / EN 52 |
| `system-one-primitives-agents` | `highload-backend` | RU 118 / EN 118 |

`customer-experience` and `computer-vision` are solutions, not services; they
cannot go into `relatedServices` (`RelevantCard.tsx:36` drops unresolved refs).

## Table 3a. CTA and block — existing services

Links are live. Insert as a new sentence at the end of the paragraph on the
given line.

| Service | Place | Lead-in + CTA (RU / EN) | Block linked |
|---|---|---|---|
| `software-development` | chatbots, RU 49 / EN 49 | «Собрать такой конвейер — это разработка: воркеры, типизированные контракты между ними и валидаторы на выходе. [Разработка программного обеспечения](https://loginai.ru/ru/services/software-development).» / “Building that pipeline is development work: workers, typed contracts between them, and validators at the exit. [Custom software development](https://loginai.ru/en/services/software-development).” | «Agentic Workflow» |
| `software-development` | conversational-bi, RU 99 / EN 97 | «Двухслойная схема — это проект разработки: семантический слой, API и оркестрация запросов. [Разработка программного обеспечения](https://loginai.ru/ru/services/software-development).» / “The two-layer scheme is a build project: the semantic layer, the API, and request orchestration. [Custom software development](https://loginai.ru/en/services/software-development).” | «Архитектурные преимущества» |
| `ai-infrastructure` | deterministic-rag, RU 102 / EN 102 | «Приватный контур с обезличиванием — это ИИ-инфраструктура, а не настройка облака. [Проектирование ИИ-инфраструктуры и RAG](https://loginai.ru/ru/services/ai-infrastructure).» / “A private perimeter with de-identification is AI infrastructure, not a cloud setting. [AI Infrastructure & RAG design](https://loginai.ru/en/services/ai-infrastructure).” | «Что уходит за периметр» |
| `information-monitoring` | reviews, RU 11 | «Собрать отзывы из CMS, маркетплейсов и соцсетей в одну ленту — задача мониторинга. [Мониторинг информации](https://loginai.ru/ru/services/information-monitoring).» | вводный абзац |
| `ai-infrastructure` | system-one, RU 52 / EN 52 | «Стоимость инференса считается и режется на уровне инфраструктуры: кэш, батчи, маршрутизация. [Проектирование ИИ-инфраструктуры и RAG](https://loginai.ru/ru/services/ai-infrastructure).» / “Inference cost is measured and cut at the infrastructure level: cache, batching, routing. [AI Infrastructure & RAG design](https://loginai.ru/en/services/ai-infrastructure).” | «Анатомия примитивов Jev» |
| `highload-backend` | system-one, RU 118 / EN 118 | «Задержка в 45–50 мс держится на профилировании рантайма под нагрузкой. [Проектирование высоконагруженных бэкенд-систем](https://loginai.ru/ru/services/highload-backend).» / “The 45–50 ms latency rests on profiling the runtime under load. [High-load backend systems design](https://loginai.ru/en/services/highload-backend).” | «Реализация риск-гейта на TypeScript» |

## Table 2. New services (to launch)

| Service | B2B user | Industry |
|---|---|---|
| Agent Orchestration | CTO, support lead, ops director | Customer service, e-commerce, internal ops |
| Conversational BI | Head of analytics/BI, CTO | Development, retail, finance, industry |
| CV Inspection | Quality director, chief engineer, CTO | Manufacturing, food, metal, packaging |
| LLM Observability | MLOps/QA lead, CTO | SaaS, fintech, any LLM product |
| AI FinOps | CTO, CFO, Head of Platform | Enterprises with heavy inference |
| AI Security | CISO, security director | Banks, fintech, public sector, healthcare |
| Sentiment Intelligence | Head of marketing/PR/support | Retail, e-commerce, brands, HoReCa |
| AI Governance | CISO, legal, CDO | Banks, healthcare, public sector |

## Table 2.2. New services per article (2 each)

| Article | New service | Insert line |
|---|---|---|
| `ai-agents-era-chatbots-obsolescence` | `ai-infrastructure` | RU 31 / EN 31 |
| `ai-agents-era-chatbots-obsolescence` | `highload-backend` | RU 59 / EN 59 |
| `ai-agents-support-autonomy` | `corporate-ai-training` | RU 27 / EN 28 |
| `ai-agents-support-autonomy` | `software-development` | RU 55 / EN 56 |
| `computer-vision-line-review` | `highload-backend` | RU 19 |
| `computer-vision-line-review` | `software-development` | RU 41 |
| `conversational-bi-architecture` | `ai-infrastructure` | RU 14 / EN 14 |
| `conversational-bi-architecture` | `highload-backend` | RU 72 / EN 72 |
| `deterministic-rag-infrastructure` | `highload-backend` | RU 14 / EN 14 |
| `deterministic-rag-infrastructure` | `software-development` | RU 16 / EN 16 |
| `reviews-tone-monitoring` | `software-development` | RU 27 |
| `reviews-tone-monitoring` | `seo-aeo` | RU 43 |
| `system-one-primitives-agents` | `software-development` | RU 27 / EN 27 |
| `system-one-primitives-agents` | `corporate-ai-training` | RU 126 / EN 126 |

## Table 3. CTA and block (under the new services)

Draft links: `https://loginai.ru/{ru|en}/services/<slug>`. Insert as a new
sentence at the end of the paragraph on the given line.

| Service | Place | Lead-in + CTA (RU / EN) | Block linked |
|---|---|---|---|
| `deterministic-rag-systems` | chatbots, RU 31 / EN 31 | «Постоянный рост счёта за контекст лечится детерминированным RAG: 3–4 верифицированных фрагмента вместо всей истории. [Разработка детерминированных RAG-систем](https://loginai.ru/ru/services/deterministic-rag-systems).» / “A bill that grows with context is fixed by deterministic RAG: 3–4 verified fragments instead of the whole history. [Deterministic RAG systems](https://loginai.ru/en/services/deterministic-rag-systems).” | «Скрытая инфляция токенов» |
| `ai-infra-cost-optimization` | chatbots, RU 59 / EN 59 | «Оркестрация на DAG добавляет нагрузку. Считаем, сколько стоит контур, и срезаем избыточные вызовы. [Оптимизация ИИ-инфраструктуры и токенов](https://loginai.ru/ru/services/ai-infra-cost-optimization).» / “DAG orchestration adds load. We price the stack and cut redundant calls. [AI infrastructure and token optimization](https://loginai.ru/en/services/ai-infra-cost-optimization).” | «Где конвейер ломается» |
| `ai-crm-integration` | support-autonomy, RU 27 / EN 28 | «Агент останавливается и передаёт диалог, но только если видит историю клиента в CRM. [Интеграция ИИ с CRM](https://loginai.ru/ru/services/ai-crm-integration).» / “The agent stops and hands over, but only if it sees the customer history in the CRM. [AI and CRM integration](https://loginai.ru/en/services/ai-crm-integration).” | «Где нужен человек» |
| `ai-task-tracker-integration` | support-autonomy, RU 55 / EN 56 | «Правки в сценариях удобно вести задачами, а не в переписке. [Интеграция ИИ с таск-трекером](https://loginai.ru/ru/services/ai-task-tracker-integration).» / “Script changes are easier tracked as tickets than in chat. [AI and task-tracker integration](https://loginai.ru/en/services/ai-task-tracker-integration).” | «Что мы поменяли в сценариях» |
| `computer-vision-systems` | computer-vision, RU 19 | «Модель отсекает 96% брака, но её нужно собрать под геометрию конкретной линии. [Разработка систем компьютерного зрения](https://loginai.ru/ru/services/computer-vision-systems).» | «Что модель берёт на себя» |
| `anomaly-detection-systems` | computer-vision, RU 41 | «Ручные подтверждения оператора стоит превращать в поток данных, а не в бумажный журнал. [Системы обнаружения аномалий](https://loginai.ru/ru/services/anomaly-detection-systems).» | «Что дало ручное подтверждение» |
| `predictive-analytics-systems` | conversational-bi, RU 14 / EN 14 | «Диалог поверх BI упирается в слой моделей, который предсказывает, а не только читает данные. [Разработка систем предиктивной аналитики](https://loginai.ru/ru/services/predictive-analytics-systems).» / “Chat over BI hits the layer that predicts, not just reads data. [Predictive analytics systems](https://loginai.ru/en/services/predictive-analytics-systems).” | вводный блок |
| `ai-erp-integration` | conversational-bi, RU 72 / EN 72 | «Метрики живут в ERP, а не в BI-кубе; интеграция решает, откуда их брать. [Интеграция ИИ с ERP](https://loginai.ru/ru/services/ai-erp-integration).» / “Metrics live in the ERP, not the BI cube; the integration decides where they come from. [AI and ERP integration](https://loginai.ru/en/services/ai-erp-integration).” | «Слой анализа и хранения данных» |
| `ai-security-audit` | deterministic-rag, RU 14 / EN 14 | «Под нагрузкой видно не только задержку, но и границы доступа. [Аудит безопасности ИИ-систем](https://loginai.ru/ru/services/ai-security-audit).» / “Load exposes not only latency but access boundaries. [AI security audit](https://loginai.ru/en/services/ai-security-audit).” | вводный блок |
| `sovereign-model-deployment` | deterministic-rag, RU 16 / EN 16 | «Если данные не должны покидать контур, модели разворачиваются внутри. [Развёртывание суверенных моделей](https://loginai.ru/ru/services/sovereign-model-deployment).» / “If data must not leave the perimeter, the models run inside it. [Sovereign model deployment](https://loginai.ru/en/services/sovereign-model-deployment).” | вводный блок |
| `nlp-systems` | reviews, RU 27 | «Три слоя — это задача обработки естественного языка, а не настройка дашборда. [Разработка систем обработки естественного языка](https://loginai.ru/ru/services/nlp-systems).» | «Что работает на практике» |
| `ai-cms-integration` | reviews, RU 43 | «Отзывы живут в CMS, маркетплейсах и соцсетях; их нужно собирать в одном месте. [Интеграция ИИ с CMS](https://loginai.ru/ru/services/ai-cms-integration).» | «Как читать метрику негатива» |
| `mlops-platforms` | system-one, RU 27 / EN 27 | «Пороги и примитивы нужно версионировать, логировать и катить как код. [Разработка MLOps-платформ](https://loginai.ru/ru/services/mlops-platforms).» / “Thresholds and primitives need versioning, logging, and shipping as code. [MLOps platform development](https://loginai.ru/en/services/mlops-platforms).” | «Анатомия примитивов Jev» |
| `ai-security-audit` | system-one, RU 126 / EN 126 | «Риск-гейт — часть периметра безопасности, а не разовая проверка. [Аудит безопасности ИИ-систем](https://loginai.ru/ru/services/ai-security-audit).» / “The risk gate is part of the security perimeter, not a one-off check. [AI security audit](https://loginai.ru/en/services/ai-security-audit).” | «Заключение» |

No article source (catalog-only links): `recommendation-systems`,
`speech-recognition-systems`, `reinforcement-learning-systems`.

## Table 4. New cases (drafts)

| Name | Technology | Category |
|---|---|---|
| AEO: brand visibility in AI answers | Schema.org, AEO markup, LLM monitoring, GA4/GSC | Ad agencies |
| Comment sentiment scoring | LLM classifier, rules, manual sampling, dashboard | Ad agencies / business owners |
| Fixing data distortion in a client ERP | ETL, dedup, reference-data validation, audit log, source reconciliation | Business owners / manufacturers |
| CV packaging inspection at 99+% accuracy | Segmentation/YOLO, edge inference, camera pipeline, defect labeling | Manufacturers |

## Table 5. New services (drafts)

| Service | Slug | B2B user | Industry |
|---|---|---|---|
| AI + task-tracker integration | `ai-task-tracker-integration` | Dev lead, PMO | IT teams, product companies |
| AI + ERP integration | `ai-erp-integration` | CFO/COO, CIO | Manufacturing, retail, logistics |
| AI + CRM integration | `ai-crm-integration` | Sales director, CRO | B2B sales, services, SaaS |
| AI + CMS integration | `ai-cms-integration` | Content/marketing lead | Media, e-commerce, corporate sites |
| AI infrastructure and token optimization | `ai-infra-cost-optimization` | CTO, CFO | Enterprises with LLM load |
| Sovereign model deployment | `sovereign-model-deployment` | CTO, CISO | Banks, public sector, healthcare |
| Deterministic RAG systems | `deterministic-rag-systems` | CTO, knowledge lead | Enterprise knowledge bases |
| AI security audit | `ai-security-audit` | CISO, security director | Banks, fintech, public sector |
| Computer vision systems | `computer-vision-systems` | Quality director, CTO | Manufacturing, logistics, retail |
| Predictive analytics systems | `predictive-analytics-systems` | CDO, analytics lead | Manufacturing, retail, finance |
| Natural language processing systems | `nlp-systems` | Product lead, CTO | Media, support, e-commerce |
| Recommendation systems | `recommendation-systems` | Head of product, CDO | E-commerce, media, EdTech |
| Speech recognition systems | `speech-recognition-systems` | CTO, contact-center lead | Contact centers, media, healthcare |
| Anomaly detection systems | `anomaly-detection-systems` | CISO, operations lead | Fintech, telecom, industry |
| Reinforcement learning systems | `reinforcement-learning-systems` | CTO, R&D lead | Logistics, robotics, games |
| MLOps platforms | `mlops-platforms` | MLOps lead, CTO | Products with ML/LLM |

## 6. Top menu restructure

Target structure:

| Item | Type | Children |
|---|---|---|
| Home | link `/` | — |
| Solutions | menu `/solutions` | existing |
| Services | menu `/services` | existing |
| Cases | link `/cases` | — |
| **Company** | menu | News `/news`, Team `/team`, Contacts `/contacts`, Investors `/investors` |

Required code changes:

- `src/shared/i18n/{ru,en}/ui.ts`: add `menu.company`, `menu.team`.
- `src/widgets/app-bar/model/nav.ts`: make `NavItem.path` optional; add optional
  `NavChild.path`; `childPath` prefers `child.path`; key items by `titleKey`.
- `src/widgets/app-bar/ui/molecules/NavChildrenList.tsx`: render children even
  without `allKey` (only the "all" link needs it).
- `src/widgets/app-bar/ui/molecules/NavDropdown.tsx` + organisms: a dropdown
  without `path` renders a button trigger, active state = any child matches.
- New page `src/pages/[lang]/team.astro` + `teamPage` i18n, otherwise the
  `/team` link 404s and `verify:dist` fails.

## 7. Publication gates (`draft` + `updatedAt` + link plugin)

Goal: an article may link to an entity that is not published yet, and the build
stays green; the link appears by itself once the entity is published.

### Fields

Two fields on every entity — article frontmatter and the service/solution/case
fixture objects:

- `draft: boolean` (default `false`) — the page is not generated.
- `updatedAt?: Date` — when the content last changed.

### Build behavior

- `B.draft === true` → B's page is not generated; every block relation to B
  (article `relatedServices|Solutions|Cases`, entity `relevants`) is dropped by
  the resolver, so there is no broken card and no 404.
- `A.draft === true` → article A is not generated.
- Inline links in article markdown are handled by a post-build pass
  (`astro:build:done` integration): it resolves each internal link — both
  `/path` and `https://loginai.ru/path`, since `verify:dist` only checks the
  relative form — and when the target is `draft` it unwraps `<a>` to plain
  text. When the target is published the link stays. This runs after Astro
  emits HTML, so it is independent of the Markdown processor: Astro 7 uses
  Sätteri for content collections and its processor plugins do not cross into
  the content layer.
- `B.updatedAt > A.updatedAt` while A links B → A is listed as "needs review"
  (report only, never a build failure).

Publication is a state flip (`draft: false`) that takes effect on the next
build — no dates, no cron.

### Files to touch

- `src/content.config.ts`: add `updatedAt` (`draft` already exists for news).
- `src/entities/{service,solution,case}/model/*.ts`: add `draft?`, `updatedAt?`.
- Getters (`getServices`/`getSolutions`/`getCases`, `getXBySlug`): filter
  `!draft`.
- `src/features/relevant-items/ui/RelevantCard.tsx` (`resolveRelevantRef`): drop
  a ref whose target is `draft`.
- `src/app/markdown/dropDraftLinks.ts` (path + availability helpers) and
  `src/app/integrations/dropDraftLinks.ts` (the post-build pass); register the
  integration in `astro.config.ts` and add `paths` to `tsconfig.node.json` so
  the config can import `@/`.
- Optional `test/relations.test.ts`: report `updatedAt` staleness.

## Verification

```
npm run lint
npm run test
npm run verify
```

`test/astro-content.test.ts` and Biome are clean after the manufacturers fix.
