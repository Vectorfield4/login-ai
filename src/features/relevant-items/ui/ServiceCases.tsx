import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "@/features/relevant-items/model/relevants";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { useRelevantItems } from "@/features/relevant-items/model/useRelevantItems";
import { RelevantSection } from "@/features/relevant-items/ui/RelevantSection";

interface ServiceCasesProps {
  items: RefOf<"case">[];
}

/** Service → cases: rollouts where the service was already used. */
export function ServiceCases({ items }: ServiceCasesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.service.case)} items={resolved} />;
}
