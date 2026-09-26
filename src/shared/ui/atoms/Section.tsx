import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type SectionProps = {
  /** Alternate background (`--colorBg`) to alternate between page sections. */
  alt?: boolean;
  id?: string;
  /** Accessible name of the region landmark (announced by screen readers). */
  label?: string;
  style?: StyleXStyles;
  children?: ReactNode;
};

const styles = stylex.create({
  root: {
    paddingBlock: tokens.layoutSection,
    backgroundColor: "transparent",
  },
  alt: { backgroundColor: tokens.colorBg },
});

export function Section({ alt = false, id, label, style, children }: SectionProps) {
  return (
    <section {...stylex.props(styles.root, alt && styles.alt, style)} id={id} aria-label={label}>
      {children}
    </section>
  );
}
