import type { TFunc } from "@/shared/i18n/t";
import type { ProcessItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { ProcessBlock } from "@/shared/ui/organisms/ProcessBlock";

export function ProcessSection({
  alt,
  title,
  eyebrow,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: ProcessItem[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ProcessBlock items={items} t={t} />
    </BlockSection>
  );
}
