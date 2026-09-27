import { type AppLang, useT } from "@/shared/hooks/useT";
import type { FaqItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { FaqBlock } from "@/shared/ui/organisms/FaqBlock";

export function FaqSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: FaqItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <FaqBlock lang={lang} items={items} />
    </BlockSection>
  );
}
