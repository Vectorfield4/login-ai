import type { TFunc } from "@/shared/i18n/t";
import type { RefOf } from "../model";
import { relevantBlockTitleKeys } from "../model";
import { RelevantSection } from "./RelevantSection";

interface SimilarCasesProps {
  t: TFunc;
  lang: "ru" | "en";
  items: RefOf<"case">[];
}

/** Case → cases: похожие запуски для того же класса задач. */
export function SimilarCases({ t, lang, items }: SimilarCasesProps) {
  return (
    <RelevantSection t={t} lang={lang} title={t(relevantBlockTitleKeys.case.case)} items={items} />
  );
}
