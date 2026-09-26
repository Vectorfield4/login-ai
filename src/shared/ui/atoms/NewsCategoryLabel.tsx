import * as stylex from "@stylexjs/stylex";
import { BarChart2, Box, Briefcase, FlaskConical } from "lucide-react";
import type { FC } from "react";
import type { NewsCategory } from "@/entities/news/model/news";
import { tokens } from "@/shared/design/tokens.stylex.ts";

interface NewsCategoryLabelProps {
  category: NewsCategory;
  size?: "sm" | "md";
}

const categoryIcons: Record<NewsCategory, FC<{ size: number }>> = {
  insights: BarChart2,
  "case-study": Briefcase,
  research: FlaskConical,
  product: Box,
};

const categoryColors: Record<NewsCategory, string> = {
  insights: "var(--colorPrimary)",
  "case-study": "var(--colorSecondary)",
  research: "var(--colorError)",
  product: "var(--colorWarning)",
};

const categoryLabels: Record<NewsCategory, string> = {
  insights: "Аналитика",
  "case-study": "Кейс",
  research: "Исследование",
  product: "Продукт",
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

export const NewsCategoryLabel: FC<NewsCategoryLabelProps> = ({ category, size = "md" }) => {
  const Icon = categoryIcons[category];
  const color = categoryColors[category];
  const label = categoryLabels[category];

  const iconSize = size === "sm" ? 14 : 16;

  return (
    <span {...stylex.props(styles.root)} style={{ color }}>
      <Icon {...stylex.props(styles.icon)} size={iconSize} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};
