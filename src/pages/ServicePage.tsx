import { Alert, Box, Card, CardContent, Chip, Container, Grid, Typography } from "@mui/material";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { IconCircle } from "../components/IconCircle";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { getService } from "../data/services";

export default function ServicePage() {
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
            ← Все услуги
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
            <IconCircle size={64}>
              <Icon fontSize="large" />
            </IconCircle>
            <Typography variant="h2" component="h1">
              {service.title}
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
            {service.tagline}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800 }}>
            {service.description}
          </Typography>
        </Container>
      </Section>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader eyebrow="Что входит" title="Возможности" />
          <Grid container spacing={3}>
            {service.features.map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 6 }}>
                <Card elevation={1} sx={{ height: "100%" }}>
                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Typography variant="h6" component="h2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.text}
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
              eyebrow="Стек и технологии"
              title="Виды программного обеспечения и технологии"
              subtitle="Подбираем стек по best practice для каждого типа продукта."
            />
            <Grid container spacing={3}>
              {service.categories.map((category) => (
                <Grid key={category.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card elevation={1} sx={{ height: "100%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Typography variant="h6" component="h3">
                        {category.title}
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
              Заинтересовала услуга? Свяжитесь с нами, и мы подготовим расчёт под вашу задачу.
            </Alert>
          </Container>
        </Section>
      ) : null}

      <CtaBlock
        title="Готовы обсудить задачу?"
        text="Оставьте заявку — вернёмся с предложением и предварительной оценкой."
        buttonLabel="Связаться с нами"
        to="/contacts"
      />
    </Box>
  );
}
