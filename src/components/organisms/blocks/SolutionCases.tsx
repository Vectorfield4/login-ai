import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface SolutionCasesProps {
  items: RefOf<"case">[];
}

/** Solution → cases: real-world implementations of a solution. */
export function SolutionCases({ items }: SolutionCasesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.solution.case)} items={resolved} />;
}
