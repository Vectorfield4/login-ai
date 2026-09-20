import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type IconButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "standard" | "header";
  style?: StyleXStyles;
  children?: ReactNode;
  "aria-haspopup"?: boolean | "false" | "true" | "menu" | "dialog" | "grid" | "listbox" | "tree";
  "aria-expanded"?: boolean;
  role?: string;
};

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontFamily: "inherit",
    outline: "none",
  },
  standard: {
    width: 40,
    height: 40,
    padding: 0,
    border: "none",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: tokens.colorText,
    transition: `background-color ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  header: {
    gap: tokens.spacing05,
    padding: `${tokens.spacing1} ${tokens.spacing15}`,
    borderRadius: "0px",
    backgroundColor: "transparent",
    border: "1px solid transparent",
    color: tokens.colorText,
    fontWeight: 600,
    fontSize: tokens.sizeBody2,
    transition: `background-color ${tokens.durationShortest} ease, border-radius ${tokens.durationShortest} ease, border-color ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
      borderRadius: tokens.radiusBorder,
      borderColor: tokens.colorDivider,
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export default function IconButton({
  label,
  onClick,
  variant = "standard",
  style,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      {...stylex.props(
        styles.base,
        variant === "standard" ? styles.standard : styles.header,
        style,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
