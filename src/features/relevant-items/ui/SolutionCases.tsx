import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "@/features/relevant-items/model/relevants";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { useRelevantItems } from "@/features/relevant-items/model/useRelevantItems";
import { RelevantSection } from "@/features/relevant-items/ui/RelevantSection";

interface SolutionCasesProps {
  items: RefOf<"case">[];
}

/** Solution → cases: real-world implementations of a solution. */
export function SolutionCases({ items }: SolutionCasesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.solution.case)} items={resolved} />;
}
