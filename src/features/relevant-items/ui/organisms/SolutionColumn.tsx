import * as stylex from "@stylexjs/stylex";
import { ALL_LINKS, columnLimit, isRowsLayout } from "@/features/relevant-items/model/column";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { ColumnFrame } from "@/features/relevant-items/ui/molecules/ColumnFrame";
import { RelationRows } from "@/features/relevant-items/ui/molecules/RelationRows";
import { SolutionRelationCard } from "@/features/relevant-items/ui/molecules/SolutionRelationCard";
import { getSolutionBySlug } from "@/shared/data/entities";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";

const styles = stylex.create({
  // gridAutoRows: 1fr — карточки в одной колонке делят высоту, иначе соседние
  // секции рвутся по краю блока.
  cards: { display: "grid", gap: tokens.spacing15, gridAutoRows: "1fr" },
});

interface SolutionColumnProps {
  titleKey: string;
  refs: RefOf<"solution">[];
  /** Сколько решений показываем карточками, пока их не больше двух. */
  limit: number;
  /** Строки при любом числе пунктов: на странице услуги решений всегда много. */
  forceRows?: boolean;
  t: TFunc;
  lang: "ru" | "en";
}

/** Колонка «похожих решений»: карточки до двух пунктов, дальше плотные строки. */
export function SolutionColumn({ titleKey, refs, limit, forceRows, t, lang }: SolutionColumnProps) {
  const solutions = refs.flatMap((ref) => {
    const solution = getSolutionBySlug(ref.slug);
    return solution
      ? [
          {
            titleKey: solution.navTitle,
            textKey: solution.tagline,
            href: `/solutions/${ref.slug}`,
          },
        ]
      : [];
  });

  if (!solutions.length) return null;

  const rows = isRowsLayout(solutions.length, forceRows);
  const visible = solutions.slice(0, columnLimit(limit, solutions.length, forceRows));
  const all = ALL_LINKS.solution;

  return (
    <ColumnFrame
      titleKey={titleKey}
      allHref={solutions.length > visible.length ? all.href : undefined}
      allLabelKey={solutions.length > visible.length ? all.labelKey : undefined}
      t={t}
      lang={lang}
    >
      {rows ? (
        <RelationRows items={visible} t={t} lang={lang} />
      ) : (
        <div {...stylex.props(styles.cards)}>
          {visible.map((solution) => (
            <SolutionRelationCard
              key={solution.href}
              titleKey={solution.titleKey}
              textKey={solution.textKey}
              href={solution.href}
              t={t}
              lang={lang}
            />
          ))}
        </div>
      )}
    </ColumnFrame>
  );
}
