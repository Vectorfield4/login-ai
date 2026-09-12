import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface BackLinkProps {
  to: string;
  label: string;
}

/**
 * «← назад» link at the top of detail pages (case, service, solution).
 */
export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Typography
      variant="body2"
      component={RouterLink}
      to={to}
      sx={{ textDecoration: "none", color: "text.secondary" }}
    >
      {label}
    </Typography>
  );
}
