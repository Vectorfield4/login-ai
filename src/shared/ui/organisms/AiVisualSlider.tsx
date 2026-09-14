import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SliderLevel } from "@/entities/case/model/cases";

interface AiVisualSliderProps {
  min: number;
  max: number;
  /** Initial value (level) shown on load. */
  default: number;
  /** i18n key of the label for the minimum end of the scale. */
  fromLabel: string;
  /** i18n key of the label for the maximum end of the scale. */
  toLabel: string;
  /** Depth level descriptions (index = slider level). */
  levels: SliderLevel[];
}

/**
 * Interactive «глубины анализа» slider: switch between levels, from the big
 * picture to a detailed breakdown. The value maps to the matching level
 * description from the data; every level is translated in both languages.
 */
export function AiVisualSlider({
  min,
  max,
  default: defaultValue,
  fromLabel,
  toLabel,
  levels,
}: AiVisualSliderProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);

  const levelIndex = Math.min(Math.max(value - min, 0), levels.length - 1);
  const level = levels[levelIndex];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 1,
          mb: 1,
        }}
      >
        <Typography variant="h5" component="div" color="primary.main" fontWeight={700}>
          {t(level.title)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {min}–{max} · {t(fromLabel)} → {t(toLabel)}
        </Typography>
      </Box>

      <Box sx={{ mx: 1 }}>
        <Slider
          value={value}
          min={min}
          max={max}
          step={1}
          marks
          valueLabelDisplay="auto"
          onChange={(_, next) => setValue(next as number)}
          aria-label={t(fromLabel)}
          sx={{ color: "primary.main" }}
        />
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
        {t(level.text)}
      </Typography>
    </Box>
  );
}
