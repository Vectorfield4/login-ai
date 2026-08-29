import MailIcon from "@mui/icons-material/Mail";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Box, Card, CardContent, Container, Grid, Link, Typography } from "@mui/material";
import { IconCircle } from "../components/IconCircle";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

/** Единственный реальный контакт компании */
export const CONTACT_EMAIL = "sales@loginai.ru";

/**
 * Страница «Контакты»: основной канал связи — электронная почта.
 * Карточки оформлены по общим паттернам (Card + IconCircle), без выдуманных
 * телефонов и адресов — только mailto-ссылка на реальный email.
 */
export default function ContactsPage() {
  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h1" component="h1" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Напишите нам — обсудим задачу и подготовим расчёт.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
              Расскажите о проекте или задаче: подберём решение, оценим сроки и вернёмся с
              предложением.
            </Typography>
          </Box>
        </Container>
      </Section>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow="Свяжитесь с нами"
            title="Как с нами связаться"
            subtitle="Основной канал связи — электронная почта."
          />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="accent" elevation={1} sx={{ height: "100%" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <IconCircle>
                    <MailIcon fontSize="medium" />
                  </IconCircle>
                  <Typography variant="h6" component="h3">
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    По любым вопросам: идеи, проекты, расчёты и сотрудничество.
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
                    Быстрый ответ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Обычно отвечаем в течение рабочего дня.
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
                    Персональный подход
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Разберём задачу и предложим оптимальное решение и расчёт.
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
