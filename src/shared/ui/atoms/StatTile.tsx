import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface StatTileProps {
  label: string;
  value: string;
}

/**
 * KPI stat tile: a large brand value + label.
 */
export function StatTile({ label, value }: StatTileProps) {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 2,
        textAlign: "center",
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="h4" component="div" color="primary.main" fontWeight={700}>
        {t(value)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {t(label)}
      </Typography>
    </Paper>
  );
}
