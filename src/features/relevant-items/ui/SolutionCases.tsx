import type { TFunc } from "@/shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface SolutionCasesProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"case">[];
}

/** Solution → cases: реальные внедрения решения. */
export function SolutionCases({ t, lang, items }: SolutionCasesProps) {
  return (
    <RelevantSection
      t={t}
      lang={lang}
      title={t(relevantBlockTitleKeys.solution.case)}
      items={items}
    />
  );
}
