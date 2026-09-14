import { Grid } from "@mui/material";
import type { StatItem } from "@/entities/case/model/cases";
import { StatTile } from "@/shared/ui/atoms/StatTile";

/**
 * KPI stats grid: flexible stat tiles stretched to the full row width.
 */
export function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {items.map((item) => (
        <Grid key={item.label} size={{ xs: 6, sm: 4, md: "grow" }}>
          <StatTile label={item.label} value={item.value} />
        </Grid>
      ))}
    </Grid>
  );
}
