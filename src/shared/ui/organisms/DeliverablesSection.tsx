import { type AppLang, useT } from "@/shared/hooks/useT";
import type { DeliverableItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { DeliverablesBlock } from "@/shared/ui/organisms/DeliverablesBlock";

export function DeliverablesSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: DeliverableItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <DeliverablesBlock lang={lang} items={items} />
    </BlockSection>
  );
}

export default DeliverablesSection;
