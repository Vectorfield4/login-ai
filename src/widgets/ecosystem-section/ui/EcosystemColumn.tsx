import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Typography } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import type { ColumnConfig, ResolvedItem } from "../model/ecosystem.types";
import { CaseCardEco } from "./CaseCardEco";
import { ServiceCardEco } from "./ServiceCardEco";
import { SolutionCardEco } from "./SolutionCardEco";

const styles = stylex.create({
  column: { display: "flex", flexDirection: "column", height: "100%" },
  headerWrapper: { marginBottom: tokens.spacing3 },
  cardsStack: { display: "flex", flexDirection: "column", gap: tokens.spacing3, flexGrow: 1 },
  compactList: { display: "flex", flexDirection: "column", gap: tokens.spacing15, flexGrow: 1 },
  compactItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing2,
    padding: `${tokens.spacing1} ${tokens.spacing15}`,
    borderRadius: tokens.radiusShape,
    backgroundColor: tokens.colorPrimarySoft,
    textDecoration: "none",
    color: tokens.colorText,
    transition: `background-color ${tokens.durationShortest} ${tokens.easingInOut}`,
    ":hover": { backgroundColor: tokens.colorPrimarySoftHover },
  },
});

type CardRenderer = (item: ResolvedItem, t: TFunc, lang: "ru" | "en") => React.ReactElement;

const CARD_RENDERERS: Record<"service" | "solution" | "case", CardRenderer> = {
  service: (item, t, lang) => <ServiceCardEco item={item} t={t} lang={lang} />,
  solution: (item, t, lang) => <SolutionCardEco item={item} t={t} lang={lang} />,
  case: (item, t, lang) => <CaseCardEco item={item} t={t} lang={lang} />,
};

interface EcosystemColumnProps {
  config: ColumnConfig;
  items: ResolvedItem[];
  t: TFunc;
  lang: "ru" | "en";
}

export function EcosystemColumn({ config, items, t, lang }: EcosystemColumnProps) {
  const { titleKey, maxCards, forceCompact, showMetric: _showMetric } = config;
  const displayItems = items.slice(0, maxCards);
  const isCompact = forceCompact || items.length > maxCards;
  const renderCard = CARD_RENDERERS[config.targetType as "service" | "solution" | "case"];

  if (!displayItems.length) return null;

  return (
    <div {...stylex.props(styles.column)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <SectionHeader title={t(titleKey)} />
      </div>
      {isCompact && config.targetType === "solution" ? (
        <div {...stylex.props(styles.compactList)}>
          {displayItems.map((item) => (
            <a
              key={`${item.type}:${item.slug}`}
              href={routeUrl(item.href, lang)}
              {...stylex.props(styles.compactItem)}
            >
              <Typography variant="body2" component="span">
                {t(item.titleKey)}
              </Typography>
            </a>
          ))}
        </div>
      ) : (
        <div {...stylex.props(styles.cardsStack)}>
          {displayItems.map((item) => (
            <div key={`${item.type}:${item.slug}`}>{renderCard(item, t, lang)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
