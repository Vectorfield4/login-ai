import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import type { AppLang } from "@/shared/hooks/useT";
import type { TextItem } from "@/shared/types/content";
import { Grid } from "../atoms/Grid";
import { TileCard } from "../atoms/TileCard";

type TileGridProps = {
  items: TextItem[];
  lang: AppLang;
};

/**
 * Grid of «заголовок + текст» tiles for the problem, solution and audience
 * sections.
 */
export function TileGrid({ items, lang }: TileGridProps) {
  return (
    <Grid container spacing={3} itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)}>
      {items.map((item, index) => (
        <Grid key={item.title} item size={12} md={4}>
          <TileCard lang={lang} item={item} position={index + 1} />
        </Grid>
      ))}
    </Grid>
  );
}
