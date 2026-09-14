import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "@/features/relevant-items/model/relevants";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { useRelevantItems } from "@/features/relevant-items/model/useRelevantItems";
import { RelevantSection } from "@/features/relevant-items/ui/RelevantSection";

interface SolutionServicesProps {
  items: RefOf<"service">[];
}

/** Solution → services: services included in a solution. */
export function SolutionServices({ items }: SolutionServicesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.solution.service)} items={resolved} />;
}
