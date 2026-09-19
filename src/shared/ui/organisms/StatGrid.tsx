import type { StatItem } from "../../../../src/entities/case/model/cases";
import type { TFunc } from "../../i18n/t";
import { Grid } from "../atoms/Grid";
import { StatTile } from "../atoms/StatTile";

type StatGridProps = {
  items: StatItem[];
  t: TFunc;
};

/**
 * KPI stats grid: flexible stat tiles stretched to the full row width.
 */
export function StatGrid({ items, t }: StatGridProps) {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.label} item size={6} md={4}>
          <StatTile label={item.label} value={item.value} t={t} />
        </Grid>
      ))}
    </Grid>
  );
}
