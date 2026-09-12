import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface PartOfSolutionsProps {
  items: RefOf<"solution">[];
}

/** Service → solutions: solutions that include this service. */
export function PartOfSolutions({ items }: PartOfSolutionsProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.service.solution)} items={resolved} />;
}
