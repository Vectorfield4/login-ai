# SSG «из коробки» — сгенерированная статика через vite-prerender-plugin

Статус: **реализовано** (единственный поддерживаемый способ генерации статики).

## Рабочий процесс (success path)

Для разработчика существует ровно одна команда:

```
npm run build
```

Это `tsc -b && vite build`: обычная клиентская сборка, внутри которой
`vite-prerender-plugin` пререндерит все страницы в `dist/` (55 HTML-файлов:
`index.html` для `/` + `dist/{ru,en}/…` для всех маршрутов). Никаких
отдельных SSR-сборок и node-скриптов нет — пререндер живёт внутри `vite build`.

## Что должно оставаться нетронутым (иначе сборка сломается)

- `vite.config.ts`:
  - `vitePrerenderPlugin({ renderTarget: "#root", prerenderScript: …/src/prerender.tsx })`;
  - alias `@emotion/cache` → `emotion-cache.esm.js` (dual-сборка) — единый
    изоморфный код и для браузера, и для node-пререндера;
  - alias `@emotion/use-insertion-effect-with-fallbacks` → НЕ-browser сборка.
    Браузерная сборка при React 19 превращается в честный `useInsertionEffect`
    (no-op на сервере) — эмошен-стили MUI не попадали бы в SSR. Ноду-сборка
    на сервере исполняет вставку синхронно (в браузере по-прежнему
    `useInsertionEffect`).
- `src/prerender.tsx` — адаптер плагина, возвращает `{ html, links, head }`:
  - `html` — `renderToString` из `react-dom/server.edge` (не `react-dom/server`:
    в клиентной сборке последний резолвится в legacy-browser-build);
  - `head.elements` — `Set` дескрипторов `{ type, props }` (не HTML-строки):
    style для emotion critical CSS и meta для `description`;
  - `cache.compat = true` — одна строка, повторяющая шаг `createEmotionServer`
    (`@emotion/server` в бандл не тащим), чтобы в `cache.inserted` ложились
    готовые CSS-строки, а не `true`;
  - стартовый `"/"` маппится на `"/ru"` (корня как страницы нет) и рендерит
    русский дом; остальные URL живут под `/:lang`;
  - инлайн `<title>`/`<meta="description">`, которые `RouteMeta` рендерит внутри
    дерева, из body вырезаются — head собирает плагин.

## Ключевые особенности API плагина (v0.5.13)

- Вызов: `prerender({ ssr: true, url, route })`.
- `renderTarget` → `#root`; `prerenderScript` → абсолютный путь до `src/prerender.tsx`.
- `head.elements` — Set дескрипторов `{ type, props }`:
  - style: `{ type: 'style', props: { 'data-emotion': \`${key} ${ids}\`, children: css } }`
  - meta:  `{ type: 'meta', props: { name: 'description', content: … } }`
  - `dangerouslySetInnerHTML` сериализуется как атрибут — не использовать.
- Плагин сам обновляет `<title>` и `<html lang>`, добавляет head.elements
  в конец `<head>`, дедуплицирует их (`Set`) и обходит `result.links`.

## Проверка после сборки

- В `dist/` 55 HTML: `/index.html`, `/ru/*`, `/en/*` (5 статичных + 6 услуг +
  9 решений + 7 кейсов × 2 языка + корень).
- В каждом HTML: `<html lang>`, один `<title>`, ровно один
  `<meta name="description">`, критический CSS (`<style data-emotion="css …">`,
  в сумме ~46 КБ на главную) и `<script type="module" crossorigin src="/assets/…">`.

## Критерии приёмки

- `npm run build` зелёный; 55 страниц в `dist/` с корректными lang/title/meta,
  emotion critical CSS в `<head>` и картинками `/assets/*.svg`.
- В браузере (preview/prod) кнопки и дропдауны работают без ошибок гидратации.