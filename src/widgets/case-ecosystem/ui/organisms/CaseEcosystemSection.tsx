import { groupByType, hasAnyRelation } from "@/features/relevant-items/model";
import type { EntityRef } from "@/features/relevant-items/model/entityRef";
import { CaseColumn, ServiceColumn, SolutionColumn } from "@/features/relevant-items/ui";
import type { TFunc } from "@/shared/i18n/t";
import { Container, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import { ColumnGrid } from "@/shared/ui/organisms/ColumnGrid";

interface CaseEcosystemSectionProps {
  relevants?: EntityRef[];
  t: TFunc;
  lang: "ru" | "en";
}

/**
 * Секция «экосистема кейса»: на чём он построен.
 *
 * Кейсы-колонка идёт последней и без метрики: рядом с результатом самого
 * кейса ещё одна метрика в шапке читалась бы как второй вывод.
 */
export function CaseEcosystemSection({ relevants, t, lang }: CaseEcosystemSectionProps) {
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
            t={t}
            lang={lang}
          />
          <SolutionColumn
            titleKey="ui.ecosystem.case.solutions"
            refs={grouped.solution}
            limit={2}
            t={t}
            lang={lang}
          />
          <CaseColumn
            titleKey="ui.ecosystem.case.similarCases"
            refs={grouped.case}
            limit={2}
            t={t}
            lang={lang}
          />
        </ColumnGrid>
      </Container>
    </Section>
  );
}
