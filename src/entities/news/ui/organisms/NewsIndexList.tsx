import * as stylex from "@stylexjs/stylex";
import type { NewsItem } from "@/entities/news/model/news";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { NewsCard } from "./NewsCard";

interface NewsIndexListProps {
  items: NewsItem[];
  t: TFunc;
}

const styles = stylex.create({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: tokens.spacing3,
    gridAutoRows: "1fr",
    containerType: "inline-size",
    "@container (min-width: 600px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@container (min-width: 900px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    "@container (min-width: 1200px)": {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
});

/**
 * Список статей локали. Пустой список не рендерится — вызывающий показывает
 * заглушку со ссылкой на раздел, чтобы на сайте не было пустой секции.
 */
export function NewsIndexList({ items, t }: NewsIndexListProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <div {...stylex.props(styles.root)}>
      {items.map((item) => (
        <NewsCard key={item.slug} item={item} t={t} />
      ))}
    </div>
  );
}
