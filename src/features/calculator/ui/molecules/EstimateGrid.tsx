import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { formatRange, formatWeeks } from "../../model/format";
import type { Estimate } from "../../model/types";
import { EstimateTile } from "./EstimateTile";

type EstimateGridProps = {
  estimate: Estimate;
  lang: AppLang;
};

// One price and one term: the estimate is a single ballpark figure plus the
// timeline, never a wall of sub-totals.
const styles = stylex.create({
  results: {
    marginTop: tokens.spacing3,
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacing2,
    "@media (min-width: 900px)": {
      marginTop: tokens.spacing4,
      gap: tokens.spacing3,
    },
  },
});

/** The estimate as two metrics: the total price and the timeline. */
export function EstimateGrid({ estimate, lang }: EstimateGridProps) {
  const t = useT(lang);
  const cells = [
    { label: t("calculator.result.total"), value: formatRange(lang, estimate.firstPeriod) },
    {
      label: t("calculator.result.timelineWeeks"),
      value: formatWeeks(estimate.timelineWeeks, t("calculator.result.weeks")),
    },
  ];
  return (
    <div {...stylex.props(styles.results)}>
      {cells.map((cell) => (
        <EstimateTile key={cell.label} label={cell.label} value={cell.value} />
      ))}
    </div>
  );
}

export default EstimateGrid;
