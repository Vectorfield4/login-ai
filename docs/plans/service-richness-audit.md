# Service richness audit — done (2026-10-06)

Аудит публикации (`audit.mjs` + `test/`) проверяет готовность к выходу из
draft — обложка, объём RU/EN, паритет, relevants-цели, доки. Насыщенность
услуги (сколько типовых блоков, глубина пунктов, диаграммы, доказательства) не
измерялась. Введены правила «слабости» в TDD (жёсткие гейты) и в `audit.mjs`
(warnings), с ratchet-механизмом. Долг докручен до нуля.

## Статус

Внедрено и закрыто (2026-10-06): `test/service-richness.test.ts` (гейт
опубликованных + warnings для драфтов и мягких правил); секция richness в
`audit.mjs` (драфты — `⚠`, опубликованные — `✗`). Baseline-ratchet прошёл до
нуля и удалён — правила безусловны. Диаграммы добавлены 8 услугам (10 пар
`.mmd` → light/dark SVG). `proof>=2` переведён в мягкое правило.

## Решения

- **Амбициозно.** Базовые правила жёсткие для опубликованных услуг, групповые —
  строже.
- **`relevants` (≥3 и ≥2 типов) — гейт** в TDD; **`proof ≥2` — мягкое правило
  (warning)**, suite не валит.
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
| `relevants>=3+2types` | `relevants.length ≥ 3` и ≥2 разных `type` |
| `specialty>=2` | ≥2 блока из `tradeoffs/outcomes/mechanism/scope/deliverables` |
| `result-block` | есть `outcomes` или `deliverables` |
| `faq>=4` | `faqItems.length ≥ 4` |
| `block>=3items` | любой присутствующий specialty-блок ≥3 пунктов |
| `diagram-resolves` | для каждого `mechanism[].diagram` есть `<svg>` + `.dark.svg` для RU и EN |

**Мягкие правила** — только warnings, suite не валят:

| id | правило |
|---|---|
| `proof>=2` | `proofItems.length ≥ 2` (с `metricValue`/`metricLabel`) |

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

## Долг — закрыт

Ratchet прошёл до нуля: `test/richness-baseline.ts` удалён, правила стали
безусловными. По пути закрыли: `highload-backend` (outcomes + faq),
`corporate-websites`/`landing-pages` (relevants), `corporate-ai-training` (faq),
`ai-infrastructure` (deliverables + faq), `ai-task-tracker-integration`
(deliverables), `seo-aeo`/`ai-erp-integration` (relevants) и
`ai-security-audit`/`sovereign`/`computer-vision` (mechanism + диаграммы).
`proof>=2` — мягкое правило, в гейт не входит.

Драфты без обложки (4, вне публикации): `nlp-systems`, `recommendation-systems`,
`speech-recognition-systems`, `reinforcement-learning-systems` — не трогаются.

## TDD

`test/service-richness.test.ts`:

- Каталог правил — данные (`{ id, ok(service) }`), добавление правила = строка.
- Опубликованные: любое нарушение → **fail** (baseline нет).
- Драфты и мягкие правила (`proof>=2`) — warning-репорт, suite не валят.
- `diagram-resolves` читает `src/shared/assets/images/diagrams/` — ловит неверный
  слаг диаграммы.

## Аудит

`audit.mjs` расширена секцией richness: печатает `slug × правила`, `draft` и
мягкие нарушения как `warn`, остальные у опубликованных как `error`.
Человеческий отчёт перед коммитом; источник правды — тест.

## Rollout — выполнен

1. [x] Тест + baseline: suite зелёный, долг зафиксирован.
2. [x] Закрытие по услуге и удаление строк baseline.
3. [x] Диаграммы: `.mmd` для ml/ai-infra и конвейеров → `npm run diagrams` →
   `diagram` в `mechanism` (8 услуг, 10 пар).
4. [x] Baseline пуст → механизм удалён, правила безусловны.

## Заметки

- `engineering:techstack+(scope|mechanism)` — `mechanism` пока обязателен; при
  пересмотре можно ослабить до `scope`.
- Диаграммы: минимум одна на `mechanism`; на каждый конвейерный этап — по смыслу.
- Для `solutions` аналогичных правил нет; их объём (1000 слов) тестом не покрыт.
