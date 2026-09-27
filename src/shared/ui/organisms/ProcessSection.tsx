import { type AppLang, useT } from "@/shared/hooks/useT";
import type { ProcessItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { ProcessBlock } from "@/shared/ui/organisms/ProcessBlock";

export function ProcessSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: ProcessItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ProcessBlock lang={lang} items={items} />
    </BlockSection>
  );
}
