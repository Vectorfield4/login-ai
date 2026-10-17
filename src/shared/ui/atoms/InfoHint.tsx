import * as stylex from "@stylexjs/stylex";
import { Info } from "lucide-react";
import { useId, useState } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type InfoHintProps = {
  /** Already-translated explanation shown on hover, focus or tap. */
  text: string;
};

const styles = stylex.create({
  wrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    border: "none",
    background: "none",
    color: tokens.colorTextSecondary,
    cursor: "pointer",
    ":hover": { color: tokens.colorPrimary },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: 2,
      borderRadius: tokens.radiusShape,
    },
  },
  tooltip: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: tokens.zTooltip,
    boxSizing: "border-box",
    width: "min(280px, calc(100vw - 32px))",
    padding: tokens.spacing15,
    borderRadius: tokens.radiusShape,
    border: `1px solid ${tokens.colorDivider}`,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    boxShadow: tokens.shadow8,
    fontSize: "0.8125rem",
    lineHeight: 1.45,
    textAlign: "left",
    pointerEvents: "none",
    display: "none",
    "@media (max-width: 899px)": {
      position: "fixed",
      top: "auto",
      right: tokens.spacing2,
      bottom: tokens.spacing2,
      left: tokens.spacing2,
      width: "auto",
      transform: "none",
    },
  },
  open: { display: "block" },
});

/** A small info icon that explains a control on hover, focus or tap. */
export function InfoHint({ text }: InfoHintProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span {...stylex.props(styles.wrap)}>
      <button
        type="button"
        aria-label={text}
        aria-describedby={id}
        {...stylex.props(styles.trigger)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <Info size={15} aria-hidden />
      </button>
      <span
        role="tooltip"
        id={id}
        data-state={open ? "open" : "closed"}
        {...stylex.props(styles.tooltip, open && styles.open)}
      >
        {text}
      </span>
    </span>
  );
}

export default InfoHint;
