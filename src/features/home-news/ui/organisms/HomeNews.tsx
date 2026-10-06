import type { HomeNewsItem } from "@/features/home-news/model/homeNews";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import type { AppLang } from "@/shared/hooks/useT";
import { Grid } from "@/shared/ui/atoms";
import { HomeNewsCard } from "./HomeNewsCard";

interface HomeNewsProps {
  items: HomeNewsItem[];
  lang: AppLang;
}

export function HomeNews({ items }: HomeNewsProps) {
  if (items.length === 0) return null;

  return (
    <Grid container spacing={3} itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)}>
      {items.map((item, index) => (
        <Grid item key={item.slug} size={12} md={4}>
          <HomeNewsCard item={item} position={index + 1} />
        </Grid>
      ))}
    </Grid>
  );
}
