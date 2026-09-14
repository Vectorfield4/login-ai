import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import type { Case } from "@/entities/case/model/cases";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";

interface CaseCardProps {
  case: Case;
  /** Case has its own page (/cases/:slug); otherwise the card links to a solution. */
  hasOwnPage: boolean;
}

/**
 * Case card for the «Кейсы» grid: icon + industry chip, title and tagline, a
 * divider with result metrics, and navigation at the bottom: to the case detail
 * page (if hasOwnPage) or to the first related solution (first solution
 * element of relevants).
 */
export function CaseCard({ case: caseData, hasOwnPage }: CaseCardProps) {
  const { t } = useTranslation();
  const { title, tagline, icon: Icon, industryKey, metrics } = caseData;
  const solutionRef = caseData.relevants?.find((ref) => ref.type === "solution");

  return (
    <Card elevation={1} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <IconCircle>
            <Icon fontSize="medium" />
          </IconCircle>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Chip size="small" variant="outlined" color="secondary" label={t(industryKey)} />
          </Box>
        </Box>
        <Typography variant="h6" component="h3">
          {t(title)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(tagline)}
        </Typography>
        <Divider />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {metrics.map((metric) => (
            <Box key={metric.label} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="h6" color="primary.main">
                {t(metric.value)}
              </Typography>
              <Typography variant="overline" color="text.secondary">
                {t(metric.label)}
              </Typography>
            </Box>
          ))}
        </Box>
        {hasOwnPage ? (
          <Box sx={{ mt: "auto", pt: 1 }}>
            <Button
              size="small"
              variant="contained"
              component={RouterLink}
              to={`/cases/${caseData.slug}`}
            >
              {t("casesPage.cardDetailLink")}
            </Button>
          </Box>
        ) : solutionRef ? (
          <Box sx={{ mt: "auto", pt: 1 }}>
            <Button
              size="small"
              variant="soft"
              component={RouterLink}
              to={`/solutions/${solutionRef.slug}`}
            >
              {t("casesPage.cardSolutionLink")}
            </Button>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
}
