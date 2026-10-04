import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";

/**
 * Visual form of the link: a bar entry, a bar entry with a chevron, an item of
 * the bar dropdown, a drawer entry, or a nested drawer entry.
 */
export type NavLinkVariant = "bar" | "barTrigger" | "item" | "drawer" | "subItem";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  variant?: NavLinkVariant;
  /** Highlights the entry of the open section. */
  active?: boolean;
  /** Underlines the active entry. Off for ancestor groups that only carry the tint. */
  underline?: boolean;
  /** `aria-current` value: the current page or the open section. */
  current?: "page" | "true";
  /** Accent tone for "all entries" links. */
  tone?: "default" | "primary";
  /** Optional inline icon (no circular background), e.g. a service menu entry. */
  icon?: ReactNode;
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  role?: string;
  style?: StyleXStyles;
};

const styles = stylex.create({
  bar: {
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    borderRadius: "0px",
    backgroundColor: "transparent",
    border: "1px solid transparent",
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 600,
    outline: "none",
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
  barTrigger: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    fontSize: "inherit",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  item: {
    display: "block",
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: tokens.sizeBody2,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
    },
  },
  drawer: {
    padding: `${tokens.spacing2} ${tokens.spacing2}`,
    borderRadius: tokens.radiusBorder,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: tokens.sizeBody1,
  },
  subItem: {
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    paddingInlineStart: tokens.spacing4,
    borderRadius: tokens.radiusBorder,
    color: tokens.colorTextSecondary,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: tokens.sizeBody2,
  },
  primary: {
    color: tokens.colorPrimary,
    fontWeight: 600,
  },
  activeTint: {
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
    fontWeight: 700,
  },
  activeUnderline: {
    boxShadow: `inset 0 -2px 0 ${tokens.colorPrimary}`,
  },
  withIcon: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    color: tokens.colorPrimary,
  },
});

/** Tint-only active state, shared with the drawer disclosure button, a `<button>`. */
export const activeNavLinkTint = styles.activeTint;
/** Underline that marks the current page, shared with the drawer disclosure button. */
export const activeNavLinkUnderline = styles.activeUnderline;
/** Full active state of a current page: tint plus underline. */
export const activeNavLink = [activeNavLinkTint, activeNavLinkUnderline] as const;

/** A navigation link: the single element every menu entry of the app shell is built from. */
export default function NavLink({
  href,
  children,
  variant = "bar",
  active = false,
  underline = true,
  current,
  tone = "default",
  icon,
  onNavigate,
  onMouseEnter,
  role,
  style,
}: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      onMouseEnter={onMouseEnter}
      role={role}
      aria-current={current}
      {...stylex.props(
        variant === "barTrigger" ? styles.bar : styles[variant],
        tone === "primary" && styles.primary,
        active && styles.activeTint,
        active && underline && styles.activeUnderline,
        style,
      )}
    >
      {icon ? (
        <span {...stylex.props(styles.withIcon)}>
          <span {...stylex.props(styles.icon)} aria-hidden="true">
            {icon}
          </span>
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </a>
  );
}
