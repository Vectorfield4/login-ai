import { groupByType, hasAnyRelation } from "@/features/relevant-items/model";
import { CaseColumn, ServiceColumn, SolutionColumn } from "@/features/relevant-items/ui";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { EntityRef } from "@/shared/types/relevants";
import { Container, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import { ColumnGrid } from "@/shared/ui/organisms/ColumnGrid";

interface SolutionEcosystemSectionProps {
  relevants?: EntityRef[];
  lang: AppLang;
}

/**
 * Секция «экосистема решения»: что дополняет решение.
 *
 * Порядок колонок задан разметкой: входящие услуги → похожие решения →
 * кейсы. Пустая колонка возвращает `null`, секция без связей не рендерится.
 */
export function SolutionEcosystemSection({ relevants, lang }: SolutionEcosystemSectionProps) {
  const t = useT(lang);
  const grouped = groupByType(relevants);
  if (!hasAnyRelation(grouped)) return null;

  return (
    <Section label={t("ui.ecosystem.columns")}>
      <Container>
        <SectionHeader title={t("ui.ecosystem.heading.solution")} />
        <ColumnGrid>
          <ServiceColumn
            titleKey="ui.ecosystem.solution.services"
            refs={grouped.service}
            limit={2}
            lang={lang}
          />
          <SolutionColumn
            titleKey="ui.ecosystem.solution.relatedSolutions"
            refs={grouped.solution}
            limit={2}
            lang={lang}
          />
          <CaseColumn
            titleKey="ui.ecosystem.solution.cases"
            refs={grouped.case}
            limit={2}
            showMetric
            lang={lang}
          />
        </ColumnGrid>
      </Container>
    </Section>
  );
}
