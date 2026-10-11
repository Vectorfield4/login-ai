# Content & video — follow-ups — done (2026-10-11)

Остаток от `content-video-umbrella.md`: обложки и публикация услуг плюс
новостной контент-план. Разнесён по адресатам, отдельных работ у файла не
осталось.

## Done

- Обложки услуг: волна 1 (`content-generation`, `video-generation`,
  `image-generation`) опубликована; следом опубликованы
  `voice-audio-generation`, `ai-text-training`, `ai-image-training`,
  `ai-voice-training` и сгенерирована обложка `ai-localization-training`
  (услуга ждёт гейта объёма). Коммит публикации — `a0b917c`.
- Новостной контент-план: `news-content-plan.md` (жанры, воронка, календарь на
  76 материалов) и `news-enablers.md` (схема, рубрики, медиа); методика
  написания — скилл `write-article`.

## Acceptance criteria

- [x] Обложки и публикация оставшихся услуг вынесены в
      `service-backdrops-plan.md`.
- [x] Новостной контент-план живёт в `news-content-plan.md`, дубликатов нет.
- [x] `test` и `verify` зелёные.

## Verification

`test` 370 passed / 0 failed (81 files); `verify` 146 pages, `verify:dist` ok
(145 из sitemap + `/404.html`). `lint` красный на WIP-файлах
`scripts/image-prompt.mjs`, `scripts/generation-queue.mjs`,
`content/generation-queue.json` — вне этого плана.

## References

- Umbrella: `docs/plans/content-video-umbrella.md`.
- Остаток обложек: `docs/plans/service-backdrops-plan.md`.
- Новости: `docs/plans/news-content-plan.md`, `docs/plans/news-enablers.md`.
- Скилл: `.opencode/skills/write-article/SKILL.md`.
