/** Брейкпоинты — те же, что были у MUI (theme.breakpoints.values). */
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
