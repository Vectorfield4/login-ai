# Service catalog expansion: intent map

Status: draft, qualitative. No keyword or analytics tools are available.
Priorities come from competitor coverage and our readiness. Companion to
`docs/plans/service-catalog-expansion.md`. Started 2026-10-18.

## How to use

- One primary query per URL. Secondary queries are supporting, not a second H1.
- Choose the query from competitor pages and the job the page must do, then
  ship.
- Query language is Russian for the RU page. The EN mirror uses the English
  primary query and a direct translation of the intent, not a separate keyword
  strategy, except for platform pages where the RU brand dominates.
- A page that cannot name a primary query does not ship.

## Page type rules

| Type | Owns | Does not own |
|---|---|---|
| Service | разработка/внедрение конкретного оффера | отраслевой запрос, общий SEO-запрос |
| Platform service | бренд платформы + AI | общий CRM/ERP-запрос |
| Solution | AI для отрасли или функции | разработка конкретного модуля |
| Hub | комбинированный запрос | дочерние запросы |
| Group | категория | коммерческий запрос услуги |
| Direction | обзор направления | коммерческий запрос |
| Article | как, что, сравнение | внедрение и стоимость |
| Case | доказательство | продажа услуги |

## Competitor coverage scoring

| Signal | Weight |
|---|---|
| 3+ competitors have a page | P1 |
| 1-2 competitors have a page | P2 |
| no competitor has a page | P3, backlog |
| pricing, cases, 1000+ words, subpages | raises priority |
| we already have an article, case or solution | raises priority |

The score tells us what the market already sells.

## Service intents

### Agents and assistants

| URL | Primary RU | Secondary RU | EN | Priority |
|---|---|---|---|---|
| `/services/ai-agents` | разработка AI-агентов | AI-агент для бизнеса, внедрение AI-агентов, заказать AI-агента, AI-агент на заказ | AI agent development | P1 |
| `/services/ai-chatbots` | разработка чат-ботов для бизнеса | чат-бот с ИИ, ИИ чат-бот для бизнеса, чат-бот для Telegram, чат-бот для WhatsApp | AI chatbot development | P1 |
| `/services/ai-voice-agents` | голосовой робот для бизнеса | голосовой AI-агент, робот для входящих звонков, робот для обзвона, голосовой бот для колл-центра | AI voice agent | P1 |
| `/services/corporate-copilot` | корпоративный AI-ассистент | ИИ-ассистент для сотрудников, поиск по базе знаний, корпоративный копилот | enterprise AI copilot | P1 |
| `/services/ai-support-automation` | автоматизация поддержки клиентов | ИИ для поддержки, автоматизация первой линии, helpdesk AI | AI customer support automation | P1 |
| `/services/speech-analytics` | речевая аналитика | речевая аналитика звонков, анализ качества звонков, ИИ для контроля качества | speech analytics | P1 |
| `/services/ai-sales-agents` | AI-агент для продаж | ИИ для отдела продаж, автоматизация квалификации лидов, AI SDR | AI sales agent | P1 |
| `/services/ai-recruiter` | AI-рекрутер | ИИ для рекрутинга, автоматизация скрининга, AI рекрутинг | AI recruiter | P1 |
| `/services/ai-workflow-automation` | автоматизация бизнес-процессов с ИИ | ИИ-автоматизация, автоматизация рутины, AI workflow | AI workflow automation | P1 |

### Data and models

