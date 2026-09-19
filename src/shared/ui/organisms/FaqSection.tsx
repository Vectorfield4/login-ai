import type { FaqItem } from "@/shared/types/content";
import type { TFunc } from "@/shared/i18n/t";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { FaqBlock } from "@/shared/ui/organisms/FaqBlock";

export function FaqSection({
  alt,
  title,
  eyebrow,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: FaqItem[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <FaqBlock items={items} t={t} />
    </BlockSection>
  );
}
