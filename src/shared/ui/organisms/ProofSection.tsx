import type { TFunc } from "@/shared/i18n/t";
import type { ProofItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { ProofBlock } from "@/shared/ui/organisms/ProofBlock";

export function ProofSection({
  alt,
  title,
  eyebrow,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: ProofItem[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ProofBlock items={items} t={t} />
    </BlockSection>
  );
}
