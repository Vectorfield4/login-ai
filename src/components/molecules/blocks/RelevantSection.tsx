import { Container, Grid } from "@mui/material";
import type { ResolvedRelevant } from "../../../lib/relevants";
import { Section } from "../../atoms/Section";
import { RelevantCard } from "../RelevantCard";
import { SectionHeader } from "../SectionHeader";

interface RelevantSectionProps {
  /** i18n section title (passed by the concrete block). */
  title: string;
  items: ResolvedRelevant[];
}

/**
 * Section shell for a relevant-links block: title + a grid of target cards.
 * An empty list renders nothing. All nine relevant-links blocks use it
 * (see src/components/organisms/blocks/).
 */
export function RelevantSection({ title, items }: RelevantSectionProps) {
  if (!items.length) {
    return null;
  }
  return (
    <Section>
      <Container maxWidth="lg">
        <SectionHeader title={title} />
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid key={item.href} size={{ xs: 12, sm: 6, md: 4 }}>
              <RelevantCard titleKey={item.titleKey} noteKey={item.noteKey} to={item.href} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
