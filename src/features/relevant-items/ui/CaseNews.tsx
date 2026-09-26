import type { NewsItem } from "@/shared/data/news";
import type { TFunc } from "@/shared/i18n/t";
import { relevantNewsBlockTitleKeys } from "../model";
import { NewsSection } from "./NewsSection";

interface CaseNewsProps {
  t: TFunc;
  items: NewsItem[];
}

/** Кейс → новости: статьи, ссылающиеся на этот `slug` кейса. */
export function CaseNews({ t, items }: CaseNewsProps) {
  return <NewsSection t={t} title={t(relevantNewsBlockTitleKeys.case)} items={items} />;
}
