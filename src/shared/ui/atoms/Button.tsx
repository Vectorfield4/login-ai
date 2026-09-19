import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { MouseEventHandler, ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type Variant = "contained" | "outlined" | "soft" | "text";
type Size = "small" | "medium" | "large";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  style?: StyleXStyles;
  children: ReactNode;
};

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.radiusBorder,
    fontFamily: "inherit",
    fontWeight: tokens.weightButton,
    textTransform: "none",
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    transition:
      `background-color ${tokens.durationShort} ease, ` +
      `box-shadow ${tokens.durationShort} ease, transform ${tokens.durationShort} ease`,
    ":active": { transform: "scale(0.98)" },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: 2,
    },
    ":disabled": { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" },
  },
  contained: {
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrastText,
    boxShadow: tokens.shadow4,
    ":hover": { boxShadow: tokens.shadow8 },
  },
  outlined: {
    backgroundColor: "transparent",
    color: tokens.colorPrimary,
    border: `1px solid ${tokens.colorPrimary}`,
    ":hover": { backgroundColor: tokens.colorPrimarySoft },
  },
  soft: {
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
    ":hover": { backgroundColor: tokens.colorPrimarySoftHover },
  },
  text: {
    backgroundColor: "transparent",
    color: tokens.colorPrimary,
    ":hover": { backgroundColor: tokens.colorActionHover },
  },
  small: {
    padding: `${tokens.spacing05} ${tokens.spacing2}`,
    fontSize: "0.8125rem",
  },
  medium: {
    padding: `${tokens.spacing1} ${tokens.spacing25}`,
    fontSize: "0.875rem",
  },
  large: {
    padding: `${tokens.spacing15} ${tokens.spacing3}`,
    fontSize: "0.9375rem",
  },
  fullWidth: { width: "100%" },
});

const variants: Record<Variant, StyleXStyles> = {
  contained: styles.contained,
  outlined: styles.outlined,
  soft: styles.soft,
  text: styles.text,
};

const sizes: Record<Size, StyleXStyles> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

export function Button({
  variant = "contained",
  size = "medium",
  disabled = false,
  fullWidth = false,
  href,
  onClick,
  style,
  children,
}: ButtonProps) {
  const commonProps = stylex.props(
    styles.base,
    variants[variant],
    sizes[size],
    fullWidth && styles.fullWidth,
    style,
  );
  if (href) {
    return (
      <a href={href} aria-disabled={disabled} onClick={onClick} {...commonProps}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" disabled={disabled} onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
}

export default Button;
