import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Section } from "@/shared/ui/atoms/Section";

interface CtaBannerProps {
  alt?: boolean;
  /** Overline над заголовком (уже переведён). */
  eyebrow?: string;
  /** Заголовок (уже переведён). */
  title: string;
  /** Описание (уже переведено). */
  text: string;
  /** Подпись основной кнопки (уже переведена). */
  primaryLabel: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

/**
 * Второй вид CTA: контекстный баннер в середине страницы. Split-раскладка —
 * текст слева, кнопки справа, левый accent-бортик. В отличие от CtaBlock
 * (центрированная accent-карточка с одной кнопкой в конце страницы).
 */
export function CtaBanner({
  alt,
  eyebrow,
  title,
  text,
  primaryLabel,
  primaryTo = "/contacts",
  secondaryLabel,
  secondaryTo,
}: CtaBannerProps) {
  return (
    <Section alt={alt}>
      <Container maxWidth="lg">
        <Box
          sx={(theme) => ({
            borderLeft: `${theme.spacing(0.5)} solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.action.hover,
            borderRadius: theme.border.radius,
            p: { xs: 3, md: 5 },
          })}
        >
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              {eyebrow ? (
                <Typography
                  variant="overline"
                  color="primary.main"
                  sx={{ fontWeight: 700, letterSpacing: 1, display: "block", mb: 1 }}
                >
                  {eyebrow}
                </Typography>
              ) : null}
              <Typography variant="h3" component="h2" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {text}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexWrap: "wrap",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <Button variant="contained" size="large" component={RouterLink} to={primaryTo}>
                  {primaryLabel}
                </Button>
                {secondaryLabel && secondaryTo ? (
                  <Button variant="soft" size="large" component={RouterLink} to={secondaryTo}>
                    {secondaryLabel}
                  </Button>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Section>
  );
}
