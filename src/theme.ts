import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";

/**
 * Дизайн-система Login AI.
 * Все значения — токены темы: palette, spacing, shape, shadows, zIndex,
 * transitions, breakpoints, typography + кастомные токены (border, layout).
 * Хардкод значений в компонентах не используется — только токены.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Кастомные токены (module augmentation)
// ─────────────────────────────────────────────────────────────────────────────
declare module "@mui/material/styles" {
  interface Theme {
    /** Кастомные токены геометрии */
    border: {
      /** Радиус кнопок, полей и т.п. (глобально через shape тоже) */
      radius: number;
    };
    /** Токены компоновки в единицах theme.spacing() */
    layout: {
      /** Вертикальный отступ секций: 10 × 8px = 80px */
      sectionSpacing: number;
      /** Отступ карточек/контента: 3 × 8px = 24px */
      cardSpacing: number;
    };
  }
  interface ThemeOptions {
    border?: { radius?: number };
    layout?: { sectionSpacing?: number; cardSpacing?: number };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Новые состояния компонентов
// ─────────────────────────────────────────────────────────────────────────────
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    /** Карточка с фирменной красной полосой сверху */
    accent: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    /** Мягкая (tonal) кнопка: полупрозрачная заливка primary */
    soft: true;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Палитры (light + dark)
// ─────────────────────────────────────────────────────────────────────────────
const primaryLight = {
  main: "#D32F2F", // фирменный красный (red 700)
  light: "#FF6659", // red 400
  dark: "#9A0007", // red 900
  contrastText: "#FFFFFF",
};

const primaryDark = {
  main: "#EF5350", // red 400 — ярче на тёмном фоне
  light: "#FF8A80", // red 200
  dark: "#C62828", // red 800
  contrastText: "#FFFFFF",
};

const secondaryLight = {
  main: "#455A64", // blueGrey 700 — спокойный спутник красного
  light: "#718792",
  dark: "#1C313A",
  contrastText: "#FFFFFF",
};

const secondaryDark = {
  main: "#90A4AE", // blueGrey 300
  light: "#CFD8DC",
  dark: "#62757F",
  contrastText: "#1C313A",
};

// ─────────────────────────────────────────────────────────────────────────────
// Тема
// ─────────────────────────────────────────────────────────────────────────────
export const theme = responsiveFontSizes(
  createTheme({
    // CSS-переменные + поддержка тёмной схемы (переключение через data-mui-color-scheme)
    cssVariables: true,
    colorSchemes: {
      light: {
        palette: {
          primary: primaryLight,
          secondary: secondaryLight,
          error: { main: "#B71C1C" }, // красный 900 — отличим от primary
          warning: { main: "#F57C00" }, // orange 700
          info: { main: "#0288D1" }, // lightBlue 700
          success: { main: "#2E7D32" }, // green 800
        },
      },
      dark: {
        palette: {
          primary: primaryDark,
          secondary: secondaryDark,
          error: { main: "#EF5350" },
          warning: { main: "#FFA726" },
          info: { main: "#4FC3F7" },
          success: { main: "#66BB6A" },
        },
      },
    },

    // Кастомная сетка: 8px = 1 единица (theme.spacing(1))
    spacing: 8,

    // Глобальные скругления
    shape: { borderRadius: 8 },

    // Кастомные токены
    border: { radius: 12 },
    layout: { sectionSpacing: 10, cardSpacing: 3 },

    // Типографическая иерархия (responsiveFontSizes масштабирует по брейкпоинтам)
    typography: {
      h1: { fontSize: "2.75rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" },
      h2: { fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em" },
      h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.25 },
      h4: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3 },
      h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.35 },
      h6: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.4 },
      body1: { fontSize: "1rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.55 },
      button: { textTransform: "none", fontWeight: 600 },
    },

    // ── Кастомизация компонентов (styleOverrides + variants) ──
    components: {
      // Глобальные стили HTML-тегов
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          html: {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            scrollBehavior: "smooth",
          },
          body: {
            backgroundColor: "var(--mui-palette-background-default)",
            transition: theme.transitions.create("background-color", {
              duration: theme.transitions.duration.shortest,
            }),
          },
          img: { maxWidth: "100%", display: "block" },
          "::selection": {
            backgroundColor: alpha(theme.palette.primary.main, 0.22),
          },
        }),
      },

      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.border.radius,
            padding: theme.spacing(1, 2.5),
            transition: theme.transitions.create(["background-color", "box-shadow", "transform"], {
              duration: theme.transitions.duration.short,
            }),
            "&:active": { transform: "scale(0.98)" },
          }),
          containedPrimary: ({ theme }) => ({
            boxShadow: theme.shadows[4],
            "&:hover": { boxShadow: theme.shadows[8] },
          }),
        },
        variants: [
          {
            // Новое состояние: мягкая кнопка на основе primary
            props: { variant: "soft" },
            style: ({ theme }) => ({
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.18),
              },
            }),
          },
        ],
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.border.radius,
            boxShadow: theme.shadows[1], // карточки: глубина shadow 1
            transition: theme.transitions.create(["box-shadow", "transform"], {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
            // hover: подъём + тень
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[8],
            },
          }),
        },
        variants: [
          {
            // Новое состояние: красная полоса сверху
            props: { variant: "accent" },
            style: ({ theme }) => ({
              borderTop: `${theme.spacing(0.5)} solid ${theme.palette.primary.main}`,
            }),
          },
        ],
      },

      MuiCardContent: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: theme.spacing(theme.layout.cardSpacing), // карточкам 24px
            "&:last-child": { paddingBottom: theme.spacing(theme.layout.cardSpacing) },
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            fontWeight: 500,
            transition: theme.transitions.create("background-color", {
              duration: theme.transitions.duration.shortest,
            }),
          }),
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: theme.border.radius,
            boxShadow: theme.shadows[8],
          }),
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: theme.shadows[2],
            backgroundImage: "none",
          }),
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.border.radius,
          }),
        },
      },
    },
  }),
);
