import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Card, CardContent, Chip, Grid, styled, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import type { FitItem } from "@/shared/types/content";

const FitCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.border.radius,
  height: "100%",
}));

/**
 * «Кому подходит / кому НЕ подходит»: two grouped columns of fit cards.
 * Splits items by the `positive` flag.
 */
export function FitBlock({ items }: { items: FitItem[] }) {
  const { t } = useTranslation();
  const positive = items.filter((item) => item.positive);
  const negative = items.filter((item) => !item.positive);

  const column = (
    group: FitItem[],
    badge: string,
    color: "success" | "error",
    icon: ReactElement,
  ) => (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box sx={{ mb: 2 }}>
        <Chip icon={icon} label={badge} color={color} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {group.map((item) => (
          <FitCard key={item.title} variant="accent" elevation={1}>
            <CardContent>
              <Typography variant="h6" component="h3" color="primary.main">
                {t(item.title)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t(item.text)}
              </Typography>
            </CardContent>
          </FitCard>
        ))}
      </Box>
    </Grid>
  );

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {column(positive, t("ui.fitFits"), "success", <CheckCircleOutlineIcon />)}
      {column(negative, t("ui.fitNot"), "error", <CancelOutlinedIcon />)}
    </Grid>
  );
}
