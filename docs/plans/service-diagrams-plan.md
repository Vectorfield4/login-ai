# Service diagrams — done (2026-10-06)

Схемы «как работает» на страницах услуг. Итог: **100 диаграмм у всех 20
опубликованных услуг** (200 `.mmd`, 400 SVG) — схема на каждый пункт
`mechanism` плюс блок `mechanism` у пяти услуг, где его не было.

## Done

- Волна 1 (6 услуг, схема к существующему `mechanism`): `highload-backend`
  (`tiering`), `corporate-websites` (`site-flow`), `information-monitoring`
  (`collection-pipeline`), `landing-pages` (`conversion-loop`), `seo-aeo`
  (`answer-flow`), `software-development` (`sprint-loop`).
- Волна 2 (5 услуг без механики, добавлен `mechanism` + схема):
  `ai-cms-integration` (`draft-flow`), `ai-crm-integration` (`crm-flow`),
  `ai-erp-integration` (`erp-flow`), `ai-task-tracker-integration`
  (`task-flow`), `corporate-ai-training` (`training-loop`).
- Волна 3 (8 услуг со второй схемой): `ai-infrastructure` (`optimization-loop`),
  `ai-infra-cost-optimization` (`routing`), `ai-security-audit`
  (`attack-surface`), `sovereign-model-deployment` (`quantization`),
  `computer-vision-systems` (`defect-loop`), `anomaly-detection-systems`
  (`baseline`), `predictive-analytics-systems` (`features`), `mlops-platforms`
  (`registry`).
- Конвенции: источник `<service>.<diagram>.<lang>.mmd` → `npm run diagrams`
  (`scripts/generate-diagrams.mjs`) → `<base>.svg` + `<base>.dark.svg` в
  `src/shared/assets/images/diagrams/`; слаг идёт в `MechanismItem.diagram`.

## Acceptance criteria

- [x] Схема у каждого пункта `mechanism`; у 5 услуг добавлен сам блок.
- [x] Light/dark SVG для RU и EN у каждого слага.
- [x] `diagram-resolves` (`test/services/service-richness.test.ts`) проверяет наличие
      light/dark для ru и en.

## Verification

`test` 370 passed / 0 failed (81 files); `verify` 146 pages, `verify:dist` ok.

## References

- Переработка схем (все 100 переписаны): `docs/plans/service-diagrams-2-plan.md`.
- Гарды: `test/services/diagram-quality.test.ts`, `test/services/service-richness.test.ts`.
