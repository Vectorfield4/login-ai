import type { TFunc } from "../../i18n/t";
import { BlockQuote } from "../atoms/BlockQuote";
import { BlockSection } from "./BlockSection";

type QuoteSectionProps = {
  alt?: boolean;
  /** i18n key of the section title (optional). */
  title?: string;
  /** i18n key of the quote text. */
  text: string;
  t: TFunc;
};

/**
 * Quote section: an accent quote in the page content.
 */
export function QuoteSection({ alt, title, text, t }: QuoteSectionProps) {
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <BlockQuote text={text} t={t} />
    </BlockSection>
  );
}
