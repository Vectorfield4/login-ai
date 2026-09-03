import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import type { Solution } from "../data/solutions";

interface SolutionCardProps {
  solution: Solution;
}

/**
 * Карточка решения для сеток (главная и др.): карточка-ссылка на страницу
 * решения, сверху — тематическая обложка, если у решения задан `image`,
 * ниже — название и теглайн. Только сама карточка: сеточная раскладка
 * (размеры колонок, отступы) остаётся у вызывающего, поэтому карточку можно
 * переиспользовать в любой сетке. Добавление обложек для остальных решений —
 * чисто данные: поле `image` в src/data/solutions.ts.
 */
export function SolutionCard({ solution }: SolutionCardProps) {
  const { t } = useTranslation();
  return (
    <Card
      component={RouterLink}
      to={`/solutions/${solution.slug}`}
      elevation={1}
      sx={{
        height: "100%",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {solution.image ? (
        <Box
          component="img"
          src={solution.image}
          alt=""
          role="presentation"
          sx={{
            width: "100%",
            aspectRatio: "8 / 5",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="h6" component="h3">
          {t(solution.navTitle)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(solution.tagline)}
        </Typography>
      </CardContent>
    </Card>
  );
}
