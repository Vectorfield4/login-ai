import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type CardProps = {
  variant?: "default" | "accent";
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    borderRadius: tokens.radiusBorder,
    boxShadow: tokens.shadow1,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    boxSizing: "border-box",
    transition:
      `box-shadow ${tokens.durationShortest} ${tokens.easingInOut}, ` +
      `transform ${tokens.durationShortest} ${tokens.easingInOut}`,
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.shadow8,
    },
  },
  accent: {
    borderTop: `4px solid ${tokens.colorPrimary}`,
  },
});

export function Card({ variant = "default", style, children }: CardProps) {
  return (
    <div {...stylex.props(styles.root, variant === "accent" && styles.accent, style)}>
      {children}
    </div>
  );
}

const contentStyles = stylex.create({
  root: {
    padding: tokens.layoutCard,
    ":last-child": { paddingBottom: tokens.layoutCard },
  },
});

export function CardContent({ style, children }: { style?: StyleXStyles; children?: ReactNode }) {
  return <div {...stylex.props(contentStyles.root, style)}>{children}</div>;
}
