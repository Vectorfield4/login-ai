import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms";

const styles = stylex.create({
  column: { display: "flex", flexDirection: "column", gap: tokens.spacing15, minWidth: 0 },
  // Заголовок колонки: одна строка, ширина колонки. Заголовки колонок стоят
  // параллельно, потому что колонки — соседи одной grid-строки (h3 под h2
  // секции, содержимое колонки — h4).
  title: { minWidth: 0 },
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

interface ColumnFrameProps {
  /** Заголовок колонки (h3) — под h2 секции. */
  titleKey: string;
  /** Ссылка «все …»: путь от корня и её i18n-ключ. */
  allHref?: string;
  allLabelKey?: string;
  lang: AppLang;
  children: ReactNode;
}

/** Оболочка колонки «связанного»: заголовок, содержимое и выход «все …». */
export function ColumnFrame({ titleKey, allHref, allLabelKey, lang, children }: ColumnFrameProps) {
  const t = useT(lang);
  return (
    <div {...stylex.props(styles.column)}>
      <Typography variant="h5" component="h3" style={styles.title}>
        {t(titleKey)}
      </Typography>
      {children}
      {allHref && allLabelKey ? (
        <a href={routeUrl(allHref, lang)} {...stylex.props(styles.allLink)}>
          {t(allLabelKey)}
          <ChevronRight size={16} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
