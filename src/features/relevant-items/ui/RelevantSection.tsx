import type { AppLang } from "@/shared/hooks/useT";
import type { EntityRef } from "@/shared/types/relevants";
import { Container, Grid, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import { RelevantCard, resolveRelevantRef } from "./RelevantCard";

interface RelevantSectionProps {
  lang: AppLang;
  /** Переводённый заголовок секции (передан конкретным блоком). */
  title: string;
  items: EntityRef[];
}

/**
 * Обёртка блока релевантных ссылок: заголовок + сетка целевых карточек.
 * Ссылки на неизвестные цели отбрасываются; пустой результат на рендерится.
 * Никаких стор-резолверов — карточки сами читают заголовок из фикстур.
 */
export function RelevantSection({ lang, title, items }: RelevantSectionProps) {
  const resolvable = items.filter((item) => resolveRelevantRef(item) !== undefined);
  if (!resolvable.length) {
    return null;
  }
  return (
    <Section>
      <Container>
        <SectionHeader title={title} />
        <Grid container spacing={3}>
          {resolvable.map((item) => (
            <Grid key={`${item.type}:${item.slug}`} item size={12} md={4}>
              <RelevantCard lang={lang} item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
