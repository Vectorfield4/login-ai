import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface CaseServicesProps {
  items: RefOf<"service">[];
}

/** Case → services: services used in a case. */
export function CaseServices({ items }: CaseServicesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.case.service)} items={resolved} />;
}
