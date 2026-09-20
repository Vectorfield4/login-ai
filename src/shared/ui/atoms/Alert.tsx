import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type AlertSeverity = "info" | "success" | "warning";

type AlertProps = {
  severity?: AlertSeverity;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacing1,
    padding: tokens.spacing2,
    borderRadius: tokens.radiusBorder,
    textAlign: "left",
    boxSizing: "border-box",
  },
  info: {
    backgroundColor: tokens.colorPrimarySoft,
    borderLeft: `3px solid ${tokens.colorPrimary}`,
    color: tokens.colorText,
  },
  success: {
    backgroundColor: "color-mix(in srgb, var(--colorSuccess) 10%, transparent)",
    borderLeft: `3px solid ${tokens.colorSuccess}`,
    color: tokens.colorText,
  },
  warning: {
    backgroundColor: "color-mix(in srgb, var(--colorWarning) 10%, transparent)",
    borderLeft: `3px solid ${tokens.colorWarning}`,
    color: tokens.colorText,
  },
});

const backgrounds: Record<AlertSeverity, StyleXStyles> = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
};

/** Полосатое уведомление: soft-фон, левый бордер в цвет severity, `role="alert"`. */
export function Alert({ severity = "info", style, children }: AlertProps) {
  return (
    <div {...stylex.props(styles.root, backgrounds[severity], style)} role="alert">
      {children}
    </div>
  );
}

export default Alert;
