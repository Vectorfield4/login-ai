import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";
import { Typography } from "../../ui/atoms";

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Действие справа (например, кнопка «Все услуги»). */
  action?: ReactNode;
};

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: tokens.spacing2,
    marginBlockEnd: tokens.spacing5,
    minWidth: 0,
  },
  left: { minWidth: 0 },
  eyebrow: {
    display: "block",
    marginBlockEnd: tokens.spacing1,
    fontSize: "0.75rem",
    fontWeight: 700,
    lineHeight: 2.66,
    textTransform: "uppercase",
    letterSpacing: "0.08333em",
    color: tokens.colorPrimary,
  },
  subtitle: { maxWidth: 640, marginBlockStart: tokens.spacing1 },
});

/** Заголовок секции: eyebrow (overline) + h2 + подзаголовок body1. */
export function SectionHeader({ title, eyebrow, subtitle, action }: SectionHeaderProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.left)}>
        {eyebrow ? <span {...stylex.props(styles.eyebrow)}>{eyebrow}</span> : null}
        <Typography variant="h2" component="h2">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body1" color="textSecondary" style={styles.subtitle}>
            {subtitle}
          </Typography>
        ) : null}
      </div>
      {action}
    </div>
  );
}
