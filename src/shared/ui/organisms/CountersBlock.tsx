import * as stylex from "@stylexjs/stylex";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CounterItem } from "@/shared/types/content";
import { tokens } from "../../design/tokens.stylex.ts";
import { CountCard } from "../atoms/CountCard";
import { Typography } from "../atoms/Typography";

type CountersBlockProps = {
  items: CounterItem[];
  lang: AppLang;
};

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacing2,
    "@media (min-width: 900px)": { gridTemplateColumns: "repeat(4, 1fr)" },
  },
  label: { marginBlockStart: tokens.spacing1 },
});

/** Tiles with a static metric value (no count-up on the SSG stage) and an i18n-key label. */
export function CountersBlock({ items, lang }: CountersBlockProps) {
  const t = useT(lang);
  return (
    <div {...stylex.props(styles.grid)}>
      {items.map((item) => (
        <CountCard key={item.label} itemScope itemType={schemaIri(SCHEMA_TYPE.propertyValue)}>
          <Typography variant="h3" color="primary" component="span" itemProp="value">
            {item.value}
          </Typography>
          <Typography variant="body2" color="textSecondary" itemProp="name" style={styles.label}>
            {t(item.label)}
          </Typography>
        </CountCard>
      ))}
    </div>
  );
}
