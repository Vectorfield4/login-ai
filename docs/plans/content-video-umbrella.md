# Контент и видео. Одно решение и услуги под него — done (2026-10-08)

## Done

- Группа `content` («Контент и креатив»): `ServiceGroup`,
  `SERVICE_GROUP_ORDER` перед `training`, `servicesGroups` RU/EN, тест
  `test/registries.test.ts`.
- Иконки в `iconCatalog.ts`: `article`, `audio`, `image`, `languages`,
  `presentations`; теги `technologies.image`, `technologies.audio`.
- 12 услуг (фикстура, RU/EN словари, регистрация в `fixtures.ts` и
  `i18n/index.ts`, relevants, строки README). Контентные:
  `content-generation`, `video-generation`, `image-generation`,
  `voice-audio-generation`, `content-localization`, `ai-presentations`.
  Обучающие: `ai-text-training`, `ai-image-training`, `ai-video-training`,
  `ai-voice-training`, `ai-localization-training`, `ai-presentations-training`.
- Опубликованы 3 услуги с обложками: `content-generation`, `video-generation`,
  `image-generation`. Группа `content` появилась в меню и на `/services`,
  добавлены страницы `/services/group/content`.
- `test/training-programs.test.ts`: каждая обучающая программа зеркалит своё
  направление через `relevants`.
- Umbrella-решение `content-generation`: 6 `features` и 6 `sections` по
  направлениям, 6 `processSteps` (`requirements` + `system-design`),
  6 `technologies`, 6 `businessCategories`, расширенный `referencesNote`,
  `showcase` (`VideoShowcase` сохранён), 2 `proofItems`, 6 `faqItems`,
  relevants на услуги, решения и кейсы.
- Миграция ссылок: кейсы `agency-content-pipeline` и `product-launch-video`
  ссылаются на услугу `video-generation`; заметка в RU/EN — «Услуга:
  видеогенерация».
- Решение `video-generation` удалено: фикстура, RU/EN словари,
  `video-generation.svg`, запись в `solutionImages.ts`, регистрация. Блок
  `relevants.video-generation` оставлен — `noteKey` использует услуга.

## Acceptance criteria

- [x] `/solutions/content-generation` описывает шесть направлений, у каждого
      своя секция.
- [x] Группа `content` видна в меню и на `/services`.
- [x] Двенадцать услуг собраны: шесть контентных и шесть обучающих.
- [x] Ссылки на `video-generation` переведены на услугу, решение и его файлы
      удалены.
- [x] Обложки есть у опубликованных услуг, остальные помечены `draft: true` и
      стоят в таблице «Awaiting generation».
- [x] Обучение ссылается на услуги направлений.
- [x] RU и EN совпадают по набору ключей и громкости.

## Verification

`lint` clean; `test` 337 passed / 0 failed; `verify` 130 pages, `verify:dist` ok
(129 sitemap pages + `/404.html`).

## References

- Follow-ups: `docs/plans/content-video-followups.md`.
- Backdrop backlog: `docs/plans/service-backdrops-plan.md`.
- Опубликованные страницы: `/services/content-generation`,
  `/services/video-generation`, `/services/image-generation`.
