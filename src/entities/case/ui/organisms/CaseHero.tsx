import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { Case } from "@/entities/case/model/cases";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Container } from "@/shared/ui/atoms/Container";
import { Typography } from "@/shared/ui/atoms/Typography";

interface CaseHeroProps {
  case: Case;
  t: TFunc;
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

export function CaseHero({ case: caseData, t, style }: CaseHeroProps) {
  return (
    <div {...stylex.props(styles.hero, style)}>
      <Container>
        <div {...stylex.props(styles.content)}>
          <Typography variant="h1">{t(caseData.title)}</Typography>
          <Typography variant="body1" color="textSecondary">
            {t(caseData.description)}
          </Typography>
        </div>
      </Container>
    </div>
  );
}
