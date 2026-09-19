import type { TextItem } from "../../../../src/entities/case/model/cases";
import type { TFunc } from "../../i18n/t";
import { Grid } from "../atoms/Grid";
import { TileCard } from "../atoms/TileCard";

type TileGridProps = {
  items: TextItem[];
  t: TFunc;
};

/**
 * Grid of «заголовок + текст» tiles for the problem, solution and audience
 * sections.
 */
export function TileGrid({ items, t }: TileGridProps) {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.title} item size={12} md={4}>
          <TileCard item={item} t={t} />
        </Grid>
      ))}
    </Grid>
  );
}
