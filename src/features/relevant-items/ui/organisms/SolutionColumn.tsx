import * as stylex from "@stylexjs/stylex";
import { getSolutionBySlug } from "@/entities/solution";
import { ALL_LINKS, columnLimit, isRowsLayout } from "@/features/relevant-items/model/column";
import { ColumnFrame } from "@/features/relevant-items/ui/molecules/ColumnFrame";
import { RelationRows } from "@/features/relevant-items/ui/molecules/RelationRows";
import { SolutionRelationCard } from "@/features/relevant-items/ui/molecules/SolutionRelationCard";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { AppLang } from "@/shared/hooks/useT";
import type { RefOf } from "@/shared/types/relevants";

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
  lang: AppLang;
}

/** Колонка «похожих решений»: карточки до двух пунктов, дальше плотные строки. */
export function SolutionColumn({ titleKey, refs, limit, forceRows, lang }: SolutionColumnProps) {
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
      lang={lang}
    >
      {rows ? (
        <RelationRows items={visible} lang={lang} />
      ) : (
        <div itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)} {...stylex.props(styles.cards)}>
          {visible.map((solution, index) => (
            <SolutionRelationCard
              key={solution.href}
              titleKey={solution.titleKey}
              textKey={solution.textKey}
              href={solution.href}
              lang={lang}
              position={index + 1}
            />
          ))}
        </div>
      )}
    </ColumnFrame>
  );
}
