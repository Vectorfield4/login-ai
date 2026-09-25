import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { activeNavLink } from "../atoms/NavLink";

type NavDisclosureProps = {
  label: string;
  /** Highlights the entry of the open section. */
  active?: boolean;
  open: boolean;
  onToggle: () => void;
  children?: ReactNode;
};

const styles = stylex.create({
  root: { display: "flex", flexDirection: "column" },
  trigger: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: tokens.spacing05,
    padding: `${tokens.spacing2} ${tokens.spacing2}`,
    borderRadius: tokens.radiusBorder,
    backgroundColor: "transparent",
    border: "none",
    color: tokens.colorText,
    fontWeight: 600,
    fontSize: tokens.sizeBody1,
    fontFamily: "inherit",
    textAlign: "left",
    cursor: "pointer",
  },
  chevron: {
    flexShrink: 0,
    verticalAlign: "middle",
    transition: `transform ${tokens.durationShortest} ease`,
  },
  chevronOpen: { transform: "rotate(180deg)" },
  panel: { display: "flex", flexDirection: "column" },
});

/** Drawer section that folds its entries under a toggle button. */
export default function NavDisclosure({
  label,
  active = false,
  open,
  onToggle,
  children,
}: NavDisclosureProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-current={active ? "true" : undefined}
        {...stylex.props(styles.trigger, active && activeNavLink)}
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          {...stylex.props(styles.chevron, open && styles.chevronOpen)}
        />
      </button>
      {open ? <div {...stylex.props(styles.panel)}>{children}</div> : null}
    </div>
  );
}
