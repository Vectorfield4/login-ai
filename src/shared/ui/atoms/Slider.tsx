import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";

type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  /** Accessible name (already translated). */
  label: string;
  style?: StyleXStyles;
};

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing2,
  },
  input: {
    flexGrow: 1,
    minWidth: 0,
    accentColor: tokens.colorPrimary,
    cursor: "pointer",
  },
  readout: {
    minWidth: "3ch",
    textAlign: "end",
    fontVariantNumeric: "tabular-nums",
    fontWeight: 600,
    color: tokens.colorText,
  },
});

/** Discrete range: `type="range"` with an explicit step, plus a readout. */
export function Slider({ min, max, step, value, onChange, label, style }: SliderProps) {
  return (
    <div {...stylex.props(styles.root, style)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        {...stylex.props(styles.input)}
      />
      <span {...stylex.props(styles.readout)}>{value}</span>
    </div>
  );
}

export default Slider;
