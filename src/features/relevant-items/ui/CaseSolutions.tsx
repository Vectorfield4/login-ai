import type { TFunc } from "@/shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface CaseSolutionsProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"solution">[];
}

/** Case → solutions: решения, применённые в кейсе. */
export function CaseSolutions({ t, lang, items }: CaseSolutionsProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.case.solution)}
      items={items}
    />
  );
}
