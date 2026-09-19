import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";
import type { TFunc } from "../../i18n/t";

type StatTileProps = {
  t: TFunc;
  /** i18n key of the tile value. */
  value: string;
  /** i18n key of the tile label. */
  label: string;
};

const styles = stylex.create({
  root: {
    height: "100%",
    padding: tokens.spacing2,
    textAlign: "center",
    borderRadius: tokens.radiusBorder,
    border: `1px solid ${tokens.colorDivider}`,
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadow0,
    boxSizing: "border-box",
  },
  value: {
    display: "block",
    fontSize: tokens.sizeH4,
    fontWeight: 700,
    lineHeight: tokens.lineH4,
    color: tokens.colorPrimary,
  },
  label: {
    display: "block",
    marginBlockStart: tokens.spacing05,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
  },
});

/** KPI stat tile: a large brand value + label. */
export function StatTile({ t, value, label }: StatTileProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <span {...stylex.props(styles.value)}>{t(value)}</span>
      <span {...stylex.props(styles.label)}>{t(label)}</span>
    </div>
  );
}
