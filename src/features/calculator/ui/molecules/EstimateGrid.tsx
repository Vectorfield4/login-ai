import * as stylex from "@stylexjs/stylex";
import { Clock, Wallet } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { formatRange, formatWeeks } from "../../model/format";
import type { Estimate } from "../../model/types";
import { EstimateRow } from "./EstimateRow";

type EstimateGridProps = {
  estimate: Estimate;
  lang: AppLang;
};

// One price and one term, stacked: each metric is a full-width line with its
// icon, so the pair reads top-down instead of side by side.
const styles = stylex.create({
  results: {
    marginTop: tokens.spacing3,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    "@media (min-width: 900px)": {
      marginTop: tokens.spacing4,
      gap: tokens.spacing2,
    },
  },
});

/** The estimate as two stacked metrics: the total price and the timeline. */
export function EstimateGrid({ estimate, lang }: EstimateGridProps) {
  const t = useT(lang);
  const cells = [
    {
      icon: Wallet,
      label: t("calculator.result.total"),
      value: formatRange(lang, estimate.firstPeriod),
      prominent: true,
    },
    {
      icon: Clock,
      label: t("calculator.result.timelineWeeks"),
      value: formatWeeks(estimate.timelineWeeks, t("calculator.result.weeks")),
      prominent: false,
    },
  ];
  return (
    <div {...stylex.props(styles.results)}>
      {cells.map((cell) => (
        <EstimateRow
          key={cell.label}
          icon={cell.icon}
          label={cell.label}
          value={cell.value}
          prominent={cell.prominent}
        />
      ))}
    </div>
  );
}

export default EstimateGrid;
