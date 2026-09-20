import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import type { FaqItem } from "@/shared/types/content";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import Stack from "@/shared/ui/atoms/Stack";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  content: { display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

export function FaqBlock({ items, t }: { items: FaqItem[]; t: TFunc }) {
  return (
    <Stack gap={2}>
      {items.map((item) => (
        <Card key={item.question}>
          <CardContent style={styles.content}>
            <Typography variant="h6">{t(item.question)}</Typography>
            <Typography variant="body2" color="textSecondary">
              {t(item.answer)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
