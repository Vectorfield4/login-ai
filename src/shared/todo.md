# todo: оставшиеся импорты `shared → entities`

Дата: 2026-09-27. Состояние: три домена уже в срезах, контракт `relevants`
спущен в `shared/types/relevants.ts`.

## Что уже сделано (для контекста)

| Коммит | Что |
| --- | --- |
| `b44f2e9` | данные услуг → `src/entities/service/model/{fixtures,getters}.ts` |
| `9d8c8d4` | данные решений → `src/entities/solution/model/`, `solutionImages` → `src/app/data/` |
| `5adda9f` | данные кейсов → `src/entities/case/model/`, удалены `shared/data/entities.ts` и `shared/mocks/` |
| `dc57079` | `EntityRef`/`WithRelevants` → `src/shared/types/relevants.ts` |
| (следующий) | удаление мёртвого кода — пункты 1, 2, 3, 6 |
| (следующий) | новости: `shared/data/newsCollection.ts` → `app/data/`, `ImageMetadata` убран из `entities` (пункты 4, 7) |

Осталось 2 места, где код из `shared` импортирует `entities` (пункт 4) и
одна задача, требующая решения (пункт 5).

---

## 1. ~~`shared/data/routes.ts`: мёртвые экспорты тянут вверх~~ сделано

`STATIC_ROUTE_PATHS` и `CLEAN_ROUTE_PATHS` не имели ни одного потребителя, а
ради них файл импортировал `@/entities/case|service|solution`. Оба экспорта и
три импорта удалены; остались `routeUrl` и `getCleanPath` (28 потребителей).

---

## 2. ~~`shared/data/news.ts`: мёртвый deprecated-шим~~ сделано

Файл с единственным импортом-реэкспортом и пометкой `@deprecated`, потребителей
ноль. Удалён, комментарий в `content.config.ts` переведён на
`@/entities/news/model/news`.

---

## 3. ~~`NewsCategory`: тип объявлен дважды~~ сделано

Объявление в `src/shared/types/content.ts` (единственное), дубликат из
`NewsPlaceholder.tsx` удалён, `entities/news` импортирует и реэкспортирует
общий тип. `shared/ui/atoms` больше не тянет `entities`.

---

## 4. Page-хелперы: `seo`, `breadcrumbs` → `app/data`

`newsCollection.ts` уже переехал (см. пункт 7). Остались два файла: они читают
доменные данные, а их потребители живут выше `shared`; ни один компонент
`shared` их не импортирует (кроме типа `Breadcrumb`).

| Файл | Потребители | Куда |
| --- | --- | --- |
| `shared/data/seo.ts` | 12 страниц + `BaseLayout.astro` + 2 теста | `src/app/data/seo.ts` |
| `shared/data/breadcrumbs.ts` | 10 страниц + `test/breadcrumbs.test.ts` + `shared/ui/organisms/Breadcrumbs.tsx` | резолвер → `src/app/data/breadcrumbs.ts` |

**Нюанс с `breadcrumbs.ts`:** `shared/ui/organisms/Breadcrumbs.tsx` импортирует
оттуда только тип `Breadcrumb` (строка 2). Если перенести файл целиком, получится
`shared → app`. Поэтому типы `Breadcrumb` и `BreadcrumbsData` уходят в
`src/shared/types/content.ts`, а `resolveBreadcrumbs` — в `app/data/`.

**Объём:** 2 файла переезжают, ~30 импортов правится (страницы, `BaseLayout`,
`Breadcrumbs.tsx`, 2 теста), плюс 2 типа в `shared/types/content.ts`.

**Риск:** средний, но проверяемый — `verify:dist` валит релиз при отсутствии
`canonical`, `hreflang`, `og:*`, битом JSON-LD или нерезолвящейся ссылке.
Отдельно проверить `BreadcrumbList` в JSON-LD на детальных страницах
(собирается из того же резолвера).

---

## 5. `astroDicts` — требует решения, переносом не лечится

