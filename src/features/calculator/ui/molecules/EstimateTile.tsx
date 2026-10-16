import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { Typography } from "@/shared/ui/atoms";

type EstimateTileProps = {
  /** Already-translated metric name. */
  label: string;
  /** Already-formatted metric value (money band or timeline). */
  value: string;
  /** Renders the value as the hero figure (the price). */
  prominent?: boolean;
};

const styles = stylex.create({
  tile: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing05,
    padding: tokens.spacing2,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    boxSizing: "border-box",
    minWidth: 0,
    "@media (min-width: 600px)": { padding: tokens.layoutCard },
  },
  valueProminent: {
    fontSize: tokens.sizeH2,
    fontWeight: tokens.weightH2,
    lineHeight: tokens.lineH2,
  },
});

/** One metric of the estimate: a caption over a brand value. */
export function EstimateTile({ label, value, prominent }: EstimateTileProps) {
  return (
    <div {...stylex.props(styles.tile)}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      {prominent ? (
        <Typography variant="body1" component="p" color="primary" style={styles.valueProminent}>
          {value}
        </Typography>
      ) : (
        <Typography variant="h6" component="p" color="primary">
          {value}
        </Typography>
      )}
    </div>
  );
}

export default EstimateTile;
