import * as stylex from "@stylexjs/stylex";
import { RelationRow } from "@/features/relevant-items/ui/molecules/RelationRow";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";

const styles = stylex.create({
  list: {
    display: "grid",
    backgroundColor: tokens.colorSurface,
    border: `1px solid ${tokens.colorDivider}`,
    borderRadius: tokens.radiusBorder,
    overflow: "hidden",
  },
  row: {
    borderBlockStart: `1px solid ${tokens.colorDivider}`,
    ":first-child": { borderBlockStart: "none" },
  },
});

export interface RelationRowItem {
  titleKey: string;
  href: string;
}

interface RelationRowsProps {
  items: RelationRowItem[];
  t: TFunc;
  lang: "ru" | "en";
}

/**
 * Колонка «связанного» плотным списком: рамка вокруг строк с разделителями.
 * Читается как один список, поэтому держит секцию от растягивания на весь
 * экран — в отличие от колонки карточек.
 */
export function RelationRows({ items, t, lang }: RelationRowsProps) {
  return (
    <div {...stylex.props(styles.list)}>
      {items.map((item) => (
        <div key={item.href} {...stylex.props(styles.row)}>
          <RelationRow titleKey={item.titleKey} href={item.href} t={t} lang={lang} />
        </div>
      ))}
    </div>
  );
}
