import { type AppLang, useT } from "@/shared/hooks/useT";
import type { ScopeItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { ScopeBlock } from "@/shared/ui/organisms/ScopeBlock";

export function ScopeSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: ScopeItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ScopeBlock lang={lang} items={items} />
    </BlockSection>
  );
}

export default ScopeSection;
