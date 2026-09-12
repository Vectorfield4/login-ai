import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface RelatedSolutionsProps {
  items: RefOf<"solution">[];
}

/** Solution → solutions: complementary solutions that work together. */
export function RelatedSolutions({ items }: RelatedSolutionsProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.solution.solution)} items={resolved} />;
}
