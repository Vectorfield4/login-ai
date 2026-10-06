import * as stylex from "@stylexjs/stylex";
import { Package } from "lucide-react";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { ListItemScope } from "@/shared/ui/atoms/ListItemScope";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  root: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    alignItems: "start",
    columnGap: tokens.spacing15,
    rowGap: tokens.spacing05,
    padding: tokens.layoutCard,
    borderRadius: tokens.radiusBorder,
    border: `1px solid ${tokens.colorDivider}`,
    boxSizing: "border-box",
  },
  // Квадрат под иконкой, а не круг с галочкой: состав поставки — это набор
  // компонентов, а не отметка о выполнении проверки.
  mark: {
    gridRow: "1 / span 2",
    width: 40,
    height: 40,
    borderRadius: tokens.radiusShape,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
  },
  title: { gridColumn: "2", gridRow: "1", minWidth: 0 },
  text: { gridColumn: "2", gridRow: "2", minWidth: 0 },
});

/** Строка состава поставки: иконка-компонент, короткое имя и пояснение. */
export function DeliverableRow({
  title,
  text,
  lang,
  position,
}: {
  title: string;
  text: string;
  lang: AppLang;
  position: number;
}) {
  const t = useT(lang);
  return (
    <div
      itemScope
      itemProp="itemListElement"
      itemType={schemaIri(SCHEMA_TYPE.listItem)}
      {...stylex.props(styles.root)}
    >
      <ListItemScope position={position} type={SCHEMA_TYPE.thing}>
        <span {...stylex.props(styles.mark)}>
          <Package size={20} aria-hidden="true" />
        </span>
        <Typography variant="h6" component="h3" itemProp="name" style={styles.title}>
          {t(title)}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          itemProp="description"
          style={styles.text}
        >
          {t(text)}
        </Typography>
      </ListItemScope>
    </div>
  );
}

export default DeliverableRow;
