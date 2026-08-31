import { Alert, Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { CtaBlock } from "../components/CtaBlock";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import VideoShowcase from "../components/VideoShowcase";
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

      {solution.features?.length ? (
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
              Заинтересовало решение?{" "}
              <RouterLink to="/contacts" style={{ fontWeight: 700 }}>
                Свяжитесь с нами
              </RouterLink>{" "}
              — подготовим расчёт под вашу задачу.
            </Alert>
          </Container>
        </Section>
      ) : null}

      {solution.sections?.map((section, index) => (
        <Section key={section.title} alt={index % 2 === 1}>
          <Container maxWidth="lg">
            <SectionHeader title={section.title} />
            <Card elevation={1}>
              <CardContent>
                <Stack spacing={1.5}>
                  {section.items.map((item) => (
                    <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          mt: 0.7,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body1">{item}</Typography>
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
            <SectionHeader eyebrow="Технологии" title="Способы генерации" />
            <Grid container spacing={3}>
              {solution.technologies.map((tech) => (
                <Grid key={tech.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card elevation={1} sx={{ height: "100%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Typography variant="h6" component="h2">
                        {tech.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tech.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      {solution.referencesNote ? (
        <Section alt>
          <Container maxWidth="lg">
            <SectionHeader eyebrow="Референсы" title="Работа с референсами" />
            <Alert severity="info">{solution.referencesNote}</Alert>
          </Container>
        </Section>
      ) : null}

      {solution.businessCategories?.length ? (
        <Section>
          <Container maxWidth="lg">
            <SectionHeader eyebrow="Бизнес-задачи" title="Под задачи бизнеса" />
            <Grid container spacing={3}>
              {solution.businessCategories.map((cat) => (
                <Grid key={cat.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card elevation={1} sx={{ height: "100%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Typography variant="h6" component="h2">
                        {cat.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cat.text}
                      </Typography>
                    </CardContent>
                  </Card>
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
              eyebrow="Портфолио"
              title={solution.showcase.title}
              subtitle={solution.showcase.note}
            />
            <VideoShowcase showcase={solution.showcase} />
          </Container>
        </Section>
      ) : null}

      <CtaBlock
        title="Внедряем ИИ в ваш бизнес"
        text="Расскажите о процессах — предложим решение и план внедрения."
        buttonLabel="Обсудить проект"
        to="/contacts"
      />
    </Box>
  );
}
