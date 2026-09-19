import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { MouseEventHandler, ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type ListProps = {
  ordered?: boolean;
  dense?: boolean;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    boxSizing: "border-box",
    width: "100%",
  },
  dense: { paddingBlock: tokens.spacing05 },
  divider: { borderBottom: `1px solid ${tokens.colorDivider}` },
  button: {
    cursor: "pointer",
    background: "none",
    border: "none",
    font: "inherit",
    textAlign: "start",
    color: tokens.colorText,
    borderRadius: tokens.radiusShape,
    ":hover": { backgroundColor: tokens.colorActionHover },
  },
  text: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minWidth: 0,
  },
  textPrimary: {
    fontSize: tokens.sizeBody1,
    color: tokens.colorText,
  },
  textSecondary: {
    fontSize: tokens.sizeBody2,
    color: tokens.colorTextSecondary,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: tokens.spacing2,
    flexShrink: 0,
  },
});

export function List({ ordered = false, style, children }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag {...stylex.props(styles.list, style)}>{children}</Tag>;
}

type ListItemProps = {
  dense?: boolean;
  divider?: boolean;
  style?: StyleXStyles;
  children?: ReactNode;
};

export function ListItem({ dense = false, divider = false, style, children }: ListItemProps) {
  return (
    <li {...stylex.props(styles.item, dense && styles.dense, divider && styles.divider, style)}>
      {children}
    </li>
  );
}

type ListItemButtonProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  style?: StyleXStyles;
  children?: ReactNode;
};

export function ListItemButton({ onClick, style, children }: ListItemButtonProps) {
  return (
    <button type="button" onClick={onClick} {...stylex.props(styles.item, styles.button, style)}>
      {children}
    </button>
  );
}

type ListItemTextProps = {
  primary?: ReactNode;
  secondary?: ReactNode;
  style?: StyleXStyles;
};

export function ListItemText({ primary, secondary, style }: ListItemTextProps) {
  return (
    <div {...stylex.props(styles.text, style)}>
      {primary != null && <span {...stylex.props(styles.textPrimary)}>{primary}</span>}
      {secondary != null && <span {...stylex.props(styles.textSecondary)}>{secondary}</span>}
    </div>
  );
}

type ListItemIconProps = {
  style?: StyleXStyles;
  children?: ReactNode;
};

export function ListItemIcon({ style, children }: ListItemIconProps) {
  return <div {...stylex.props(styles.icon, style)}>{children}</div>;
}
