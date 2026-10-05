import * as stylex from "@stylexjs/stylex";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { tokens } from "../../design/tokens.stylex.ts";
import { Card, CardContent } from "../atoms/Card";
import { Typography } from "../atoms/Typography";

type FeatureCardProps = {
  /** i18n-ключ заголовка. */
  title: string;
  /** i18n-ключ описания. */
  text: string;
  lang: AppLang;
};

const styles = stylex.create({
  card: { height: "100%", display: "flex", flexDirection: "column" },
  content: { flexGrow: 1, display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

/**
 * Карточка «фичи»: заголовок + короткое описание (i18n-ключи).
 * Используется в секциях фич, технологий и бизнес-категорий.
 */
export function FeatureCard({ title, text, lang }: FeatureCardProps) {
  const t = useT(lang);
  return (
    <Card itemScope itemType={schemaIri(SCHEMA_TYPE.thing)} style={styles.card}>
      <CardContent style={styles.content}>
        <Typography variant="h6" component="h2" itemProp="name">
          {t(title)}
        </Typography>
        <Typography variant="body2" color="textSecondary" itemProp="description">
          {t(text)}
        </Typography>
      </CardContent>
    </Card>
  );
}
