# Service richness audit — план (2026-10-06)

Аудит публикации (`audit.mjs` + `test/`) проверяет готовность к выходу из
draft — обложка, объём RU/EN, паритет, relevants-цели, доки. Насыщенность
услуги (сколько типовых блоков, глубина пунктов, диаграммы, доказательства) не
измеряется. Цель — ввести правила «слабости» в TDD (жёсткие гейты) и в
`audit.mjs` (warnings), с ratchet-механизмом: долг фиксируется и только убывает.

## Статус

Внедрено (2026-10-06): `test/service-richness.test.ts` + `test/richness-baseline.ts`
(ratchet: 4 теста — гейт опубликованных, отсутствие устаревших записей,
валидность baseline, warnings для драфтов); секция richness в `audit.mjs`
(драфты — `⚠`, опубликованные — `✗`). Осталось: докручивать долг по услугам и
генерировать диаграммы.

## Решения

- **Амбициозно.** Базовые правила жёсткие для опубликованных услуг, групповые —
  строже.
- **`relevants` (≥3 и ≥2 типов) и `proof ≥2` — гейты** в TDD.
- **Диаграммы по смыслу**: где в `mechanism` есть конвейер/этапы, есть схема.
- **Драфты не дают ошибок**, только warnings. Опубликованные — ошибки.
- **Ratchet**: текущий долг фиксируется baseline-списком; запись живёт, пока
  правило нарушено, и удаляется вместе с фиксом. Пустой baseline = правила
  безусловны.

## Правила

Ниже — предлагаемый каталог. `published → error`, `draft → warning`.

### Базовые (все услуги)

| id | правило |
|---|---|
| `features>=4` | `features.length ≥ 4` |
| `process>=4` | `processSteps.length ≥ 4` и у каждого `processType` |
| `fit>=2+neg` | `fitItems.length ≥ 2` и есть `positive: false` |
| `proof>=2` | `proofItems.length ≥ 2` (с `metricValue`/`metricLabel`) |
| `relevants>=3+2types` | `relevants.length ≥ 3` и ≥2 разных `type` |
| `specialty>=2` | ≥2 блока из `tradeoffs/outcomes/mechanism/scope/deliverables` |
| `result-block` | есть `outcomes` или `deliverables` |
| `faq>=4` | `faqItems.length ≥ 4` |
| `block>=3items` | любой присутствующий specialty-блок ≥3 пунктов |
| `diagram-resolves` | для каждого `mechanism[].diagram` есть `<svg>` + `.dark.svg` для RU и EN |

### Групповые (строже)

| id | условие | правило |
|---|---|---|
| `ml\|ai-infra:mechanism+diagram` | `group ∈ {ml, ai-infra}` | есть `mechanism` и ≥1 `diagram` |
| `ai-integrations:deliverables` | `group = ai-integrations` | есть `deliverables` |
| `ai-integrations:tradeoffs` | `group = ai-integrations` | есть `tradeoffs` |
| `engineering:techstack+(scope\|mechanism)` | `group = engineering` | есть `techStack` ≥1 группа и (`scope` или `mechanism`) |
| `web-growth:outcomes` | `group = web-growth` | есть `outcomes` |
| `training:outcomes` | `group = training` | есть `outcomes` |
| `training:faq>=5` | `group = training` | `faqItems.length ≥ 5` |

## Текущий долг (baseline на 2026-10-06)

Опубликованные (15) — все нарушают минимум `proof>=2`:

| slug | group | нарушено |
|---|---|---|
| `software-development` | engineering | proof>=2 |
| `highload-backend` | engineering | proof>=2, result-block, faq>=4 |
| `corporate-websites` | web-growth | proof>=2, relevants>=3+2types |
| `landing-pages` | web-growth | proof>=2, relevants>=3+2types |
| `seo-aeo` | web-growth | proof>=2, relevants>=3+2types |
| `information-monitoring` | web-growth | proof>=2 |
| `corporate-ai-training` | training | proof>=2, training:faq>=5 |
| `ai-infrastructure` | ai-infra | proof>=2, specialty>=2, result-block, faq>=4, ml\|ai-infra:mechanism+diagram |
| `ai-crm-integration` | ai-integrations | proof>=2 |
| `ai-task-tracker-integration` | ai-integrations | proof>=2, ai-integrations:deliverables |
| `ai-erp-integration` | ai-integrations | proof>=2, relevants>=3+2types |
| `deterministic-rag-systems` | ai-infra | proof>=2 |
| `ai-security-audit` | ai-infra | proof>=2, ml\|ai-infra:mechanism+diagram |
| `sovereign-model-deployment` | ai-infra | proof>=2, relevants>=3+2types, ml\|ai-infra:mechanism+diagram |
| `computer-vision-systems` | ml | proof>=2, ml\|ai-infra:mechanism+diagram |

Драфты (9) — только warnings (2–4 нарушения каждый):
`ai-cms-integration`, `ai-infra-cost-optimization`, `predictive-analytics-systems`,
`anomaly-detection-systems`, `mlops-platforms`, `nlp-systems`,
`recommendation-systems`, `speech-recognition-systems`,
`reinforcement-learning-systems`.

Первые дешёвые победы: `proof>=2` (второе доказательство) снимает нарушение у
всех 15; `faq>=4` — у `highload-backend` и `ai-infrastructure`.

## TDD

`test/service-richness.test.ts`:

- Каталог правил — данные (`{ id, ok(service) }`), добавление правила = строка.
- Опубликованные: нарушение вне baseline → **fail**; в baseline → проходит.
- Драфты: нарушения собираются в warning-репорт, suite не валят.
- `test/richness-baseline.ts` — карта `slug → ruleId[]`.
- Тест «stale baseline»: падает, если запись больше **не** нарушается — значит
  правило докрутили, строку надо удалить. Это и есть механизм ужесточения.
- `diagram-resolves` читает `src/shared/assets/images/diagrams/` (сейчас это
  единственный тест, который поймал бы неверный слаг диаграммы).

## Аудит

`audit.mjs` расширяется секцией richness: печатает матрицу `slug × правила`,
`draft`-нарушения как `warn`, `published` как `error`. Человеческий отчёт перед
коммитом; источник правды — тест.

## Rollout

1. Внести тест + baseline → suite зелёный, долг зафиксирован.
2. Закрывать по услуге и удалять строки baseline (`proof`, `faq`, блоки,
   relevants).
3. Диаграммы: `.mmd` для ml/ai-infra и услуг с конвейером → `npm run diagrams` →
   `diagram` в `mechanism`.
4. Когда baseline пуст — вынуть механизм baseline, правила безусловны.

## Открытые вопросы

- `engineering:techstack+(scope|mechanism)` — оставить ли `mechanism`
  обязательным для `engineering`, или хватит `scope`.
- Диаграммы: сколько минимум на `mechanism` (одна на блок или на каждый
  конвейерный этап).
- Нужны ли per-entity правила-аналоги для `solutions` (объём там уже 1000 слов
  без теста).
