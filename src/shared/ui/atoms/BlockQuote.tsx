import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";
import type { TFunc } from "../../i18n/t";
import Typography from "./Typography";

type BlockQuoteProps = {
  t: TFunc;
  /** i18n key of the quote text. */
  text: string;
};

const styles = stylex.create({
  root: {
    borderLeft: `4px solid ${tokens.colorPrimary}`,
    paddingLeft: tokens.spacing2,
    paddingBlock: tokens.spacing05,
    maxWidth: 720,
  },
  quote: {
    fontStyle: "italic",
    color: tokens.colorText,
  },
});

/** Quote: an accent bar on the left + italic block text. */
export function BlockQuote({ t, text }: BlockQuoteProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <Typography variant="body1" component="blockquote" style={styles.quote}>
        «{t(text)}»
      </Typography>
    </div>
  );
}
