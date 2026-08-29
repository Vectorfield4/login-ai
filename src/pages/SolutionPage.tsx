import { Alert, Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { getSolution } from "../data/solutions";

export default function SolutionPage() {
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
            ← На главную
          </Typography>
          <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 2 }}>
            {solution.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {solution.tagline}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800 }}>
            {solution.description}
          </Typography>
        </Container>
      </Section>

      <Section alt>
        <Container maxWidth="lg">
          <SectionHeader eyebrow="Что входит" title="Возможности" />
          <Grid container spacing={3}>
            {solution.features.map((feature) => (
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
          <Alert severity="info" sx={{ mt: 5 }}>
            Заинтересовало решение? Свяжитесь с нами, и мы подготовим расчёт под вашу задачу.
          </Alert>
        </Container>
      </Section>

      <CtaBlock
        title="Внедряем ИИ в ваш бизнес"
        text="Расскажите о процессах — предложим решение и план внедрения."
        buttonLabel="Обсудить проект"
        to="/services"
      />
    </Box>
  );
}