| URL | Primary RU | Secondary RU | EN | Priority |
|---|---|---|---|---|
| `/services/data-engineering` | инженерия данных | построение хранилища данных, ETL пайплайны, dbt, Airflow | data engineering | P2 |
| `/services/data-annotation` | разметка данных для ИИ | аутсорсинг разметки данных, разметка текста, разметка изображений, RLHF | data annotation services | P2 |
| `/services/synthetic-data` | синтетические данные | генерация синтетических данных, синтетика для обучения моделей | synthetic data | P2 |
| `/services/data-readiness-audit` | аудит данных для ИИ | аудит качества данных, подготовка данных для AI, data readiness | AI data readiness audit | P2 |
| `/services/conversational-bi` | чат с данными | разговорная аналитика, аналитика на естественном языке, text-to-SQL | conversational BI | P2 |
| `/services/llm-fine-tuning` | дообучение LLM | fine-tuning LLM, дообучение модели на своих данных, LoRA, SFT | LLM fine-tuning | P2 |
| `/services/llm-evaluation` | оценка качества LLM | тестирование LLM, LLM evaluation, red teaming, галлюцинации | LLM evaluation | P2 |
| `/services/ai-forecasting` | прогнозирование спроса | AI-прогнозирование продаж, прогноз нагрузки, прогнозирование запасов | demand forecasting AI | P2 |

### Infrastructure and security

| URL | Primary RU | Secondary RU | EN | Priority |
|---|---|---|---|---|
| `/services/ai-security-gateway` | защита AI-приложений | prompt injection, защита от утечек в LLM, AI security | AI security gateway | P2 |

### Engineering and integrations

| URL | Primary RU | Secondary RU | EN | Priority |
|---|---|---|---|---|
| `/services/ai-1c-integration` | AI для 1С | ИИ для 1С, AI-ассистент для 1С, внедрение ИИ в 1С, 1С и нейросети | AI for 1C | P1 |
| `/services/ai-bitrix24-integration` | AI для Bitrix24 | AI-бот для Bitrix24, нейросеть в Bitrix24, автоматизация Bitrix24 | AI for Bitrix24 | P1 |
| `/services/ai-amocrm-integration` | AI для amoCRM | AI-бот для amoCRM, нейросеть в amoCRM, автоматизация amoCRM | AI for amoCRM | P1 |
| `/services/ai-telegram-max` | AI-бот для Telegram | чат-бот для бизнеса в Telegram, бот для MAX, Telegram mini app | AI bot for Telegram and MAX | P1 |
| `/services/ai-n8n-make` | автоматизация n8n | n8n внедрение, Make автоматизация, low-code автоматизация | n8n and Make automation | P1 |
| `/services/document-processing` | обработка документов ИИ | распознавание документов, извлечение данных из документов, IDP, OCR для документов | intelligent document processing | P2 |
| `/services/ai-application-rescue` | аудит AI-проекта | спасение AI-проекта, почему AI-пилот не работает, доработка AI-решения | AI project rescue | P2 |

### Content and growth

| URL | Primary RU | Secondary RU | EN | Priority |
|---|---|---|---|---|
| `/services/prompt-engineering` | промпт-инжиниринг для бизнеса | разработка промптов, библиотека промптов, prompt engineering | prompt engineering for business | P3 |
| `/services/seo` | SEO-продвижение | SEO-аудит, продвижение сайта, техническое SEO, семантика | SEO services | P1 |
| `/services/aeo` | AEO-оптимизация | оптимизация под ответы, answer engine optimization, сниппеты, FAQ-разметка | answer engine optimization | P1 |
| `/services/geo-ai-search` | продвижение в нейросетях | GEO продвижение, продвижение сайта в нейросетях, видимость в ChatGPT | generative engine optimization | P1 |
| `/services/ai-for-site` | AI-ассистент для сайта | чат-бот для сайта, умный поиск по сайту, квалификация лидов на сайте, AI на сайт | AI for website | P1 |

### Strategy, governance and training

