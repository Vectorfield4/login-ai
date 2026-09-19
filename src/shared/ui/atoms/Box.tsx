import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ElementType, ReactNode } from "react";

type BoxProps = {
  as?: ElementType;
  style?: StyleXStyles;
  children?: ReactNode;
};

export default function Box({ as, style, children }: BoxProps) {
  const Tag = as ?? "div";
  return <Tag {...stylex.props(style)}>{children}</Tag>;
}
