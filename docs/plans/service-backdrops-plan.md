# Service Backdrops — Backlog (generation deferred)

Image-generation budget is exhausted. Generated 2 of the 4 requested backdrops;
the remaining generation prompts were removed (no active requests).

Publishing rule: a service leaves `draft` only when its backdrop exists. So only
`ai-crm-integration` and `deterministic-rag-systems` are published; the other 15
stay `draft: true` until their image is generated. A service page without a
backdrop still builds (icon fallback, no `og:image`), but we keep it hidden.

Template (when generation resumes): `docs/images/service-backdrop-prompt.txt`
(`Service` / `Topic` / `keywords` / `Visual idea`). Conventions:
`src/shared/assets/images/services/README.md` (1200×630 PNG, 16:9, no text, calm
lower third, subject in the upper two-thirds).

## Generated

| slug | file |
|---|---|
| `ai-crm-integration` | `src/shared/assets/images/services/ai-crm-integration.png` |
| `deterministic-rag-systems` | `src/shared/assets/images/services/deterministic-rag-systems.png` |

## Backlog (15 services without a backdrop)

Order = catalog group order (`groupServices.ts`).

| slug | RU name | group |
|---|---|---|
| `ai-task-tracker-integration` | Интеграция ИИ с таск-трекером | ai-integrations |
| `ai-erp-integration` | Интеграция ИИ с ERP | ai-integrations |
| `ai-cms-integration` | Интеграция ИИ с CMS | ai-integrations |
| `ai-infrastructure` | ИИ-инфраструктура и RAG | ai-infra |
| `ai-infra-cost-optimization` | Оптимизация ИИ-инфраструктуры и токенов | ai-infra |
| `sovereign-model-deployment` | Развёртывание суверенных моделей | ai-infra |
| `ai-security-audit` | Аудит безопасности ИИ-систем | ai-infra |
| `computer-vision-systems` | Компьютерное зрение | ml |
| `predictive-analytics-systems` | Предиктивная аналитика | ml |
| `anomaly-detection-systems` | Обнаружение аномалий | ml |
| `mlops-platforms` | MLOps-платформы | ml |
| `nlp-systems` | Обработка естественного языка | ml |
| `recommendation-systems` | Системы рекомендаций | ml |
| `speech-recognition-systems` | Распознавание речи | ml |
| `reinforcement-learning-systems` | Обучение с подкреплением | ml |

## When a backdrop is added

1. Save as `src/shared/assets/images/services/<slug>.png`.
2. Remove the slug from this backlog and from the "Awaiting generation" table in
   `src/shared/assets/images/services/README.md`.
3. `npm run verify` — the PNG is rasterized to a 1200×630 `og:image`; `verify:dist`
   must stay green.
