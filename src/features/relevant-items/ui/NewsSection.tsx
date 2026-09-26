import * as stylex from "@stylexjs/stylex";
import { NewsCard } from "@/entities/news";
import type { NewsItem } from "@/entities/news/model/news";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Container, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: tokens.spacing3,
    gridAutoRows: "1fr",
    containerType: "inline-size",
    "@container (min-width: 600px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@container (min-width: 900px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    "@container (min-width: 1200px)": {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
});

interface NewsSectionProps {
  t: TFunc;
  title: string;
  items: NewsItem[];
}

export function NewsSection({ t, title, items }: NewsSectionProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <Section>
      <Container>
        <SectionHeader title={title} />
        <div {...stylex.props(styles.grid)}>
          {items.map((item) => (
            <NewsCard key={item.slug} item={item} t={t} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
