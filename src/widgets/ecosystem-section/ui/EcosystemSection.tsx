import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Container, Grid, Section } from "@/shared/ui/atoms";
import {
  COLUMN_MATRIX,
  type EcosystemSectionInput,
  resolveItemsByType,
} from "../model/ecosystem.types";
import { EcosystemColumn } from "./EcosystemColumn";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: tokens.spacing4,
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    alignItems: "stretch",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: tokens.spacing3,
  },
});

interface EcosystemSectionProps extends EcosystemSectionInput {
  t: TFunc;
  lang: "ru" | "en";
}

export function EcosystemSection({ pageType, grouped, t, lang }: EcosystemSectionProps) {
  const matrix = COLUMN_MATRIX[pageType];

  return (
    <Section>
      <Container>
        <Grid container spacing={0} style={styles.grid}>
          {matrix.map((colConfig: (typeof matrix)[number]) => {
            const items = resolveItemsByType(
              grouped[colConfig.targetType] ?? [],
              colConfig.targetType,
            );
            return (
              <Grid key={colConfig.targetType} item style={styles.column}>
                <EcosystemColumn config={colConfig} items={items} t={t} lang={lang} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
