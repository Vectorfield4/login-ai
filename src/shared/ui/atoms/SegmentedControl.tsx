import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";

export interface SegmentedOption {
  value: string;
  label: string;
}

type SegmentedControlProps = {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible group name (already translated). */
  label: string;
  style?: StyleXStyles;
};

const styles = stylex.create({
  root: {
    display: "inline-flex",
    flexWrap: "wrap",
    margin: 0,
    padding: tokens.spacing05,
    gap: tokens.spacing05,
    borderWidth: 0,
    minInlineSize: 0,
    maxWidth: "100%",
    borderRadius: tokens.radiusShape,
    backgroundColor: tokens.colorSurfaceSunken,
    boxSizing: "border-box",
  },
  option: {
    appearance: "none",
    fontFamily: "inherit",
    fontSize: tokens.sizeBody2,
    fontWeight: 500,
    whiteSpace: "nowrap",
    color: tokens.colorTextSecondary,
    backgroundColor: "transparent",
    border: "none",
    borderRadius: tokens.radiusShape,
    paddingBlock: tokens.spacing05,
    paddingInline: tokens.spacing2,
    cursor: "pointer",
    transition: `background-color ${tokens.durationShortest} ease, color ${tokens.durationShortest} ease`,
    ":hover": { color: tokens.colorText },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: 2,
    },
  },
  selected: {
    color: tokens.colorPrimaryContrastText,
    backgroundColor: tokens.colorPrimary,
    ":hover": { color: tokens.colorPrimaryContrastText },
  },
});

/** Discrete single-choice group: a row of toggle buttons, no free input. */
export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  style,
}: SegmentedControlProps) {
  return (
    <fieldset aria-label={label} {...stylex.props(styles.root, style)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            {...stylex.props(styles.option, selected && styles.selected)}
          >
            {option.label}
          </button>
        );
      })}
    </fieldset>
  );
}

export default SegmentedControl;
