import type { TFunc } from "@/shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface ServiceCasesProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"case">[];
}

/** Service → cases: запуски, где услуга уже применялась. */
export function ServiceCases({ t, lang, items }: ServiceCasesProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.service.case)}
      items={items}
    />
  );
}
