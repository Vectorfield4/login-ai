import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type CountCardProps = {
  alt?: boolean;
  style?: never;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    borderRadius: tokens.radiusBorder,
    boxShadow: tokens.shadow0,
    border: `1px solid ${tokens.colorDivider}`,
    backgroundColor: tokens.colorSurface,
    padding: `${tokens.spacing3} ${tokens.spacing2}`,
    textAlign: "center",
    height: "100%",
    boxSizing: "border-box",
    ":hover": { boxShadow: tokens.shadow2 },
  },
});

/** Counter card: one platform metric (value + label). Container for CountersBlock. */
export function CountCard({ children }: CountCardProps) {
  return <div {...stylex.props(styles.root)}>{children}</div>;
}
