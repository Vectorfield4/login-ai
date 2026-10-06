import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { createElement } from "react";
import type { MicrodataAttributes } from "@/shared/data/schema";
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
} & MicrodataAttributes;

const styles = stylex.create({
  h1: {
    fontSize: tokens.sizeH1,
    fontWeight: tokens.weightH1,
    lineHeight: tokens.lineH1,
    letterSpacing: tokens.lsH1,
    margin: 0,
    // Cyrillic compounds ("детерминированного") and long latin terms outrun a
    // 360px column at these sizes. `anywhere` also lowers the min-content size,
    // so a heading cannot blow out a flex/grid track.
    overflowWrap: "anywhere",
  },
  h2: {
    fontSize: tokens.sizeH2,
    fontWeight: tokens.weightH2,
    lineHeight: tokens.lineH2,
    letterSpacing: tokens.lsH2,
    margin: 0,
    overflowWrap: "anywhere",
  },
  h3: {
    fontSize: tokens.sizeH3,
    fontWeight: tokens.weightH3,
    lineHeight: tokens.lineH3,
    margin: 0,
    overflowWrap: "anywhere",
  },
  h4: {
    fontSize: tokens.sizeH4,
    fontWeight: tokens.weightH4,
    lineHeight: tokens.lineH4,
    margin: 0,
    overflowWrap: "anywhere",
  },
  h5: {
    fontSize: tokens.sizeH5,
    fontWeight: tokens.weightH5,
    lineHeight: tokens.lineH5,
    margin: 0,
    overflowWrap: "anywhere",
  },
  h6: {
    fontSize: tokens.sizeH6,
    fontWeight: tokens.weightH6,
    lineHeight: tokens.lineH6,
    margin: 0,
    overflowWrap: "anywhere",
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

/**
 * Визуальные уровни, которые появляются при входе во вьюпорт.
 *
 * Именно визуальный вариант, а не тег: `FeatureCard` верстает заголовок карточки
 * как `variant="h6" component="h2"`, и по тегу он попал бы в каскад вместе с
 * H1/H2 секций. H3–H6 — это заголовки карточек, названия колонок и пункты
 * аккордеона: в сетках их много, каскад там превращается в мельтешение.
 */
const revealedVariants = new Set<TypographyVariant>(["h1", "h2"]);

export function Typography({
  variant = "body1",
  color = "inherit",
  component,
  style,
  children,
  ...microdata
}: TypographyProps) {
  const tag = component ?? elements[variant];
  // Только метка для `app/scripts/revealHeadings.ts`: заголовок остаётся
  // обычной статикой, а скрипт режет его на слова уже в готовом DOM. Так
  // работают и заголовки `.astro`-страниц, которые не гидрируются никогда.
  const props = revealedVariants.has(variant) ? { "data-reveal": "" } : undefined;
  return createElement(
    tag,
    { ...stylex.props(styles[variant], colors[color], style), ...props, ...microdata },
    children,
  );
}

export default Typography;
