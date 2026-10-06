# Схемы услуг 2 — done (2026-10-07)

Переработка 100 схем «как работает»: плоские цепи A→B→C→D заменены диаграммами,
несущими информацию поверх абзаца. Итог: **100 диаграмм, 200 `.mmd`, 400 SVG.**

## Done

- Все 100 схем переписаны (RU + EN): `flowchart` 62, `stateDiagram-v2` 20,
  `sequenceDiagram` 12, `erDiagram` 6 (было 100 `flowchart LR`).
- Было 90/100 — чистая цепь, 0 `subgraph`, 0 не-`flowchart` типов, 62/100 —
  голые прямоугольники. Стало: 0 линейных цепей, 50 схем с `subgraph`,
  20 `stateDiagram-v2` с возвратными переходами.
- Каждая услуга получила ≥1 схему с циклом или двумя плоскостями.
- `test/diagram-quality.test.ts` — гард: у каждой схемы есть ветвление, слияние,
  цикл или `subgraph`; у каждой услуги ≥1 «глубокая» схема; тип-микс каталога
  (`flowchart` ≤ 65%, остальные ≥ 30); RU и EN совпадают по типу.
- `biome.json` — `files.includes` с `!src/shared/assets/images/diagrams`:
  генератор Mermaid теперь экранирует `>` в `<style>` как `&gt;`, прежний
  override (linter/formatter off) парсер не выключал, и `lint` падал.
- Генерация: `node scripts/generate-diagrams.mjs` через Mermaid 12;
  светлая/тёмная тема на каждую схему.

## Acceptance criteria

- [x] Ноль линейных схем: каждая несёт ветвление, слияние, цикл или `subgraph`.
- [x] Каждая услуга имеет схему уровня L3+ (цикл или ≥2 плоскости).
- [x] Тип соответствует смыслу: циклы → `stateDiagram-v2`, акторы →
  `sequenceDiagram`, данные → `erDiagram`, топология → `flowchart` + `subgraph`.
- [x] RU и EN меняются одним коммитом, тип совпадает.
- [x] Планка держится тестом, не только планом.

## Verification

`lint` clean; `test` 298 passed / 0 failed; `verify` 124 pages, `verify:dist` ok.

## References

- План: `docs/plans/service-diagrams-2-plan.md`.
- Гард: `test/diagram-quality.test.ts`. Конвенции: `docs/plans/service-diagrams-plan.md`.
- Источники: `src/shared/assets/diagrams/*.mmd`; вывод: `src/shared/assets/images/diagrams/*.svg`.
