import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface ServiceCasesProps {
  items: RefOf<"case">[];
}

/** Service → cases: rollouts where the service was already used. */
export function ServiceCases({ items }: ServiceCasesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.service.case)} items={resolved} />;
}
