import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { selectServiceBySlug, useServicesStore } from "@/entities/service/model/servicesStore";
import { groupByType } from "@/features/relevant-items/model/relevants";
import { PartOfSolutions } from "@/features/relevant-items/ui/PartOfSolutions";
import { RelatedServices } from "@/features/relevant-items/ui/RelatedServices";
import { ServiceCases } from "@/features/relevant-items/ui/ServiceCases";
import { BackLink } from "@/shared/ui/atoms/BackLink";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { Section } from "@/shared/ui/atoms/Section";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";
import { CtaBlock } from "@/shared/ui/organisms/CtaBlock";
import { FaqSection } from "@/shared/ui/organisms/FaqSection";
import { FitSection } from "@/shared/ui/organisms/FitSection";
import { ProcessSection } from "@/shared/ui/organisms/ProcessSection";
import { ProofSection } from "@/shared/ui/organisms/ProofSection";

export default function ServicePage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const service = useServicesStore((state) => selectServiceBySlug(state.services, slug));

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = service.icon;
  const grouped = groupByType(service.relevants);

  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <BackLink to="/services" label={t("servicePage.back")} />
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
          <Box sx={{ display: "flex", gap: 1, mt: 3, flexWrap: "wrap" }}>
            <Button variant="contained" component={RouterLink} to="/contacts" size="large">
              {t("servicePage.ctaButton")}
            </Button>
          </Box>
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

      {service.processSteps?.length ? (
        <ProcessSection
          eyebrow={t("servicePage.processEyebrow")}
          title={t("servicePage.processTitle")}
          items={service.processSteps}
        />
      ) : null}

      {service.fitItems?.length ? (
        <FitSection
          alt
          eyebrow={t("servicePage.fitEyebrow")}
          title={t("servicePage.fitTitle")}
          items={service.fitItems}
        />
      ) : null}

      {service.proofItems?.length ? (
        <ProofSection
          eyebrow={t("servicePage.proofEyebrow")}
          title={t("servicePage.proofTitle")}
          items={service.proofItems}
        />
      ) : null}

      {service.faqItems?.length ? (
        <FaqSection
          alt
          eyebrow={t("servicePage.faqEyebrow")}
          title={t("servicePage.faqTitle")}
          items={service.faqItems}
        />
      ) : null}

      {service.sections?.map((section, index) => (
        <Section key={section.title} alt={index % 2 === 1}>
          <Container maxWidth="lg">
            <SectionHeader title={t(section.title)} />
            <Card elevation={1}>
              <CardContent>
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {section.items.map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                    >
                      <Box component="span" sx={{ mr: 1, color: "primary.main", fontWeight: 700 }}>
                        •
                      </Box>
                      <Typography variant="body1">{t(item)}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Section>
      ))}

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

      <RelatedServices items={grouped.service} />
      <PartOfSolutions items={grouped.solution} />
      <ServiceCases items={grouped.case} />

      <CtaBlock
        title={t("servicePage.ctaTitle")}
        text={t("servicePage.ctaText")}
        buttonLabel={t("servicePage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
