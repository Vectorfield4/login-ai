import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface CaseSolutionsProps {
  items: RefOf<"solution">[];
}

/** Case → solutions: solutions applied in a case. */
export function CaseSolutions({ items }: CaseSolutionsProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.case.solution)} items={resolved} />;
}
