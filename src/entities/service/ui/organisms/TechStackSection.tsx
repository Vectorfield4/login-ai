import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Alert } from "@/shared/ui/atoms/Alert";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import type { TechGroup } from "../../model/services";
import { TechStackBlock } from "./TechStackBlock";

const styles = stylex.create({
  note: { marginTop: tokens.layoutCard },
});

/** Service stack section: header, groups, and the contact note. */
export function TechStackSection({
  alt,
  groups,
  t,
}: {
  alt?: boolean;
  groups: TechGroup[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={t("servicePage.techStackTitle")}
      eyebrow={t("servicePage.techStackEyebrow")}
      subtitle={t("servicePage.techStackSubtitle")}
    >
      <TechStackBlock groups={groups} t={t} />
      <Alert severity="info" style={styles.note}>
        {t("servicePage.alertInterest")}
      </Alert>
    </BlockSection>
  );
}
