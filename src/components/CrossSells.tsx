import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { getCrossSells } from "../data/crossSells";
import { getSolution } from "../data/solutions";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

/**
 * Блок кроссейлов «Как мы можем вам помочь»: релевантные решения для
 * текущей страницы. Данные хранятся централизованно в src/data/crossSells.ts
 * (хранилище), чтобы одни и те же наборы переиспользовались на разных
 * страницах. Если для slug кроссейлов нет — блок не рендерится.
 */
export function CrossSells({ slug }: { slug: string | undefined }) {
  const { t } = useTranslation();
  const group = getCrossSells(slug);

  if (!group) {
    return null;
  }

  return (
    <Section>
      <Container maxWidth="lg">
        <SectionHeader eyebrow={t("solutionPage.portfolioEyebrow")} title={t(group.titleKey)} />
        <Grid container spacing={3}>
          {group.items.map((item) => {
            const titleKey = getSolution(item.slug)?.navTitle;
            if (!titleKey) return null;
            return (
              <Grid key={item.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  component={RouterLink}
                  to={`/solutions/${item.slug}`}
                  elevation={1}
                  sx={{
                    height: "100%",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="h6" component="h3">
                      {t(titleKey)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(item.noteKey)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
