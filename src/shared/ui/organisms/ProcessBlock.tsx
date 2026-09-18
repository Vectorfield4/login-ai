import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ProcessItem } from "@/shared/types/content";

const StepCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.border.radius,
  height: "100%",
}));

const StepNumber = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 700,
}));

/**
 * Шаги процесса: нумерованные карточки «как мы работаем».
 */
export function ProcessBlock({ items }: { items: ProcessItem[] }) {
  const { t } = useTranslation();
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {items.map((item, index) => (
        <Grid key={item.title} size={{ xs: 12, md: 4 }}>
          <StepCard elevation={1}>
            <Box sx={{ p: { xs: 2, md: 3 }, height: "100%" }}>
              <StepNumber>{index + 1}</StepNumber>
              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                {t(item.title)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t(item.text)}
              </Typography>
            </Box>
          </StepCard>
        </Grid>
      ))}
    </Grid>
  );
}
