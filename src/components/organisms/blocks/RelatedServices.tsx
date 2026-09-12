import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "../../../lib/relevants";
import { useRelevantItems } from "../../../lib/useRelevantItems";
import type { RefOf } from "../../../types/relevants";
import { RelevantSection } from "../../molecules/blocks/RelevantSection";

interface RelatedServicesProps {
  items: RefOf<"service">[];
}

/** Service → services: nearby services worth ordering together. */
export function RelatedServices({ items }: RelatedServicesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.service.service)} items={resolved} />;
}
