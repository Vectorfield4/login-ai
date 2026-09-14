import { Container } from "@mui/material";
import type { ReactNode } from "react";
import { Section } from "@/shared/ui/atoms/Section";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";

interface BlockSectionProps {
  alt?: boolean;
  /** Rendered section title (already translated). */
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Content section shell: Section (alternating background) + Container +
 * an optional header + the block body. Page sections (cases, investors) use
 * it as a common frame.
 */
export function BlockSection({ alt, title, eyebrow, subtitle, children }: BlockSectionProps) {
  return (
    <Section alt={alt}>
      <Container maxWidth="lg">
        {title ? <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} /> : null}
        {children}
      </Container>
    </Section>
  );
}
