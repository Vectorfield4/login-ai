import type { TFunc } from "@/shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface RelatedSolutionsProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"solution">[];
}

/** Solution → solutions: дополняющие решения, которые работают вместе. */
export function RelatedSolutions({ t, lang, items }: RelatedSolutionsProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.solution.solution)}
      items={items}
    />
  );
}
