import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Alert } from "@/shared/ui/atoms/Alert";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import type { TechGroup } from "../../model/services";
import { TechStackBlock } from "./TechStackBlock";

const styles = stylex.create({
  note: { marginTop: tokens.layoutCard },
});

/**
 * Service stack section: header, groups, and the contact note.
 *
 * Takes `lang`, not `t`: the page hydrates this block, and a function prop does
 * not survive island serialization (it arrives as `null` and the block dies on
 * hydration). `useT` is the same contract as in `AppBar` / `HomeSolutions`.
 */
export function TechStackSection({
  alt,
  groups,
  lang,
}: {
  alt?: boolean;
  groups: TechGroup[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection
      alt={alt}
      title={t("servicePage.techStackTitle")}
      eyebrow={t("servicePage.techStackEyebrow")}
      subtitle={t("servicePage.techStackSubtitle")}
    >
      <TechStackBlock lang={lang} groups={groups} />
      <Alert severity="info" style={styles.note}>
        {t("servicePage.alertInterest")}
      </Alert>
    </BlockSection>
  );
}
