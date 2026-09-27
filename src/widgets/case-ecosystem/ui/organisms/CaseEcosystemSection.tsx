import { groupByType, hasAnyRelation } from "@/features/relevant-items/model";
import { CaseColumn, ServiceColumn, SolutionColumn } from "@/features/relevant-items/ui";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { EntityRef } from "@/shared/types/relevants";
import { Container, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import { ColumnGrid } from "@/shared/ui/organisms/ColumnGrid";

interface CaseEcosystemSectionProps {
  relevants?: EntityRef[];
  lang: AppLang;
}

/**
 * Секция «экосистема кейса»: на чём он построен.
 *
 * Кейсы-колонка идёт последней и без метрики: рядом с результатом самого
 * кейса ещё одна метрика в шапке читалась бы как второй вывод.
 */
export function CaseEcosystemSection({ relevants, lang }: CaseEcosystemSectionProps) {
  const t = useT(lang);
  const grouped = groupByType(relevants);
  if (!hasAnyRelation(grouped)) return null;

  return (
    <Section label={t("ui.ecosystem.columns")}>
      <Container>
        <SectionHeader title={t("ui.ecosystem.heading.case")} />
        <ColumnGrid>
          <ServiceColumn
            titleKey="ui.ecosystem.case.services"
            refs={grouped.service}
            limit={2}
            lang={lang}
          />
          <SolutionColumn
            titleKey="ui.ecosystem.case.solutions"
            refs={grouped.solution}
            limit={2}
            lang={lang}
          />
          <CaseColumn
            titleKey="ui.ecosystem.case.similarCases"
            refs={grouped.case}
            limit={2}
            lang={lang}
          />
        </ColumnGrid>
      </Container>
    </Section>
  );
}
