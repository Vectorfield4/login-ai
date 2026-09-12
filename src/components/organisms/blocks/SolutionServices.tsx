import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface SolutionServicesProps {
  items: RefOf<"service">[];
}

/** Solution → services: services included in a solution. */
export function SolutionServices({ items }: SolutionServicesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.solution.service)} items={resolved} />;
}
