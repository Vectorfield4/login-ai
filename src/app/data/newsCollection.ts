import { getImage } from "astro:assets";
import { getCollection, render } from "astro:content";
import type { ImageMetadata } from "astro";
import {
  filterNewsForLang,
  type NewsData,
  type NewsImage,
  type NewsItem,
  type NewsLang,
  toNewsItem,
} from "@/entities/news/model/news";
import type { EntityRef, EntityRefType } from "@/shared/types/relevants";

/**
 * Единственный модуль проекта, который импортирует `astro:content` и
 * `astro:assets`.
 *
 * Причина — виртуальные модули Astro не существуют вне его сборщика: любой
 * файл с таким импортом нельзя положить в граф юнит-тестов Vitest. Поэтому
 * доступ к коллекции вызывается только из frontmatter `.astro`-страниц, а
 * вся логика над `NewsItem` живёт в `entities/news/model/news.ts` и покрыта
 * тестами.
 *
 * Модуль лежит в `app/data`, а не в `entities/news`: новости — домен, но
 * чтение коллекции знает про Astro так же, как `solutionImages.ts` знает про
 * `ImageMetadata`, а такое знание в `entities` запрещено
 * (см. `src/entities/AGENTS.md`).
 */

/** Запись коллекции плюс обложка: ужатая для карточек и полная для og:image. */
export type NewsPageItem = Omit<NewsItem, "ogImage"> & {
  ogImage?: NewsImage;
  cover?: ImageMetadata;
};

/**
 * Обложки статей по конвенции «файл назван как слаг»: слаг
 * `ai-agents-support-autonomy` берёт картинку `articles/images/<slug>.png`
 * и т.д. Смысл конвенции — не дублировать путь в каждом из двух
 * фронтматтеров (`.ru.md` и `.en.md`) и не забыть про него в паре.
 *
 * `import.meta.glob` с `eager` — статический анализ на этапе сборки: каждый
 * матчащий файл превращается в обычный импорт и проходит через asset-плагин
 * Astro, поэтому `default` — это `ImageMetadata` (тот же контракт, что у
 * `image()` в схеме коллекции).
 *
 * Явный `ogImage` во фронтматтере всегда выигрывает: конвенция — только
 * фолбэк.
 */
const coverExtensions = ["png", "jpg", "jpeg", "webp"] as const;

const coverModules = import.meta.glob<{ default: ImageMetadata }>(
  "../../../articles/images/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

/** Слаг → обложка; при нескольких расширениях побеждает более приоритетный. */
const coverImages = new Map<string, { image: ImageMetadata; rank: number }>();

for (const [path, module] of Object.entries(coverModules)) {
  const file = path.slice(path.lastIndexOf("/") + 1);
  const dot = file.lastIndexOf(".");
  if (dot <= 0) continue;
  const slug = file.slice(0, dot);
  const rank = coverExtensions.indexOf(
    file.slice(dot + 1).toLowerCase() as (typeof coverExtensions)[number],
  );
  const image = module?.default;
  if (rank === -1 || !image) continue;
  const current = coverImages.get(slug);
  if (!current || rank < current.rank) coverImages.set(slug, { image, rank });
}

/** Обложка статьи по её слагу; `undefined` — файла нет, будет плейсхолдер. */
export function getNewsCover(slug: string): ImageMetadata | undefined {
  return coverImages.get(slug)?.image;
}

/** Превью занимает 40% ширины карточки, то есть ~110–200 CSS-пикселей. */
const thumbWidths = [320, 480, 640] as const;

/** 3/2 — тот же бокс, что `tokens.thumbAspectRatioHorizontal` в вёрстке. */
const THUMB_ASPECT = 3 / 2;

const thumbCache = new Map<string, Promise<NewsImage>>();

/** AVIF-варианты обложки под каждую ширину из `thumbWidths`, плюс `srcSet`. */
export function getNewsThumb(image: ImageMetadata | undefined): Promise<NewsImage | undefined> {
  if (!image) return Promise.resolve(undefined);
  const cached = thumbCache.get(image.src);
  if (cached) return cached;
  const pending = buildNewsThumb(image);
  thumbCache.set(image.src, pending);
  return pending;
}

async function buildNewsThumb(image: ImageMetadata): Promise<NewsImage> {
  // Обложки рисуются в 3/2, а исходники 16/9: кропим под бокс заранее, иначе
  // браузер вырежет ~16% уже отресайзенной картинки и получит мыло.
  const cropped = { width: image.height * THUMB_ASPECT, height: image.height };
  const variants = await Promise.all(
    thumbWidths
      .filter((width) => width <= cropped.width)
      .map(async (width) => {
        const { src } = await getImage({
          src: image,
          width,
          height: Math.round(width / THUMB_ASPECT),
          fit: "cover",
          position: "center",
          format: "avif",
          quality: 60,
        });
        return { src, width };
      }),
  );
  // Обложка меньше самой узкой ширины — отдаём как есть, без srcSet.
  const list = variants.length > 0 ? variants : [{ src: image.src, width: image.width }];
  const largest = list[list.length - 1];
  return {
    src: largest.src,
    width: largest.width,
    height: Math.round(largest.width / THUMB_ASPECT),
    srcSet: list.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
  };
}

type CollectionEntry = {
  id: string;
  body?: string;
  data: Omit<NewsData, "ogImage"> & { ogImage?: ImageMetadata };
};

/**
 * `getCollection` типизирован как `any` до `astro sync` (а `npm run build`
 * запускает `tsc -b` раньше `astro build`), поэтому запись приводится к
 * минимальному контракту вручную. Данные валидирует схема коллекции —
 * см. `src/content.config.ts`.
 */
export async function getAllNews(): Promise<NewsPageItem[]> {
  const entries = (await getCollection("news")) as unknown as CollectionEntry[];
  const items: NewsPageItem[] = [];
  for (const entry of entries) {
    const item = await toEntryItem(entry);
    if (item) items.push(item);
  }
  return items;
}

/** Опубликованные статьи локали, свежие сверху. */
export async function getNewsForLang(lang: NewsLang): Promise<NewsPageItem[]> {
  return filterNewsForLang(await getAllNews(), lang);
}

/** Статья по слагу; `null` — нет перевода в этой локали. */
export async function getNewsBySlug(slug: string, lang: NewsLang): Promise<NewsPageItem | null> {
  const entry = await findNewsEntry(slug, lang);
  return entry ? toEntryItem(entry) : null;
}

/**
 * Статья вместе с отрендеренным markdown: одна функция вместо двух, чтобы
 * страница не ходила в коллекцию дважды и не расходилась в проверке «есть ли
 * такой перевод».
 */
export async function getNewsPage(slug: string, lang: NewsLang) {
  const entry = await findNewsEntry(slug, lang);
  if (!entry) return null;
  const item = await toEntryItem(entry);
  if (!item) return null;
  const rendered = await render(entry);
  return { item, Content: rendered.Content };
}

/** `NewsItem` из слоя домена плюс картинки, до которых ему не дотянуться. */
async function toEntryItem(entry: CollectionEntry): Promise<NewsPageItem | null> {
  const item = toNewsItem(entry.id, entry.data, entry.body);
  if (!item) return null;
  // Явный ogImage важнее конвенции «файл назван как слаг».
  const cover = entry.data.ogImage ?? getNewsCover(item.slug);
  return { ...item, ogImage: await getNewsThumb(cover), cover };
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
): Promise<NewsPageItem[]> {
  const items = await getNewsForLang(lang);
  return items.filter((item) =>
    item.relevants.some((ref: EntityRef) => ref.type === type && ref.slug === slug),
  );
}