`src/shared/i18n/dict.ts:1-3` импортирует словари сущностей
(`@/entities/service/i18n/services`, `cases`, `solutions`), собирая полный
словарь сайта. При этом `astroDicts` нужен самому `shared`:

- `shared/hooks/useT.ts:2`
- `shared/ui/molecules/LanguageToggle.tsx:7`, `ThemeToggle.tsx:5`
- `shared/ui/organisms/AiVisualSlider.tsx:4`, `VideoShowcase.tsx:8`
- плюс 12 тестовых файлов

Просто перенести `dict.ts` в `app/` нельзя: `TFunc` там типизирован полным
словарём, и shared-компоненты используют ключи вида `news.*`/`ui.*` — без
словарей сущностей тип ключа не построится. Нужна инъекция.

**Варианты:**

a. **Оставить как есть**, записав исключение в
   `docs/frontend/feature-slice-design.md` (там уже есть фраза про
   application-aware код в `shared`). Цена — одна строка в доках, ноль правок в
   коде.

b. **Инъекция словаря:** `useT(lang, dict)` и проп `t`/`dict` у
   `LanguageToggle`, `ThemeToggle`, `AiVisualSlider`, `VideoShowcase`. Снимает
   зависимость, но меняет публичный API UI-кита и требует правки во всех местах
   вызова (AppBar, Drawer, секции с `client:visible`, слайдеры). Отдельный
   крупный коммит.

c. **Перенести словари сущностей в `shared/i18n/ru|en/`** и убрать
   `entities/*/i18n`. Формально закрывает импорт, но теряется доменное владение
   словарём, а правило проекта требует хранить словари среза в срезе. Не
   рекомендую.

**Рекомендация:** (a), если цель — не сломать UI-кит; (b) — если ноль импортов
вверх обязателен. Выбор за владельцем репозитория.

---

## 6. ~~Пустые заглушки~~ сделано

Удалены `src/shared/api/`, `src/shared/lib/`, `src/shared/hooks/.gitkeep`
(в `hooks/` уже есть `useT.ts` и `useMatchMedia.ts`) и неотслеживаемые пустые
`src/entities/{case,service,solution}/api/`. `docs/frontend/feature-slice-design.md`
поправлен.

---

## 7. ~~`entities/news` нарушает правила слоя~~ сделано

`src/entities/news/model/news.ts` импортировал `ImageMetadata` из Astro и держал
его в `NewsData`/`NewsItem` — прямое нарушение `src/entities/AGENTS.md`.

Сделано:

- `shared/data/newsCollection.ts` → `src/app/data/newsCollection.ts`: новости —
  домен, но чтение коллекции знает про `astro:content`, поэтому модуль живёт
  рядом с `solutionImages.ts`; потребляют его только 5 страниц.
- В сущности вместо `ImageMetadata` объявлен `NewsImage` (`src`, `width`,
  `height`). `ImageMetadata` структурно подходит под него, поэтому значения
  из коллекции проходят без приведений.
- `app/data/newsCollection.ts` возвращает `NewsPageItem = Omit<NewsItem,
  "ogImage"> & { ogImage?: ImageMetadata }` — полный метаданных нужен ровно там,
  где строится og:image (BaseLayout → `getImage`).
- `NewsCard` больше не пересобирает `{src, width, height}` вручную.
- `filterNewsForLang`/`sortNewsByDateDesc` стали дженериками `<T extends
  NewsItem>`, чтобы `app`-слой фильтровал свои надстройки без `as`.

---

## Порядок работы

Каждый пункт — отдельный коммит, после каждого — полный набор проверок.

1. Пункт 4 (перенос `seo` и `breadcrumbs` в `app/data`).
2. Пункт 5 — только после решения по варианту (a)/(b).

## Проверка после каждого шага

```
npm run lint
npm run test          # 25 файлов, 132 теста
npm run build         # 69 страниц
npm run verify:dist   # 68 страниц из sitemap + /404.html
```

Предупреждение Vitest «something prevents Vite server from exiting» — известное
поведение Stylex-плагина, exit code 0.
