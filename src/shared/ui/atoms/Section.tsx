import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type SectionProps = {
  /** Alternate background (`--colorBg`) to alternate between page sections. */
  alt?: boolean;
  id?: string;
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

export function Section({ alt = false, id, style, children }: SectionProps) {
  return (
    <section {...stylex.props(styles.root, alt && styles.alt, style)} id={id}>
      {children}
    </section>
  );
}
