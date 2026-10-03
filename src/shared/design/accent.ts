/**
 * Accent palette (brand red), shared by `tokens.stylex.ts` and the contrast test
 * so a future shade edit cannot silently drop below the WCAG AA ratio. Light
 * value matches primary red 700 (white text passes 4.5:1); dark value is red 400
 * on the dark surface.
 */
export const accent = {
  light: "#D32F2F",
  lightSoft: "#D32F2F1A",
  lightSoftHover: "#D32F2F2E",
  dark: "#EF5350",
  darkSoft: "#EF53501A",
  darkSoftHover: "#EF53502E",
};

/** Page surfaces the accent has to stay legible on. */
export const accentSurface: Record<"light" | "dark", string> = {
  light: "#FFFFFF",
  dark: "#121212",
};
