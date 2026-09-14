import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "@/features/relevant-items/model/relevants";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { useRelevantItems } from "@/features/relevant-items/model/useRelevantItems";
import { RelevantSection } from "@/features/relevant-items/ui/RelevantSection";

interface RelatedSolutionsProps {
  items: RefOf<"solution">[];
}

/** Solution → solutions: complementary solutions that work together. */
export function RelatedSolutions({ items }: RelatedSolutionsProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.solution.solution)} items={resolved} />;
}
