import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { services } from "../data/services";
import { solutions } from "../data/solutions";

export default function HomePage() {
  return (
    <Box>
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Login AI
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          ИИ-решения для бизнеса: от агентных систем до генерации контента.
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720, mx: "auto", mb: 3 }}>
          Автоматизируем процессы, внедряем компьютерное зрение, улучшаем клиентский сервис и
          ускоряем создание контента — быстро, просто и с измеримым результатом.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/services">
          Наши услуги
        </Button>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h2">
            Услуги
          </Typography>
          <Button component={RouterLink} to="/services">
            Все услуги
          </Button>
        </Box>
        <Grid container spacing={3}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Grid key={service.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  component={RouterLink}
                  to={`/services/${service.slug}`}
                  sx={{
                    height: "100%",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: "primary.main", mb: 1.5 }}>
                      <Icon />
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
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
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Решения
        </Typography>
        <Grid container spacing={3}>
          {solutions.map((solution) => (
            <Grid key={solution.slug} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                component={RouterLink}
                to={`/solutions/${solution.slug}`}
                sx={{
                  height: "100%",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {solution.navTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {solution.tagline}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
