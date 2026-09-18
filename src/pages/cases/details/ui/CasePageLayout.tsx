import { Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CaseHero } from "@/entities/case/ui/organisms/CaseHero";
import { groupByType } from "@/features/relevant-items/model/relevants";
import { CaseServices } from "@/features/relevant-items/ui/CaseServices";
import { CaseSolutions } from "@/features/relevant-items/ui/CaseSolutions";
import { SimilarCases } from "@/features/relevant-items/ui/SimilarCases";
import type { CasePageLayoutProps } from "@/pages/cases/details/model/types";
import { Section } from "@/shared/ui/atoms/Section";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";
import { CtaBlock } from "@/shared/ui/organisms/CtaBlock";
import { StatGrid } from "@/shared/ui/organisms/StatGrid";

/**
 * Pure case page template: hero → the shared «Результат» block (every case has
 * metrics) → the sections slot → relevant links → CTA. Case pages (Chasovoy,
 * RetailSupportBot) add their specific sections through the slot; the template
 * never knows the case content.
 */
export function CasePageLayout({ case: caseData, sections }: CasePageLayoutProps) {
  const { t } = useTranslation();
  const grouped = groupByType(caseData.relevants);
  return (
    <Box>
      <CaseHero case={caseData} />
      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("casePage.resultsEyebrow")}
            title={t("casePage.resultsTitle")}
          />
          <StatGrid items={caseData.metrics} />
        </Container>
      </Section>
      {sections}
      <CaseServices items={grouped.service} />
      <CaseSolutions items={grouped.solution} />
      <SimilarCases items={grouped.case} />
      <CtaBlock
        title={t("casePage.ctaTitle")}
        text={t("casePage.ctaText")}
        buttonLabel={t("casePage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
