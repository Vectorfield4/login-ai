# News enablers — done (2026-10-08)

## Done

- `NewsCategory` расширен до восьми жанров: `product`, `research`, `technical`,
  `case-study`, `corporate`, `industry`, `media`, `community`
  (`src/shared/types/content.ts`).
- Схема `src/content.config.ts`: добавлены `category`, `excerpt`, `featured`,
  `author`, `mediaUrl`.
- `mediaUrl` в `NewsData`/`NewsItem`; автор по умолчанию
  `DEFAULT_NEWS_AUTHOR` (`Команда LoginAI` / `LoginAI Team`) подставляется в
  `toNewsItem`, явный `author` важнее.
- Ярлыки рубрик перенесены в словари RU/EN (`newsPage.categories`),
  `NewsCategoryLabel` читает их через `useT`; восемь иконок и цветов.
- `NewsPlaceholder` маппит восемь рубрик на существующие иллюстрации.
- `NewsMediaEmbed`: врезка по клику, YouTube приводится к `/embed/`, рендер в
  статье при `mediaUrl`; тест `NewsMediaEmbed.test.tsx`.
- `lang` протянут через `NewsMeta` и `NewsCard`.
- Гайд `docs/frontend/news.md`, ссылка из `AGENTS.md` (Deep dives).

## Acceptance criteria

- [x] Восемь рубрик проходят сквозь тип, схему, ярлыки и плейсхолдеры.
- [x] `excerpt`, `featured`, `author`, `mediaUrl` живут в схеме и доходят до UI.
- [x] Автор по умолчанию зависит от локали, явный автор его перекрывает.
- [x] Медиа-врезка грузится по клику от `mediaUrl`.
- [x] Гайд написан и добавлен в Deep dives.
- [x] `dropDraftLinks` уже покрыт `test/drop-draft-links.test.ts`.

## Verification

`lint` clean; `test` 342 passed / 0 failed; `verify` 130 страниц, `verify:dist`
ок (129 из sitemap + `/404.html`).

## References

- Контент-план: `docs/plans/news-content-plan.md`.
- Гайд: `docs/frontend/news.md`.
- Тесты: `test/news.test.ts`,
  `src/entities/news/ui/organisms/NewsMediaEmbed.test.tsx`,
  `test/drop-draft-links.test.ts`.
