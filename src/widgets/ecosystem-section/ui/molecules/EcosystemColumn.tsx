import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Typography } from "@/shared/ui/atoms";
import {
  ALL_LINKS,
  type ColumnConfig,
  columnLimit,
  isCompactColumn,
  type ResolvedItem,
} from "../../model/ecosystem.types";
import { CaseCardEco } from "../atoms/CaseCardEco";
import { CompactRowEco } from "../atoms/CompactRowEco";
import { ServiceCardEco } from "../atoms/ServiceCardEco";
import { SolutionCardEco } from "../atoms/SolutionCardEco";

const styles = stylex.create({
  column: { display: "flex", flexDirection: "column", gap: tokens.spacing15, minWidth: 0 },
  // Заголовок колонки: одна строка, ширина колонки. Заголовки трёх колонок
  // стоят параллельно, потому что колонки — соседи одной grid-строки.
  title: { minWidth: 0 },
  // Акцентная панель колонки кейсов: метрика-результат + карточки кейсов.
  accent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing15,
    padding: tokens.spacing2,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorPrimarySoft,
  },
  metric: { display: "flex", flexDirection: "column", gap: tokens.spacing05, minWidth: 0 },
  metricValue: {
    fontSize: tokens.sizeH4,
    fontWeight: tokens.weightH4,
    lineHeight: tokens.lineH4,
    color: tokens.colorPrimary,
  },
  metricLabel: {
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
    minWidth: 0,
  },
  // gridAutoRows: 1fr выравнивает карточки по высоте внутри колонки, но не
  // растягивает саму колонку под самую длинную (это делает внешняя сетка).
  cards: { display: "grid", gap: tokens.spacing15, gridAutoRows: "1fr" },
  compactList: {
    display: "grid",
    backgroundColor: tokens.colorSurface,
    border: `1px solid ${tokens.colorDivider}`,
    borderRadius: tokens.radiusBorder,
    overflow: "hidden",
  },
  compactRow: {
    borderBlockStart: `1px solid ${tokens.colorDivider}`,
    ":first-child": { borderBlockStart: "none" },
  },
  allLink: {
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: tokens.spacing05,
    minHeight: 32,
    fontSize: tokens.sizeBody2,
    fontWeight: tokens.weightButton,
    color: tokens.colorPrimary,
    textDecoration: "none",
    ":hover": { textDecoration: "underline" },
  },
});

type CardRenderer = (item: ResolvedItem, t: TFunc, lang: "ru" | "en") => React.ReactElement;

const CARD_RENDERERS: Record<"service" | "solution" | "case", CardRenderer> = {
  service: (item, t, lang) => <ServiceCardEco item={item} t={t} lang={lang} />,
  solution: (item, t, lang) => <SolutionCardEco item={item} t={t} lang={lang} />,
  case: (item, t, lang) => <CaseCardEco item={item} t={t} lang={lang} />,
};

/** Метрика считается результатом только если в значении есть число: иначе в
 *  словарь просочился ключ, и показывать его читателю нельзя. */
function pickLeadMetric(items: ResolvedItem[], t: TFunc) {
  for (const item of items) {
    const metric = item.primaryMetric;
    if (metric && /[\d%]/.test(t(metric.valueKey))) {
      return metric;
    }
  }
  return undefined;
}

interface EcosystemColumnProps {
  config: ColumnConfig;
  items: ResolvedItem[];
  t: TFunc;
  lang: "ru" | "en";
}

/**
 * Одна колонка экосистемы: заголовок + плотное содержимое. Плотность
 * (`compact` строки против карточек) и акцент (метрика кейса в шапке) задаёт
 * `ColumnConfig`, данные приходят из фикстур через `resolveItemsByType`.
 */
export function EcosystemColumn({ config, items, t, lang }: EcosystemColumnProps) {
  const { titleKey, showMetric } = config;
  const isCompact = isCompactColumn(config, items.length);
  const displayItems = items.slice(0, columnLimit(config, items.length));
  const renderCard = CARD_RENDERERS[config.targetType as "service" | "solution" | "case"];

  if (!displayItems.length) return null;

  const allLink = ALL_LINKS[config.targetType];
  const hasMore = items.length > displayItems.length;
  const leadMetric = showMetric ? pickLeadMetric(displayItems, t) : undefined;

  const body = isCompact ? (
    <div {...stylex.props(styles.compactList)}>
      {displayItems.map((item) => (
        <div key={`${item.type}:${item.slug}`} {...stylex.props(styles.compactRow)}>
          <CompactRowEco item={item} t={t} lang={lang} />
        </div>
      ))}
    </div>
  ) : (
    <div {...stylex.props(styles.cards)}>
      {displayItems.map((item) => (
        <div key={`${item.type}:${item.slug}`}>{renderCard(item, t, lang)}</div>
      ))}
    </div>
  );

  return (
    <div {...stylex.props(styles.column)}>
      <Typography variant="h5" component="h2" style={styles.title}>
        {t(titleKey)}
      </Typography>
      {leadMetric ? (
        <div {...stylex.props(styles.accent)}>
          <div {...stylex.props(styles.metric)}>
            <Typography variant="h4" component="p" style={styles.metricValue}>
              {t(leadMetric.valueKey)}
            </Typography>
            <Typography variant="body2" style={styles.metricLabel}>
              {t(leadMetric.labelKey)}
            </Typography>
          </div>
          {body}
        </div>
      ) : (
        body
      )}
      {hasMore ? (
        <a href={routeUrl(allLink.href, lang)} {...stylex.props(styles.allLink)}>
          {t(allLink.labelKey)}
          <ChevronRight size={16} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
