# Service content blocks — пилот готов (2026-10-05), раскатка в работе

Абстрактные `sections[]` услуги заменены типизированными блоками: у каждого
свой тип, модель и дизайн-организм. Часть данных раскатана, Impact отклонён.
Продолжение — в разделе «Раскатка на остальные услуги» внизу файла.

## Done

- **Tradeoffs** — `TradeoffItem` + `Service.tradeoffs?`, организмы
  `TradeoffsSection` / `TradeoffsBlock` / `TradeoffRow` (акцентный реестр
  издержек, не `Card + Dot`), ключи `servicePage.tradeoffs*`. Пилот:
  `computer-vision-systems`, `deterministic-rag-systems`,
  `sovereign-model-deployment`; раскатка: `ai-crm-integration`,
  `ai-erp-integration`.
- **Outcome** — `OutcomeItem` + `Service.outcomes?`, организмы
  `OutcomeTile` / `OutcomesBlock` / `OutcomesSection` (плитка «иконка +
  крупное значение + заголовок + текст», сетка 2/3), ключи
  `servicePage.outcomes*`. Пилот: `corporate-websites`, `landing-pages`,
  `seo-aeo` (по 6 плиток).
- **Mechanism** — `MechanismItem` + `Service.mechanism?`, организм
  `MechanismSection` (нумерованные этапы + статичные диаграммы).
  Mermaid рендерится на сборке: `.mmd` → `npm run diagrams`
  (`scripts/generate-diagrams.mjs`, devDep `@mermaid-js/mermaid-cli`) →
  светлый и тёмный SVG в `src/shared/assets/images/diagrams/`;
  `app/data/serviceDiagrams.ts` резолвит слаги, `DiagramSource` несёт `src`
  в компонент. Пилот: `deterministic-rag-systems` (2 диаграммы).
- **Scope** — `ScopeItem` + `Service.scope?`, организмы `ScopeSection` /
  `ScopeBlock` / `ScopeRow` (чек-лист с галочкой), ключи `servicePage.scope*`.
  Пилот: `ai-security-audit`, `software-development`, `highload-backend`.
- **Process** — новый тип не создавался: `ProcessHorizontal` / `processSteps`
  уже покрывают блок; четыре «процессных» секции оставлены как `sections[]`,
  вливать их в шаги нельзя.
- **Impact** — отклонён: честных пар «до/после» нет, приписывать блок некому.
- **Prose guards** (`test/prose-quality.test.ts`) — запрет «не/а не/нет» в
  `title`/`text` у `tradeoffs` и `outcomes`; минимум 12 слов на `text` у
  `tradeoffs`, `outcomes`, `scope`, `mechanism`; заголовок и текст пункта
  обязаны делить значимый корень (все четыре блока).

## Acceptance criteria

- [x] Каждый блок — отдельный тип с опциональным полем на `Service`, без
  общего payload с дискриминантом.
- [x] У каждого блока свой организм со своим дизайном (не `Card + Dot`).
- [x] Mermaid не попадает в клиентский бандл; диаграммы — статичные SVG с
  тёмным/светлым вариантами.
- [x] Пилоты мигрированы: секция-источник убрана из `sections[]`,
  оставшиеся перенумерованы.
- [x] i18n RU/EN паритет и все тексты — ключи пространства
  `services.<slug>.<field>.*`.
- [x] Строки блоков проходят prose-guards.

## Verification

Последний прогон: `lint` clean; `test` 269 passed / 0 failed; `verify`
114 страниц, `verify:dist` ок.

## References

- Коммиты: `8a77e05` tradeoffs, `e291a06` outcomes, `4975b58` mechanism,
  `adcde9c` scope, `a08851f` tradeoffs rollout.
- Страницы: `/[lang]/services/<slug>` в `src/pages/[lang]/services/[slug].astro`.
- Раскатка блоков на остальные услуги и черновики — отдельная работа, не
  входила в этот план.

---

# Раскатка на остальные услуги — план (2026-10-06)

Пилот закрыл 4 блока на 12 услугах. `sections[]` остаётся у всех 24 услуг: 46
секций. Ниже — как разложить их по типизированным блокам.

## Принципы

- Один блок = один тип + опциональное поле на `Service`, без общего payload с
  дискриминантом (пилотная аксиома не меняется).
- У блока свой организм; `SectionsBlock` (`Card + Dot`) остаётся только для
  секций без тип-цели.
- `src/pages/[lang]/services/[slug].astro` уже рендерит tradeoffs / outcomes /
  scope / mechanism условно, поэтому переиспользование этих типов не трогает
  страницу. Правка страницы нужна только под новый блок.

## Решения

- **`deliverables` — новый блок.** «Что входит / что вы получаете» — это
  чек-лист поставки, а не «Проверки до старта» (`scope`) и не «Результаты в
  цифрах» (`outcomes`). Тип `DeliverableItem { title, text }`, поле
  `Service.deliverables?`, ключи `servicePage.deliverables*`.
- **Методология → `mechanism`.** Пилотная оговорка «процессные секции остаются
  `sections[]`» отменяется: «как мы проверяем / как устроен процесс / как
  работает / как строится» едут в `mechanism`. Секция-источник убирается из
  `sections[]`, остаток перенумеровывается.
