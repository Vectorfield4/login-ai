import * as stylex from "@stylexjs/stylex";
import type { CounterItem } from "../../../../src/entities/case/model/cases";
import { tokens } from "../../design/tokens.stylex.ts";
import type { TFunc } from "../../i18n/t";
import { CountCard } from "../atoms/CountCard";
import { Typography } from "../atoms/Typography";

type CountersBlockProps = {
  items: CounterItem[];
  t: TFunc;
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
export function CountersBlock({ items, t }: CountersBlockProps) {
  return (
    <div {...stylex.props(styles.grid)}>
      {items.map((item) => (
        <CountCard key={item.label}>
          <Typography variant="h3" color="primary" component="span">
            {item.value}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={styles.label}>
            {t(item.label)}
          </Typography>
        </CountCard>
      ))}
    </div>
  );
}
