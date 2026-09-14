import { useTranslation } from "react-i18next";
import { BlockQuote } from "@/shared/ui/atoms/BlockQuote";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";

/**
 * Quote section: an accent quote in the page content.
 */
export function QuoteSection({
  alt,
  title,
  text,
}: {
  alt?: boolean;
  /** i18n key of the section title (optional). */
  title?: string;
  /** i18n key of the quote text. */
  text: string;
}) {
  const { t } = useTranslation();
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <BlockQuote text={text} />
    </BlockSection>
  );
}