| URL | Primary RU | Secondary RU | EN | Priority |
|---|---|---|---|---|
| `/services/ai-consulting` | AI-консалтинг | внедрение ИИ в бизнес, AI-стратегия, дорожная карта AI | AI consulting | P2 |
| `/services/ai-readiness-audit` | аудит готовности к AI | оценка зрелости AI, AI readiness assessment, ROI AI | AI readiness assessment | P2 |
| `/services/ai-governance-compliance` | AI governance | комплаенс AI, EU AI Act, ISO 42001, политика использования AI | AI governance and compliance | P2 |
| `/services/ai-pilot` | AI-пилот | пилотный проект AI, пилот за 6 недель, proof of concept AI | AI pilot | P3 |
| `/services/ai-center-of-excellence` | AI-центр компетенций | центр компетенций по ИИ, AI CoE, внутренняя команда AI | AI center of excellence | P3 |

## Solution intents

| URL | Primary RU | Secondary RU | EN | Priority |
|---|---|---|---|---|
| `/solutions/recruiting` | AI для рекрутинга | автоматизация рекрутинга, ИИ в HR, скрининг кандидатов | AI for recruiting | P2 |
| `/solutions/sales` | AI для отдела продаж | ИИ в продажах, автоматизация продаж, AI SDR | AI for sales | P2 |
| `/solutions/customer-support` | AI для поддержки клиентов | автоматизация поддержки, ИИ в клиентском сервисе, контакт-центр AI | AI for customer support | P2 |
| `/solutions/legal` | AI для юристов | ИИ в юридической фирме, анализ договоров AI, due diligence AI | AI for legal | P2 |
| `/solutions/finance` | AI для финансов | ИИ в финансах, автоматизация финансов, финансовый анализ AI | AI for finance | P2 |
| `/solutions/ecommerce` | AI для e-commerce | ИИ для интернет-магазина, персонализация в e-commerce, AI для маркетплейсов | AI for ecommerce | P2 |
| `/solutions/logistics` | AI для логистики | ИИ в логистике, оптимизация маршрутов, прогнозирование спроса | AI for logistics | P2 |
| `/solutions/education` | AI для образования | ИИ в образовании, EdTech AI, персонализация обучения | AI for education | P3 |
| `/solutions/construction` | AI для строительства | ИИ в строительстве, контроль стройки, сметы AI | AI for construction | P3 |
| `/solutions/real-estate` | AI для недвижимости | ИИ в недвижимости, подбор объектов, квалификация лидов | AI for real estate | P3 |
| `/solutions/restaurants` | AI для ресторанов | ИИ в ресторанном бизнесе, автоматизация закупок, анализ меню | AI for restaurants | P3 |

## Hubs and directions

| URL | Primary RU | Owns | Notes |
|---|---|---|---|
| `/services/seo-aeo` | SEO, AEO и GEO | комбинированное продвижение в поиске и нейросетях | hub and combined program with price, calculator and packages |
| `/services/group/web-growth` | веб и рост | категория веб-разработки и роста | links to seo, aeo, geo, ai-for-site |
| `/services/direction/agents` | агенты и ассистенты | обзор направления | links to groups and services |
| `/services/direction/data-models` | данные и модели | обзор направления | links to groups and services |
| `/services/direction/infra-security` | инфраструктура и безопасность | обзор направления | links to groups and services |
| `/services/direction/engineering` | инженерия и интеграции | обзор направления | links to groups and services |
| `/services/direction/content-growth` | контент и рост | обзор направления | links to groups and services |
| `/services/direction/strategy-governance` | стратегия, governance и обучение | обзор направления | links to groups and services |

## Query ownership matrix

