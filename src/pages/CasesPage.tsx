import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CaseCard } from "../components/CaseCard";
import { CtaBlock } from "../components/CtaBlock";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { cases } from "../data/cases";

/**
 * Страница «Кейсы» (листинг): hero + демо-уведомление, сетка карточек кейсов
 * и общий CTA на /contacts. Детальных страниц кейсов нет — карточки ссылаются
 * на связанные решения, а конверсия идёт через CtaBlock.
 */
export default function CasesPage() {
  const { t } = useTranslation();

  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h1" component="h1" gutterBottom>
              {t("casesPage.title")}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {t("casesPage.subtitle")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
              {t("casesPage.text")}
            </Typography>
            <Alert severity="info" sx={{ maxWidth: 720, mx: "auto", mt: 3, textAlign: "left" }}>
              {t("casesPage.demoNotice")}
            </Alert>
          </Box>
        </Container>
      </Section>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("casesPage.sectionEyebrow")}
            title={t("casesPage.sectionTitle")}
            subtitle={t("casesPage.sectionSubtitle")}
          />
          <Grid container spacing={3}>
            {cases.map((caseStudy) => (
              <Grid key={caseStudy.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <CaseCard caseStudy={caseStudy} />
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
