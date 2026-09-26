import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Typography } from "@/shared/ui/atoms";
import type { ResolvedItem } from "../../model/ecosystem.types";

const styles = stylex.create({
  link: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
    minHeight: 44,
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    textDecoration: "none",
    color: tokens.colorText,
    transition: `background-color ${tokens.durationShortest} ${tokens.easingInOut}`,
    ":hover": { backgroundColor: tokens.colorActionHover },
    ":focus-visible": { backgroundColor: tokens.colorPrimarySoft },
  },
  label: { flexGrow: 1, minWidth: 0 },
  chevron: { flexShrink: 0, color: tokens.colorPrimary },
});

/**
 * Строка плотной колонки: иконка-шеврон, одна строка заголовка, ничего лишнего.
 * Заменяет громоздкую карточку, когда пунктов в колонке больше двух.
 */
export function CompactRowEco({
  item,
  t,
  lang,
}: {
  item: ResolvedItem;
  t: TFunc;
  lang: "ru" | "en";
}) {
  return (
    <a href={routeUrl(item.href, lang)} {...stylex.props(styles.link)}>
      <Typography variant="body2" component="span" style={styles.label}>
        {t(item.titleKey)}
      </Typography>
      <ChevronRight size={16} aria-hidden="true" {...stylex.props(styles.chevron)} />
    </a>
  );
}
