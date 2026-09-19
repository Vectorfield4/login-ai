import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import { tokens } from "../../design/tokens.stylex.ts";
import { IconCircle } from "../atoms/IconCircle";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  tagline: string;
  href: string;
  style?: StyleXStyles;
}

/**
 * Карточка услуги для сеток (главная и «Услуги»): иконка + название + теглайн.
 * Получает уже локализованные строки — перевод не знает о словарях.
 */
export function ServiceCard({ icon: Icon, title, tagline, href, style }: ServiceCardProps) {
  return (
    <a href={href} {...stylex.props(styles.link, style)}>
      <IconCircle>
        <Icon size={22} />
      </IconCircle>
      <h3 {...stylex.props(styles.title)}>{title}</h3>
      <p {...stylex.props(styles.tagline)}>{tagline}</p>
    </a>
  );
}

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
    height: "100%",
    boxSizing: "border-box",
    padding: tokens.layoutCard,
    borderRadius: tokens.radiusBorder,
    boxShadow: tokens.shadow1,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    textDecorationColor: "transparent",
    transition:
      `box-shadow ${tokens.durationShortest} ${tokens.easingInOut}, ` +
      `transform ${tokens.durationShortest} ${tokens.easingInOut}, ` +
      `text-decoration-color ${tokens.durationShortest} ease`,
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.shadow8,
      textDecorationColor: "currentColor",
    },
  },
  title: {
    margin: 0,
    fontSize: tokens.sizeH6,
    lineHeight: tokens.lineH6,
    fontWeight: tokens.weightH6,
  },
  tagline: {
    margin: 0,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
  },
});
