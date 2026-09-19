import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { Case } from "@/entities/case/model/cases";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { BackLink } from "@/shared/ui/atoms/BackLink";
import { Container } from "@/shared/ui/atoms/Container";
import { Typography } from "@/shared/ui/atoms/Typography";

interface CaseHeroProps {
  case: Case;
  t: TFunc;
  lang: "ru" | "en";
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

export function CaseHero({ case: caseData, t, lang, style }: CaseHeroProps) {
  const backLabel = lang === "ru" ? "← К списку кейсов" : "← Back to cases";
  return (
    <div {...stylex.props(styles.hero, style)}>
      <Container>
        <div {...stylex.props(styles.content)}>
          <BackLink to="/cases" label={backLabel} lang={lang} />
          <Typography variant="h1">{t(caseData.title)}</Typography>
          <Typography variant="body1" color="textSecondary">
            {t(caseData.description)}
          </Typography>
        </div>
      </Container>
    </div>
  );
}
