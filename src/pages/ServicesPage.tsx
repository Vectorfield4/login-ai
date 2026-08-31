import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { IconCircle } from "../components/IconCircle";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { services } from "../data/services";

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h1" component="h1" gutterBottom>
              {t("servicesPage.title")}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {t("servicesPage.subtitle")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
              {t("servicesPage.text")}
            </Typography>
          </Box>
        </Container>
      </Section>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("servicesPage.sectionEyebrow")}
            title={t("servicesPage.sectionTitle")}
            subtitle={t("servicesPage.sectionSubtitle")}
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
                      <Typography variant="h6" component="h2">
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

      <CtaBlock
        title={t("servicesPage.ctaTitle")}
        text={t("servicesPage.ctaText")}
        buttonLabel={t("servicesPage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
