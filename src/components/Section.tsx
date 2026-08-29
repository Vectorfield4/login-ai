import { Box, styled } from "@mui/material";

/**
 * Полноширинная секция с вертикальными отступами из токена layout.sectionSpacing
 * (10 × 8px = 80px). `alt` — альтернативный фон (#fafafa / тёмный аналог)
 * для чередования секций «Услуги» и «Решения».
 */
export const Section = styled(Box, {
  shouldForwardProp: (prop) => prop !== "alt",
})<{ alt?: boolean }>(({ theme, alt }) => ({
  backgroundColor: alt ? theme.palette.grey[50] : "transparent",
  paddingTop: theme.spacing(theme.layout.sectionSpacing),
  paddingBottom: theme.spacing(theme.layout.sectionSpacing),
  ...theme.applyStyles("dark", {
    backgroundColor: alt ? theme.palette.grey[900] : "transparent",
  }),
}));
