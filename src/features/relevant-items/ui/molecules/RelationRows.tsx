import * as stylex from "@stylexjs/stylex";
import { RelationRow } from "@/features/relevant-items/ui/molecules/RelationRow";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { AppLang } from "@/shared/hooks/useT";

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
  lang: AppLang;
}

/**
 * Колонка «связанного» плотным списком: рамка вокруг строк с разделителями.
 * Читается как один список, поэтому держит секцию от растягивания на весь
 * экран — в отличие от колонки карточек.
 */
export function RelationRows({ items, lang }: RelationRowsProps) {
  return (
    <div itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)} {...stylex.props(styles.list)}>
      {items.map((item, index) => (
        <div key={item.href} {...stylex.props(styles.row)}>
          <RelationRow titleKey={item.titleKey} href={item.href} lang={lang} position={index + 1} />
        </div>
      ))}
    </div>
  );
}
