/**
 * Accent palette (teal), shared by `tokens.stylex.ts` and the contrast test so a
 * future shade edit cannot silently drop below the WCAG AA ratio. Light value is
 * teal 700 (white text passes 4.5:1); dark value is teal 300 on the dark surface.
 */
export const accent = {
  light: "#00796B",
  lightSoft: "#00796B1A",
  lightSoftHover: "#00796B2E",
  dark: "#4DB6AC",
  darkSoft: "#4DB6AC1A",
  darkSoftHover: "#4DB6AC2E",
};

/** Page surfaces the accent has to stay legible on. */
export const accentSurface: Record<"light" | "dark", string> = {
  light: "#FFFFFF",
  dark: "#121212",
};
