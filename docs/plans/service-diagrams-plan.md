# Service diagrams — done (2026-10-06)

Схемы «как работает» на страницах услуг. Итог: **100 диаграмм у всех 20
опубликованных услуг** (200 `.mmd`, 400 SVG) — схема на каждый пункт
`mechanism` плюс блок `mechanism` у пяти услуг, где его не было. Четыре драфта
без обложки не тронуты.

Волна 1 (6 услуг), «2-я» и «3-я» диаграммы (14 + 7 услуг) и Волна 2 (5 услуг:
`mechanism` + схемы) выполнены; далее sweep до каждого пункта.

## Волна 1 — схема к существующему `mechanism` (6 услуг)

Только `.mmd` (ru+en) + слаг на пункт `mechanism`, без нового блока.

| услуга | slug | показывает |
|---|---|---|
| `highload-backend` | `tiering` | запись → мастер, чтение → реплики, кэш, очереди |
| `corporate-websites` | `site-flow` | бриф → прототип → тексты → вёрстка → аналитика |
| `information-monitoring` | `collection-pipeline` | источники → парсер → проверка → хранилище → отчёт/алерты |
| `landing-pages` | `conversion-loop` | интервью → A/B → тепловая карта → итерация |
| `seo-aeo` | `answer-flow` | вопрос → ответ → источник → FAQ-разметка → цитата ИИ |
| `software-development` | `sprint-loop` | спринт → демо → ревью → стенд → следующий спринт |

## Волна 2 — `mechanism` + схема (5 услуг без механики)

| услуга | slug | показывает |
|---|---|---|
| `ai-cms-integration` | `draft-flow` | бриф → черновик → переводы → метатеги → согласование |
| `ai-crm-integration` | `crm-flow` | обращение → контекст → действие → эскалация → заметка |
| `ai-erp-integration` | `erp-flow` | запрос → чтение → черновик документа → подтверждение |
| `ai-task-tracker-integration` | `task-flow` | событие → классификация → задача/связь → статус → закрытие |
| `corporate-ai-training` | `training-loop` | аудит задач → программа → практика → метрики → внедрение |

## Волна 3 — вторая схема услугам с одной (8 услуг)

| услуга | slug | показывает |
|---|---|---|
| `ai-infrastructure` | `optimization-loop` | кэш → маршрутизация → переранжирование → бюджет |
| `ai-infra-cost-optimization` | `routing` | запрос → классификатор → дешёвая/сильная модель → кэш |
| `ai-security-audit` | `attack-surface` | данные → контекст → инструмент → лишнее действие |
| `sovereign-model-deployment` | `quantization` | модель → веса → память карты → замер просадки |
| `computer-vision-systems` | `defect-loop` | съёмка → инференс → решение → журнал |
| `anomaly-detection-systems` | `baseline` | история → норма → оценка → порог |
| `predictive-analytics-systems` | `features` | источники → признаки → обучение → горизонт |
| `mlops-platforms` | `registry` | обучение → версия → реестр → канареечный вывод → мониторинг |

## Конвенции

- Источник `<service>.<diagram>.<lang>.mmd` → `npm run diagrams` → `<base>.svg` +
  `<base>.dark.svg` в `src/shared/assets/images/diagrams/`.
- Слаг идёт в `MechanismItem.diagram`; `diagram-resolves`
  (`test/service-richness.test.ts`) проверяет наличие light/dark для ru и en.
- Правки добавочные: `lint` / `test` / `verify` должны остаться зелёными.

## Проверка

```
npm run diagrams && npm run lint && npm run test && npm run verify
```
