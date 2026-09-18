import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { selectServices, useServicesStore } from "@/entities/service/model/servicesStore";
import { ServiceCard } from "@/entities/service/ui/organisms/ServiceCard";
import { selectSolutions, useSolutionsStore } from "@/entities/solution/model/solutionsStore";
import { SolutionCard } from "@/entities/solution/ui/organisms/SolutionCard";
import { SolutionFilters } from "@/features/case-filters/ui/SolutionFilters";
import { useLocalizedPath } from "@/shared/hooks/useLocalizedPath";
import { Section } from "@/shared/ui/atoms/Section";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";
import { CtaBlock } from "@/shared/ui/organisms/CtaBlock";

function scrollToId(id: string) {
  return () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

/**
 * Главная страница: hero с CTA на якоря, секции «Услуги» и «Решения»
 * (с фильтрами по аудитории/технологии) и общий CTA.
 */
export default function HomePage() {
  const { t } = useTranslation();
  const [audience, setAudience] = useState("audiences.all");
  const [technology, setTechnology] = useState("technologies.any");
  const solutions = useSolutionsStore(selectSolutions);
  const services = useServicesStore(selectServices);
  const localize = useLocalizedPath();

  const filteredSolutions = useMemo(
    () =>
      solutions.filter(
        (solution) =>
          (audience === "audiences.all" || solution.audiences.includes(audience)) &&
          (technology === "technologies.any" || solution.tags.includes(technology)),
      ),
    [audience, technology, solutions],
  );

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
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={scrollToId("solutions")}
                sx={{ px: 4, py: 1.5, fontSize: "1.05rem" }}
              >
                {t("home.heroSolutionsCta")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={scrollToId("services")}
                sx={{ px: 4, py: 1.5, fontSize: "1.05rem" }}
              >
                {t("home.heroCta")}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Section>

      {/* Услуги — альтернативный фон #fafafa */}
      <Section alt id="services">
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("home.servicesEyebrow")}
            title={t("home.servicesTitle")}
            subtitle={t("home.servicesSubtitle")}
            action={
              <Button variant="soft" component={RouterLink} to={localize("/services")}>
                {t("home.servicesAll")}
              </Button>
            }
          />
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid key={service.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Решения — основной фон, с фильтрами */}
      <Section id="solutions">
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("home.solutionsEyebrow")}
            title={t("home.solutionsTitle")}
            subtitle={t("home.solutionsSubtitle")}
            action={
              <SolutionFilters
                audience={audience}
                technology={technology}
                onAudienceChange={setAudience}
                onTechnologyChange={setTechnology}
              />
            }
          />

          {filteredSolutions.length > 0 ? (
            <Grid container spacing={3}>
              {filteredSolutions.map((solution) => (
                <Grid key={solution.slug} size={{ xs: 12, sm: 6, md: 3 }}>
                  <SolutionCard solution={solution} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
              {t("home.filters.empty")}
            </Typography>
          )}
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
