import { alpha, Box, styled } from "@mui/material";

/** Ключи палитры, у которых есть оттенок `.main` */
export type ThemeColorKey = "primary" | "secondary" | "error" | "warning" | "info" | "success";

interface IconCircleProps {
  color?: ThemeColorKey;
  size?: number;
}

/**
 * Иконка в цветном круге: полупрозрачная заливка + фирменный цвет иконки.
 * Размер по умолчанию — 48px (6 × 8px сетки).
 */
export const IconCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "size",
})<IconCircleProps>(({ theme, color = "primary", size = 48 }) => ({
  width: size,
  height: size,
  flexShrink: 0,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette[color].main, 0.12),
  color: theme.palette[color].main,
}));
