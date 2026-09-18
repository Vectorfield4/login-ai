import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useLocalizedPath } from "@/shared/hooks/useLocalizedPath";

interface BackLinkProps {
  /** Чистый путь без языкового префикса (локаль подтянется из URL). */
  to: string;
  label: string;
}

/**
 * «← назад» link at the top of detail pages (case, service, solution).
 * Локализует пути из URL: чистый "/cases" рендерится как "/ru/cases".
 */
export function BackLink({ to, label }: BackLinkProps) {
  const localize = useLocalizedPath();
  return (
    <Typography
      variant="body2"
      component={RouterLink}
      to={localize(to)}
      sx={{ textDecoration: "none", color: "text.secondary" }}
    >
      {label}
    </Typography>
  );
}