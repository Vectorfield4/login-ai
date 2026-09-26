import type { NewsItem } from "@/entities/news/model/news";
import type { TFunc } from "@/shared/i18n/t";
import { relevantNewsBlockTitleKeys } from "../model";
import { NewsSection } from "./NewsSection";

interface ServiceNewsProps {
  t: TFunc;
  items: NewsItem[];
}

/**
 * Услуга → новости: статьи, в frontmatter которых указан этот `slug` услуги.
 * Список собирается обратным поиском по коллекции (`getNewsReferencing`) в
 * frontmatter страницы услуги.
 */
export function ServiceNews({ t, items }: ServiceNewsProps) {
  return <NewsSection t={t} title={t(relevantNewsBlockTitleKeys.service)} items={items} />;
}
