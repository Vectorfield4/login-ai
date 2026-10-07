import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type IconCircleProps = {
  /** Diameter in px (overrides the default 48px). */
  size?: number;
  /**
   * Solid white disc for an icon placed on a picture or another busy surface,
   * where the translucent brand tint would sink into the backdrop.
   */
  onImage?: boolean;
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
  onImage: {
    backgroundColor: tokens.colorSurface,
    color: tokens.colorPrimary,
    boxShadow: tokens.shadow2,
  },
});

export function IconCircle({ size = 48, onImage = false, style, children }: IconCircleProps) {
  const sty = stylex.props(styles.root, onImage && styles.onImage, style);
  return (
    <div {...sty} style={{ ...(sty.style as object | undefined), width: size, height: size }}>
      {children}
    </div>
  );
}
