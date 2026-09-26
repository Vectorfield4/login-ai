import { NewsCard } from "@/entities/news";
import type { NewsItem } from "@/entities/news/model/news";
import type { TFunc } from "@/shared/i18n/t";
import { Container, Grid, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";

interface NewsSectionProps {
  t: TFunc;
  /** Translated section title (passed by the concrete block). */
  title: string;
  items: NewsItem[];
}

/**
 * Обёртка блока «статьи по теме»: заголовок + сетка превью.
 *
 * Аналог `RelevantSection`, но наоборот: источник — коммерческая сущность,
 * цель — статьи. Список приходит уже отфильтрованным по локали
 * (`getNewsReferencing`), поэтому блок не рендерит ссылку на несуществующую
 * страницу. Пустой результат не рендерится вовсе.
 */
export function NewsSection({ t, title, items }: NewsSectionProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <Section>
      <Container>
        <SectionHeader title={title} />
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid key={item.slug} item size={12} md={4}>
              <NewsCard item={item} t={t} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
