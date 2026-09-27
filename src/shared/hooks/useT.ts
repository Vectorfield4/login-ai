import { useMemo } from "react";
import { astroDicts } from "../i18n/dict";
import { createT } from "../i18n/t";

export type AppLang = "ru" | "en";

/**
 * Переводчик компонента. Острова (`client:*`) принимают `lang`, а не
 * переводчик: пропы острова сериализуются в JSON, и функция приходит как
 * `null` — блок пропадает при гидрации.
 */
export function useT(lang: AppLang) {
  return useMemo(() => createT(lang, astroDicts), [lang]);
}
