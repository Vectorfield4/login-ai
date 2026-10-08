import { routeUrl } from "@/shared/data/routes";
import type { NewsCategory } from "@/shared/types/content";
import type { EntityRef, EntityRefType } from "@/shared/types/relevants";

/**
 * Обложка статьи: только то, что нужно вёрстке. `ImageMetadata` из Astro
 * структурно подходит под этот тип, поэтому content collection отдаёт его без
 * преобразований, а сам слой `entities` остаётся без импортов фреймворка
 * (см. `src/entities/AGENTS.md`). Полный `ImageMetadata` нужен только там,
 * где из картинки строится og:image, — это уровень `app`.
 */
export interface NewsImage {
  src: string;
  width: number;
  height: number;
  srcSet?: string;
}

/** Языки, для которых генерируются страницы новостей. */
export const NEWS_LANGS = ["ru", "en"] as const;

export type NewsLang = (typeof NEWS_LANGS)[number];

export function isNewsLang(value: string | undefined): value is NewsLang {
  return value !== undefined && (NEWS_LANGS as readonly string[]).includes(value);
}

export type { NewsCategory };

export interface NewsAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

/** Frontmatter-совместимый вход: то, что лежит в `data` записи коллекции. */
export interface NewsData {
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  readingTimeMin?: number;
  draft?: boolean;
  tags?: string[];
  relatedServices?: string[];
  relatedSolutions?: string[];
  relatedCases?: string[];
  ogImage?: NewsImage;
  category?: NewsCategory;
  author?: NewsAuthor;
  excerpt?: string;
  featured?: boolean;
  /** Ссылка на запись для жанра `media`. */
  mediaUrl?: string;
}

/**
 * Подпись автора по умолчанию, пока в разделе нет авторов-людей. Значение
 * зависит от локали статьи, поэтому живёт рядом с сборкой `NewsItem`.
 */
export const DEFAULT_NEWS_AUTHOR: Record<NewsLang, string> = {
  ru: "Команда LoginAI",
  en: "LoginAI Team",
};

/**
 * Статья в виде, пригодном для UI и для страниц: слаг, локаль, готовые ссылки
 * на раздел и на коммерческие сущности. Один и тот же объект получают
 * карточка в списке и страница статьи.
 */
export interface NewsItem {
  slug: string;
  lang: NewsLang;
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  readingTimeMin: number;
  draft: boolean;
  tags: string[];
  ogImage?: NewsImage;
  href: string;
  path: string;
  publishedLabel: string;
  publishedIso: string;
  relevants: EntityRef[];
  category?: NewsCategory;
  author?: NewsAuthor;
  excerpt?: string;
  featured?: boolean;
  /** Ссылка на запись для жанра `media`. */
  mediaUrl?: string;
}

/** Слаги услуг/решений/кейсов → `relevants`-ссылки для готовых блоков. */
export function toNewsEntityRefs(data: NewsData): EntityRef[] {
  const groups: [EntityRefType, string[] | undefined][] = [
    ["service", data.relatedServices],
    ["solution", data.relatedSolutions],
    ["case", data.relatedCases],
  ];
  const refs: EntityRef[] = [];
  for (const [type, slugs] of groups) {
    for (const slug of slugs ?? []) {
      refs.push({ type, slug } as EntityRef);
    }
  }
  return refs;
}

/** Чистый путь раздела и статьи (без префикса локали). */
export function newsSectionPath(): string {
  return "/news";
}

export function newsArticlePath(slug: string): string {
  return `/news/${slug}`;
}

/** Текст статьи: 180 слов в минуту, минимум одна минута. */
export function estimateReadingTime(body: string | undefined, wordsPerMinute = 180): number {
  const words = (body ?? "").trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

const dateFormatters = new Map<NewsLang, Intl.DateTimeFormat>();

function formatDate(date: Date, lang: NewsLang): string {
  let formatter = dateFormatters.get(lang);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    dateFormatters.set(lang, formatter);
  }
  return formatter.format(date);
}

/**
 * Разбор `id` записи коллекции в слаг и язык. `id` — путь относительно
 * `articles/` без расширения: `ai-agents-efficiency.ru` → слаг
 * `ai-agents-efficiency`, язык `ru`. Язык отрезается по ПОСЛЕДНЕЙ точке,
 * поэтому слаг сам может содержать точки. `null` — неизвестный язык, такая
 * запись страницу не порождает.
 */
export function parseNewsId(id: string): { slug: string; lang: NewsLang } | null {
  const dot = id.lastIndexOf(".");
  if (dot <= 0) return null;
  const slug = id.slice(0, dot);
  const lang = id.slice(dot + 1);
  if (!slug || !isNewsLang(lang)) return null;
  return { slug, lang };
}

/**
 * Собирает `NewsItem` из записи коллекции. `id` — ключ Content Layer
 * (`slug.ru`), ссылки собираются через `routeUrl`, поэтому префикс локали
 * совпадает с остальными страницами сайта. `null` — запись с неизвестным
 * языком в имени файла.
 */
export function toNewsItem(id: string, data: NewsData, body?: string): NewsItem | null {
  const parsed = parseNewsId(id);
  if (!parsed) return null;
  const { slug, lang } = parsed;
  const path = newsArticlePath(slug);
  return {
    slug,
    lang,
    title: data.title,
    description: data.description,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    readingTimeMin: data.readingTimeMin ?? estimateReadingTime(body),
    draft: data.draft === true,
    tags: data.tags ?? [],
    ogImage: data.ogImage,
    href: routeUrl(path, lang),
    path,
    publishedLabel: formatDate(data.publishedAt, lang),
    publishedIso: data.publishedAt.toISOString(),
    relevants: toNewsEntityRefs(data),
    category: data.category,
    author: data.author ?? { name: DEFAULT_NEWS_AUTHOR[lang] },
    excerpt: data.excerpt,
    featured: data.featured,
    mediaUrl: data.mediaUrl,
  };
}

/**
 * Свежие сверху; при равных датах — по слагу, чтобы порядок был стабильным.
 * Дженерик — чтобы вызывающая сторона могла фильтровать свои надстройки над
 * `NewsItem` (например, `NewsPageItem` с полным `ogImage`) без приведения типов.
 */
export function sortNewsByDateDesc<T extends NewsItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const diff = b.publishedAt.getTime() - a.publishedAt.getTime();
    return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
  });
}

/**
 * Опубликованные статьи локали, свежие сверху. Черновики и переводы,
 * отсутствующие в `articles/`, отсекаются здесь: иначе индексная страница или
 * обратная перелинковка собрала бы ссылку на страницу, которой нет в `dist`
 * (её поймает `verify:dist`).
 */
export function filterNewsForLang<T extends NewsItem>(items: T[], lang: NewsLang): T[] {
  return sortNewsByDateDesc(items.filter((item) => item.lang === lang && !item.draft));
}
