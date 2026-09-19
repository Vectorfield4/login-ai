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
    border: "none",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: tokens.colorText,
    cursor: "pointer",
    transition: `background-color ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
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
