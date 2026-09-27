import type { AppLang } from "@/shared/hooks/useT";
import type { StatItem } from "@/shared/types/content";
import { Grid } from "../atoms/Grid";
import { StatTile } from "../atoms/StatTile";

type StatGridProps = {
  items: StatItem[];
  lang: AppLang;
};

/**
 * KPI stats grid: flexible stat tiles stretched to the full row width.
 */
export function StatGrid({ items, lang }: StatGridProps) {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.label} item size={6} md={4}>
          <StatTile lang={lang} label={item.label} value={item.value} />
        </Grid>
      ))}
    </Grid>
  );
}
