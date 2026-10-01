import type { HomeNewsItem } from "@/features/home-news/model/homeNews";
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
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item key={item.slug} size={12} md={4}>
          <HomeNewsCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
