import type { TFunc } from "@/shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface CaseServicesProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"service">[];
}

/** Case → services: услуги, использованные в кейсе. */
export function CaseServices({ t, lang, items }: CaseServicesProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.case.service)}
      items={items}
    />
  );
}
