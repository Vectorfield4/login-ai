import { type AppLang, useT } from "@/shared/hooks/useT";
import type { OutcomeItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { OutcomesBlock } from "@/shared/ui/organisms/OutcomesBlock";

export function OutcomesSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: OutcomeItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <OutcomesBlock lang={lang} items={items} />
    </BlockSection>
  );
}

export default OutcomesSection;
