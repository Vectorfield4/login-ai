import { alpha, Box, styled } from "@mui/material";

/** Palette keys that have a `.main` shade */
export type ThemeColorKey = "primary" | "secondary" | "error" | "warning" | "info" | "success";

interface IconCircleProps {
  color?: ThemeColorKey;
  size?: number;
}

/**
 * Icon in a colored circle: a translucent fill + the brand icon color.
 * Default size is 48px (6 × 8px grid).
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
