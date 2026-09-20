import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type GridProps = {
  container?: boolean;
  item?: boolean;
  /** РљРѕР»РѕРЅРєРё СЌР»РµРјРµРЅС‚Р° РёР· 12 РЅР° РјРѕР±РёР»СЊРЅРѕРј Р±СЂРµР№РєРїРѕРёРЅС‚Рµ */
  size?: number;
  /** РљРѕР»РѕРЅРєРё РЅР° bрµР°РєРїРѕРёРЅС‚Рµ в‰Ґ600px */
  sm?: number;
  /** РљРѕР»РѕРЅРєРё РЅР° бСЂРµР№РєРїРѕРёРЅС‚Рµ в‰Ґ900px */
  md?: number;
  /** РљРѕР»РѕРЅРєРё РЅР° бСЂРµР№РєРїРѕРёРЅС‚Рµ в‰Ґ1200px */
  lg?: number;
  /** РћС‚СЃС‚СѓРї РјРµР¶РґСѓ СЏС‡РµР№РєР°РјРё РІ РµРґРёРЅРёС†Р°С… 8px */
  spacing?: number;
  /** Р’РµСЂС‚РёРєР°Р»СЊРЅРѕРµ РІС‹СЂР°РІРЅРёРІР°РЅРёРµ СЏС‡РµРµРє РєРѕРЅС‚РµР№РЅРµСЂР° (МГМUI alignItems) */
  alignItems?: "start" | "center" | "end";
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
  alignStart: { alignItems: "flex-start" },
  alignCenter: { alignItems: "center" },
  alignEnd: { alignItems: "flex-end" },
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
  smSpan1: { "@media (min-width: 600px)": { gridColumn: "span 1" } },
  smSpan2: { "@media (min-width: 600px)": { gridColumn: "span 2" } },
  smSpan3: { "@media (min-width: 600px)": { gridColumn: "span 3" } },
  smSpan4: { "@media (min-width: 600px)": { gridColumn: "span 4" } },
  smSpan5: { "@media (min-width: 600px)": { gridColumn: "span 5" } },
  smSpan6: { "@media (min-width: 600px)": { gridColumn: "span 6" } },
  smSpan7: { "@media (min-width: 600px)": { gridColumn: "span 7" } },
  smSpan8: { "@media (min-width: 600px)": { gridColumn: "span 8" } },
  smSpan9: { "@media (min-width: 600px)": { gridColumn: "span 9" } },
  smSpan10: { "@media (min-width: 600px)": { gridColumn: "span 10" } },
  smSpan11: { "@media (min-width: 600px)": { gridColumn: "span 11" } },
  smSpan12: { "@media (min-width: 600px)": { gridColumn: "span 12" } },
  lgSpan1: { "@media (min-width: 1200px)": { gridColumn: "span 1" } },
  lgSpan2: { "@media (min-width: 1200px)": { gridColumn: "span 2" } },
  lgSpan3: { "@media (min-width: 1200px)": { gridColumn: "span 3" } },
  lgSpan4: { "@media (min-width: 1200px)": { gridColumn: "span 4" } },
  lgSpan5: { "@media (min-width: 1200px)": { gridColumn: "span 5" } },
  lgSpan6: { "@media (min-width: 1200px)": { gridColumn: "span 6" } },
  lgSpan7: { "@media (min-width: 1200px)": { gridColumn: "span 7" } },
  lgSpan8: { "@media (min-width: 1200px)": { gridColumn: "span 8" } },
  lgSpan9: { "@media (min-width: 1200px)": { gridColumn: "span 9" } },
  lgSpan10: { "@media (min-width: 1200px)": { gridColumn: "span 10" } },
  lgSpan11: { "@media (min-width: 1200px)": { gridColumn: "span 11" } },
  lgSpan12: { "@media (min-width: 1200px)": { gridColumn: "span 12" } },
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
  1: styles.mdSpan1 as unknown as StyleXStyles,
  2: styles.mdSpan2 as unknown as StyleXStyles,
  3: styles.mdSpan3 as unknown as StyleXStyles,
  4: styles.mdSpan4 as unknown as StyleXStyles,
  5: styles.mdSpan5 as unknown as StyleXStyles,
  6: styles.mdSpan6 as unknown as StyleXStyles,
  7: styles.mdSpan7 as unknown as StyleXStyles,
  8: styles.mdSpan8 as unknown as StyleXStyles,
  9: styles.mdSpan9 as unknown as StyleXStyles,
  10: styles.mdSpan10 as unknown as StyleXStyles,
  11: styles.mdSpan11 as unknown as StyleXStyles,
  12: styles.mdSpan12 as unknown as StyleXStyles,
  0: styles.mdSpan12 as unknown as StyleXStyles,
};

const smSpans: Record<number, StyleXStyles> = {
  1: styles.smSpan1 as unknown as StyleXStyles,
  2: styles.smSpan2 as unknown as StyleXStyles,
  3: styles.smSpan3 as unknown as StyleXStyles,
  4: styles.smSpan4 as unknown as StyleXStyles,
  5: styles.smSpan5 as unknown as StyleXStyles,
  6: styles.smSpan6 as unknown as StyleXStyles,
  7: styles.smSpan7 as unknown as StyleXStyles,
  8: styles.smSpan8 as unknown as StyleXStyles,
  9: styles.smSpan9 as unknown as StyleXStyles,
  10: styles.smSpan10 as unknown as StyleXStyles,
  11: styles.smSpan11 as unknown as StyleXStyles,
  12: styles.smSpan12 as unknown as StyleXStyles,
  0: styles.smSpan12 as unknown as StyleXStyles,
};

const lgSpans: Record<number, StyleXStyles> = {
  1: styles.lgSpan1 as unknown as StyleXStyles,
  2: styles.lgSpan2 as unknown as StyleXStyles,
  3: styles.lgSpan3 as unknown as StyleXStyles,
  4: styles.lgSpan4 as unknown as StyleXStyles,
  5: styles.lgSpan5 as unknown as StyleXStyles,
  6: styles.lgSpan6 as unknown as StyleXStyles,
  7: styles.lgSpan7 as unknown as StyleXStyles,
  8: styles.lgSpan8 as unknown as StyleXStyles,
  9: styles.lgSpan9 as unknown as StyleXStyles,
  10: styles.lgSpan10 as unknown as StyleXStyles,
  11: styles.lgSpan11 as unknown as StyleXStyles,
  12: styles.lgSpan12 as unknown as StyleXStyles,
  0: styles.lgSpan12 as unknown as StyleXStyles,
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
  sm = 0,
  md = 0,
  lg = 0,
  spacing = 1,
  alignItems = "start",
  style,
  children,
}: GridProps) {
  if (container) {
    return (
      <div
        {...stylex.props(
          styles.container,
          gaps[spacing] ?? styles.gap1,
          alignItems === "center"
            ? styles.alignCenter
            : alignItems === "end"
              ? styles.alignEnd
              : styles.alignStart,
          style,
        )}
      >
        {children}
      </div>
    );
  }
  if (item) {
    return (
      <div
        {...stylex.props(
          styles.item,
          spans[size] ?? styles.span12,
          sm !== 0 && smSpans[sm],
          md !== 0 && mdSpans[md],
          lg !== 0 && lgSpans[lg],
          style,
        )}
      >
        {children}
      </div>
    );
  }
  return <div {...stylex.props(style)}>{children}</div>;
}

export default Grid;
