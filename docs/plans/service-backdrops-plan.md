# Service Backdrops — Backlog (generation deferred)

Image-generation budget is exhausted. 8 backdrops are generated; the reusable
prompt lives in `docs/images/service-backdrop-prompt.txt` (no active requests).

Publishing rule: a service leaves `draft` only when its backdrop exists and its
copy passes the volume gate in `test/prose-quality.test.ts` (RU ≥ 700 words, EN
≥ 90% of RU). Live now: the 7 original services, the 3 earlier backdrops
(`ai-crm-integration`, `deterministic-rag-systems`, `ai-infrastructure`), and
this batch (`ai-security-audit`, `computer-vision-systems`,
`sovereign-model-deployment`, `ai-erp-integration`,
`ai-task-tracker-integration`). The other 9 stay `draft: true` until their image
is generated. A service page without a backdrop still builds (icon fallback, no
`og:image`), but we keep it hidden.

Template (when generation resumes): `docs/images/service-backdrop-prompt.txt`
(`Service` / `Topic` / `keywords` / `Visual idea`). Conventions:
`src/shared/assets/images/services/README.md` (1200×630 PNG, 16:9, no text, calm
lower third, subject in the upper two-thirds).

## Generated

| slug | file |
|---|---|
| `ai-crm-integration` | `src/shared/assets/images/services/ai-crm-integration.png` |
| `deterministic-rag-systems` | `src/shared/assets/images/services/deterministic-rag-systems.png` |
| `ai-infrastructure` | `src/shared/assets/images/services/ai-infrastructure.png` |
| `ai-security-audit` | `src/shared/assets/images/services/ai-security-audit.png` |
| `computer-vision-systems` | `src/shared/assets/images/services/computer-vision-systems.png` |
| `sovereign-model-deployment` | `src/shared/assets/images/services/sovereign-model-deployment.png` |
| `ai-erp-integration` | `src/shared/assets/images/services/ai-erp-integration.png` |
| `ai-task-tracker-integration` | `src/shared/assets/images/services/ai-task-tracker-integration.png` |

## Backlog (9 services without a backdrop)

Order = catalog group order (`groupServices.ts`).

| slug | RU name | group |
|---|---|---|
| `ai-cms-integration` | Интеграция ИИ с CMS | ai-integrations |
| `ai-infra-cost-optimization` | Оптимизация ИИ-инфраструктуры и токенов | ai-infra |
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
