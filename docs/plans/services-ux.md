# Services UX Plan (grouping + responsive picker) — done (2026-10-03)

## Done

- **A1–A2** `group` у всех услуг, `groupServices.ts`, i18n `servicesGroups`
  (RU/EN, parity-тест).
- **A3** вложенное подменю Services: строка группы ведёт на её страницу,
  шеврон раскрывает услуги; активная группа открыта по умолчанию.
- **A4** групповые страницы `/services/group/<group>` (RU/EN) с SEO и
  breadcrumbs.
- **A5** тесты: `groupServices`, parity, навигация и breadcrumbs.
- **B1** `colorAccent` (teal `#00796B` / `#4DB6AC`) и contrast-тест; литералы
  StyleX зеркалятся в `tokens.stylex.ts` и сверяются с `accent.ts`.
- **B2–B4** адаптивный `ServiceTabList` (ниже `md` — горизонтальная иконочная
  полоса), стрелки prev/next, акцентное выделение, размеры 40→32 / 20→16.
- **B5** `object-fit: cover`, липкий мобильный лид, fallback «Читать далее» на
  220 символах, без line clamp.
- **B6** обновлённые тесты.

## Acceptance criteria

- [x] У каждой услуги допустимый `group`; порядок групп стабилен.
- [x] `servicesGroups` существует в RU и EN с равными ключами; parity проходит.
- [x] Меню Services — вложенное подменю: группа → её услуги; строка группы
      ссылается на страницу группы.
- [x] Групповые страницы существуют, резолвятся breadcrumbs и route meta.
- [x] Ниже `md` пикер — горизонтальная иконочная полоса со стрелками; выше
      `md` — вертикальный список.
- [x] Выбранная услуга использует `colorAccent`; контраст проверяется тестом.
- [x] Иконки на шаг ниже по существующей шкале; мобильные кнопки сохраняют
      доступные имена.
- [x] Мобильная картинка `cover`; копия липнет к верху; слайды не ограничены.
- [x] Длинная копия обрезается с ellipsis и зелёной «Читать далее».
- [x] `lint`, `test`, `verify` зелёные.

## Verification

`lint` clean; `test` 199 passed / 0 failed; `verify` 131 pages, `verify:dist` ok.
