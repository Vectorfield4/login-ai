import type { NewsItem } from "@/entities/news";

/**
 * Trimmed news shape handed to the home island: the page builds it from
 * the entity data so the hydrated payload stays small.
 */
export interface HomeNewsItem {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  publishedLabel: string;
  publishedIso: string;
  tags: string[];
  ogImage?: NewsItem["ogImage"];
  category?: NewsItem["category"];
}

/**
 * Narrows a full news item to the island input.
 */
export function toHomeNewsItem(item: NewsItem): HomeNewsItem {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? item.description,
    href: item.href,
    publishedLabel: item.publishedLabel,
    publishedIso: item.publishedIso,
    tags: item.tags,
    ogImage: item.ogImage,
    category: item.category,
  };
}
