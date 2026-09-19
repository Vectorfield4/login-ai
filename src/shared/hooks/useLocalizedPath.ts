import { useLocation } from "react-router-dom";
import { getLangFromPath, localizePath } from "@/shared/i18n";

/**
 * Возвращает функцию, которая превращает чистый путь ("/contacts",
 * "/solutions/:slug") в путь с префиксом текущего языка из URL ("/ru/contacts").
 * Единственное место локализации ссылок — хардкод без префикса запрещён.
 */
export function useLocalizedPath(): (path: string) => string {
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);
  return (path: string) => localizePath(path, lang);
}
