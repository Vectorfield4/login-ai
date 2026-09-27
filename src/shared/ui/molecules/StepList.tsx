import * as stylex from "@stylexjs/stylex";
import { type LucideIcon, resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { StepListItem } from "@/shared/types/content";
import { Typography } from "@/shared/ui/atoms";

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing3,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  row: {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacing2,
    textDecoration: "none",
    // значок шага красится вместе с иконкой: он наследует `color` строки и
    // подсвечивается по `:hover`
    color: tokens.colorText,
    ":hover": { color: tokens.colorPrimary },
  },
  markerZone: { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 },
  number: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
    fontSize: tokens.sizeBody2,
    fontWeight: tokens.weightH6,
    lineHeight: 1,
  },
  // Пунктир соединяет кружки соседних шагов: стартует под кружком текущего
  // шага и уходит в отступ списка, не доходя до следующего.
  line: {
    position: "absolute",
    top: "32px",
    bottom: "-16px",
    left: "15px",
    width: 0,
    borderLeft: `2px dashed ${tokens.colorDivider}`,
  },
  content: { display: "flex", flexDirection: "column", gap: tokens.spacing05, minWidth: 0 },
  title: { fontWeight: tokens.weightH6 },
  text: { lineHeight: tokens.lineH6 },
  // иконка шага прижата к правому краю строки
  icon: { flexShrink: 0, marginBlockStart: tokens.spacing05, marginInlineStart: "auto" },
});

interface StepListProps {
  items: StepListItem[];
  lang: AppLang;
}

/**
 * Нумерованный список шагов-ссылок: кружок с номером, пунктир между шагами,
 * заголовок с пояснением и иконка справа. Каждый шаг ведёт по `href`, поэтому
 * список подходит и для состава работ, и для цепочки переходов.
 */
export function StepList({ items, lang }: StepListProps) {
  const t = useT(lang);
  if (!items.length) return null;

  return (
    <ol {...stylex.props(styles.list)}>
      {items.map((item, index) => {
        const Icon: LucideIcon =
          typeof item.icon === "string" ? resolveEntityIcon(item.icon) : item.icon;
        return (
          <li key={item.href}>
            <a href={routeUrl(item.href, lang)} {...stylex.props(styles.row)}>
              <span {...stylex.props(styles.markerZone)}>
                <span aria-hidden="true" {...stylex.props(styles.number)}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < items.length - 1 ? (
                  <span data-connector="" {...stylex.props(styles.line)} />
                ) : null}
              </span>
              <span {...stylex.props(styles.content)}>
                <Typography variant="body1" component="h4" style={styles.title}>
                  {t(item.title)}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={styles.text}>
                  {t(item.text)}
                </Typography>
              </span>
              <Icon size={20} aria-hidden="true" {...stylex.props(styles.icon)} />
            </a>
          </li>
        );
      })}
    </ol>
  );
}
