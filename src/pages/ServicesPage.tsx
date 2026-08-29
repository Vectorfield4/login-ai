import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { services } from "../data/services";

export default function ServicesPage() {
  return (
    <Box>
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Услуги
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Разработка, продвижение и работа с данными — под ключ.
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
          От программного обеспечения и сайтов до SEO, AEO и мониторинга информации. Выберите
          услугу, чтобы узнать подробнее.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
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
                  <Typography variant="h6" component="h2" gutterBottom>
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

      <Box textAlign="center" sx={{ mt: 5 }}>
        <Button variant="contained" component={RouterLink} to="/services/software-development">
          Обсудить задачу
        </Button>
      </Box>
    </Box>
  );
}
