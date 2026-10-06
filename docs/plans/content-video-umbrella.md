# Контент и видео. Одно решение и услуги под него

Статус: план, не начат. Код после согласования состава услуг.

## Зачем

Сейчас «Генерация контента» и «Видеогенерация» живут двумя решениями с разной
структурой. Контент-решение описывает текст, картинки, рассылки и локализацию.
Видео стоит рядом и не связано с общей работой над брендом. Клиент, которому
нужен один контент-конвейер, читает две страницы и не видит целого.

Цель: одно umbrella-решение `content-generation`, где каждое направление
получает свою секцию, и набор услуг под каждое направление, включая обучение.

## Решения

1. Решение одно. Контент `/solutions/video-generation` переезжает секциями и
   блоками в `/solutions/content-generation`. Старая страница удаляется
   последним шагом, когда все ссылки уже перенесены.
2. Направление это секция `sections[]`. Заголовок называет направление, пункты
   описывают работу.
3. Услуга закрывает одно направление. Плюс отдельные услуги обучения.
4. Новая группа каталога `content` («Контент и креатив»). Группы `web-growth`
   (сайты, SEO, мониторинг) и `training` остаются.
5. Новые услуги выходят драфтами и публикуются по мере готовности копирайта и
   обложки. Это штатный путь репозитория, см. скилл `publish-service` и
   `docs/plans/service-backdrops-plan.md`.
6. Слаг `content-generation` существует и у решения, и у услуги. Это разные
   пространства (`/solutions/*` против `/services/*`), коллизии нет. Ссылки
   различает `type` в relevants.

## Порядок работ

Работаем этапами, каждый этап заканчивается зелёными `lint`, `test`, `verify`.
Сначала появляется новое, потом переносится старое, и только в конце удаляется
решение. Так ни один коммит не оставляет висячих ссылок.

1. Подготовка. Группа `content`, иконки, теги `technologies`. Только добавления.
2. Услуги волны 1 (`content-generation`, `video-generation`) драфтами.
3. Услуги волн 2-3 (`image-generation`, `voice-audio-generation`,
   `content-localization`, `ai-presentations`).
4. Услуги обучения волны 4 (`generative-content-training`, `ai-video-training`).
5. Миграция ссылок. Кейсы `agency-content-pipeline` и `product-launch-video`
   переводят цель `video-generation` с типа `solution` на `service`, тексты
   заметок правятся. На этом шаге решение `video-generation` ещё живёт, но на
   него уже никто не ссылается.
6. Umbrella-решение `content-generation` собирает направления. Решение
   `video-generation` пока существует как отдельная страница.
7. Удаление решения `video-generation`. Последний шаг: фикстура, словари,
   ассет, запись в карте обложек и блок в `relevants`.

## Каталог услуг

Порядок задаёт волну реализации. Волна 1 это пилот, на ней проверяем формат и
проходим все гейты. Дальше раскатка.

| # | slug | Название (RU) | Группа | Волна |
|---|---|---|---|---|
| 1 | `content-generation` | Разработка контент-конвейера | content | 1 |
| 2 | `video-generation` | Видеогенерация | content | 1 |
| 3 | `image-generation` | Генерация изображений | content | 2 |
| 4 | `voice-audio-generation` | Голос и аудио | content | 2 |
| 5 | `content-localization` | Локализация контента | content | 3 |
| 6 | `ai-presentations` | Презентации и документы | content | 3 |
| 7 | `generative-content-training` | Обучение генеративному контенту | training | 4 |
| 8 | `ai-video-training` | Обучение видеопродакшену с ИИ | training | 4 |

`prompt-engineering-training` не заводим: его тему уже закрывает
`corporate-ai-training`. Если понадобится отдельная углублённая программа,
заводим её отдельным пунктом и разводим с общей по формату и длительности.

Обучение выходит в волне 4 и опирается на услуги волн 1-3 как на практикум:
команда учится на своих задачах и своём контенте.

Routings, меню, sitemap, SEO и breadcrumbs подхватывают новые услуги из фикстур
сами, отдельных правок не требуют.

## Umbrella-решение `content-generation`

Фикстура `src/entities/solution/model/fixtures/content-generation.ts`
переписывается под шесть направлений:

- `features` (6): текст, изображения, видео, голос, локализация, презентации.
- `processSteps` (5-6): бриф, сценарий и раскадровка, генерация, валидация и
  редактура, постобработка, публикация. `processType` у каждого шага. Тест
  `fixtures.test.ts` требует в наборе решения типы `requirements` и
  `system-design`, набор по всем решениям их сохраняет.
- `sections` (6), по одной на направление. Видео-секция собирает контент из
  фикстуры `video-generation.ts`, которую удаляем последним шагом: процесс,
  модели, валидация, пред- и постобработка.
- `technologies` (5-6): text-to-image, text-to-video, image-to-video,
  script-to-video, синтез речи и клонирование голоса, аватары.
- `referencesNote`: референсы и брендбук, расширено с видео на весь контент.
- `businessCategories` (6): реклама, обучение, продуктовые визуализации,
  e-commerce, бренд и корпоратив, соцсети и медиа.
- `showcase`: примеры видео, блок `VideoShowcase` остаётся видео-витриной.
  Имя компонента и тип `SolutionShowcase` не трогаем, переименование в общий
  `MediaShowcase` вынесено в «Pending».
- `fitItems` (4, два отрицательных), `proofItems` (2), `faqItems` (6-8),
  `ctaBanner`.
- `relevants`: услуги `content-generation`, `video-generation`,
  `image-generation`, решение `reputation-management` и `seo-aeo`, кейсы
  `agency-content-pipeline` и `product-launch-video`.
