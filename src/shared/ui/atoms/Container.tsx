import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import type { MicrodataAttributes } from "@/shared/data/schema";
import { tokens } from "../../design/tokens.stylex.ts";

type ContainerProps = {
  style?: StyleXStyles;
  children?: ReactNode;
} & MicrodataAttributes;

const styles = stylex.create({
  root: {
    width: "100%",
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: tokens.spacing3,
    boxSizing: "border-box",
  },
});

export function Container({ style, children, ...microdata }: ContainerProps) {
  return (
    <div {...stylex.props(styles.root, style)} {...microdata}>
      {children}
    </div>
  );
}

export default Container;
