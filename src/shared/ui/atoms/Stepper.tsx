import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { Minus, Plus } from "lucide-react";
import { tokens } from "../../design/tokens.stylex.ts";
import IconButton from "./IconButton";

type StepperProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  /** Accessible name (already translated). */
  label: string;
  style?: StyleXStyles;
};

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing1,
  },
  value: {
    minWidth: "3ch",
    textAlign: "center",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    color: tokens.colorText,
  },
});

/** Integer stepper: minus/plus around a readout, clamped to `[min, max]`. */
export function Stepper({ min, max, value, onChange, label, style }: StepperProps) {
  return (
    <div {...stylex.props(styles.root, style)}>
      <IconButton label={`${label}: −`} onClick={() => onChange(Math.max(min, value - 1))}>
        <Minus size={18} />
      </IconButton>
      <span aria-live="polite" {...stylex.props(styles.value)}>
        {value}
      </span>
      <IconButton label={`${label}: +`} onClick={() => onChange(Math.min(max, value + 1))}>
        <Plus size={18} />
      </IconButton>
    </div>
  );
}

export default Stepper;
