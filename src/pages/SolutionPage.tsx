import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { getSolution } from "../data/solutions";

export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolution(slug);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="body2"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "text.secondary" }}
        >
          ← На главную
        </Typography>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
          {solution.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {solution.tagline}
        </Typography>
        <Typography sx={{ maxWidth: 800 }}>{solution.description}</Typography>
      </Box>

      <Grid container spacing={3}>
        {solution.features.map((feature) => (
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

      <Alert severity="info" sx={{ mt: 4 }}>
        Заинтересовало решение? Свяжитесь с нами, и мы подготовим расчёт под вашу задачу.
      </Alert>
    </Box>
  );
}
