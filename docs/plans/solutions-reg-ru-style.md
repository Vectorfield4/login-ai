# Plan: Solutions в стиле reg.ru (пакет под задачу)

Цель: сделать страницу решения похожей на «Рег.решение» — явный блок
«что входит», конкретные артефакты/услуги с количествами, сегментация
«для кого», шаги и цена. Основа уже есть (`features`, `processSteps`,
`fitItems`, `price`, `relevants`); не хватает явного состава поставки и
нишевой сегментации.

## Phase 1 — Модель данных

- `src/entities/solution/model/solutions.ts`:
  - добавить поле `deliverables?: DeliverableItem[]` (импортировать тип из
    `@/shared/types/content`; он уже определён как `{ title; text }`).
  - опционально добавить `niches?: string[]` — i18n-ключи конкретных ниш
    (как список reg.ru «Кому подойдет»). Альтернатива — переиспользовать
    `businessCategories`; решить при реализации.
- Поле опциональное, чтобы не ломать старые фикстуры и тесты.

## Phase 2 — i18n

- `src/entities/solution/i18n/ru/*.ts` и `en/*.ts`:
  - добавить ключи `solutions.<slug>.deliverables.N.title/text` для каждого
    пункта состава поставки.
  - (если `niches`) добавить `solutions.<slug>.niches.N`.
- Соблюдать правило: RU и EN в одном коммите; тест parity проверит ключи.

## Phase 3 — Фикстуры

- `src/entities/solution/model/fixtures/*.ts`:
  - заполнить `deliverables` минимум для `real-estate` (как эталон),
    затем для всех опубликованных решений.
  - при необходимости поднять `features`/`businessCategories`.
- `src/shared/i18n/{ru,en}/relevants.ts` — при необходимости заметки.

## Phase 4 — UI / страница

- `src/pages/[lang]/solutions/[slug].astro`:
  - отрендерить `DeliverablesSection` (уже есть в
    `shared/ui/organisms/DeliverablesSection`) с `items={solution.deliverables}`,
    заголовком/eyebrow из словаря.
  - (опц.) блок ниш: список `niches` через `SectionsBlock` или отдельный
    organism.
  - (опц.) поднять лимит услуг в `SolutionEcosystemSection` с 2 до 4–6,
    чтобы «что предлагаем» было видно полнее.
- Порядок секций: hero → price → features → deliverables → process → fit →
  niches → precedents → sections → tech → businessCategories → showcase →
  ecosystem → calculator → FAQ → CTA.

## Phase 5 — Тесты

- `src/entities/solution/model/fixtures.test.ts`:
  - валидация ключей `deliverables` (title/text) в RU/EN по аналогии с
    `precedents`.
- `test/solution-richness.test.ts`:
  - добавить правило `deliverables>=1` (soft: сначала warning для drafts,
    затем hard для published).
- `test/i18n*` parity — уже покрыт; убедиться, что новые ключи есть.

## Phase 6 — Контент и проверка

- Заполнить `deliverables` для всех опубликованных решений (через write-solution
  / ручной проход).
- `npm run lint && npm run test && npm run verify`.

## Открытые вопросы

- Нужны ли количества («6 шт.») в `DeliverableItem`? Сейчас тип `{ title; text }`;
  количество можно вписать в `text`. Если нужна отдельная колонка — расширить
  тип `DeliverableItem` полем `quantity?: string`.
- `niches` vs расширение `businessCategories`: выбрать один подход, чтобы не
  дублировать «для кого».

## Verification

- `npx vitest run src/entities/solution/model/fixtures.test.ts
  test/solution-richness.test.ts`
- `npm run lint`
- `npm run verify` (build + verify:dist)
- Ручная проверка страницы `/solutions/real-estate`: блок «состав поставки»
  рендерится, i18n обеих локалей без пустых ключей.