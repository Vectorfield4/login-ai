import * as stylex from "@stylexjs/stylex";
import type { FitItem } from "@/shared/types/content";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Grid } from "@/shared/ui/atoms/Grid";
import { Typography } from "@/shared/ui/atoms/Typography";
import { tokens } from "@/shared/design/tokens.stylex.ts";

const styles = stylex.create({
  card: { height: "100%", display: "flex", flexDirection: "column" },
  content: { flexGrow: 1, display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

export function FitBlock({ items, t }: { items: FitItem[]; t: TFunc }) {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.title} item size={12} md={6}>
          <Card variant={item.positive ? undefined : "accent"} style={styles.card}>
            <CardContent style={styles.content}>
              <Typography variant="h6">{t(item.title)}</Typography>
              <Typography variant="body2" color="textSecondary">
                {t(item.text)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
