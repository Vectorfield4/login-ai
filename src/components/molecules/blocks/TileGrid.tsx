import { Grid } from "@mui/material";
import type { TextItem } from "../../../types/cases";
import { TileCard } from "../../atoms/TileCard";

/**
 * Grid of «заголовок + текст» tiles for the problem, solution and audience
 * sections.
 */
export function TileGrid({ items }: { items: TextItem[] }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {items.map((item) => (
        <Grid key={item.title} size={{ xs: 12, md: 4 }}>
          <TileCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
