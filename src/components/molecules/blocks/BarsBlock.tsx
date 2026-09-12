import { Box, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { BarsItem } from "../../../types/investors";

/**
 * Percentage distribution: label + progress bar.
 */
export function BarsBlock({ items }: { items: BarsItem[] }) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "grid", gap: 2, maxWidth: 560 }}>
      {items.map((item) => (
        <Box key={item.label}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {t(item.label)}
            </Typography>
            <Typography variant="body2" color="primary.main" fontWeight={700}>
              {item.percent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={item.percent}
            sx={{ height: 8, borderRadius: 1 }}
          />
        </Box>
      ))}
    </Box>
  );
}
