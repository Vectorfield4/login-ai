import MailIcon from "@mui/icons-material/Mail";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Box, Card, CardContent, Container, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IconCircle } from "../components/atoms/IconCircle";
import { Section } from "../components/atoms/Section";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { PageHero } from "../components/organisms/PageHero";
import { CONTACT_EMAIL } from "../constants";

/**
 * Страница «Контакты»: основной канал связи — электронная почта.
 * Карточки оформлены по общим паттернам (Card + IconCircle), без выдуманных
 * телефонов и адресов — только mailto-ссылка на реальный email из src/constants.ts.
 */
export default function ContactsPage() {
  const { t } = useTranslation();

  return (
    <Box>
      <PageHero
        title={t("contactsPage.title")}
        subtitle={t("contactsPage.subtitle")}
        text={t("contactsPage.text")}
      />

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow={t("contactsPage.sectionEyebrow")}
            title={t("contactsPage.sectionTitle")}
            subtitle={t("contactsPage.sectionSubtitle")}
          />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="accent" elevation={1} sx={{ height: "100%" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <IconCircle>
                    <MailIcon fontSize="medium" />
                  </IconCircle>
                  <Typography variant="h6" component="h3">
                    {t("contactsPage.emailCardTitle")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("contactsPage.emailCardText")}
                  </Typography>
                  <Link
                    href={`mailto:${CONTACT_EMAIL}`}
                    variant="body1"
                    sx={{ fontWeight: 600, alignSelf: "flex-start" }}
                  >
                    {CONTACT_EMAIL}
                  </Link>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={1} sx={{ height: "100%" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <IconCircle color="secondary">
                    <ScheduleIcon fontSize="medium" />
                  </IconCircle>
                  <Typography variant="h6" component="h3">
                    {t("contactsPage.fastCardTitle")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("contactsPage.fastCardText")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={1} sx={{ height: "100%" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <IconCircle color="success">
                    <SupportAgentIcon fontSize="medium" />
                  </IconCircle>
                  <Typography variant="h6" component="h3">
                    {t("contactsPage.personalCardTitle")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("contactsPage.personalCardText")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Box>
  );
}
