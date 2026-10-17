import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { Typography } from "@/shared/ui/atoms";

type EstimateRowProps = {
  /** Metric glyph: money for the price, a clock for the timeline. */
  icon: LucideIcon;
  /** Already-translated metric name. */
  label: string;
  /** Already-formatted metric value (money band or timeline). */
  value: string;
  /** Renders the value as the hero figure (the price). */
  prominent?: boolean;
};

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing15,
    padding: tokens.spacing15,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    boxSizing: "border-box",
    minWidth: 0,
    "@media (min-width: 600px)": { padding: tokens.spacing2 },
  },
  icon: {
    display: "flex",
    flexShrink: 0,
    color: tokens.colorPrimary,
  },
  label: {
    flexGrow: 1,
    minWidth: 0,
  },
  value: {
    marginInlineStart: "auto",
    textAlign: "right",
    color: tokens.colorPrimary,
    fontSize: tokens.sizeH6,
    fontWeight: tokens.weightH6,
    lineHeight: tokens.lineH6,
  },
  valueProminent: {
    fontSize: tokens.sizeH4,
    fontWeight: tokens.weightH4,
    lineHeight: tokens.lineH4,
  },
});

/** One metric of the estimate: an icon, a caption and the value on one line. */
export function EstimateRow({ icon: Icon, label, value, prominent }: EstimateRowProps) {
  return (
    <div {...stylex.props(styles.row)}>
      <span {...stylex.props(styles.icon)}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <Typography variant="body2" color="textSecondary" style={styles.label}>
        {label}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        color="primary"
        style={[styles.value, prominent && styles.valueProminent]}
      >
        {value}
      </Typography>
    </div>
  );
}

export default EstimateRow;
