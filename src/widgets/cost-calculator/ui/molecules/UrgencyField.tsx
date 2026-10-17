import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { FieldRow } from "./FieldRow";

type UrgencySpec = Extract<CalculatorField, { kind: "urgency" }>;

type UrgencyFieldProps = {
  field: UrgencySpec;
  value: string;
  onChange: (value: string) => void;
  lang: AppLang;
};

const styles = stylex.create({
  track: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing2,
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    borderRadius: tokens.radiusShape,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.colorDivider,
    transition: `border-color ${tokens.durationShort} ease, background-color ${tokens.durationShort} ease`,
  },
  // Экспресс/ускорение — предупреждающий акцент, как в макете.
  warning: {
    borderColor: tokens.colorWarning,
    backgroundColor: "rgba(245, 124, 0, 0.08)",
  },
  input: { flexGrow: 1, minWidth: 0, accentColor: tokens.colorPrimary, cursor: "pointer" },
  ends: { display: "flex", justifyContent: "space-between", marginTop: tokens.spacing1 },
  end: { fontSize: tokens.sizeBody2, color: tokens.colorTextSecondary },
  endOn: { color: tokens.colorText, fontWeight: 600 },
});

/** Delivery speed as a slider between the declared options (left = first). */
export function UrgencyField({ field, value, onChange, lang }: UrgencyFieldProps) {
  const t = useT(lang);
  const label = t(field.label);
  const first = field.options[0];
  const last = field.options[field.options.length - 1];
  if (!first || !last) return null;

  const index = Math.max(
    0,
    field.options.findIndex((option) => option.value === value),
  );
  const max = field.options.length - 1;
  const urgent = index < max;

  return (
    <FieldRow label={label}>
      <div {...stylex.props(styles.track, urgent && styles.warning)}>
        <input
          type="range"
          min={0}
          max={max}
          step={1}
          value={index}
          aria-label={label}
          onChange={(event) => {
            const next = field.options[event.currentTarget.valueAsNumber];
            if (next) onChange(next.value);
          }}
          {...stylex.props(styles.input)}
        />
      </div>
      <div {...stylex.props(styles.ends)}>
        <span {...stylex.props(styles.end, index === 0 && styles.endOn)}>{t(first.label)}</span>
        <span {...stylex.props(styles.end, index === max && styles.endOn)}>{t(last.label)}</span>
      </div>
    </FieldRow>
  );
}

export default UrgencyField;
