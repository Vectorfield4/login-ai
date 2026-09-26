import type { NewsItem } from "@/entities/news/model/news";
import type { TFunc } from "@/shared/i18n/t";
import { relevantNewsBlockTitleKeys } from "../model";
import { NewsSection } from "./NewsSection";

interface SolutionNewsProps {
  t: TFunc;
  items: NewsItem[];
}

/** Решение → новости: статьи, ссылающиеся на этот `slug` решения. */
export function SolutionNews({ t, items }: SolutionNewsProps) {
  return <NewsSection t={t} title={t(relevantNewsBlockTitleKeys.solution)} items={items} />;
}
