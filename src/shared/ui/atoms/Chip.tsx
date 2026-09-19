import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { MouseEventHandler, ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type ChipProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing1,
    padding: `${tokens.spacing05} ${tokens.spacing2}`,
    borderRadius: tokens.radiusShape,
    fontWeight: 500,
    fontSize: "0.875rem",
    backgroundColor: tokens.colorSurface,
    border: `1px solid ${tokens.colorDivider}`,
    color: tokens.colorText,
    boxSizing: "border-box",
    transition: `background-color ${tokens.durationShortest} ease`,
  },
  clickable: {
    cursor: "pointer",
    ":hover": { backgroundColor: tokens.colorActionHover },
  },
});

export default function Chip({ onClick, style, children }: ChipProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        {...stylex.props(styles.root, styles.clickable, style)}
      >
        {children}
      </button>
    );
  }
  return <span {...stylex.props(styles.root, style)}>{children}</span>;
}
