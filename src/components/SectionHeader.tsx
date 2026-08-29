import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Действие справа (например, кнопка «Все услуги») */
  action?: ReactNode;
}

/**
 * Заголовок секции: eyebrow (overline) + h2 + подзаголовок body1.
 * Иерархия типографики — через theme.typography (variants Typography).
 */
export function SectionHeader({ title, eyebrow, subtitle, action }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mb: { xs: 4, md: 5 }, // отступы — единицы theme.spacing()
      }}
    >
      <Box>
        {eyebrow ? (
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 700, letterSpacing: 1, display: "block", mb: 1 }}
          >
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h2" component="h2">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mt: 1 }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {action}
    </Box>
  );
}
