import type { NewsItem } from "@/entities/news/model/news";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { relevantNewsBlockTitleKeys } from "../model";
import { NewsSection } from "./NewsSection";

interface SolutionNewsProps {
  lang: AppLang;
  items: NewsItem[];
}

/** Решение → новости: статьи, ссылающиеся на этот `slug` решения. */
export function SolutionNews({ lang, items }: SolutionNewsProps) {
  const t = useT(lang);
  return <NewsSection lang={lang} title={t(relevantNewsBlockTitleKeys.solution)} items={items} />;
}
