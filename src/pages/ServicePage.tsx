import { Alert, Box, Card, CardContent, Chip, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { IconCircle } from "../components/IconCircle";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { getService } from "../data/services";

export default function ServicePage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const service = getService(slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = service.icon;

  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            component={RouterLink}
            to="/services"
            sx={{ textDecoration: "none", color: "text.secondary" }}
          >
            {t("servicePage.back")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
            <IconCircle size={64}>
              <Icon fontSize="large" />
            </IconCircle>
            <Typography variant="h2" component="h1">
              {t(service.title)}
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
            {t(service.tagline)}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800 }}>
            {t(service.description)}
          </Typography>
        </Container>
      </Section>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("servicePage.featuresEyebrow")}
            title={t("servicePage.featuresTitle")}
          />
          <Grid container spacing={3}>
            {service.features.map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 6 }}>
                <Card elevation={1} sx={{ height: "100%" }}>
                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Typography variant="h6" component="h2">
                      {t(feature.title)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(feature.text)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {service.categories ? (
        <Section>
          <Container maxWidth="lg">
            <SectionHeader
              eyebrow={t("servicePage.categoriesEyebrow")}
              title={t("servicePage.categoriesTitle")}
              subtitle={t("servicePage.categoriesSubtitle")}
            />
            <Grid container spacing={3}>
              {service.categories.map((category) => (
                <Grid key={category.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card elevation={1} sx={{ height: "100%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Typography variant="h6" component="h3">
                        {t(category.title)}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {category.items.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            size="small"
                            variant="outlined"
                            color="secondary"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Alert severity="info" sx={{ mt: 5 }}>
              {t("servicePage.alertInterest")}
            </Alert>
          </Container>
        </Section>
      ) : null}

      <CtaBlock
        title={t("servicePage.ctaTitle")}
        text={t("servicePage.ctaText")}
        buttonLabel={t("servicePage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
