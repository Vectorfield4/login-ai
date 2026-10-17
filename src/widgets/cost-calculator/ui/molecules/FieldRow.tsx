import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { Typography } from "@/shared/ui/atoms";

type FieldRowProps = {
  /** Visible, already-translated label of the control. */
  label: string;
  /** Optional price delta shown next to the label (e.g. an enabled toggle). */
  hint?: string;
  /** Optional info affordance rendered after the label. */
  info?: ReactNode;
  children: ReactNode;
};

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    minWidth: 0,
  },
  caption: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: tokens.spacing1,
  },
  labelGroup: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    minWidth: 0,
  },
  hint: {
    fontWeight: 600,
  },
});

/**
 * A caption over its control: the shared form-row shell every calculator field
 * wraps. Owns the vertical rhythm, so the individual field components stay
 * about their atom.
 */
export function FieldRow({ label, hint, info, children }: FieldRowProps) {
  return (
    <div {...stylex.props(styles.field)}>
      <div {...stylex.props(styles.caption)}>
        <span {...stylex.props(styles.labelGroup)}>
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
          {info}
        </span>
        {hint ? (
          <Typography variant="body2" color="primary" style={styles.hint}>
            {hint}
          </Typography>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export default FieldRow;
