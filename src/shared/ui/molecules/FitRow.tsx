import * as stylex from "@stylexjs/stylex";
import { CircleCheck, CircleSlash } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacing15,
    padding: tokens.spacing2,
  },
  // «Карточка исключения»: подложка темнее фона секции, поэтому «не подходит»
  // читается как отдельный тип элемента, а не как ещё одна строка списка.
  negative: {
    borderRadius: tokens.radiusShape,
    backgroundColor: tokens.colorSurfaceSunken,
  },
  icon: {
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconPositive: {
    backgroundColor: tokens.colorSuccessSoft,
    color: tokens.colorSuccess,
  },
  iconNegative: {
    backgroundColor: tokens.colorSurfaceSunken,
    color: tokens.colorTextSecondary,
  },
  body: { display: "flex", flexDirection: "column", gap: tokens.spacing05, minWidth: 0 },
});

/**
 * Строка блока «кому подходит / не подходит»: функциональная иконка слева от
 * заголовка плюс пояснение. Плоская — без тени и hover-подъёма, это
 * структурный блок страницы, а не интерактивная карточка.
 */
export function FitRow({
  title,
  text,
  positive,
  lang,
}: {
  title: string;
  text: string;
  positive: boolean;
  lang: AppLang;
}) {
  const t = useT(lang);
  const Icon = positive ? CircleCheck : CircleSlash;
  return (
    <div {...stylex.props(styles.root, !positive && styles.negative)}>
      <span {...stylex.props(styles.icon, positive ? styles.iconPositive : styles.iconNegative)}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div {...stylex.props(styles.body)}>
        <Typography variant="h6" component="h4">
          {t(title)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t(text)}
        </Typography>
      </div>
    </div>
  );
}
