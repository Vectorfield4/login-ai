import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { createElement } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "overline"
  | "caption";
type TypographyColor = "inherit" | "primary" | "text" | "textSecondary";

type TypographyProps = {
  variant?: TypographyVariant;
  color?: TypographyColor;
  component?: keyof HTMLElementTagNameMap;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  h1: {
    fontSize: tokens.sizeH1,
    fontWeight: tokens.weightH1,
    lineHeight: tokens.lineH1,
    letterSpacing: tokens.lsH1,
    margin: 0,
  },
  h2: {
    fontSize: tokens.sizeH2,
    fontWeight: tokens.weightH2,
    lineHeight: tokens.lineH2,
    letterSpacing: tokens.lsH2,
    margin: 0,
  },
  h3: {
    fontSize: tokens.sizeH3,
    fontWeight: tokens.weightH3,
    lineHeight: tokens.lineH3,
    margin: 0,
  },
  h4: {
    fontSize: tokens.sizeH4,
    fontWeight: tokens.weightH4,
    lineHeight: tokens.lineH4,
    margin: 0,
  },
  h5: {
    fontSize: tokens.sizeH5,
    fontWeight: tokens.weightH5,
    lineHeight: tokens.lineH5,
    margin: 0,
  },
  h6: {
    fontSize: tokens.sizeH6,
    fontWeight: tokens.weightH6,
    lineHeight: tokens.lineH6,
    margin: 0,
  },
  body1: { fontSize: tokens.sizeBody1, lineHeight: tokens.lineBody1, margin: 0 },
  body2: { fontSize: tokens.sizeBody2, lineHeight: tokens.lineBody2, margin: 0 },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 2.66,
    textTransform: "uppercase",
    letterSpacing: "0.08333em",
    margin: 0,
  },
  caption: { fontSize: "0.75rem", lineHeight: 1.66, margin: 0 },
  colorPrimary: { color: tokens.colorPrimary },
  colorText: { color: tokens.colorText },
  colorTextSecondary: { color: tokens.colorTextSecondary },
});

const elements: Record<TypographyVariant, keyof HTMLElementTagNameMap> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  overline: "span",
  caption: "span",
};

const colors: Record<TypographyColor, StyleXStyles | null> = {
  inherit: null,
  primary: styles.colorPrimary,
  text: styles.colorText,
  textSecondary: styles.colorTextSecondary,
};

export function Typography({
  variant = "body1",
  color = "inherit",
  component,
  style,
  children,
}: TypographyProps) {
  const tag = component ?? elements[variant];
  return createElement(tag, { ...stylex.props(styles[variant], colors[color], style) }, children);
}

export default Typography;
