import { Alert, Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
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
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="body2"
          component={RouterLink}
          to="/services"
          sx={{ textDecoration: "none", color: "text.secondary" }}
        >
          ← Все услуги
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
          <Box sx={{ color: "primary.main", display: "flex" }}>
            <Icon fontSize="large" />
          </Box>
          <Typography variant="h3" component="h1">
            {service.title}
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
          {service.tagline}
        </Typography>
        <Typography sx={{ maxWidth: 800 }}>{service.description}</Typography>
      </Box>

      <Grid container spacing={3}>
        {service.features.map((feature) => (
          <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 6 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
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

      {service.categories ? (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Виды программного обеспечения и технологии
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 800 }}>
            Подбираем стек по best practice для каждого типа продукта.
          </Typography>
          <Grid container spacing={3}>
            {service.categories.map((category) => (
              <Grid key={category.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {category.title}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {category.items.map((item) => (
                        <Chip key={item} label={item} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : null}

      <Alert severity="info" sx={{ mt: 4 }}>
        Заинтересовала услуга? Свяжитесь с нами, и мы подготовим расчёт под вашу задачу.
      </Alert>
    </Box>
  );
}
