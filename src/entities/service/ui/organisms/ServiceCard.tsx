import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import type { Service } from "@/entities/service/model/services";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";

interface ServiceCardProps {
  service: Service;
}

/**
 * Карточка услуги для сеток (главная и «Услуги»): иконка + название + теглайн.
 * Сеточная раскладка остаётся у вызывающего — карточку можно переиспользовать.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useTranslation();
  const Icon = service.icon;
  return (
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
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <IconCircle>
          <Icon fontSize="medium" />
        </IconCircle>
        <Typography variant="h6" component="h3">
          {t(service.navTitle)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(service.tagline)}
        </Typography>
      </CardContent>
    </Card>
  );
}
