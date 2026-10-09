import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Контент-слой новостей: markdown-файлы в `articles/` в корне репозитория
 * (вне `src/`, чтобы размер контента не влиял на холодный старт сборки).
 *
 * Язык закодирован в имени файла: `articles/<slug>.ru.md` / `<slug>.en.md`.
 * Content Layer отдаёт `id` без расширения, то есть `slug.ru` — язык и слаг
 * разбирает чистая функция `parseNewsId` (`@/entities/news/model/news`).
 *
 * Асимметрия языков осознанная: нет `.en.md` — нет и английской страницы.
 * `getStaticPaths` строит пути по фактическим файлам, поэтому маршрут
 * отсутствующего перевода просто не генерируется, и сборка не падает.
 *
 * ВАЖНО: `id` в схеме не указывается — в Content Layer это ключ записи, а не
 * поле frontmatter, и обязательное поле валидатор трактует как отсутствующее.
 *
 * `generateId` задан явно: дефолтный в Astro 7 срезает расширение и убирает
 * точку, из-за чего `post.en.md` приходит с id `posten`, и разбор языка
 * ломается. Собственный id гарантирует контракт `<slug>.<lang>` независимо от
 * версии Astro.
 */
const news = defineCollection({
  loader: glob({
    base: "./articles",
    pattern: "**/*.{ru,en}.md",
    generateId: ({ entry }) => {
      const withoutExt = entry.replace(/\.md$/i, "");
      const slash = withoutExt.lastIndexOf("/");
      const dir = slash === -1 ? "" : withoutExt.slice(0, slash + 1);
      const fileName = withoutExt.slice(slash + 1);
      const dot = fileName.lastIndexOf(".");
      if (dot <= 0) return `${dir}${fileName}`;
      return `${dir}${fileName.slice(0, dot)}.${fileName.slice(dot + 1)}`;
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(10).max(120),
      description: z.string().min(50).max(300),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      readingTimeMin: z.number().int().positive().optional(),
      /** Черновик; по умолчанию true — статья выходит только с явным draft: false. */
      draft: z.boolean().default(true),
      /** Рубрика (жанр): те же значения, что `NewsCategory`. */
      category: z
        .enum([
          "product",
          "research",
          "technical",
          "case-study",
          "corporate",
          "industry",
          "media",
          "community",
        ])
        .optional(),
      /** Короткий анонс карточки; пусто — берётся `description`. */
      excerpt: z.string().max(300).optional(),
      /** Приоритет на главной. */
      featured: z.boolean().default(false),
      /** Подпись автора; пусто — подставляется команда по локали. */
      author: z
        .object({
          name: z.string(),
          role: z.string().optional(),
          avatar: z.string().optional(),
        })
        .optional(),
      /** Ссылка на запись для жанра `media` (YouTube/VK/Rutube). */
      mediaUrl: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
      /** Слаги услуг из @/entities/service — перелинковка «статья → услуга». */
      relatedServices: z.array(z.string()).default([]),
      /** Слаги решений. */
      relatedSolutions: z.array(z.string()).default([]),
      /** Слаги кейсов. */
      relatedCases: z.array(z.string()).default([]),
      /** Растр для og:image; `image()` резолвит путь относительно articles/. */
      ogImage: image().optional(),
    }),
});

export const collections = { news };
