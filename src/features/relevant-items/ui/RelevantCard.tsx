import * as stylex from "@stylexjs/stylex";
import type { EntityRef, EntityRefType } from "@/features/relevant-items/model/entityRef";
import { getCaseBySlug, getServiceBySlug, getSolutionBySlug } from "@/shared/data/entities";
import { routeUrl } from "@/shared/data/routes";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent, Typography } from "@/shared/ui/atoms";
import { tokens } from "../../../shared/design/tokens.stylex.ts";

/**
 * Резолвнутая релевантная ссылка: i18n-заголовок цели, чистый путь и опция
 * примечания («чем поможет»). Аналог `ResolvedRelevant` из src, но читает
 * фикстуры напрямую (astro/shared/data/entities — build-time, без стор солов).
 */
export interface ResolvedRelevant {
  titleKey: string;
  href: string;
  noteKey?: string;
}

const titleKeys: Record<EntityRefType, (slug: string) => string | undefined> = {
  solution: (slug) => getSolutionBySlug(slug)?.navTitle,
  case: (slug) => getCaseBySlug(slug)?.title,
  service: (slug) => getServiceBySlug(slug)?.navTitle,
};

const hrefs: Record<EntityRefType, (slug: string) => string> = {
  solution: (slug) => `/solutions/${slug}`,
  case: (slug) => `/cases/${slug}`,
  service: (slug) => `/services/${slug}`,
};

/** Резолвит одну ссылку в карточку; неизвестная цель отбрасывается. */
export function resolveRelevantRef(ref: EntityRef): ResolvedRelevant | undefined {
  const titleKey = titleKeys[ref.type]?.(ref.slug);
  if (!titleKey) {
    return undefined;
  }
  return { titleKey, href: hrefs[ref.type](ref.slug), noteKey: ref.noteKey };
}

interface RelevantCardProps {
  t: TFunc;
  lang: "ru" | "en";
  item: EntityRef;
}

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
  },
});

/**
 * Карточка релевантной страницы: ссылка на решение, кейс или услугу.
 * Примечание («чем поможет») рендерится только при наличии.
 */
export function RelevantCard({ t, lang, item }: RelevantCardProps) {
  const ref = resolveRelevantRef(item);
  if (!ref) {
    return null;
  }
  return (
    <a href={routeUrl(ref.href, lang)} {...stylex.props(styles.link)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <Typography variant="h6" component="h3">
            {t(ref.titleKey)}
          </Typography>
          {ref.noteKey ? (
            <Typography variant="body2" color="textSecondary">
              {t(ref.noteKey)}
            </Typography>
          ) : null}
        </CardContent>
      </Card>
    </a>
  );
}
