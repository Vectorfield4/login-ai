import { useLayoutEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import { DEFAULT_LANG, isSupportedLang, setLanguage } from "@/shared/i18n";

/**
 * Сегмент языка в URL: "/:lang" — обязательный префикс всех публичных маршрутов.
 * - Валидирует lang из URL; неизвестный язык — клиентский redirect на дефолтный
 *   (настоящий 404 для краулеров задаётся правилами хостинга).
 * - Удерживает i18n в синхроне с URL: навигация /ru/x → /en/x меняет
 *   переводы до отрисовки кадра (useLayoutEffect).
 */
export default function LangLayout() {
  const { lang } = useParams<{ lang?: string }>();
  const normalized = isSupportedLang(lang) ? lang : DEFAULT_LANG;

  useLayoutEffect(() => {
    setLanguage(normalized);
  }, [normalized]);

  if (lang !== normalized) {
    return <Navigate to={`/${normalized}`} replace />;
  }

  return <MainLayout />;
}