import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import type { CaseStudy } from "../data/cases";
import { IconCircle } from "./IconCircle";

interface CaseCardProps {
  caseStudy: CaseStudy;
}

/**
 * Карточка кейса для сетки на странице «Кейсы»: иконка + чип отрасли,
 * заголовок и теглайн, разделитель и метрики результата, внизу — опциональная
 * ссылка на связанное решение. Карточка не ведёт на детальную страницу кейса
 * (её нет на этом этапе) — навигация только через футер-кнопку и общий CTA.
 */
export function CaseCard({ caseStudy }: CaseCardProps) {
  const { t } = useTranslation();
  const { title, tagline, icon: Icon, industryKey, metrics, relatedSolution } = caseStudy;

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
          <Chip size="small" variant="outlined" color="secondary" label={t(industryKey)} />
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
        {relatedSolution ? (
          <Box sx={{ mt: "auto", pt: 1 }}>
            <Button
              size="small"
              variant="soft"
              component={RouterLink}
              to={`/solutions/${relatedSolution}`}
            >
              {t("casesPage.cardSolutionLink")}
            </Button>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
}
