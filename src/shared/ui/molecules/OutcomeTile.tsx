import * as stylex from "@stylexjs/stylex";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { OutcomeItem } from "@/shared/types/content";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  // Утопленная подложка вместо белой карточки: плитка читается и на alt-фоне,
  // и в тёмной теме, где colorSurface совпадает с фоном страницы.
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    padding: tokens.layoutCard,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    boxSizing: "border-box",
  },
  value: { marginBlockStart: tokens.spacing1 },
});

/**
 * Плитка результата: иконка-якорь, крупное значение, заголовок и пояснение.
 * Форма пункта фиксирована — все плитки в блоке выглядят одинаково.
 */
export function OutcomeTile({ item, lang }: { item: OutcomeItem; lang: AppLang }) {
  const t = useT(lang);
  const Icon = resolveEntityIcon(item.icon);
  return (
    <article {...stylex.props(styles.root)}>
      <IconCircle size={44}>
        <Icon size={22} aria-hidden="true" />
      </IconCircle>
      <Typography variant="h3" component="p" color="primary" style={styles.value}>
        {t(item.value)}
      </Typography>
      <Typography variant="h6" component="h3">
        {t(item.title)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {t(item.text)}
      </Typography>
    </article>
  );
}

export default OutcomeTile;
