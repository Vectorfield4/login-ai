import { Box, Container, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Section } from "../atoms/Section";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  text?: string;
  /** Дополнительный контент под текстом (например, Alert про демо-кейсы). */
  children?: ReactNode;
}

/**
 * Центрированный hero листингов (h1 + подзаголовок + текст). Контент уже
 * переведён вызывающим.
 */
export function PageHero({ title, subtitle, text, children }: PageHeroProps) {
  return (
    <Section>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography variant="h1" component="h1" gutterBottom>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {subtitle}
            </Typography>
          ) : null}
          {text ? (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
              {text}
            </Typography>
          ) : null}
          {children}
        </Box>
      </Container>
    </Section>
  );
}
