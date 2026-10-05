import * as stylex from "@stylexjs/stylex";
import { getCaseBySlug } from "@/entities/case";
import { ALL_LINKS, columnLimit, isRowsLayout } from "@/features/relevant-items/model/column";
import { CaseRelationCard } from "@/features/relevant-items/ui/molecules/CaseRelationCard";
import { ColumnFrame } from "@/features/relevant-items/ui/molecules/ColumnFrame";
import { RelationRows } from "@/features/relevant-items/ui/molecules/RelationRows";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { RefOf } from "@/shared/types/relevants";
import { Typography } from "@/shared/ui/atoms";

const styles = stylex.create({
  // Акцентная панель колонки кейсов: метрика-результат + карточки кейсов.
  // Подложка и цифра — success, а не brand primary: здесь показывают исход
  // внедрения, и красный читался бы как ошибка.
  accent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing15,
    padding: tokens.spacing2,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSuccessSoft,
  },
  metric: { display: "flex", flexDirection: "column", gap: tokens.spacing05, minWidth: 0 },
  metricValue: {
    fontSize: tokens.sizeH4,
    fontWeight: tokens.weightH4,
    lineHeight: tokens.lineH4,
    color: tokens.colorSuccess,
  },
  metricLabel: {
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
    minWidth: 0,
  },
  // gridAutoRows: 1fr — карточки в одной колонке делят высоту, иначе соседние
  // секции рвутся по краю блока.
  cards: { display: "grid", gap: tokens.spacing15, gridAutoRows: "1fr" },
});

interface CaseColumnProps {
  titleKey: string;
  refs: RefOf<"case">[];
  /** Сколько кейсов показываем карточками, пока их не больше двух. */
  limit: number;
  forceRows?: boolean;
  /** Метрика-результат в шапке колонки вместо карточек. */
  showMetric?: boolean;
  lang: AppLang;
}

/** Колонка кейсов: карточки с акцентной метрикой в шапке или плотные строки. */
export function CaseColumn({
  titleKey,
  refs,
  limit,
  forceRows,
  showMetric,
  lang,
}: CaseColumnProps) {
  const t = useT(lang);
  const cases = refs.flatMap((ref) => {
    const caseItem = getCaseBySlug(ref.slug);
    if (!caseItem) return [];
    const metric = caseItem.metrics[0];
    return [
      {
        titleKey: caseItem.title,
        noteKey: ref.noteKey,
        href: `/cases/${ref.slug}`,
        metric: metric ? { valueKey: metric.value, labelKey: metric.label } : undefined,
      },
    ];
  });

  if (!cases.length) return null;

  const rows = isRowsLayout(cases.length, forceRows);
  const visible = cases.slice(0, columnLimit(limit, cases.length, forceRows));
  // Метрика — результат только если в значении есть число: иначе в словарь
  // просочился ключ, и показывать его читателю нельзя.
  const leadMetric = showMetric
    ? visible.find((item) => item.metric && /[\d%]/.test(t(item.metric.valueKey)))?.metric
    : undefined;
  const all = ALL_LINKS.case;

  const body = rows ? (
    <RelationRows items={visible} lang={lang} />
  ) : (
    <div itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)} {...stylex.props(styles.cards)}>
      {visible.map((caseItem) => (
        <CaseRelationCard
          key={caseItem.href}
          titleKey={caseItem.titleKey}
          noteKey={caseItem.noteKey}
          href={caseItem.href}
          lang={lang}
        />
      ))}
    </div>
  );

  return (
    <ColumnFrame
      titleKey={titleKey}
      allHref={cases.length > visible.length ? all.href : undefined}
      allLabelKey={cases.length > visible.length ? all.labelKey : undefined}
      lang={lang}
    >
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
    </ColumnFrame>
  );
}
