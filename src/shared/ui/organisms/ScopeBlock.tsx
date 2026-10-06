import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import type { AppLang } from "@/shared/hooks/useT";
import type { ScopeItem } from "@/shared/types/content";
import { Grid } from "../atoms/Grid";
import { ScopeRow } from "../molecules/ScopeRow";

/**
 * Чек-лист «что проверяем»: одна колонка на мобильном, две на широком экране.
 * Внутренний блок — страница оборачивает его в собственный Section/BlockSection.
 */
export function ScopeBlock({ items, lang }: { items: ScopeItem[]; lang: AppLang }) {
  if (!items.length) return null;
  return (
    <Grid container spacing={3} itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)}>
      {items.map((item, index) => (
        <Grid key={item.title} item size={12} md={6}>
          <ScopeRow lang={lang} title={item.title} text={item.text} position={index + 1} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ScopeBlock;
