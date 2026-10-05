import * as stylex from "@stylexjs/stylex";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import type { AppLang } from "@/shared/hooks/useT";
import type { TradeoffItem } from "@/shared/types/content";
import { TradeoffRow } from "@/shared/ui/molecules/TradeoffRow";

const styles = stylex.create({
  list: { listStyle: "none", margin: 0, padding: 0 },
});

/**
 * Реестр ограничений: плоский список строк, разделённых волосяными линиями.
 * Внутренний блок — страница оборачивает его в собственный Section/BlockSection
 * (не задаёт собственный фон).
 */
export function TradeoffsBlock({
  items,
  lang,
  ariaLabel,
}: {
  items: TradeoffItem[];
  lang: AppLang;
  ariaLabel?: string;
}) {
  if (!items.length) return null;
  return (
    <ul
      itemScope
      itemType={schemaIri(SCHEMA_TYPE.itemList)}
      {...stylex.props(styles.list)}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <TradeoffRow
          key={item.title}
          index={index}
          title={item.title}
          text={item.text}
          lang={lang}
        />
      ))}
    </ul>
  );
}

export default TradeoffsBlock;
