import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Button, Typography } from "@/shared/ui/atoms";

interface NewsEmptyStateProps {
  t: TFunc;
  /** Link to the contacts page, already localized. */
  contactsHref: string;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacing2,
    maxWidth: "60ch",
  },
});

/**
 * Заглушка индекса новостей, когда в локали ещё нет опубликованных статей
 * (или все файлы помечены `draft: true`). Ссылка на контакты оставляет
 * страницу полезной, а не пустой.
 */
export function NewsEmptyState({ t, contactsHref }: NewsEmptyStateProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <Typography variant="h3" component="h2">
        {t("newsPage.emptyTitle")}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {t("newsPage.emptyText")}
      </Typography>
      <Button href={contactsHref} variant="contained">
        {t("newsPage.relatedButton")}
      </Button>
    </div>
  );
}
