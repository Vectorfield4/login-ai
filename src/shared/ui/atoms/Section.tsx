import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import type { MicrodataAttributes } from "@/shared/data/schema";
import { tokens } from "../../design/tokens.stylex.ts";

type SectionProps = {
  /** Alternate background (`--colorBg`) to alternate between page sections. */
  alt?: boolean;
  id?: string;
  /** Accessible name of the region landmark (announced by screen readers). */
  label?: string;
  style?: StyleXStyles;
  children?: ReactNode;
} & MicrodataAttributes;

const styles = stylex.create({
  root: {
    paddingBlock: tokens.layoutSection,
    backgroundColor: "transparent",
  },
  alt: { backgroundColor: tokens.colorBg },
});

export function Section({ alt = false, id, label, style, children, ...microdata }: SectionProps) {
  return (
    <section
      {...stylex.props(styles.root, alt && styles.alt, style)}
      id={id}
      aria-label={label}
      {...microdata}
    >
      {children}
    </section>
  );
}
