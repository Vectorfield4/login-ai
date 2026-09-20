import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type IconButtonProps = {
  label: string;
  onClick?: () => void;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    border: "1px solid transparent",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: tokens.colorText,
    cursor: "pointer",
    outline: "none",
    transition: `background-color ${tokens.durationShortest} ease, border-color ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
      borderColor: tokens.colorDivider,
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export default function IconButton({ label, onClick, style, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      {...stylex.props(styles.root, style)}
    >
      {children}
    </button>
  );
}
