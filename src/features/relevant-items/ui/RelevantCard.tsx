import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

interface RelevantCardProps {
  titleKey: string;
  noteKey?: string;
  to: string;
}

/**
 * Card of a relevant page: a link to a solution, case or service.
 * The note («чем поможет») renders only when present.
 */
export function RelevantCard({ titleKey, noteKey, to }: RelevantCardProps) {
  const { t } = useTranslation();
  return (
    <Card
      component={RouterLink}
      to={to}
      elevation={1}
      sx={{
        height: "100%",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" component="h3">
          {t(titleKey)}
        </Typography>
        {noteKey ? (
          <Typography variant="body2" color="text.secondary">
            {t(noteKey)}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}
