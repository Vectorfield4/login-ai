import * as stylex from "@stylexjs/stylex";
import {
  type AddonEstimate,
  type FieldValue,
  formatRange,
  formatWeeks,
  type Range,
} from "@/features/calculator";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField as CalculatorFieldSpec } from "@/shared/types/calculator";
import { Typography } from "@/shared/ui/atoms";
import { CalculatorField } from "./CalculatorField";

type AddonFieldProps = {
  field: CalculatorFieldSpec;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  addons: AddonEstimate[];
  /** Price delta, shown next to the label for a toggle add-on. */
  hint?: string;
  lang: AppLang;
};

const styles = stylex.create({
  note: {
    marginTop: tokens.spacing05,
    marginInlineStart: tokens.spacing1,
  },
  price: {
    fontWeight: 600,
  },
});

const sum = (ranges: Range[]): Range => ({
  low: ranges.reduce((acc, range) => acc + range.low, 0),
  high: ranges.reduce((acc, range) => acc + range.high, 0),
});

/**
 * One add-on control. A toggle shows its delta inline next to the label; a
 * multiselect shows the sum of the selected modalities under the field.
 */
export function AddonField({ field, value, onChange, addons, hint, lang }: AddonFieldProps) {
  const t = useT(lang);
  const selected = addons.filter((addon) => addon.active);
  const firstPeriod = sum(selected.map((addon) => addon.firstPeriod));
  const weeks = sum(selected.map((addon) => addon.weeks));
  const hasMoney = firstPeriod.low > 0 || firstPeriod.high > 0;
  const hasWeeks = weeks.low > 0 || weeks.high > 0;
  const showNote = field.kind === "multiselect" && hasMoney;

  return (
    <div>
      <CalculatorField field={field} value={value} onChange={onChange} hint={hint} lang={lang} />
      {showNote ? (
        <div {...stylex.props(styles.note)}>
          <Typography variant="body2" color="primary" style={styles.price}>
            + {formatRange(lang, firstPeriod)}
            {hasWeeks ? ` · + ${formatWeeks(weeks, t("calculator.result.weeks"))}` : null}
          </Typography>
        </div>
      ) : null}
    </div>
  );
}

export default AddonField;
