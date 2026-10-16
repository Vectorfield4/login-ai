import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { Typography } from "@/shared/ui/atoms";

type FieldRowProps = {
  /** Visible, already-translated label of the control. */
  label: string;
  children: ReactNode;
};

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    minWidth: 0,
  },
});

/**
 * A caption over its control: the shared form-row shell every calculator field
 * wraps. Owns the vertical rhythm, so the individual field components stay
 * about their atom.
 */
export function FieldRow({ label, children }: FieldRowProps) {
  return (
    <div {...stylex.props(styles.field)}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      {children}
    </div>
  );
}

export default FieldRow;
