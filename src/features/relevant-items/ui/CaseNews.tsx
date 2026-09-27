import type { NewsItem } from "@/entities/news/model/news";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { relevantNewsBlockTitleKeys } from "../model";
import { NewsSection } from "./NewsSection";

interface CaseNewsProps {
  lang: AppLang;
  items: NewsItem[];
}

/** Кейс → новости: статьи, ссылающиеся на этот `slug` кейса. */
export function CaseNews({ lang, items }: CaseNewsProps) {
  const t = useT(lang);
  return <NewsSection lang={lang} title={t(relevantNewsBlockTitleKeys.case)} items={items} />;
}
