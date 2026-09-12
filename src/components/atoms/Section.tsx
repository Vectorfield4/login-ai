import { Box, styled } from "@mui/material";

/**
 * Full-width section with vertical padding from the layout.sectionSpacing token
 * (10 × 8px = 80px). `alt` switches to the alternate background (#fafafa / dark
 * counterpart) to alternate sections like «Услуги» and «Решения».
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
