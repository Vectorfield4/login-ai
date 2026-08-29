import { Button, Card, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Section } from "./Section";

interface CtaBlockProps {
  title: string;
  text: string;
  buttonLabel: string;
  to?: string;
}

/**
 * CTA-блок перед футером: секция с alt-фоном и карточкой с красной полосой
 * (кастомный variant="accent") и кнопкой primary.
 */
export function CtaBlock({ title, text, buttonLabel, to = "/services" }: CtaBlockProps) {
  return (
    <Section alt>
      <Container maxWidth="lg">
        <Card
          variant="accent"
          elevation={1}
          sx={{
            textAlign: "center",
            p: { xs: 5, md: 8 }, // 40px / 64px — единицы theme.spacing()
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h2" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            {text}
          </Typography>
          <Button variant="contained" size="large" component={RouterLink} to={to} sx={{ mt: 2 }}>
            {buttonLabel}
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
