import { type AppLang, useT } from "@/shared/hooks/useT";
import type { ProofItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { ProofBlock } from "@/shared/ui/organisms/ProofBlock";

export function ProofSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: ProofItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ProofBlock lang={lang} items={items} />
    </BlockSection>
  );
}
