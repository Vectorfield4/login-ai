import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGS = ["ru", "en"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

/** Язык по умолчанию — основной рынок. Используется при отсутствии префикса в URL. */
export const DEFAULT_LANG: SupportedLang = "ru";

export function isSupportedLang(value: string | undefined): value is SupportedLang {
  return SUPPORTED_LANGS.includes(value as SupportedLang);
}

/** Первый сегмент пути — обязательный префикс языка: "/ru/..." или "/en/...". */
export function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/").filter(Boolean)[0];
  return isSupportedLang(first) ? first : DEFAULT_LANG;
}

/** Путь без языкового префикса: "/ru/contacts" → "/contacts", "/ru" → "/". */
export function getPathWithoutLang(pathname: string): string {
  const first = pathname.split("/").filter(Boolean)[0];
  if (!isSupportedLang(first)) return pathname;
  const rest = pathname.slice(`/${first}`.length);
  return rest === "" ? "/" : rest;
}

/**
 * Добавляет языковой префикс к чистому пути: "/contacts" → "/ru/contacts".
 * Путь с уже подходящим префиксом возвращается без изменений.
 */
export function localizePath(path: string, lang: SupportedLang): string {
  const prefix = `/${lang}`;
  if (path === prefix || path.startsWith(`${prefix}/`)) return path;
  const withoutLang = getPathWithoutLang(path);
  return withoutLang === "/" ? prefix : `${prefix}${withoutLang}`;
}

let initialized = false;

export function configureI18n(resources: {
  ru: Record<string, unknown>;
  en: Record<string, unknown>;
}): void {
  if (initialized) return;
  initialized = true;
  void i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: resources.ru },
      en: { translation: resources.en },
    },
    // Язык по умолчанию: при пререндере и на клиенте реальный язык
    // устанавливается до первого рендера из URL (setLanguage).
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  if (typeof document !== "undefined") {
    document.documentElement.lang = i18n.language;
  }
  i18n.on("languageChanged", (lng) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng;
    }
  });
}

/**
 * Синхронно переключает язык i18next (ресурсы вкомпилированы в бандл).
 * Вызывается до первого рендера (URL как единственный источник правды),
 * либо в LangLayout при навигации между языками.
 */
export function setLanguage(lang: SupportedLang): void {
  if (initialized && i18n.language !== lang) {
    void i18n.changeLanguage(lang);
  }
}

export default i18n;
