import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type GridProps = {
  container?: boolean;
  item?: boolean;
  /** РљРѕР»РѕРЅРєРё СЌР»РµРјРµРЅС‚Р° РёР· 12, РІРєР»СЋС‡Р°СЏ md-Р±СЂРµР№РєРїРѕРёРЅС‚ (в‰Ґ900px) */
  size?: number;
  md?: number;
  /** РћС‚СЃС‚СѓРї РјРµР¶РґСѓ СЏС‡РµР№РєР°РјРё РІ РµРґРёРЅРёС†Р°С… 8px */
  spacing?: number;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gap: tokens.spacing3,
  },
  item: { minWidth: 0 },
  gap1: { gap: tokens.spacing1 },
  gap15: { gap: tokens.spacing15 },
  gap2: { gap: tokens.spacing2 },
  gap3: { gap: tokens.spacing3 },
  gap4: { gap: tokens.spacing4 },
  span1: { gridColumn: "span 1" },
  span2: { gridColumn: "span 2" },
  span3: { gridColumn: "span 3" },
  span4: { gridColumn: "span 4" },
  span5: { gridColumn: "span 5" },
  span6: { gridColumn: "span 6" },
  span7: { gridColumn: "span 7" },
  span8: { gridColumn: "span 8" },
  span9: { gridColumn: "span 9" },
  span10: { gridColumn: "span 10" },
  span11: { gridColumn: "span 11" },
  span12: { gridColumn: "span 12" },
  mdSpan1: { "@media (min-width: 900px)": { gridColumn: "span 1" } },
  mdSpan2: { "@media (min-width: 900px)": { gridColumn: "span 2" } },
  mdSpan3: { "@media (min-width: 900px)": { gridColumn: "span 3" } },
  mdSpan4: { "@media (min-width: 900px)": { gridColumn: "span 4" } },
  mdSpan5: { "@media (min-width: 900px)": { gridColumn: "span 5" } },
  mdSpan6: { "@media (min-width: 900px)": { gridColumn: "span 6" } },
  mdSpan7: { "@media (min-width: 900px)": { gridColumn: "span 7" } },
  mdSpan8: { "@media (min-width: 900px)": { gridColumn: "span 8" } },
  mdSpan9: { "@media (min-width: 900px)": { gridColumn: "span 9" } },
  mdSpan10: { "@media (min-width: 900px)": { gridColumn: "span 10" } },
  mdSpan11: { "@media (min-width: 900px)": { gridColumn: "span 11" } },
  mdSpan12: { "@media (min-width: 900px)": { gridColumn: "span 12" } },
});

const spans: Record<number, StyleXStyles> = {
  1: styles.span1,
  2: styles.span2,
  3: styles.span3,
  4: styles.span4,
  5: styles.span5,
  6: styles.span6,
  7: styles.span7,
  8: styles.span8,
  9: styles.span9,
  10: styles.span10,
  11: styles.span11,
  12: styles.span12,
  0: styles.span12,
};

const mdSpans: Record<number, StyleXStyles> = {
  1: styles.mdSpan1,
  2: styles.mdSpan2,
  3: styles.mdSpan3,
  4: styles.mdSpan4,
  5: styles.mdSpan5,
  6: styles.mdSpan6,
  7: styles.mdSpan7,
  8: styles.mdSpan8,
  9: styles.mdSpan9,
  10: styles.mdSpan10,
  11: styles.mdSpan11,
  12: styles.mdSpan12,
  0: styles.mdSpan12,
};

const gaps: Record<number, StyleXStyles> = {
  1: styles.gap1,
  1.5: styles.gap15,
  2: styles.gap2,
  3: styles.gap3,
  4: styles.gap4,
};

export function Grid({
  container = false,
  item = false,
  size = 0,
  md = 0,
  spacing = 1,
  style,
  children,
}: GridProps) {
  if (container) {
    return (
      <div {...stylex.props(styles.container, gaps[spacing] ?? styles.gap1, style)}>{children}</div>
    );
  }
  if (item) {
    return (
      <div
        {...stylex.props(styles.item, spans[size] ?? styles.span12, md !== 0 && mdSpans[md], style)}
      >
        {children}
      </div>
    );
  }
  return <div {...stylex.props(style)}>{children}</div>;
}

export default Grid;
