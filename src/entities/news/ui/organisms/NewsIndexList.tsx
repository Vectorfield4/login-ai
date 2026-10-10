import * as stylex from "@stylexjs/stylex";
import type { NewsItem } from "@/entities/news/model/news";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { AppLang } from "@/shared/hooks/useT";
import { NewsCard } from "./NewsCard";

interface NewsIndexListProps {
  items: NewsItem[];
  lang: AppLang;
}

const styles = stylex.create({
  // The index reads as a feed: one full-width row per article, so the meta
  // line has room and never has to wrap inside the card.
  list: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: tokens.spacing3,
  },
});

/**
 * Список статей локали. Пустой список не рендерится — вызывающий показывает
 * заглушку со ссылкой на раздел, чтобы на сайте не было пустой секции.
 */
export function NewsIndexList({ items, lang }: NewsIndexListProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <div itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)} {...stylex.props(styles.list)}>
      {items.map((item, index) => (
        <NewsCard lang={lang} key={item.slug} item={item} position={index + 1} />
      ))}
    </div>
  );
}
