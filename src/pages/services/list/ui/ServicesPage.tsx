import { Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { selectServices, useServicesStore } from "@/entities/service/model/servicesStore";
import { ServiceCard } from "@/entities/service/ui/organisms/ServiceCard";
import { Section } from "@/shared/ui/atoms/Section";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";
import { CtaBlock } from "@/shared/ui/organisms/CtaBlock";
import { PageHero } from "@/shared/ui/organisms/PageHero";

/**
 * Страница «Услуги» (листинг): hero + сетка услуг + общий CTA на /contacts.
 */
export default function ServicesPage() {
  const { t } = useTranslation();
  const services = useServicesStore(selectServices);

  return (
    <Box>
      <PageHero
        title={t("servicesPage.title")}
        subtitle={t("servicesPage.subtitle")}
        text={t("servicesPage.text")}
      />

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("servicesPage.sectionEyebrow")}
            title={t("servicesPage.sectionTitle")}
            subtitle={t("servicesPage.sectionSubtitle")}
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

      <CtaBlock
        title={t("servicesPage.ctaTitle")}
        text={t("servicesPage.ctaText")}
        buttonLabel={t("servicesPage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
