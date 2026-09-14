import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "@/features/relevant-items/model/relevants";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { useRelevantItems } from "@/features/relevant-items/model/useRelevantItems";
import { RelevantSection } from "@/features/relevant-items/ui/RelevantSection";

interface SimilarCasesProps {
  items: RefOf<"case">[];
}

/** Case → cases: similar rollouts for the same kind of task. */
export function SimilarCases({ items }: SimilarCasesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.case.case)} items={resolved} />;
}
