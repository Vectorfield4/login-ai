import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { formatDocTitle, getRouteMeta } from "../seo";

/**
 * Рендерит документные мета-теги текущего маршрута:
 * <title> + <meta name="description"> (React 19 поднимает их в <head>).
 * Подписка на useLocation() + useTranslation() обновляет теги при
 * каждой навигации и при смене языка (RU↔EN без перезагрузки).
 *
 * Компонент рендерится один раз в MainLayout, который никогда не
 * размонтируется между переходами → в дереве всегда ровно одна пара
 * title/description, без дублей и устаревшего состояния head.
 */
export default function RouteMeta() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { titleKey, descriptionKey } = getRouteMeta(pathname);

  return (
    <>
      <title>{formatDocTitle(t(titleKey))}</title>
      <meta name="description" content={t(descriptionKey)} />
    </>
  );
}