| Overlap | Rule |
|---|---|
| `seo-aeo` vs `seo`, `aeo`, `geo-ai-search` | Hub owns the combined query. Children own their specific query. Hub links down, children link up. |
| `ai-chatbots` vs `ai-for-site` | Chatbots own channel-agnostic bot development. `ai-for-site` owns the site layer: widget, smart search, lead qualification, personalization. "Чат-бот для сайта" belongs to `ai-for-site`. |
| `ai-agents` vs `ai-workflow-automation` vs `ai-n8n-make` | Agents own autonomous agents with tools. Workflow owns process automation. `ai-n8n-make` owns the low-code platform. |
| `ai-crm-integration` vs `ai-bitrix24-integration` vs `ai-amocrm-integration` | Generic CRM page owns the cross-system query and links to brand pages. Brand pages own platform queries. |
| `ai-erp-integration` vs `ai-1c-integration` | Same rule: generic ERP page links to the 1C page. |
| `speech-recognition-systems` vs `speech-analytics` vs `ai-voice-agents` | ASR owns recognition. Speech analytics owns call quality and QA. Voice agents own calls. |
| `predictive-analytics-systems` vs `ai-forecasting` vs `conversational-bi` | Predictive owns custom ML models. Forecasting owns demand, sales and load. BI owns natural-language analytics. |
| `data-annotation` vs `synthetic-data` | Annotation owns labeling real data. Synthetic owns generated data. |
| `ai-security-audit` vs `ai-security-gateway` vs `ai-governance-compliance` | Audit owns assessment. Gateway owns runtime protection. Governance owns policy, risk and compliance. |
| `ai-consulting` vs `ai-readiness-audit` vs `ai-pilot` vs `ai-center-of-excellence` | Consulting owns strategy and roadmap. Readiness owns assessment. Pilot owns a fixed proof. CoE owns the operating model. |
| Industry solution vs task service | Solution owns "AI для отрасли/функции". Service owns "разработка/внедрение оффера". Solutions link to services, not the other way for the same query. |
| `content-generation` vs modality services | Text owns text. Image, video and voice own their modality. |
| `corporate-ai-training` vs specific training | Corporate owns the broad program. Specific programs own their direction. |
| `prompt-engineering` vs `ai-text-training` | Prompt engineering owns the deliverable and prompt library. Training owns teaching people. |

## Content clusters

| Cluster | Articles | Links to |
|---|---|---|
| Agents | AI-агент vs чат-бот, сколько стоит AI-агент, как оценить AI-агента, MCP для бизнеса | ai-agents, ai-chatbots, ai-governance-compliance |
| Voice | голосовой робот vs колл-центр, как считают стоимость минуты, речевая аналитика vs контроль качества | ai-voice-agents, speech-analytics |
| Data | data readiness, разметка для LLM, синтетика без утечек, RAG vs fine-tuning | data-engineering, data-annotation, synthetic-data, llm-fine-tuning |
| Models | как оценивать LLM, LoRA vs SFT, fine-tuning vs RAG | llm-evaluation, llm-fine-tuning, deterministic-rag-systems |
| Governance | EU AI Act для бизнеса, ISO 42001, prompt injection | ai-governance-compliance, ai-security-gateway, ai-security-audit |
| Platforms | AI для 1С, ChatGPT в Bitrix24, n8n vs Make, Telegram vs MAX | ai-1c-integration, ai-bitrix24-integration, ai-n8n-make, ai-telegram-max |
| Search | SEO vs AEO vs GEO, как попасть в ответы ChatGPT, llms.txt | seo, aeo, geo-ai-search, seo-aeo |
| Industries | AI в рекрутинге, AI в поддержке, AI в юридической фирме, AI в логистике | recruiting, customer-support, legal, logistics |

Existing articles already cover part of this: `rag-vs-finetuning`,
`prompt-injection-defense`, `conversational-bi-architecture`,
`ai-agents-era-chatbots-obsolescence`, `ai-agents-support-autonomy`,
`system-one-primitives-agents`, `crm-agent-card-automation`,
`speech-recognition-domain`, `voice-cloning-boundaries`. Wire them to the new
pages before writing new ones.

## Validation plan

1. Score competitor coverage and page depth.
2. Map competitor URLs to queries and note gaps.
3. Treat the map as a working draft. Do not block Wave 1 on approval.
4. Re-check the map after 90 days and move queries between pages if needed.

## Open items

- The map needs a final review against the existing pages.
