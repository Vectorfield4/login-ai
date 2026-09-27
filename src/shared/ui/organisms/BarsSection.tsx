import { type AppLang, useT } from "@/shared/hooks/useT";
import { BarsBlock } from "@/shared/ui/organisms/BarsBlock";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";

export function BarsSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: { label: string; value: number }[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <BarsBlock lang={lang} items={items} />
    </BlockSection>
  );
}
