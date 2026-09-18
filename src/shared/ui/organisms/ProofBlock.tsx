import { Box, Card, CardContent, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ProofItem } from "@/shared/types/content";

const ProofCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.border.radius,
  height: "100%",
}));

/**
 * Кейс-доказательство: описание + выделенная метрика «до → после».
 */
export function ProofBlock({ items }: { items: ProofItem[] }) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {items.map((item) => (
        <ProofCard key={item.title} variant="accent" elevation={1}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 4 },
              alignItems: { md: "flex-start" },
            }}
          >
            <Box sx={{ minWidth: { md: 200 } }}>
              <Typography variant="h4" component="div" color="primary.main" fontWeight={700}>
                {t(item.metricValue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(item.metricLabel)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h3" color="primary.main">
                {t(item.title)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t(item.text)}
              </Typography>
            </Box>
          </CardContent>
        </ProofCard>
      ))}
    </Box>
  );
}
