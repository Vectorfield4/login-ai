import type { TFunc } from "../../shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface SolutionServicesProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"service">[];
}

/** Solution → services: услуги, включённые в решение. */
export function SolutionServices({ t, lang, items }: SolutionServicesProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.solution.service)}
      items={items}
    />
  );
}
