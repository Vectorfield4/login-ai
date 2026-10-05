import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { MouseEventHandler, ReactNode } from "react";
import type { MicrodataAttributes } from "@/shared/data/schema";
import { tokens } from "../../design/tokens.stylex.ts";

type ChipProps = {
  /** Text content (MUI-style `label`); falls back to `children`. */
  label?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  style?: StyleXStyles;
  children?: ReactNode;
} & MicrodataAttributes;

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

export default function Chip({ label, onClick, style, children, ...microdata }: ChipProps) {
  const content = label ?? children;
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        {...stylex.props(styles.root, styles.clickable, style)}
        {...microdata}
      >
        {content}
      </button>
    );
  }
  return (
    <span {...stylex.props(styles.root, style)} {...microdata}>
      {content}
    </span>
  );
}
