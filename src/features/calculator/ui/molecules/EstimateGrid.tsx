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

// The estimate is the payload: two compact tiles on phones, three on tablets,
// all five on one row once the 1120px container has room.
const styles = stylex.create({
  results: {
    marginTop: tokens.spacing3,
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacing2,
    "@media (min-width: 900px)": {
      marginTop: tokens.spacing4,
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: tokens.spacing3,
    },
    "@media (min-width: 1200px)": {
      gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    },
  },
});

/** The five estimate metrics laid out as a responsive grid of tiles. */
export function EstimateGrid({ estimate, lang }: EstimateGridProps) {
  const t = useT(lang);
  const cells = [
    { label: t("calculator.result.setup"), value: formatRange(lang, estimate.setup) },
    { label: t("calculator.result.runPerPeriod"), value: formatRange(lang, estimate.runPerPeriod) },
    { label: t("calculator.result.firstPeriod"), value: formatRange(lang, estimate.firstPeriod) },
    { label: t("calculator.result.unitCost"), value: formatRange(lang, estimate.unitCost) },
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
