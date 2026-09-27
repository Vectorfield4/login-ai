import { getServiceBySlug } from "@/entities/service";
import { ALL_LINKS, columnLimit } from "@/features/relevant-items/model/column";
import { ColumnFrame } from "@/features/relevant-items/ui/molecules/ColumnFrame";
import type { AppLang } from "@/shared/hooks/useT";
import type { StepListItem } from "@/shared/types/content";
import type { RefOf } from "@/shared/types/relevants";
import { StepList } from "@/shared/ui/molecules";

interface ServiceColumnProps {
  titleKey: string;
  refs: RefOf<"service">[];
  /** Сколько услуг показываем, пока их не больше двух. */
  limit: number;
  lang: AppLang;
}

/**
 * Колонка «входящих услуг»: нумерованный шаг-лист вместо карточек — состав
 * работ читается как последовательность, а не как витрина.
 *
 * Услуги резолвятся по фикстурам здесь же: колонка отвечает и за список, и за
 * то, что несуществующие ссылки в неё не попадают.
 */
export function ServiceColumn({ titleKey, refs, limit, lang }: ServiceColumnProps) {
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
      lang={lang}
    >
      <StepList items={visible} lang={lang} />
    </ColumnFrame>
  );
}
