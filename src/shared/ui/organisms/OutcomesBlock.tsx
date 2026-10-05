import type { AppLang } from "@/shared/hooks/useT";
import type { OutcomeItem } from "@/shared/types/content";
import { Grid } from "../atoms/Grid";
import { OutcomeTile } from "../molecules/OutcomeTile";

/**
 * Сетка результатов: 2 или 3 колонки на широком экране (по кратности трём),
 * одна колонка на мобильном. Внутренний блок — страница оборачивает его в
 * собственный Section/BlockSection (не задаёт собственный фон).
 */
export function OutcomesBlock({ items, lang }: { items: OutcomeItem[]; lang: AppLang }) {
  if (!items.length) return null;
  const columns = items.length % 3 === 0 ? 3 : 2;
  const md = 12 / columns;
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.title} item size={12} sm={6} md={md}>
          <OutcomeTile item={item} lang={lang} />
        </Grid>
      ))}
    </Grid>
  );
}

export default OutcomesBlock;
