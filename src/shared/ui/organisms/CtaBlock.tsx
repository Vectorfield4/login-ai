import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "../../data/routes";
import { tokens } from "../../design/tokens.stylex.ts";
import { Button } from "../atoms/Button";
import { Card } from "../atoms/Card";
import { Container } from "../atoms/Container";
import { Section } from "../atoms/Section";
import { Typography } from "../atoms/Typography";

type CtaBlockProps = {
  title: string;
  text: string;
  buttonLabel: string;
  /** Чистый путь без языкового префикса (локаль подтянется из lang). */
  to?: string;
  lang: "ru" | "en";
};

const styles = stylex.create({
  card: {
    textAlign: "center",
    padding: tokens.spacing5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacing2,
    "@media (min-width: 900px)": { padding: tokens.spacing8 },
  },
  text: {
    maxWidth: 600,
    marginInline: "auto",
  },
  button: { marginBlockStart: tokens.spacing2 },
});

/**
 * CTA-блок перед футером: секция с alt-фоном и карточкой с красной полосой
 * (кастомный variant="accent") и кнопкой primary.
 */
export function CtaBlock({ title, text, buttonLabel, to = "/services", lang }: CtaBlockProps) {
  return (
    <Section alt>
      <Container>
        <Card variant="accent" style={styles.card}>
          <Typography variant="h2" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary" style={styles.text}>
            {text}
          </Typography>
          <Button variant="contained" size="large" href={routeUrl(to, lang)} style={styles.button}>
            {buttonLabel}
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
