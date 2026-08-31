import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { ru } from "./ru";

export const LANG_STORAGE_KEY = "lang";
export const SUPPORTED_LANGS = ["ru", "en"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function getInitialLang(): string {
  if (typeof window === "undefined") return "ru";
  const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
  return saved === "en" ? "en" : "ru";
}

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: getInitialLang(),
  fallbackLng: "ru",
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

export default i18n;
