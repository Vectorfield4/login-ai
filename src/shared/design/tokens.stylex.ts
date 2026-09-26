import * as stylex from "@stylexjs/stylex";

/**
 * Токены дизайн-системы Login AI (StyleX, build-time).
 * Это перенос значений дизайн-системы из src/shared/config/theme.ts:
 * имена полей (palette.main/light/dark/contrastText, border.radius,
 * layout.*, typography h1–h6) сохранены, чтобы перенос читался один в один.
 *
 * Легаси (MUI/Emotion) не поддерживается, поэтому:
 * - светлая схема — дефолт в defineVars ниже;
 * - тёмная схема — оверрайды переменных по [data-theme="dark"] в
 *   app/styles/global.css (атрибут устанавливает инлайн-скрипт BaseLayout);
 * - defineVars не поддерживает вложенные объекты — ключи плоские;
 *   имя CSS-переменной совпадает с ключом (--colorPrimary и т.д.).
 */

export const tokens = stylex.defineVars({
  // ── palette: 4 ступени (main/light/dark/contrastText) на light — ──
  colorPrimary: "#D32F2F", // red 700
  colorPrimaryLight: "#FF6659", // red 400
  colorPrimaryDark: "#9A0007", // red 900
  colorPrimaryContrastText: "#FFFFFF",
  colorSecondary: "#455A64", // blueGrey 700
  colorSecondaryLight: "#718792",
  colorSecondaryDark: "#1C313A",
  colorSecondaryContrastText: "#FFFFFF",
  colorError: "#B71C1C",
  colorWarning: "#F57C00",
  colorInfo: "#0288D1",
  colorSuccess: "#2E7D32",
  colorBg: "#FAFAFA",
  colorSurface: "#FFFFFF",
  colorText: "rgba(0, 0, 0, 0.87)",
  colorTextSecondary: "rgba(0, 0, 0, 0.6)",
  colorDivider: "rgba(0, 0, 0, 0.12)",
  // оверлеи поверх токенов (меняются вместе с темой)
  colorActionHover: "rgba(0, 0, 0, 0.04)",
  colorPrimarySoft: "#D32F2F1A", // alpha 10% от primary
  colorPrimarySoftHover: "#D32F2F2E", // alpha 18% от primary

  // ── spacing: сетка 8px = 1 единица (theme.spacing(1)) ──
  spacing05: "4px",
  spacing1: "8px",
  spacing15: "12px",
  spacing2: "16px",
  spacing25: "20px",
  spacing3: "24px",
  spacing4: "32px",
  spacing5: "40px",
  spacing6: "48px",
  spacing8: "64px",
  spacing10: "80px",

  // ── shape / border ──
  radiusShape: "8px", // MUI shape.borderRadius
  radiusBorder: "12px", // кастомный border.radius

  // ── shadows: уровни 0/1/2/4/8 (значения из theme.shadows) ──
  shadow0: "none",
  shadow1:
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  shadow2:
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  shadow4:
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  shadow8:
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",

  // ── zIndex (AppBar/Drawer/Modal) ──
  zAppbar: 1100,
  zDrawer: 1200,
  zModal: 1300,
  zSnackbar: 1400,
  zTooltip: 1500,

  // ── transitions ──
  durationShortest: "150ms",
  durationShort: "200ms",
  durationStandard: "250ms",
  durationComplex: "375ms",
  easingInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easingOut: "cubic-bezier(0, 0, 0.2, 1)",
  easingIn: "cubic-bezier(0.4, 0, 1, 1)",
  easingSharp: "cubic-bezier(0.4, 0, 0.6, 1)",

  // ── typography: иерархия h1–h6, body1–2 ──
  sizeH1: "2.75rem",
  sizeH2: "2.25rem",
  sizeH3: "1.75rem",
  sizeH4: "1.5rem",
  sizeH5: "1.25rem",
  sizeH6: "1.125rem",
  sizeBody1: "1rem",
  sizeBody2: "0.875rem",
  weightH1: 700,
  weightH2: 700,
  weightH3: 600,
  weightH4: 600,
  weightH5: 600,
  weightH6: 600,
  weightButton: 600,
  lineH1: 1.15,
  lineH2: 1.2,
  lineH3: 1.25,
  lineH4: 1.3,
  lineH5: 1.35,
  lineH6: 1.4,
  lineBody1: 1.6,
  lineBody2: 1.55,
  lsH1: "-0.02em",
  lsH2: "-0.01em",

  // ── кастомные layout-токены (в 8px-единицах переведено в px) ──
  layoutSection: "64px", // 8 × 8px
  layoutCard: "24px", // 3 × 8px
});

// Тёмная схема в едином источнике: значения из theme.ts (colorSchemes.dark).
// darkTheme — StyleX-тема (compile-time): имя её класса подставляется на
// `<html>` инлайн-скриптом BaseLayout, и hashed-переменные компонентов
// переопределяются целиком по правилу `.cXxx { var: dark }`.
export const darkTokens = {
  colorPrimary: "#EF5350",
  colorPrimaryLight: "#FF8A80",
  colorPrimaryDark: "#C62828",
  colorPrimaryContrastText: "#FFFFFF",
  colorSecondary: "#90A4AE",
  colorSecondaryLight: "#CFD8DC",
  colorSecondaryDark: "#62757F",
  colorSecondaryContrastText: "#1C313A",
  colorError: "#EF5350",
  colorWarning: "#FFA726",
  colorInfo: "#4FC3F7",
  colorSuccess: "#66BB6A",
  colorBg: "#121212",
  colorSurface: "#121212",
  colorText: "rgba(255, 255, 255, 0.87)",
  colorTextSecondary: "rgba(255, 255, 255, 0.7)",
  colorDivider: "rgba(255, 255, 255, 0.12)",
  colorActionHover: "rgba(255, 255, 255, 0.08)",
  colorPrimarySoft: "#EF53501A",
  colorPrimarySoftHover: "#EF535033",
} as const;

export const darkTheme = stylex.createTheme(tokens, darkTokens);
