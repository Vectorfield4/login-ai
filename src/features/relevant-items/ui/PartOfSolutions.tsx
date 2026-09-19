import type { TFunc } from "@/shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface PartOfSolutionsProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"solution">[];
}

/** Service → solutions: решения, в состав которых входит эта услуга. */
export function PartOfSolutions({ t, lang, items }: PartOfSolutionsProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.service.solution)}
      items={items}
    />
  );
}
