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
  // The query container is a wrapper: an element cannot be queried by its own
  // container rules, so `container-type` on the grid itself left every track
  // list unwrapped on the first `1fr` — one column at any width, and a min-content
  // blowout on mobile. `minmax(0, 1fr)` then lets a card shrink below its content.
  container: { containerType: "inline-size" },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: tokens.spacing3,
    gridAutoRows: "1fr",
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
export function NewsIndexList({ items, lang }: NewsIndexListProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <div {...stylex.props(styles.container)}>
      <div itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)} {...stylex.props(styles.grid)}>
        {items.map((item, index) => (
          <NewsCard lang={lang} key={item.slug} item={item} position={index + 1} />
        ))}
      </div>
    </div>
  );
}
