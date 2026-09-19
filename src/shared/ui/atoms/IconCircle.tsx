import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type IconCircleProps = {
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

export function IconCircle({ style, children }: IconCircleProps) {
  return <div {...stylex.props(styles.root, style)}>{children}</div>;
}
