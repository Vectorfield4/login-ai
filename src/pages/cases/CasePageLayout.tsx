import { Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Section } from "../../components/atoms/Section";
import { StatGrid } from "../../components/molecules/blocks/StatGrid";
import { SectionHeader } from "../../components/molecules/SectionHeader";
import { CaseServices } from "../../components/organisms/blocks/CaseServices";
import { CaseSolutions } from "../../components/organisms/blocks/CaseSolutions";
import { SimilarCases } from "../../components/organisms/blocks/SimilarCases";
import { CaseHero } from "../../components/organisms/CaseHero";
import { CtaBlock } from "../../components/organisms/CtaBlock";
import { groupByType } from "../../lib/relevants";
import type { CasePageLayoutProps } from "./types";

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
