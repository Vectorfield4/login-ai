import type { FC } from "react";
import { CaseStudyIllustration } from "./illustrations/CaseStudyIllustration";
import { DefaultIllustration } from "./illustrations/DefaultIllustration";
import { InsightsIllustration } from "./illustrations/InsightsIllustration";
import { ProductIllustration } from "./illustrations/ProductIllustration";
import { ResearchIllustration } from "./illustrations/ResearchIllustration";

export type NewsCategory = "insights" | "case-study" | "research" | "product";

const illustrations: Record<NewsCategory, FC<{ primary: string; secondary: string }>> = {
  insights: InsightsIllustration,
  "case-study": CaseStudyIllustration,
  research: ResearchIllustration,
  product: ProductIllustration,
};

interface NewsPlaceholderProps {
  category?: NewsCategory;
}

export const NewsPlaceholder: FC<NewsPlaceholderProps> = ({ category }) => {
  const Comp = category ? illustrations[category] : DefaultIllustration;

  return (
    <svg
      viewBox="0 0 16 9"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        backgroundColor: "var(--colorSurface)",
      }}
      aria-hidden="true"
      role="img"
    >
      <Comp primary="var(--colorPrimary)" secondary="var(--colorPrimarySoft)" />
    </svg>
  );
};
