import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type ContainerProps = {
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    width: "100%",
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: tokens.spacing3,
    boxSizing: "border-box",
  },
});

export function Container({ style, children }: ContainerProps) {
  return <div {...stylex.props(styles.root, style)}>{children}</div>;
}

export default Container;
