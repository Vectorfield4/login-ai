import { keyframes } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { IconCircle } from "../components/IconCircle";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { services } from "../data/services";
import { solutions } from "../data/solutions";

const AUDIENCE_KEYS = [
  "audiences.all",
  "audiences.manufacturers",
  "audiences.clinics",
  "audiences.adAgencies",
  "audiences.businessOwners",
];

const TECHNOLOGY_KEYS = [
  "technologies.any",
  "technologies.computerVision",
  "technologies.agentic",
  "technologies.content",
  "technologies.video",
  "technologies.reputation",
  "technologies.llm",
];

/** Свечение фильтров: один «пинг» при загрузке страницы — без повторов и hover. */
const glowPulse = keyframes`
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 16px 6px rgba(25, 118, 210, 0.42); }
`;

function scrollToId(id: string) {
  return () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

export default function HomePage() {
  const { t } = useTranslation();
  const [audience, setAudience] = useState("audiences.all");
  const [technology, setTechnology] = useState("technologies.any");

  const filteredSolutions = useMemo(
    () =>
      solutions.filter(
        (solution) =>
          (audience === "audiences.all" || solution.audiences.includes(audience)) &&
          (technology === "technologies.any" || solution.tags.includes(technology)),
      ),
    [audience, technology],
  );

  const handleAudienceChange = (value: string) => {
    setAudience(value);
  };

  const handleTechnologyChange = (value: string) => {
    setTechnology(value);
  };

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

      {/* Решения — основной фон, с фильтрами */}
      <Section id="solutions">
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("home.solutionsEyebrow")}
            title={t("home.solutionsTitle")}
            subtitle={t("home.solutionsSubtitle")}
            action={
              /* Фильтры: «для кого» и «технология» — в правой части заголовка */
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {[
                  {
                    value: audience,
                    onChange: handleAudienceChange,
                    label: t("home.filters.audienceLabel"),
                    keys: AUDIENCE_KEYS,
                  },
                  {
                    value: technology,
                    onChange: handleTechnologyChange,
                    label: t("home.filters.technologyLabel"),
                    keys: TECHNOLOGY_KEYS,
                  },
                ].map((filter) => (
                  <Box
                    key={filter.label}
                    sx={{
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      // Один цикл при загрузке: без infinite и без hover-перезапуска.
                      animation: `${glowPulse} 2.6s ease-in-out 1`,
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                      <InputLabel id={`filter-${filter.label}`}>{filter.label}</InputLabel>
                      <Select
                        labelId={`filter-${filter.label}`}
                        value={filter.value}
                        label={filter.label}
                        onChange={(event) => filter.onChange(event.target.value as string)}
                      >
                        {filter.keys.map((key) => (
                          <MenuItem key={key} value={key}>
                            {t(key)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ))}
              </Box>
            }
          />

          {filteredSolutions.length > 0 ? (
            <Grid container spacing={3}>
              {filteredSolutions.map((solution) => (
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
                    {solution.image ? (
                      <Box
                        component="img"
                        src={solution.image}
                        alt=""
                        role="presentation"
                        sx={{
                          width: "100%",
                          aspectRatio: "8 / 5",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : null}
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
