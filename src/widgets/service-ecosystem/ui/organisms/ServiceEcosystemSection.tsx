import { groupByType, hasAnyRelation } from "@/features/relevant-items/model";
import { CaseColumn, ServiceColumn, SolutionColumn } from "@/features/relevant-items/ui";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { EntityRef } from "@/shared/types/relevants";
import { Container, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import { ColumnGrid } from "@/shared/ui/organisms/ColumnGrid";

interface ServiceEcosystemSectionProps {
  relevants?: EntityRef[];
  lang: AppLang;
}

/**
 * Секция «экосистема услуги»: что берут вместе с ней.
 *
 * Композиция колонок видна прямо в разметке — сменить набор и порядок можно
 * здесь, не трогая модель. Пустая колонка возвращает `null`, а секция без
 * связей не рендерится вовсе.
 */
export function ServiceEcosystemSection({ relevants, lang }: ServiceEcosystemSectionProps) {
  const t = useT(lang);
  const grouped = groupByType(relevants);
  if (!hasAnyRelation(grouped)) return null;

  return (
    <Section label={t("ui.ecosystem.columns")}>
      <Container>
        <SectionHeader title={t("ui.ecosystem.heading.service")} />
        <ColumnGrid>
          <ServiceColumn
            titleKey="ui.ecosystem.service.relatedServices"
            refs={grouped.service}
            limit={2}
            lang={lang}
          />
          <SolutionColumn
            titleKey="ui.ecosystem.service.solutions"
            refs={grouped.solution}
            limit={5}
            forceRows
            lang={lang}
          />
          <CaseColumn
            titleKey="ui.ecosystem.service.cases"
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
