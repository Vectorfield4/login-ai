# Service richness audit — done (2026-10-06)

TDD-гейт насыщенности услуг: правила «слабости» в `test/service-richness.test.ts`
(жёсткие для опубликованных, warnings для драфтов и мягких правил) и секция
richness в `audit.mjs`. Baseline-ratchet прошёл до нуля.

## Done

- `test/service-richness.test.ts` — каталог правил как данные; опубликованные
  обязаны проходить все правила, драфты и мягкие правила дают warnings.
  `diagram-resolves` читает `src/shared/assets/images/diagrams/` и ловит
  неверный слаг схемы.
- Правила — базовые: `features>=4`, `process>=4`, `fit>=2+negative`,
  `relevants>=3+2types`, `specialty>=2`, `result-block`, `faq>=4`,
  `block>=3items`, `diagram-resolves`; групповые: `ml|ai-infra:mechanism+diagram`,
  `ai-integrations:deliverables` / `:tradeoffs`,
  `engineering:techstack+(scope|mechanism)`, `web-growth:outcomes`,
  `training:outcomes` / `training:faq>=5`. Мягкое (warning): `proof>=2`.
- `audit.mjs` — секция richness: `draft` и мягкие правила `⚠`, остальные у
  опубликованных `✗`; секционный разбор backlog в `audit.mjs` / `publish.mjs`.
- Baseline (`test/richness-baseline.ts`) прошёл от 15 записей до 0 и удалён;
  правила безусловны.
- Диаграммы: 8 услуг, 10 пар `.mmd` → light/dark SVG —
  `computer-vision-systems`, `ai-infrastructure`, `anomaly-detection-systems`,
  `ai-security-audit`, `sovereign-model-deployment`,
  `ai-infra-cost-optimization`, `predictive-analytics-systems`, `mlops-platforms`.
- Долг закрыт: `highload-backend` (outcomes, faq), `corporate-websites` /
  `landing-pages` (relevants), `corporate-ai-training` (faq),
  `ai-infrastructure` (deliverables, faq), `ai-task-tracker-integration`
  (deliverables), `seo-aeo` / `ai-erp-integration` (relevants).

## Acceptance criteria

- [x] Каталог правил — данные; добавление правила = строка.
- [x] Опубликованные проходят все правила; драфты и мягкие правила не валят suite.
- [x] `diagram-resolves` проверяет light/dark SVG для каждого слага.
- [x] Аудит печатает richness как warnings (драфты) / errors (опубликованные).
- [x] Baseline доведён до нуля и удалён; правила безусловны.

## Verification

`lint` clean; `test` 294 passed / 0 failed; `verify` 124 страницы, `verify:dist` ok.

## References

- Коммиты: `3fda3d9` гейт + audit, `83cec55` proof→warning, `bd1771b` /
  `46bfe01` / `2b52dd3` / `06f0712` / `cc4669e` диаграммы и копирайт, `7071f1c`
  baseline → 0.
- Тест: `test/service-richness.test.ts`. Скилл: `.opencode/skills/publish-service`.
