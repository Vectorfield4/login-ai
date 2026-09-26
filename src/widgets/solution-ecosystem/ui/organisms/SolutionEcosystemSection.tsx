import { groupByType, hasAnyRelation } from "@/features/relevant-items/model";
import { CaseColumn, ServiceColumn, SolutionColumn } from "@/features/relevant-items/ui";
import type { TFunc } from "@/shared/i18n/t";
import type { EntityRef } from "@/shared/types/relevants";
import { Container, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import { ColumnGrid } from "@/shared/ui/organisms/ColumnGrid";

interface SolutionEcosystemSectionProps {
  relevants?: EntityRef[];
  t: TFunc;
  lang: "ru" | "en";
}

/**
 * Секция «экосистема решения»: что дополняет решение.
 *
 * Порядок колонок задан разметкой: входящие услуги → похожие решения →
 * кейсы. Пустая колонка возвращает `null`, секция без связей не рендерится.
 */
export function SolutionEcosystemSection({ relevants, t, lang }: SolutionEcosystemSectionProps) {
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
            t={t}
            lang={lang}
          />
          <SolutionColumn
            titleKey="ui.ecosystem.solution.relatedSolutions"
            refs={grouped.solution}
            limit={2}
            t={t}
            lang={lang}
          />
          <CaseColumn
            titleKey="ui.ecosystem.solution.cases"
            refs={grouped.case}
            limit={2}
            showMetric
            t={t}
            lang={lang}
          />
        </ColumnGrid>
      </Container>
    </Section>
  );
}
