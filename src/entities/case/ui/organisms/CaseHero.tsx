import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import type { Case } from "@/entities/case/model/cases";
import { useLocalizedPath } from "@/shared/hooks/useLocalizedPath";
import { BackLink } from "@/shared/ui/atoms/BackLink";
import { Section } from "@/shared/ui/atoms/Section";

/**
 * Case detail hero: back link, eyebrow, title, tagline, description, industry
 * chip and buttons (demo + CTA).
 */
export function CaseHero({ case: caseData }: { case: Case }) {
  const { t } = useTranslation();
  const localize = useLocalizedPath();
  const { demoUrl } = caseData;

  return (
    <Section>
      <Container maxWidth="lg">
        <BackLink to="/cases" label={t("casePage.back")} />
        <Grid container alignItems="center" spacing={{ xs: 3, md: 5 }} sx={{ mt: 0 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant="overline"
              color="primary.main"
              sx={{ fontWeight: 700, letterSpacing: 1, display: "block" }}
            >
              {t("casePage.caseEyebrow")}
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom>
              {t(caseData.title)}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t(caseData.tagline)}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
              {t(caseData.description)}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
              <Chip variant="outlined" color="secondary" label={t(caseData.industryKey)} />
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 3, flexWrap: "wrap" }}>
              {demoUrl ? (
                <Button variant="contained" component="a" href={demoUrl} size="large">
                  {t("ui.openDemo")}
                </Button>
              ) : null}
              <Button variant="soft" component={RouterLink} to={localize("/contacts")} size="large">
                {t("casePage.ctaButton")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
