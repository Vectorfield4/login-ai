import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { routeUrl } from "@/shared/data/routes";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
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
  lang: AppLang;
}

/**
 * Плотная строка-ссылка внутри колонки «связанного»: заголовок и шеврон.
 * Нужен там, где пунктов больше двух, — карточки на такой высоте тянут
 * секцию на весь экран, а колонка из строк читается списком.
 */
export function RelationRow({ titleKey, href, lang }: RelationRowProps) {
  const t = useT(lang);
  return (
    <a
      href={routeUrl(href, lang)}
      itemScope
      itemProp="itemListElement"
      itemType={schemaIri(SCHEMA_TYPE.thing)}
      {...stylex.props(styles.link)}
    >
      <Typography variant="body2" component="span" itemProp="name" style={styles.label}>
        {t(titleKey)}
      </Typography>
      <ChevronRight size={16} aria-hidden="true" {...stylex.props(styles.chevron)} />
    </a>
  );
}
