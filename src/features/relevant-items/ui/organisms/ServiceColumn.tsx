import { ALL_LINKS, columnLimit } from "@/features/relevant-items/model/column";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { ColumnFrame } from "@/features/relevant-items/ui/molecules/ColumnFrame";
import { getServiceBySlug } from "@/shared/data/entities";
import type { TFunc } from "@/shared/i18n/t";
import type { StepListItem } from "@/shared/types/content";
import { StepList } from "@/shared/ui/molecules";

interface ServiceColumnProps {
  titleKey: string;
  refs: RefOf<"service">[];
  /** Сколько услуг показываем, пока их не больше двух. */
  limit: number;
  t: TFunc;
  lang: "ru" | "en";
}

/**
 * Колонка «входящих услуг»: нумерованный шаг-лист вместо карточек — состав
 * работ читается как последовательность, а не как витрина.
 *
 * Услуги резолвятся по фикстурам здесь же: колонка отвечает и за список, и за
 * то, что несуществующие ссылки в неё не попадают.
 */
export function ServiceColumn({ titleKey, refs, limit, t, lang }: ServiceColumnProps) {
  const services = refs.flatMap((ref) => {
    const service = getServiceBySlug(ref.slug);
    return service
      ? [
          {
            title: service.navTitle,
            text: service.tagline,
            href: `/services/${ref.slug}`,
            icon: service.icon,
          } satisfies StepListItem,
        ]
      : [];
  });

  if (!services.length) return null;

  const visible = services.slice(0, columnLimit(limit, services.length));
  const all = ALL_LINKS.service;

  return (
    <ColumnFrame
      titleKey={titleKey}
      allHref={services.length > visible.length ? all.href : undefined}
      allLabelKey={services.length > visible.length ? all.labelKey : undefined}
      t={t}
      lang={lang}
    >
      <StepList items={visible} t={t} lang={lang} />
    </ColumnFrame>
  );
}
