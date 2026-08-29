import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { IconCircle } from "../components/IconCircle";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { services } from "../data/services";

export default function ServicesPage() {
  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h1" component="h1" gutterBottom>
              Услуги
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Разработка, продвижение и работа с данными — под ключ.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
              От программного обеспечения и сайтов до SEO, AEO и мониторинга информации. Выберите
              услугу, чтобы узнать подробнее.
            </Typography>
          </Box>
        </Container>
      </Section>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader
            eyebrow="Направления"
            title="Что мы делаем"
            subtitle="Каждая услуга — с прозрачным процессом и измеримым результатом."
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
                        {service.navTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.tagline}
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
        title="Не нашли подходящую услугу?"
        text="Расскажите о задаче — предложим оптимальное решение и расчёт."
        buttonLabel="Обсудить задачу"
        to="/contacts"
      />
    </Box>
  );
}
