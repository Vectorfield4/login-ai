import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ElementType, ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type StackDirection = "row" | "column";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "spaceBetween" | "spaceAround";

type StackProps = {
  as?: ElementType;
  direction?: StackDirection;
  /** РћС‚СЃС‚СѓРї РІ РµРґРёРЅРёС†Р°С… СЃРµС‚РєРё 8px (1вЂ“6) */
  gap?: number;
  alignItems?: StackAlign;
  justifyContent?: StackJustify;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  base: { display: "flex" },
  row: { flexDirection: "row" },
  column: { flexDirection: "column" },
  gap0: { gap: 0 },
  gap1: { gap: tokens.spacing1 },
  gap15: { gap: tokens.spacing15 },
  gap2: { gap: tokens.spacing2 },
  gap3: { gap: tokens.spacing3 },
  gap4: { gap: tokens.spacing4 },
  gap5: { gap: tokens.spacing5 },
  gap6: { gap: tokens.spacing6 },
  alignStart: { alignItems: "flex-start" },
  alignCenter: { alignItems: "center" },
  alignEnd: { alignItems: "flex-end" },
  alignStretch: { alignItems: "stretch" },
  justifyStart: { justifyContent: "flex-start" },
  justifyCenter: { justifyContent: "center" },
  justifyEnd: { justifyContent: "flex-end" },
  justifySpaceBetween: { justifyContent: "space-between" },
  justifySpaceAround: { justifyContent: "space-around" },
});

const gaps: Record<number, StyleXStyles> = {
  0: styles.gap0,
  1: styles.gap1,
  1.5: styles.gap15,
  2: styles.gap2,
  3: styles.gap3,
  4: styles.gap4,
  5: styles.gap5,
  6: styles.gap6,
};

const aligns: Record<StackAlign, StyleXStyles> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
};

const justifies: Record<StackJustify, StyleXStyles> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  spaceBetween: styles.justifySpaceBetween,
  spaceAround: styles.justifySpaceAround,
};

export default function Stack({
  as,
  direction = "column",
  gap = 0,
  alignItems = "stretch",
  justifyContent = "start",
  style,
  children,
}: StackProps) {
  const Tag = as ?? "div";
  return (
    <Tag
      {...stylex.props(
        styles.base,
        direction === "row" ? styles.row : styles.column,
        gaps[gap] ?? styles.gap0,
        aligns[alignItems],
        justifies[justifyContent],
        style,
      )}
    >
      {children}
    </Tag>
  );
}
