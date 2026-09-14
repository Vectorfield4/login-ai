import { Card, CardContent, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { TextItem } from "@/entities/case/model/cases";

const BlockCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.border.radius,
  height: "100%",
}));

/**
 * «заголовок + текст» tile for the problem, solution and audience sections
 * (accent card with a colored title).
 */
export function TileCard({ item }: { item: TextItem }) {
  const { t } = useTranslation();
  return (
    <BlockCard variant="accent" elevation={1}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" component="h3" color="primary.main">
          {t(item.title)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {t(item.text)}
        </Typography>
      </CardContent>
    </BlockCard>
  );
}
