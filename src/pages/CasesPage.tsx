import { Alert, Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Section } from "../components/atoms/Section";
import { CaseCard } from "../components/molecules/CaseCard";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { CtaBlock } from "../components/organisms/CtaBlock";
import { PageHero } from "../components/organisms/PageHero";
import { selectCases, useCasesStore } from "../stores/casesStore";
import { casePages } from "./cases/registry";

/**
 * Cases listing page: hero with a demo notice and a grid of all cases (including
 * «Часовой» as a regular card), plus a shared CTA to /contacts. Cases without
 * their own page (no entry in the casePages registry) link to a related
 * solution.
 */
export default function CasesPage() {
  const { t } = useTranslation();
  const cases = useCasesStore(selectCases);

  return (
    <Box>
      <PageHero
        title={t("casesPage.title")}
        subtitle={t("casesPage.subtitle")}
        text={t("casesPage.text")}
      >
        <Alert severity="info" sx={{ maxWidth: 720, mx: "auto", mt: 3, textAlign: "left" }}>
          {t("casesPage.demoNotice")}
        </Alert>
      </PageHero>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("casesPage.sectionEyebrow")}
            title={t("casesPage.sectionTitle")}
            subtitle={t("casesPage.sectionSubtitle")}
          />
          <Grid container spacing={3}>
            {cases.map((caseData) => (
              <Grid key={caseData.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <CaseCard case={caseData} hasOwnPage={Boolean(casePages[caseData.slug])} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <CtaBlock
        title={t("casesPage.ctaTitle")}
        text={t("casesPage.ctaText")}
        buttonLabel={t("casesPage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
