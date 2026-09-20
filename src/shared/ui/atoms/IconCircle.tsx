import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type IconCircleProps = {
  /** Diameter in px (overrides the default 48px). */
  size?: number;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "color-mix(in srgb, var(--colorPrimary) 12%, transparent)",
    color: tokens.colorPrimary,
  },
});

export function IconCircle({ size = 48, style, children }: IconCircleProps) {
  const sty = stylex.props(styles.root, style);
  return (
    <div {...sty} style={{ ...(sty.style as object | undefined), width: size, height: size }}>
      {children}
    </div>
  );
}