- **Цена → `tradeoffs`.** «Откуда берётся счёт», «что влияет на цену», «скрытые
  расходы», «чем платите» — это издержки решения, а не механика.
- **Триггеры остаются.** «Когда звать аудит» (`ai-security-audit`) не получает
  типа: отдельного блока `triggers` пока нет.

## Таблица миграции

T — tradeoffs, M — mechanism, O — outcomes, D — новый deliverables, keep —
остаётся в `sections[]`. Индексы — позиции в текущем `sections[]`.

| Услуга | `sections[]` → блок |
|---|---|
| ai-cms-integration | [0]→O, [1]→T |
| ai-crm-integration | [0]→D |
| ai-erp-integration | [0]→D, [1]→D |
| ai-infra-cost-optimization | [0]→T, [1]→T |
| ai-infrastructure | [0]→M, [1]→M |
| ai-security-audit | [0]→T, [1]→D, [2]→keep |
| ai-task-tracker-integration | [0]→O, [1]→T |
| anomaly-detection-systems | [0]→M, [1]→T |
| computer-vision-systems | [0]→M, [1]→D, [2]→T (слияние) |
| corporate-ai-training | [0]→O, [1]→T |
| corporate-websites | [0]→M |
| deterministic-rag-systems | [0]→D, [1]→T (слияние) |
| highload-backend | [0]→M |
| information-monitoring | [0]→M, [1]→O |
| landing-pages | [0]→M |
| mlops-platforms | [0]→O, [1]→T |
| nlp-systems | [0]→M, [1]→T |
| predictive-analytics-systems | [0]→O, [1]→T |
| recommendation-systems | [0]→M, [1]→T |
| reinforcement-learning-systems | [0]→M, [1]→T |
| seo-aeo | [0]→M |
| software-development | [0]→M, [1]→O |
| sovereign-model-deployment | [0]→O, [1]→D, [2]→T (слияние) |
| speech-recognition-systems | [0]→M, [1]→T |

Итого: T — 16 секций, M — 14, O — 8, D — 7, keep — 1.

## Волны

Волны по типу блока, как делался пилот: одна волна — один организм и один
профиль prose-guards.

**Волна 0 — инфраструктура `deliverables` — done (2026-10-06).** Тип в
`shared/types/content.ts`; поле в `services.ts`; организмы
`DeliverablesSection` / `DeliverablesBlock` / `DeliverableRow` со своим
дизайном (не галочка `scope`); ключи `servicePage.deliverablesEyebrow|Title` в
RU+EN; условный рендер в `[slug].astro`; regex-проверка ключей `title|text` в
`fixtures.test.ts`; `deliverables` в `LENGTH_COLLECTIONS` (и решить про
no-negation, для чек-листа поставки вероятно да).

**Волна 1 — tradeoffs (16 секций, 15 услуг) — done (2026-10-06).** Новые: ai-cms, ai-task-tracker,
ai-infra-cost-optimization, ai-security-audit, anomaly-detection,
corporate-ai-training, mlops, nlp, predictive, recommendation, reinforcement,
speech-recognition. Слияние с существующим `tradeoffs`: computer-vision
(«Что влияет на цену»), deterministic-rag («Что учесть до старта»), sovereign
(«Скрытые расходы»).

**Волна 2 — mechanism (14 секций, 13 услуг) — done (2026-10-06).** ai-infrastructure, anomaly-
detection, computer-vision, nlp, recommendation, reinforcement,
speech-recognition, corporate-websites, highload-backend, information-monitoring,
landing-pages, seo-aeo, software-development. Диаграммы не обязательны: слаг
`diagram` задаётся только там, где схема честно помогает.

**Волна 3 — outcomes (8 услуг) — done (2026-10-06).** ai-cms, ai-task-tracker, corporate-ai-training,
information-monitoring, mlops, predictive, software-development, sovereign.
Каждому пункту нужен `value` и `icon`; значение выводится из смысла, как в
пилоте («10 секунд», «6 разделов»).

**Волна 4 — deliverables (7 секций, 6 услуг) — done (2026-10-06).** ai-erp (×2), ai-crm,
ai-security-audit, computer-vision, deterministic-rag, sovereign.

**Волна 5 — остаток — done (2026-10-06).** `ai-security-audit` «Когда звать аудит»
остаётся `sections[]`: тип `triggers` не заводим, единственная секция держит
смысл «когда звать». Больше `sections[]` ни у одной услуги нет.

## Сопутствующее

- `fixtures.test.ts`: добавить проверку ключей `tradeoffs` — сейчас её нет
  (у outcomes/mechanism/scope проверки есть).
- `src/entities/service/AGENTS.md`: дополнить список опциональных блоков
  (tradeoffs / outcomes / scope / mechanism / deliverables).
- `docs/frontend/page-composition.md`: обновить таблицу секций страницы услуги.

## Проверка каждой волны

```
npm run lint
npm run test
npm run verify
```

Prose-guards: no-negation для T/O; ≥12 слов и общий корень `title`/`text` для
T/O/S/M (+D). Плюс паритет RU/EN, `astro-content`, `services-smoke`,
`awaiting-generation`.
