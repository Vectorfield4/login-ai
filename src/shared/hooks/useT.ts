import { useMemo } from "react";
import { astroDicts } from "../i18n/dict";
import { createT, type TFunc } from "../i18n/t";

export type AppLang = "ru" | "en";

export function useT(lang: AppLang): TFunc {
  return useMemo(() => createT(lang, astroDicts), [lang]);
}
