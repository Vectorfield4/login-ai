import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { selectSolutionBySlug, useSolutionsStore } from "@/entities/solution/model/solutionsStore";
import { groupByType } from "@/features/relevant-items/model/relevants";
import { RelatedSolutions } from "@/features/relevant-items/ui/RelatedSolutions";
import { SolutionCases } from "@/features/relevant-items/ui/SolutionCases";
import { SolutionServices } from "@/features/relevant-items/ui/SolutionServices";
import { FeatureCard } from "@/pages/solutions/details/ui/FeatureCard";
import VideoShowcase from "@/pages/solutions/details/ui/VideoShowcase";
import { useLocalizedPath } from "@/shared/hooks/useLocalizedPath";
import { BackLink } from "@/shared/ui/atoms/BackLink";
import { Dot } from "@/shared/ui/atoms/Dot";
import { Section } from "@/shared/ui/atoms/Section";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";
import { CtaBlock } from "@/shared/ui/organisms/CtaBlock";
import { FaqSection } from "@/shared/ui/organisms/FaqSection";
import { FitSection } from "@/shared/ui/organisms/FitSection";
import { ProcessSection } from "@/shared/ui/organisms/ProcessSection";
import { ProofSection } from "@/shared/ui/organisms/ProofSection";

export default function SolutionPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const localize = useLocalizedPath();
  const solution = useSolutionsStore((state) => selectSolutionBySlug(state.solutions, slug));

  if (!solution) {
    return <Navigate to={localize("/")} replace />;
  }

  const grouped = groupByType(solution.relevants);

  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={solution.image ? { xs: 4, md: 6 } : 0}>
            <Grid size={{ xs: 12, md: solution.image ? 7 : 12 }}>
              <BackLink to="/" label={t("solutionPage.back")} />
              <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 2 }}>
                {t(solution.title)}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t(solution.tagline)}
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 800 }}>
                {t(solution.description)}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 3, flexWrap: "wrap" }}>
                <Button variant="contained" component={RouterLink} to={localize("/contacts")} size="large">
                  {t("solutionPage.ctaButton")}
                </Button>
              </Box>
            </Grid>
            {solution.image ? (
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  component="img"
                  src={solution.image}
                  alt=""
                  role="presentation"
                  sx={(theme) => ({
                    width: "100%",
                    display: "block",
                    borderRadius: theme.border.radius,
                    boxShadow: theme.shadows[4],
                  })}
                />
              </Grid>
            ) : null}
          </Grid>
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
                  <FeatureCard title={feature.title} text={feature.text} />
                </Grid>
              ))}
            </Grid>
            <Alert severity="info" sx={{ mt: 5 }}>
              {t("solutionPage.alertInterest")}
            </Alert>
          </Container>
        </Section>
      ) : null}

      {solution.processSteps?.length ? (
        <ProcessSection
          eyebrow={t("solutionPage.processEyebrow")}
          title={t("solutionPage.processTitle")}
          items={solution.processSteps}
        />
      ) : null}

      {solution.fitItems?.length ? (
        <FitSection
          alt
          eyebrow={t("solutionPage.fitEyebrow")}
          title={t("solutionPage.fitTitle")}
          items={solution.fitItems}
        />
      ) : null}

      {solution.proofItems?.length ? (
        <ProofSection
          eyebrow={t("solutionPage.proofEyebrow")}
          title={t("solutionPage.proofTitle")}
          items={solution.proofItems}
        />
      ) : null}

      {solution.faqItems?.length ? (
        <FaqSection
          alt
          eyebrow={t("solutionPage.faqEyebrow")}
          title={t("solutionPage.faqTitle")}
          items={solution.faqItems}
        />
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
                      <Dot />
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
                  <FeatureCard title={tech.title} text={tech.text} />
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
                  <FeatureCard title={cat.title} text={cat.text} />
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
              action={
                <Button variant="outlined" component={RouterLink} to={localize("/contacts")}>
                  {t("showcase.sectionCta")}
                </Button>
              }
            />
            <VideoShowcase showcase={solution.showcase} />
          </Container>
        </Section>
      ) : null}

      <SolutionServices items={grouped.service} />
      <RelatedSolutions items={grouped.solution} />
      <SolutionCases items={grouped.case} />

      <CtaBlock
        title={t("solutionPage.ctaTitle")}
        text={t("solutionPage.ctaText")}
        buttonLabel={t("solutionPage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
