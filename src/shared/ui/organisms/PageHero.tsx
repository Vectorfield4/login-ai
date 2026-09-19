import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { Container } from "../atoms/Container";
import { Section } from "../atoms/Section";
import { Typography } from "../atoms/Typography";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  text?: string;
  alt?: boolean;
  style?: StyleXStyles;
};

const styles = stylex.create({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
  },
  subtitle: {
    fontWeight: 600,
    color: tokens.colorPrimary,
  },
});

export function PageHero({ title, subtitle, text, alt, style }: PageHeroProps) {
  return (
    <Section alt={alt} style={style}>
      <Container>
        <div {...stylex.props(styles.content)}>
          {subtitle ? (
            <Typography variant="body1" style={styles.subtitle}>
              {subtitle}
            </Typography>
          ) : null}
          <Typography variant="h1">{title}</Typography>
          {text ? (
            <Typography variant="body1" color="textSecondary">
              {text}
            </Typography>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
