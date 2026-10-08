import * as stylex from "@stylexjs/stylex";
import {
  BarChart2,
  Box,
  Briefcase,
  Building2,
  FlaskConical,
  Podcast,
  Users,
  Wrench,
} from "lucide-react";
import type { FC } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { NewsCategory } from "@/shared/types/content";

interface NewsCategoryLabelProps {
  category: NewsCategory;
  lang: AppLang;
  size?: "sm" | "md";
}

const categoryIcons: Record<NewsCategory, FC<{ size: number }>> = {
  product: Box,
  research: FlaskConical,
  technical: Wrench,
  "case-study": Briefcase,
  corporate: Building2,
  industry: BarChart2,
  media: Podcast,
  community: Users,
};

const categoryColors: Record<NewsCategory, string> = {
  product: "var(--colorWarning)",
  research: "var(--colorError)",
  technical: "var(--colorPrimary)",
  "case-study": "var(--colorSecondary)",
  corporate: "var(--colorSecondary)",
  industry: "var(--colorInfo)",
  media: "var(--colorSuccess)",
  community: "var(--colorPrimary)",
};

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    fontSize: tokens.categoryLabelSize,
    fontWeight: tokens.categoryLabelWeight,
    lineHeight: 1.4,
    whiteSpace: "nowrap",
  },
  icon: {
    flexShrink: 0,
    width: "1em",
    height: "1em",
  },
});

/** Рубрика статьи: иконка, цвет и переведённый ярлык из `newsPage.categories`. */
export const NewsCategoryLabel: FC<NewsCategoryLabelProps> = ({ category, lang, size = "md" }) => {
  const t = useT(lang);
  const Icon = categoryIcons[category];
  const color = categoryColors[category];
  const label = t(`newsPage.categories.${category}`);

  const iconSize = size === "sm" ? 14 : 16;

  return (
    <span {...stylex.props(styles.root)} style={{ color }}>
      <Icon {...stylex.props(styles.icon)} size={iconSize} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};
