import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./config";

export { pageRoutes, routes } from "./config";

/**
 * Браузерный роутер (ленивый) — создаётся только при первом обращении,
 * чтобы модуль пререндера не вызывал createBrowserHistory (нужен document).
 */
let _router: ReturnType<typeof createBrowserRouter> | undefined;
export function getRouter() {
  if (!_router) _router = createBrowserRouter(routes);
  return _router;
}

/** Data-роутер для пререндера и тестов: стартует с конкретного URL. */
export function createMemoryRouterForEntries(initialEntries: string[]) {
  return createMemoryRouter(routes, { initialEntries });
}
