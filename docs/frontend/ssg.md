# SSG в Login AI

SSG значит, что `npm run build` кладёт в `dist/` готовый HTML для каждой
страницы: разметку, критический CSS и мета-теги. Отдавать его может любой
статический хостинг, серверных рантаймов в проекте нет.

## Одна команда

`npm run build` = `tsc -b && vite build`. Это обычная клиентская сборка.
Внутри `vite build` плагин `vite-prerender-plugin` обходит все URL
приложения и рендерит для каждого страницу в `dist/`. Итог: 55 HTML-файлов,
`dist/index.html` плюс `dist/{ru,en}/...` для всех маршрутов.

Пререндер живёт внутри самой сборки.

## Устройство

Два файла.

`vite.config.ts` подключает плагин и указывает адаптер:

```ts
vitePrerenderPlugin({
  renderTarget: "#root",
  prerenderScript: fileURLToPath(new URL("./src/prerender.tsx", import.meta.url)),
})
```

`src/prerender.tsx` это адаптер. Для каждого `{ url }` он возвращает
`{ html, links, head }`: `html` отрендеренная разметка, `links` список
маршрутов для обхода, `head` данные для `<head>`.

Адаптер импортирует `@/app/i18n`, поэтому в пререндер попадают полные
RU/EN-словари.

## Что делает prerender.tsx

1. Определяет язык URL через `getLangFromPath(url)` и переключает i18n
   (`i18n.changeLanguage(lang)`). Адаптер не игнорирует URL. `/en/...`
   пререндерится на английском.
2. Строит роутер `createMemoryRouter(routes, { initialEntries: [routeUrl] })`.
3. Создаёт emotion-кэш `createCache({ key: "css" })` и включает compat-режим.
4. Рендерит дерево в строку через `renderToString` из `react-dom/server.edge`
   внутри `<CacheProvider>`. Статический `react-dom/server` не подходит.
   В клиентной сборке он резолвится в browser-legacy-build и падает с
   `document is not defined`, поэтому серверный рендерер берётся
   динамическим `await import("react-dom/server.edge")`.
5. Забирает из кэша готовые CSS-строки (`extractCriticalStyles`) и кладёт
   их в `head.elements` как дескрипторы `style`. В head попадают только
   стили, реально использованные в отрендеренной разметке, остальное
   отбрасывается. На главной это около 46 КБ.
6. Достаёт i18n-ключи title/description через `getPathMeta(getPathWithoutLang(url))`,
   переводит их и собирает `title` вида `«… | Login AI`, а `description`
   отдаёт отдельным дескриптором meta.
7. Вырезает из `html` инлайн `<title>` и `<meta name="description">`.
   `RouteMeta` рендерит их внутри дерева, но React 19 на SSR не поднимает
   их в `<head>`, поэтому head собирается самим адаптером.

Плагин сам ставит `<html lang>` и `<title>` из `head`, дописывает
`head.elements` в конец `<head>` (Set, поэтому дублей не будет) и обходит
`result.links` для поиска новых URL.

## Emotion: зачем два alias'а и compat

MUI пишет стили через Emotion при монтировании компонентов. На сервере
браузерных хуков нет, поэтому работают два alias'а из `vite.config.ts`.
Оба менять нельзя, иначе в статику попадёт пустой CSS.

- `@emotion/use-insertion-effect-with-fallbacks` направлен на не-browser
  сборку. Browser-сборка при React 19 превращается в честный
  `useInsertionEffect`, который на сервере no-op. Не-browser вариант на
  сервере использует `syncFallback` и вставляет стили в кэш синхронно,
  прямо во время рендера. В браузере поведение прежнее: `useInsertionEffect`.
- `@emotion/cache` направлен на `emotion-cache.esm.js`, dual-сборку,
  работающую и в браузере, и в node-пререндере.

Дальше идёт мутация `(cache as { compat?: boolean }).compat = true`. Она
повторяет шаг `createEmotionServer` из `@emotion/server`, чтобы
`cache.inserted` содержал готовые CSS-строки, а не `true`.
`createCache({ compat: true })` не подходит: dual ESM кэш не копирует эту
опцию из аргументов в сам объект. `@emotion/server` в бандл не добавляем,
достаточно одной строки.

## Корень и языки

Корень `/` это полноценная страница: `dist/index.html` содержит дефолтную
(RU) главную. На клиенте маршрут `/` рендерит её сразу через
`DefaultLangHomeLayout` (`src/app/routes/config.tsx`) — без редиректа на
`/ru` и без перерисовки, пре-рендеренный HTML гидратируется на месте.

Плагин всегда стартует обход с `/`, поэтому адаптер маппит `/` на
`routeUrl = "/ru"` и рендерит русский дом. `head.lang` считает из исходного
url: `getLangFromPath("/")` даёт `"ru"`.

Остальные страницы живут под `dist/{ru,en}/...`.

Нематчащиеся пути: `/contacts` (без языкового сегмента) — клиентский
редирект на `/ru/contacts` (`LocalizedRedirect`); `/en/unknown` (язык есть,
маршрута нет) — страница 404 (`src/pages/not-found`, текст из
`notFoundPage.*`). 404 не пререндерится и не попадает в sitemap.

## Границы

- В `vite.config.ts` не менять два alias'а, `renderTarget: "#root"` и путь
  `prerenderScript`.
- Path ассетов в выпущенных HTML правит плагин `relativizeAssetUrls`
  (hook `closeBundle`, читает файлы из outDir). `base` в `vite.config.ts` не
  трогать: абсолютный base привязан к корню домена, относительные пути
  вычисляются от глубины каждой страницы самим плагином.
- `prerender.tsx` обязан возвращать `{ html, links, head }` с `head.elements`
  как `Set` дескрипторов `{ type, props }`. Плагин сериализует их сам.
  `dangerouslySetInnerHTML` сериализуется как атрибут, использовать нельзя.
- `getPathMeta` и `formatDocTitle` в `prerender.tsx` повторяют код из
  `src/app/seo.ts`. Копия местами отстаёт. При правке seo-резолвера
  проверяй оба файла.

## Проверка

- В `dist/` 55 HTML: `/index.html`, `/ru/*`, `/en/*` (5 статичных страниц,
  6 услуг, 9 решений, 7 кейсов на каждый язык плюс корень).
- В каждом HTML: `<html lang>`, один `<title>`, ровно один
  `<meta name="description">`, критический CSS
  (`<style data-emotion="css ...">`) и `<script type="module" crossorigin>`.
- Ассеты в каждом HTML ссылаются относительными путями от глубины страницы:
  `/index.html` → `./assets/...`, `/ru/...` → `../assets/...`,
  вложенные страницы — `../../assets/...`. Это проверяется grep'ом по
  `/src="/assets/` — таких путей в выпуске быть не должно.
- `npm run preview` отдаёт все маршруты с кодом 200 и пререндеренной
  разметкой.