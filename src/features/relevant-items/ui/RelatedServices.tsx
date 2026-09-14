import { useTranslation } from "react-i18next";
import { relevantBlockTitleKeys } from "@/features/relevant-items/model/relevants";
import type { RefOf } from "@/features/relevant-items/model/relevants.types";
import { useRelevantItems } from "@/features/relevant-items/model/useRelevantItems";
import { RelevantSection } from "@/features/relevant-items/ui/RelevantSection";

interface RelatedServicesProps {
  items: RefOf<"service">[];
}

/** Service → services: nearby services worth ordering together. */
export function RelatedServices({ items }: RelatedServicesProps) {
  const { t } = useTranslation();
  const resolved = useRelevantItems(items);
  return <RelevantSection title={t(relevantBlockTitleKeys.service.service)} items={resolved} />;
}
