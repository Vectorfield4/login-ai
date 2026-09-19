import type { TFunc } from "../../shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface RelatedServicesProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"service">[];
}

/** Service → services: ближайшие услуги, которые стоит заказать вместе. */
export function RelatedServices({ t, lang, items }: RelatedServicesProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.service.service)}
      items={items}
    />
  );
}
