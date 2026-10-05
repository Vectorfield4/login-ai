import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Container } from "@/shared/ui/atoms/Container";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { Case } from "../../model/cases";

interface CaseHeroProps {
  case: Case;
  lang: AppLang;
  style?: StyleXStyles;
}

const styles = stylex.create({
  hero: {
    paddingBlock: tokens.spacing4,
    backgroundColor: tokens.colorSurface,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
  },
});

export function CaseHero({ case: caseData, lang, style }: CaseHeroProps) {
  const t = useT(lang);
  return (
    <div
      itemScope
      itemProp="mainEntity"
      itemType={schemaIri(SCHEMA_TYPE.creativeWork)}
      {...stylex.props(styles.hero, style)}
    >
      <Container>
        <div {...stylex.props(styles.content)}>
          <Typography variant="h1" itemProp="name">
            {t(caseData.title)}
          </Typography>
          <Typography variant="body1" color="textSecondary" itemProp="description">
            {t(caseData.description)}
          </Typography>
        </div>
      </Container>
    </div>
  );
}
