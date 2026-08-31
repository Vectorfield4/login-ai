import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { IconCircle } from "../components/IconCircle";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { services } from "../data/services";
import { solutions } from "../data/solutions";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Box>
      {/* Hero */}
      <Section>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h1" component="h1" gutterBottom>
              Login AI
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {t("home.heroSubtitle")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 720, mx: "auto", mb: 4 }}
            >
              {t("home.heroText")}
            </Typography>
            <Button variant="contained" size="large" component={RouterLink} to="/services">
              {t("home.heroCta")}
            </Button>
          </Box>
        </Container>
      </Section>

      {/* Услуги — альтернативный фон #fafafa */}
      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("home.servicesEyebrow")}
            title={t("home.servicesTitle")}
            subtitle={t("home.servicesSubtitle")}
            action={
              <Button variant="soft" component={RouterLink} to="/services">
                {t("home.servicesAll")}
              </Button>
            }
          />
          <Grid container spacing={3}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Grid key={service.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    component={RouterLink}
                    to={`/services/${service.slug}`}
                    elevation={1}
                    sx={{
                      height: "100%",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent
                      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <IconCircle>
                        <Icon fontSize="medium" />
                      </IconCircle>
                      <Typography variant="h6" component="h3">
                        {t(service.navTitle)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(service.tagline)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* Решения — основной фон */}
      <Section>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("home.solutionsEyebrow")}
            title={t("home.solutionsTitle")}
            subtitle={t("home.solutionsSubtitle")}
          />
          <Grid container spacing={3}>
            {solutions.map((solution) => (
              <Grid key={solution.slug} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  component={RouterLink}
                  to={`/solutions/${solution.slug}`}
                  elevation={1}
                  sx={{
                    height: "100%",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    <Typography variant="h6" component="h3">
                      {t(solution.navTitle)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(solution.tagline)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <CtaBlock
        title={t("home.ctaTitle")}
        text={t("home.ctaText")}
        buttonLabel={t("home.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
