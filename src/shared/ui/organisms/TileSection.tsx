import { type AppLang, useT } from "@/shared/hooks/useT";
import type { TextItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { TileGrid } from "@/shared/ui/organisms/TileGrid";

export function TileSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: TextItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <TileGrid lang={lang} items={items} />
    </BlockSection>
  );
}
