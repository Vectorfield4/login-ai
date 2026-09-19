import type { ReactNode } from "react";
import { Container } from "../atoms/Container";
import { Section } from "../atoms/Section";
import { SectionHeader } from "../molecules/SectionHeader";

type BlockSectionProps = {
  alt?: boolean;
  /** Rendered section title (already translated). */
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  children: ReactNode;
};

/**
 * Content section shell: Section (alternating background) + Container +
 * an optional header + the block body. Page sections (cases, investors) use
 * it as a common frame.
 */
export function BlockSection({ alt, title, eyebrow, subtitle, children }: BlockSectionProps) {
  return (
    <Section alt={alt}>
      <Container>
        {title ? <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} /> : null}
        {children}
      </Container>
    </Section>
  );
}
