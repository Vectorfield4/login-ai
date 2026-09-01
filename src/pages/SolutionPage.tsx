import { Alert, Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { CrossSells } from "../components/CrossSells";
import { CtaBlock } from "../components/CtaBlock";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import VideoShowcase from "../components/VideoShowcase";
import { getSolution } from "../data/solutions";

export default function SolutionPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolution(slug);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "text.secondary" }}
          >
            {t("solutionPage.back")}
          </Typography>
          <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 2 }}>
            {t(solution.title)}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {t(solution.tagline)}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800 }}>
            {t(solution.description)}
          </Typography>
        </Container>
      </Section>

      {solution.features?.length ? (
        <Section alt>
          <Container maxWidth="lg">
            <SectionHeader
              eyebrow={t("solutionPage.featuresEyebrow")}
              title={t("solutionPage.featuresTitle")}
            />
            <Grid container spacing={3}>
              {solution.features.map((feature) => (
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
            <Alert severity="info" sx={{ mt: 5 }}>
              {t("solutionPage.alertInterest")}
            </Alert>
          </Container>
        </Section>
      ) : null}

      {solution.sections?.map((section, index) => (
        <Section key={section.title} alt={index % 2 === 1}>
          <Container maxWidth="lg">
            <SectionHeader title={t(section.title)} />
            <Card elevation={1}>
              <CardContent>
                <Stack spacing={1.5}>
                  {section.items.map((item) => (
                    <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          mt: 0.7,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body1">{t(item)}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </Section>
      ))}

      {solution.technologies?.length ? (
        <Section>
          <Container maxWidth="lg">
            <SectionHeader
              eyebrow={t("solutionPage.techEyebrow")}
              title={t("solutionPage.techTitle")}
            />
            <Grid container spacing={3}>
              {solution.technologies.map((tech) => (
                <Grid key={tech.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card elevation={1} sx={{ height: "100%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Typography variant="h6" component="h2">
                        {t(tech.title)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(tech.text)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      {solution.referencesNote ? (
        <Section alt>
          <Container maxWidth="lg">
            <SectionHeader
              eyebrow={t("solutionPage.refsEyebrow")}
              title={t("solutionPage.refsTitle")}
            />
            <Alert severity="info">{t(solution.referencesNote)}</Alert>
          </Container>
        </Section>
      ) : null}

      {solution.businessCategories?.length ? (
        <Section>
          <Container maxWidth="lg">
            <SectionHeader
              eyebrow={t("solutionPage.catsEyebrow")}
              title={t("solutionPage.catsTitle")}
            />
            <Grid container spacing={3}>
              {solution.businessCategories.map((cat) => (
                <Grid key={cat.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card elevation={1} sx={{ height: "100%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Typography variant="h6" component="h2">
                        {t(cat.title)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(cat.text)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      {solution.showcase ? (
        <Section alt>
          <Container maxWidth="lg">
            <SectionHeader
              eyebrow={t("solutionPage.portfolioEyebrow")}
              title={t(solution.showcase.title)}
              subtitle={t(solution.showcase.note)}
            />
            <VideoShowcase showcase={solution.showcase} />
          </Container>
        </Section>
      ) : null}

      <CrossSells slug={slug} />

      <CtaBlock
        title={t("solutionPage.ctaTitle")}
        text={t("solutionPage.ctaText")}
        buttonLabel={t("solutionPage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
