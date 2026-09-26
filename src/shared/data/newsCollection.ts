import { getCollection, render } from "astro:content";
import {
  filterNewsForLang,
  type NewsData,
  type NewsItem,
  type NewsLang,
  toNewsItem,
} from "@/entities/news/model/news";
import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";

/**
 * Единственный модуль проекта, который импортирует `astro:content`.
 *
 * Причина — виртуальный модуль Astro не существует вне его сборщика: любой
 * файл с таким импортом нельзя положить в граф юнит-тестов Vitest. Поэтому
 * доступ к коллекции вызывается только из frontmatter `.astro`-страниц, а
 * вся логика над `NewsItem` живёт в `news.ts` и покрыта тестами.
 */

type CollectionEntry = { id: string; body?: string; data: NewsData };

/**
 * `getCollection` типизирован как `any` до `astro sync` (а `npm run build`
 * запускает `tsc -b` раньше `astro build`), поэтому запись приводится к
 * минимальному контракту вручную. Данные валидирует схема коллекции —
 * см. `src/content.config.ts`.
 */
export async function getAllNews(): Promise<NewsItem[]> {
  const entries = (await getCollection("news")) as unknown as CollectionEntry[];
  const items: NewsItem[] = [];
  for (const entry of entries) {
    const item = toNewsItem(entry.id, entry.data, entry.body);
    if (item) items.push(item);
  }
  return items;
}

/** Опубликованные статьи локали, свежие сверху. */
export async function getNewsForLang(lang: NewsLang): Promise<NewsItem[]> {
  return filterNewsForLang(await getAllNews(), lang);
}

/** Статья по слагу; `null` — нет перевода в этой локали. */
export async function getNewsBySlug(slug: string, lang: NewsLang): Promise<NewsItem | null> {
  const entry = await findNewsEntry(slug, lang);
  return entry ? toNewsItem(entry.id, entry.data, entry.body) : null;
}

/**
 * Статья вместе с отрендеренным markdown: одна функция вместо двух, чтобы
 * страница не ходила в коллекцию дважды и не расходилась в проверке «есть ли
 * такой перевод».
 */
export async function getNewsPage(slug: string, lang: NewsLang) {
  const entry = await findNewsEntry(slug, lang);
  if (!entry) return null;
  const item = toNewsItem(entry.id, entry.data, entry.body);
  if (!item) return null;
  const rendered = await render(entry);
  return { item, Content: rendered.Content };
}

async function findNewsEntry(slug: string, lang: NewsLang): Promise<CollectionEntry | null> {
  const entries = (await getCollection("news")) as unknown as CollectionEntry[];
  return (
    entries.find((entry) => {
      const parsed = toNewsItem(entry.id, entry.data);
      return parsed?.slug === slug && parsed.lang === lang && parsed.draft !== true;
    }) ?? null
  );
}

/** Локали, в которых статья уже опубликована: основа для hreflang/x-default. */
export async function getNewsLangs(slug: string): Promise<NewsLang[]> {
  const items = await getAllNews();
  return items.filter((item) => item.slug === slug && !item.draft).map((item) => item.lang);
}
/**
 * Обратная перелинковка: статьи, ссылающиеся на коммерческую сущность.
 *
 * Один проход по уже отфильтрованной локали — на 100+ статьях это дешевле,
 * чем отдельный поиск на каждую сущность. Результат отсортирован свежими
 * сверху, асимметричные переводы отсеяны: блок на EN-странице услуги не
 * соберёт ссылку на несуществующую EN-статью.
 */
export async function getNewsReferencing(
  type: EntityRefType,
  slug: string,
  lang: NewsLang,
): Promise<NewsItem[]> {
  const items = await getNewsForLang(lang);
  return items.filter((item) =>
    item.relevants.some((ref: EntityRef) => ref.type === type && ref.slug === slug),
  );
}
