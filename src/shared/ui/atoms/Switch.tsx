import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name (already translated). */
  label: string;
  style?: StyleXStyles;
};

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    width: 44,
    height: 24,
    padding: 2,
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    backgroundColor: tokens.colorDivider,
    boxSizing: "border-box",
    transition: `background-color ${tokens.durationShortest} ease`,
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: 2,
    },
  },
  on: { backgroundColor: tokens.colorPrimary },
  knob: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: tokens.colorSurface,
    transition: `transform ${tokens.durationShortest} ease`,
  },
  knobOn: { transform: "translateX(20px)" },
});

/** Boolean toggle as a `role="switch"` button. */
export function Switch({ checked, onChange, label, style }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      {...stylex.props(styles.root, checked && styles.on, style)}
    >
      <span {...stylex.props(styles.knob, checked && styles.knobOn)} />
    </button>
  );
}

export default Switch;
