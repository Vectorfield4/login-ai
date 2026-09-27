import type { NewsItem } from "@/entities/news/model/news";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { relevantNewsBlockTitleKeys } from "../model";
import { NewsSection } from "./NewsSection";

interface ServiceNewsProps {
  lang: AppLang;
  items: NewsItem[];
}

/**
 * Услуга → новости: статьи, в frontmatter которых указан этот `slug` услуги.
 * Список собирается обратным поиском по коллекции (`getNewsReferencing`) в
 * frontmatter страницы услуги.
 */
export function ServiceNews({ lang, items }: ServiceNewsProps) {
  const t = useT(lang);
  return <NewsSection lang={lang} title={t(relevantNewsBlockTitleKeys.service)} items={items} />;
}
