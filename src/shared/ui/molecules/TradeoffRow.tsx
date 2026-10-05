import * as stylex from "@stylexjs/stylex";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  row: {
    display: "grid",
    gridTemplateColumns: "1.75rem minmax(0, 1fr)",
    alignItems: "baseline",
    columnGap: tokens.spacing15,
    rowGap: tokens.spacing1,
    paddingBlock: tokens.spacing3,
    borderTop: `1px solid ${tokens.colorDivider}`,
    transition: `background-color ${tokens.durationShortest} ${tokens.easingInOut}`,
    ":first-child": { borderTop: "none" },
    ":hover": { backgroundColor: tokens.colorSurfaceSunken },
    "@media (min-width: 600px)": {
      gridTemplateColumns: "2.25rem minmax(0, 1fr)",
      paddingBlock: tokens.spacing4,
    },
    "@media (min-width: 900px)": {
      gridTemplateColumns: "2.5rem minmax(0, 17rem) minmax(0, 1fr)",
      columnGap: tokens.spacing4,
      rowGap: 0,
    },
    "@media (min-width: 1200px)": {
      gridTemplateColumns: "2.5rem minmax(0, 19rem) minmax(0, 1fr)",
      columnGap: tokens.spacing5,
    },
  },
  ordinal: {
    gridColumn: "1",
    gridRow: "1",
    fontVariantNumeric: "tabular-nums",
    color: tokens.colorTextSecondary,
  },
  // Длинный заголовок без minWidth:0 раздувает свою дорожку и ломает колонки.
  title: {
    gridColumn: "2",
    gridRow: "1",
    minWidth: 0,
    overflowWrap: "anywhere",
  },
  text: {
    gridColumn: "2",
    gridRow: "2",
    minWidth: 0,
    "@media (min-width: 900px)": {
      gridColumn: "3",
      gridRow: "1",
      paddingLeft: tokens.spacing4,
      borderLeft: `1px solid ${tokens.colorDivider}`,
    },
  },
});

/**
 * Строка реестра издержек: порядковый номер, короткое имя ограничения и
 * объяснение. На широком экране заголовок и текст встают в отдельные колонки
 * с вертикальной линейкой; на узком — текст уходит под заголовок. Плоская
 * строка без тени и hover-подъёма: это условия, а не интерактивная карточка.
 */
export function TradeoffRow({
  index,
  title,
  text,
  lang,
}: {
  index: number;
  title: string;
  text: string;
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <li
      itemScope
      itemProp="itemListElement"
      itemType={schemaIri(SCHEMA_TYPE.thing)}
      {...stylex.props(styles.row)}
    >
      <Typography variant="caption" component="span" style={styles.ordinal}>
        {String(index + 1).padStart(2, "0")}
      </Typography>
      <Typography variant="h6" component="h3" itemProp="name" style={styles.title}>
        {t(title)}
      </Typography>
      <Typography variant="body2" color="textSecondary" itemProp="description" style={styles.text}>
        {t(text)}
      </Typography>
    </li>
  );
}

export default TradeoffRow;
