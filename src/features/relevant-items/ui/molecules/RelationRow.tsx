import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Typography } from "@/shared/ui/atoms";

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

interface RelationRowProps {
  titleKey: string;
  /** Путь от корня сайта, `routeUrl` добавит префикс языка. */
  href: string;
  t: TFunc;
  lang: "ru" | "en";
}

/**
 * Плотная строка-ссылка внутри колонки «связанного»: заголовок и шеврон.
 * Нужен там, где пунктов больше двух, — карточки на такой высоте тянут
 * секцию на весь экран, а колонка из строк читается списком.
 */
export function RelationRow({ titleKey, href, t, lang }: RelationRowProps) {
  return (
    <a href={routeUrl(href, lang)} {...stylex.props(styles.link)}>
      <Typography variant="body2" component="span" style={styles.label}>
        {t(titleKey)}
      </Typography>
      <ChevronRight size={16} aria-hidden="true" {...stylex.props(styles.chevron)} />
    </a>
  );
}
