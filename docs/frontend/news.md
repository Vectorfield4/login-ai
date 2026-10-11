# News guide

Как устроен раздел «Новости и разборы» и как добавить материал. План и схема
полей живут в `docs/plans/news-content-plan.md`. Методология по жанрам и
пошаговый процесс написания — скилл `write-article`
(`.opencode/skills/write-article/SKILL.md`).

## Где что лежит

```
articles/<slug>.ru.md        # статья, RU обязателен
articles/<slug>.en.md        # EN-пара, необязательна
articles/images/<slug>.png   # обложка по конвенции имени
src/content.config.ts        # схема frontmatter
src/entities/news/model/news.ts   # сборка NewsItem, автор по умолчанию
src/pages/[lang]/news/[slug].astro # страница статьи
src/pages/[lang]/news/index.astro  # список
```

Статья — markdown в корне репозитория, вне `src/`, чтобы контент не влиял на
холодный старт. Язык кодируется в имени файла: `<slug>.ru.md` / `<slug>.en.md`.
EN-пара необязательна: страница для отсутствующего перевода просто не
генерируется, сборка остаётся целой.

## Frontmatter

```yaml
---
title: "Заголовок 10–120 символов"
description: "Описание 50–300 символов для meta и карточки."
publishedAt: 2026-11-03
updatedAt: 2026-12-01        # опционально
readingTimeMin: 6            # опционально; пусто — считается из тела
draft: false
category: technical          # один из восьми жанров, см. ниже
excerpt: "Короткий анонс для карточки."   # опционально
featured: false              # приоритет на главной
author:                      # опционально, по умолчанию команда
  name: "Анна"
  role: "ML-инженер"
mediaUrl: https://youtu.be/abc123XYZ      # опционально, жанр media
tags: ["RAG", "LLM"]
relatedServices: ["deterministic-rag-systems"]
relatedSolutions: ["agentic-systems"]
relatedCases: []
ogImage: ./images/<slug>.png # опционально, важнее конвенции
---
```

Жанры (`category`): `product`, `research`, `technical`, `case-study`,
`corporate`, `industry`, `media`, `community`.

Черновик. `draft` по умолчанию `true` (`src/content.config.ts`): статья выходит
только с явным `draft: false`. Новую статью пишут без флага и снимают драфт
вместе с появлением обложки.

Автор. Пустое поле — подстановка `Команда LoginAI` / `LoginAI Team` по локали
(`DEFAULT_NEWS_AUTHOR`). Явный `author` её перекрывает.

## Обложка

Одна на slug: `articles/images/<slug>.png`, 1200×630, без текста. Файл
подхватывается по имени. Явный `ogImage` во frontmatter выигрывает у
конвенции. Требования и шаблон — `articles/images/README.md` и
`docs/image-prompts/scene-defined/article.txt`. Обложки в ожидании генерации
перечислены в `content/generation-queue.json` (записи `kind: "article"`);
запись снимается вместе с появлением файла.

Статья без обложки остаётся драфтом: `draft` по умолчанию `true`
(`src/content.config.ts`), сборка её не публикует, гейт `test/articles.test.ts`
это стережёт. Когда PNG появился — ставь `draft: false` и убирай запись из
очереди вместе.

## Медиа

Жанр `media` использует `mediaUrl`. Страница показывает кнопку, по клику
подставляет `iframe` (`NewsMediaEmbed`); YouTube приводится к `/embed/`.
Расшифровка — обычное тело markdown.

## Перелинковка

`relatedServices` / `relatedSolutions` / `relatedCases` принимают слаги.
Ссылка на опубликованную сущность рендерится; ссылка на драфт разворачивается
в текст (`dropDraftLinks`) и включается сама после публикации. Обратные блоки
на странице статьи собирает `getNewsReferencing`.

Статья не выходит из драфта, пока цель ссылки — драфт: relevants-гейт
(`test/articles.test.ts`, зеркало `audit.mjs`) требует, чтобы каждая цель
существовала и была опубликована. Сначала публикуются услуга, решение или кейс,
потом снимается `draft` у статьи.

## Паритет и гейты

RU пишется первым, EN — зеркало не короче 90 % объёма RU. Схему и `useT`
держат тесты:

- `test/astro-content.test.ts` — паритет ключей словарей RU/EN;
- `test/news.test.ts` — сборка `NewsItem`, автор по умолчанию, поля;
- `test/copy-guards.test.ts` — запрещённая лексика, EN без длинного тире;
- `test/drop-draft-links.test.ts` — снятие ссылок на драфты;
- `test/articles.test.ts` — объём по жанру, EN ≥ 90 % RU, обложка и relevants.

Три гейта ведут к `draft: false`: обложка `articles/images/<slug>.png`, объём
по жанру (RU ≥ порога таблицы жанров, EN ≥ 90 % RU) и relevants. Готовность
проверяет скилл `write-article`:

```
node .opencode/skills/write-article/scripts/audit.mjs [slug ...]
node .opencode/skills/write-article/scripts/publish.mjs [--dry-run] [--force] <slug ...>
```

`publish.mjs` ставит `draft: false` в `<slug>.ru.md` и `<slug>.en.md` и снимает
запись из `content/generation-queue.json`. Перед публикацией: `npm run lint`,
`npm run test`, `npm run verify`.
