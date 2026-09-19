import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";

const styles = stylex.create({
  root: {
    display: "block",
    flexShrink: 0,
    marginBlockStart: "6px",
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: tokens.colorPrimary,
  },
});

/** Round list marker: an 8px colored dot in the brand color. */
export function Dot() {
  return <span {...stylex.props(styles.root)} />;
}