- `audiences` и `tags` остаются в текущих ключах. Если нужны теги «изображения»
  и «аудио», добавляем `technologies.image` и `technologies.audio` в оба
  словаря. Решение и так попадает в фильтр по `technologies.content`.

### Миграция ссылок (шаг 5)

`src/entities/case/model/fixtures/agency-content-pipeline.ts` и
`product-launch-video.ts` меняют `type: "solution"` на `type: "service"` для
слага `video-generation`. Ключи заметок сохраняются. В
`relevants.product-launch-video.video-generation` текст меняем с «Решение:
видеогенерация» на «Услуга: видеогенерация» в RU и EN.

`noteKey` и цели проверяет `src/entities/solution/model/fixtures.test.ts` и
аналогичный тест кейсов. После правок цель обязана существовать в фикстурах
услуг, иначе suite падает.

### Удаление (шаг 7)

Только после миграции ссылок и сборки umbrella-решения.

- `src/entities/solution/model/fixtures/video-generation.ts`
- `src/entities/solution/i18n/ru/video-generation.ts` и файл EN
- импорт и запись в `model/fixtures.ts`, `i18n/index.ts`
- импорт и ключ в `src/app/data/solutionImages.ts`
- `src/shared/assets/images/video-generation.svg`
- блок `video-generation` в `src/shared/i18n/{ru,en}/relevants.ts`

## Услуги

Каждая новая услуга это стандартный набор файлов из
`src/entities/service/AGENTS.md`:

1. `model/fixtures/<slug>.ts`
2. `model/fixtures.ts` (импорт и место в порядке меню)
3. `i18n/ru/<slug>.ts`, `i18n/en/<slug>.ts`
4. `i18n/index.ts` (регистрация в `servicesRu` / `servicesEn`)
5. обложка `src/shared/assets/images/services/<slug>.png` либо строка в
   `src/shared/assets/images/services/README.md` и `draft: true`
6. `src/shared/i18n/{ru,en}/relevants.ts` для новых `noteKey`

Гитапей насыщенности для каждой услуги:

- общие правила `test/service-richness.test.ts`, включая группу `content`
  (если добавим групповое правило `content:outcomes`, его тоже);
- группа `training` требует `outcomes` и `faq >= 5`;
- громкость `test/prose-quality.test.ts`, RU >= 700 слов и EN >= 90% от RU,
  действует для тех услуг, что готовы к публикации;
- запрет отрицаний и противопоставлений в tagline;
- пункты `tradeoffs` / `outcomes` / `deliverables` от 12 слов, заголовок и
  текст делят значимый корень;
- `icon` из `ENTITY_ICONS` в `src/shared/data/iconCatalog.ts`. Для картинок,
  звука, языков и презентаций ключей нет, их надо добавить.

Услуги 1-2 проходят полный цикл первыми. Остальные добавляются волнами, каждая
закрывается `npm run verify` и обновлением таблиц обложек.

## Слои и механика

- `ServiceGroup` в `src/entities/service/model/services.ts` получает `content`.
- `SERVICE_GROUP_ORDER` в `src/entities/service/model/groupServices.ts`
  получает `content` перед `training`.
- `src/shared/i18n/{ru,en}/servicesGroups.ts` получает `content` с `label`,
  `title`, `subtitle`.
- `src/shared/i18n/{ru,en}/relevants.ts` получает `noteKey` новых связей.
- `src/shared/i18n/{ru,en}/technologies.ts` получает новые теги, если решение
  помечается не только `content`.
- `src/shared/data/iconCatalog.ts` получает недостающие иконки.

Паритет ключей RU и EN проверяет `test/astro-content.test.ts`. Он же требует
одинаковый набор ключей в `services`, `solutions`, `relevants` и
`servicesGroups`.

## Критерии приёмки

- [ ] `/solutions/content-generation` описывает шесть направлений, у каждого
      своя секция.
- [ ] Заведена группа `content`, она видна в меню и на `/services`.
- [ ] Восемь услуг собраны: шесть контентных и две обучающих.
- [ ] Все ссылки на `video-generation` переведены на услугу, и только после
      этого решение и его файлы удалены. На каждом этапе `lint`, `test`,
      `verify` зелёные.
- [ ] У каждой опубликованной услуги есть обложка, остальные помечены
      `draft: true` и стоят в таблице «Awaiting generation».
- [ ] Обучение учит на реальных задачах компании, ссылается на услуги
      направлений.
- [ ] RU и EN совпадают по набору ключей и громкости.

## Verification

```
npm run lint
npm run test
npm run verify
```

`verify:dist` требует `og:image` у страницы решения, поэтому у
`content-generation` остаётся своя обложка `content-generation.svg`.

## Pending

- Согласовать итоговый список услуг и их названия.
- Решить, заводить ли `technologies.image` и `technologies.audio`.
- Решить, добавлять ли групповое правило `content:outcomes`.
- Решить судьбу `VideoShowcase`. Переименование в `MediaShowcase` не входит в
  эту работу.
- Сгенерировать обложки для новых услуг (`docs/images/service-backdrop-prompt.txt`).
- Написать полный копирайт волн 2-4 (по 700+ слов RU на услугу).

## Ссылки

- Схема услуг и правила авторства: `src/entities/service/AGENTS.md`.
- Правила текста: `docs/frontend/prose-quality.md`.
- Раскладка словарей: `docs/frontend/i18n.md`.
- Композиция страниц: `docs/frontend/page-composition.md`.
- Обложки: `src/shared/assets/images/services/README.md`,
  `docs/plans/service-backdrops-plan.md`.
- Публикация услуги: `.opencode/skills/publish-service/SKILL.md`.
