import { type AppLang, useT } from "@/shared/hooks/useT";
import type { FitItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { FitBlock } from "@/shared/ui/organisms/FitBlock";

export function FitSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: FitItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <FitBlock lang={lang} items={items} />
    </BlockSection>
  );
}
