import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent } from "../atoms/Card";
import { Typography } from "../atoms/Typography";

export function AiVisualSlider({ t }: { t: TFunc }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{t("ui.visualSlider.title") || "AI Visual Slider"}</Typography>
        <Typography variant="body2" color="textSecondary">
          {t("ui.visualSlider.subtitle") || "Interactive AI generation preview"}
        </Typography>
      </CardContent>
    </Card>
  );
}
