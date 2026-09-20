import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";
import type { TFunc } from "../../i18n/t";
import { Card, CardContent } from "../atoms/Card";
import { Typography } from "../atoms/Typography";

type FeatureCardProps = {
  /** i18n-ключ заголовка. */
  title: string;
  /** i18n-ключ описания. */
  text: string;
  t: TFunc;
};

const styles = stylex.create({
  card: { height: "100%", display: "flex", flexDirection: "column" },
  content: { flexGrow: 1, display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

/**
 * Карточка «фичи»: заголовок + короткое описание (i18n-ключи).
 * Используется в секциях фич, технологий и бизнес-категорий.
 */
export function FeatureCard({ title, text, t }: FeatureCardProps) {
  return (
    <Card style={styles.card}>
      <CardContent style={styles.content}>
        <Typography variant="h6" component="h2">
          {t(title)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t(text)}
        </Typography>
      </CardContent>
    </Card>
  );
}
