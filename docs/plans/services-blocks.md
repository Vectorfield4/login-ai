# Service content blocks — done (2026-10-05)

Абстрактные `sections[]` услуги заменены типизированными блоками: у каждого
свой тип, модель и дизайн-организм. Часть данных раскатана, Impact отклонён.

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
