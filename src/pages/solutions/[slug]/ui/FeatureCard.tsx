import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FeatureCardProps {
  title: string;
  text: string;
}

/**
 * Карточка «фичи»: заголовок + короткое описание (i18n-ключи).
 * Переиспользуется в секциях фич, технологий и бизнес-категорий.
 */
export function FeatureCard({ title, text }: FeatureCardProps) {
  const { t } = useTranslation();
  return (
    <Card elevation={1} sx={{ height: "100%" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="h6" component="h2">
          {t(title)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(text)}
        </Typography>
      </CardContent>
    </Card>
  );
}
