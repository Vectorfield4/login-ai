import * as stylex from "@stylexjs/stylex";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { tokens } from "../../design/tokens.stylex.ts";
import Typography from "./Typography";

type BlockQuoteProps = {
  lang: AppLang;
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
export function BlockQuote({ lang, text }: BlockQuoteProps) {
  const t = useT(lang);
  return (
    <div {...stylex.props(styles.root)}>
      <Typography variant="body1" component="blockquote" style={styles.quote}>
        «{t(text)}»
      </Typography>
    </div>
  );
}
