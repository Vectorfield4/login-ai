import * as stylex from "@stylexjs/stylex";
import type { CtaItem } from "@/shared/types/content";
import type { TFunc } from "@/shared/i18n/t";
import { Button } from "@/shared/ui/atoms/Button";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Container } from "@/shared/ui/atoms/Container";
import { Section } from "@/shared/ui/atoms/Section";
import { Typography } from "@/shared/ui/atoms/Typography";
import { tokens } from "@/shared/design/tokens.stylex.ts";

const styles = stylex.create({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
    textAlign: "center",
    padding: tokens.spacing4,
  },
});

export function CtaBanner({ cta, t, lang }: { cta: CtaItem; t: TFunc; lang: "ru" | "en" }) {
  const href = lang === "ru" ? "/contacts" : "/en/contacts";
  return (
    <Section>
      <Container>
        <Card variant="accent">
          <CardContent style={styles.content}>
            <Typography variant="h4">{t(cta.title)}</Typography>
            <Typography variant="body1" color="textSecondary">
              {t(cta.text)}
            </Typography>
            <div>
              <Button href={href} variant="contained" size="large">
                {t(cta.buttonLabel)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
