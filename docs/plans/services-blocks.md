# Service content blocks — done (2026-10-06)

Абстрактные `sections[]` услуги заменены типизированными блоками: у каждого
свой тип, модель и дизайн-организм. `sections[]` осталась ровно одна — у
`ai-security-audit` («Когда звать аудит»). Impact отклонён.

## Done

- **Tradeoffs** — `TradeoffItem` + `Service.tradeoffs?`, организмы
  `TradeoffsSection` / `TradeoffsBlock` / `TradeoffRow` (акцентный реестр
  издержек, не `Card + Dot`), ключи `servicePage.tradeoffs*`. 15 услуг:
  пилот `computer-vision-systems`, `deterministic-rag-systems`,
  `sovereign-model-deployment`; раскатка `ai-crm-integration`,
  `ai-erp-integration`, `ai-cms-integration`, `ai-task-tracker-integration`,
  `ai-infra-cost-optimization`, `ai-security-audit`,
  `anomaly-detection-systems`, `corporate-ai-training`, `mlops-platforms`,
  `nlp-systems`, `predictive-analytics-systems`, `recommendation-systems`,
  `reinforcement-learning-systems`, `speech-recognition-systems`.
- **Outcome** — `OutcomeItem` + `Service.outcomes?`, организмы
  `OutcomeTile` / `OutcomesBlock` / `OutcomesSection` (плитка «иконка +
  крупное значение + заголовок + текст», сетка 2/3), ключи
  `servicePage.outcomes*`. 11 услуг: пилот `corporate-websites`,
  `landing-pages`, `seo-aeo`; раскатка `ai-cms-integration`,
  `ai-task-tracker-integration`, `corporate-ai-training`,
  `information-monitoring`, `mlops-platforms`, `predictive-analytics-systems`,
  `software-development`, `sovereign-model-deployment`. Каждому пункту задан
  `value` и `icon`.
- **Mechanism** — `MechanismItem` + `Service.mechanism?`, организм
  `MechanismSection` (нумерованные этапы + статичные диаграммы). Mermaid
  рендерится на сборке: `.mmd` → `npm run diagrams`
  (`scripts/generate-diagrams.mjs`, devDep `@mermaid-js/mermaid-cli`) →
  светлый и тёмный SVG в `src/shared/assets/images/diagrams/`;
  `app/data/serviceDiagrams.ts` резолвит слаги, `DiagramSource` несёт `src`
  в компонент. 14 услуг: пилот `deterministic-rag-systems` (2 диаграммы);
  раскатка `ai-infrastructure`, `anomaly-detection-systems`,
  `computer-vision-systems`, `nlp-systems`, `recommendation-systems`,
  `reinforcement-learning-systems`, `speech-recognition-systems`,
  `corporate-websites`, `highload-backend`, `information-monitoring`,
  `landing-pages`, `seo-aeo`, `software-development`. «Как мы проверяем» и
  «как устроен процесс» сведены сюда же: отдельного типа `approach` нет.
- **Scope** — `ScopeItem` + `Service.scope?`, организмы `ScopeSection` /
  `ScopeBlock` / `ScopeRow` (чек-лист с галочкой), ключи `servicePage.scope*`.
  3 услуги: `ai-security-audit`, `software-development`, `highload-backend`.
- **Deliverables** — `DeliverableItem` + `Service.deliverables?`, организмы
  `DeliverablesSection` / `DeliverablesBlock` / `DeliverableRow` (плитка
  «иконка-компонент + заголовок + текст», не галочка `scope`), ключи
  `servicePage.deliverables*`. 6 услуг: `ai-crm-integration`,
  `ai-erp-integration` (×2 секции), `ai-security-audit`,
  `computer-vision-systems`, `deterministic-rag-systems`,
  `sovereign-model-deployment`. «Что входит / что вы получаете» — чек-лист
  поставки, ему не подходит ни `scope` («Проверки до старта»), ни `outcomes`
  («Результат в цифрах»).
- **Process** — новый тип не создавался: `ProcessHorizontal` / `processSteps`
  уже покрывают блок.
- **Triggers** — тип не заводился: «Когда звать аудит» (`ai-security-audit`)
  остаётся единственной `sections[]`.
- **Impact** — отклонён: честных пар «до/после» нет, приписывать блок некому.
- **Prose guards** (`test/prose-quality.test.ts`) — запрет «не/а не/нет» в
  `title`/`value`/`text` у `tradeoffs`, `outcomes`, `deliverables`; минимум 12
  слов на `text` у `tradeoffs`, `outcomes`, `scope`, `mechanism`,
  `deliverables`; заголовок и текст пункта обязаны делить значимый корень
  (все пять блоков).

## Acceptance criteria

- [x] Каждый блок — отдельный тип с опциональным полем на `Service`, без
  общего payload с дискриминантом.
- [x] У каждого блока свой организм со своим дизайном (не `Card + Dot`).
- [x] Mermaid не попадает в клиентский бандл; диаграммы — статичные SVG с
  тёмным/светлым вариантами.
- [x] Пилоты и раскатка мигрированы: секция-источник убрана из `sections[]`,
  оставшиеся перенумерованы.
- [x] i18n RU/EN паритет и все тексты — ключи пространства
  `services.<slug>.<field>.*`.
- [x] Строки блоков проходят prose-guards.

## Verification

Последний прогон: `lint` clean; `test` 287 passed / 0 failed; `verify`
114 страниц, `verify:dist` ок.

## References

- Коммиты: `8a77e05` tradeoffs, `e291a06` outcomes, `4975b58` mechanism,
  `adcde9c` scope, `a08851f` tradeoffs rollout, `2a8da02` deliverables
  section, `3490dba` tradeoffs rollout, `709173d` mechanism rollout,
  `7f2add4` outcomes rollout, `ee13e38` deliverables rollout.
- Страницы: `/[lang]/services/<slug>` в `src/pages/[lang]/services/[slug].astro`.
