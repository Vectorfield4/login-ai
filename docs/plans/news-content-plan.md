# News content plan — к утверждению

Горизонт 12 месяцев, темп 6 материалов в месяц, 76 за год, старт 03.11.2026.
Языки: RU обязателен, EN для топа. Ядро охвата: `agentic`, `ai-infra`,
`content`; обучение, индустрия, ML и сообщество идут по своему такту.

Документ продолжает `content-video-followups.md`, раздел «Новостной
контент-план». Нередакционные предпосылки (схема, рубрики, медиа, измерение)
живут в `docs/plans/news-enablers.md`.

Статус: черновик. Ниже зафиксирован каркас, жанры, календарь и открытые
вопросы. Числа и слаги уточняются на брифе.

## 1. Позиционирование

«Новости и разборы» — field notes практика: цифры, ограничения, цена ошибки.
Заголовок и первая фраза работают отдельно от тела текста (правило двух
читателей из `docs/frontend/prose-quality.md`).

Два обязательных свойства материала:

- измеримая величина: процент, срок, стоимость или замер;
- коммерческая привязка: ссылка на услугу, решение или кейс через
  `relatedServices` / `relatedSolutions` / `relatedCases`.

### Запрет отрицания в рассуждении

Аргументацию ведём от того, что система делает, и от числа. Обороты через
«не» в рассуждении запрещены: «не X, а Y», «не просто», «не только»,
«на деле всё иначе». Работают три приёма:

- назвать механизм: «контур читает 3–4 верифицированных фрагмента»;
- назвать предел: «точность падает после 40 страниц контекста»;
- назвать цену решения: «месяц уходит на чистку данных».

Граница правила. Факт ограничения остаётся в тексте прямой формулировкой:
«кэш окупается на потоках с повторами» вместо «кэш работает не всегда».
Сравнение живёт в отдельном жанре и в таблице критериев, где каждая опция
получает оценку по шкале. Шкала показывает разницу точнее, чем
противопоставление.

## 2. Воронка

Стадия у материала ровно одна, целевое действие тоже одно.

| Стадия | Кому | Работа текста | Целевое действие | Доля |
| --- | --- | --- | --- | --- |
| Охват | специалист ищет тему впервые | сформулировать проблему и дать позицию | переход на смежное решение или разбор | 40 % |
| Выбор | сравнивает подходы и подрядчиков | дать критерии и честные границы | ин-текст CTA на услугу или решение | 35 % |
| Решение | готов покупать | снять риск цифрами и сроком | заявка или переход на кейс | 25 % |

CTA под стадию:

- охват → ссылка на решение или следующий разбор;
- выбор → ин-текст ссылка на услугу/решение (`loginai.ru/ru/services/...`);
- решение → блок `newsPage.related*` с заявкой плюс ссылка на кейс.

## 3. Жанры

Восемь жанров — основная ось плана. Каждый материал получает один жанр, одну
структуру из `prose-quality.md` и одну стадию воронки.

| Жанр | Что публикуем | Воронка | Структура | Доля |
| --- | --- | --- | --- | --- |
| `product` | продуктовые новости: релизы, обновления, фичи, API, цены, доступность | решение, выбор | PSI | 8 % |
| `research` | исследовательское: статьи, модели, датасеты, бенчмарки, коллаборации | охват | PSI или Breakdown | 18 % |
| `technical` | техническое и образовательное: туториалы, гайды, разборы, best practices | выбор, охват | Breakdown | 24 % |
| `case-study` | бизнес-кейсы: применение у клиентов, ROI, интервью | решение | PSI | 13 % |
| `corporate` | корпоративное: инвестиции, партнёрства, найм, культура, ESG | охват | PSI | 7 % |
| `industry` | индустриальное: обзор рынка, регулирование, этика, безопасность, конкуренты | охват, выбор | Comparison или Breakdown | 15 % |
| `media` | медийное: подкасты, вебинары, конференции, AMA, дайджесты | охват | Breakdown | 8 % |
| `community` | сообщество: open source, хакатоны, конкурсы, стипендии | охват | PSI | 7 % |

Объём RU по жанру: `technical` 1000–1500 слов, `research` 900–1500,
`case-study` 900–1300, `industry` 900–1400, `product` 600–900, `corporate`
600–900, `media` 500–900, `community` 500–800.

Рубрики и схема полей — в `docs/plans/news-enablers.md`. Методология написания
по жанрам живёт в скилле `write-article`
(`.opencode/skills/write-article/SKILL.md`).

## 4. Покрытие

### Ядро

| Кластер | Материалов | Зачем |
| --- | --- | --- |
| `content` (решение, 6 услуг, 6 программ) | 12 | новое umbrella-решение, нужна обвязка |
| `ai-infra` (RAG, стоимость, суверенные модели, безопасность) | 14 | самая сильная инженерная история |
| `agentic`, интеграции, поддержка | 16 | главный коммерческий кластер |
| ML (nlp, recsys, speech, RL) | 4 | нишевые услуги, добирают ML-группу |
| Остальные решения и группы | 30 | производство, клиники, рост, репутация |

### Шесть контентных направлений и шесть программ

| Направление | Услуга | Обучение | Материалы |
| --- | --- | --- | --- |
| текст | `content-generation` | `ai-text-training` | № 2, 15 |
| изображение | `image-generation` | `ai-image-training` | № 3 |
| видео | `video-generation` | `ai-video-training` | № 4 |
| голос | `voice-audio-generation` | `ai-voice-training` | № 7, 10 |
| локализация | `content-localization` | `ai-localization-training` | № 8, 11 |
| презентации | `ai-presentations` | `ai-presentations-training` | № 9 |

Все восемь решений и все одиннадцать кейсов получают минимум один материал
(колонка «линки» в календаре).

### Языковой долг

Две живые статьи вышли только на RU. Их EN-пары идут отдельной очередью, вне
календаря: `computer-vision-line-review`, `reviews-tone-monitoring`.

EN для топа: в календаре помечены `RU+EN` — 13 материалов за год.

## 5. Ссылки и обложки

Услуги выходят параллельно своим темпом; этот план их не форсирует. Пометка
`(draft)` в календаре описывает текущее состояние цели. Ссылка на драфт
разворачивается в текст и включается сама после публикации услуги; механика —
в `docs/plans/news-enablers.md`.

Обложка одна на slug, `articles/images/<slug>.png`, 1200×630, без текста, по
шаблону `docs/images/image-generation-prompt.txt`. Без обложки карточка берёт
заглушку и теряет `og:image`.

## 6. Календарь

Даты — вторники и четверга по две в неделю. `(draft)` в линках — состояние
услуги на момент старта плана (см. § 5). Четыре материала по ML стоят
седьмой публикацией своих месяцев, ниже отдельной таблицей.

| № | Дата | Slug | Жанр | Воронка | Запрос (RU) | Линки | Языки |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 2026-11-03 | content-pipeline-economics | research | охват | сколько стоит контент-конвейер | solution:content-generation; service:content-generation | RU+EN |
| 2 | 2026-11-05 | text-pipeline-editorial-loop | technical | выбор | генерация текстов и редактура | service:content-generation; service:ai-text-training (draft) | RU |
| 3 | 2026-11-10 | image-generation-brand-lock | technical | охват | изображения в стиле бренда | service:image-generation; service:ai-image-training (draft) | RU |
| 4 | 2026-11-12 | video-generation-vs-studio | industry | выбор | видеогенерация или студия | service:video-generation; case:product-launch-video | RU+EN |
| 5 | 2026-11-17 | content-pipeline-case-agency | case-study | решение | контент-конвейер агентства | case:agency-content-pipeline; solution:content-generation | RU |
| 6 | 2026-11-19 | content-pipeline-release-fall | product | охват | релиз: обновление конвейера | service:content-generation; solution:content-generation | RU |
| 7 | 2026-12-01 | voice-cloning-boundaries | industry | охват | клонирование голоса и право | service:voice-audio-generation (draft); service:ai-voice-training (draft) | RU |
| 8 | 2026-12-03 | localization-glossary-pipeline | technical | выбор | локализация контента и глоссарий | service:content-localization (draft); service:ai-localization-training (draft) | RU |
| 9 | 2026-12-08 | presentations-from-brief | product | охват | презентации из брифа: запуск | service:ai-presentations (draft); service:ai-presentations-training (draft) | RU |
| 10 | 2026-12-10 | voice-synthesis-benchmark | research | выбор | синтез речи: сравнение моделей | service:voice-audio-generation (draft) | RU |
| 11 | 2026-12-15 | content-localization-interview | case-study | решение | интервью: локализация у клиента | service:content-localization (draft); solution:content-generation | RU |
| 12 | 2026-12-17 | content-pipeline-podcast | media | охват | подкаст: контент-конвейер | solution:content-generation | RU |
| 13 | 2027-01-05 | corporate-ai-training-program | technical | выбор | программа обучения команды ИИ | service:corporate-ai-training | RU |
| 14 | 2027-01-07 | train-team-or-buy-service | industry | охват | обучить команду или купить сервис | service:corporate-ai-training; service:content-generation | RU |
| 15 | 2027-01-12 | content-team-training-roi | research | выбор | обучение команды контенту: окупаемость | service:corporate-ai-training; service:ai-text-training (draft) | RU |
| 16 | 2027-01-14 | training-rollout-case | case-study | решение | внедрение обучения: кейс | service:corporate-ai-training; solution:content-generation | RU |
| 17 | 2027-01-19 | ai-training-webinar | media | охват | вебинар: обучение команды ИИ | service:corporate-ai-training | RU |
| 18 | 2027-01-21 | training-university-partnership | corporate | охват | партнёрство с вузом по обучению | service:corporate-ai-training | RU |
| 19 | 2027-02-02 | manufacturers-ai-first-step | industry | охват | ИИ на производстве: старт | solution:manufacturers; case:quality-vision-line | RU+EN |
| 20 | 2027-02-04 | clinic-ai-assistant-case | case-study | решение | ИИ-ассистент врача: кейс | case:clinic-ai-assistant; solution:medical-clinics | RU |
| 21 | 2027-02-09 | cv-quality-roi | research | выбор | контроль качества зрением: окупаемость | service:computer-vision-systems; solution:computer-vision | RU |
| 22 | 2027-02-11 | cv-vs-manual-inspection | technical | выбор | компьютерное зрение и ручной контроль | service:computer-vision-systems; case:packaging-cv-inspection | RU+EN |
| 23 | 2027-02-16 | cv-defect-dataset-open | community | охват | открытый датасет дефектов упаковки | service:computer-vision-systems | RU |
| 24 | 2027-02-18 | manufacturer-ai-partnership | corporate | охват | партнёрство с производителем | solution:manufacturers | RU |
| 25 | 2027-03-02 | rag-chunking-strategies | technical | выбор | чанкинг для RAG | service:deterministic-rag-systems; service:ai-infrastructure | RU+EN |
| 26 | 2027-03-04 | rag-vs-finetuning | research | охват | RAG и дообучение: замеры | service:deterministic-rag-systems; service:sovereign-model-deployment | RU |
| 27 | 2027-03-09 | token-cost-audit | product | выбор | аудит стоимости токенов | service:ai-infra-cost-optimization | RU |
| 28 | 2027-03-11 | local-model-deployment-checklist | technical | решение | открытая модель в контуре: чек-лист | service:sovereign-model-deployment; solution:agentic-systems | RU |
| 29 | 2027-03-16 | llm-cost-market | industry | охват | рынок LLM: цены токенов | service:ai-infra-cost-optimization | RU |
| 30 | 2027-03-18 | infra-digest-q1 | media | охват | дайджест инфраструктуры ИИ, Q1 | service:ai-infrastructure | RU |
| 31 | 2027-04-01 | prompt-injection-defense | technical | охват | защита от промпт-инъекций | service:ai-security-audit | RU+EN |
| 32 | 2027-04-06 | agent-permissions-scope | technical | выбор | права доступа ИИ-агента | service:ai-security-audit; service:ai-crm-integration | RU |
| 33 | 2027-04-08 | security-audit-product | product | решение | аудит безопасности ИИ: релиз | service:ai-security-audit | RU |
| 34 | 2027-04-13 | agent-incident-review | industry | выбор | разбор инцидентов с агентами | service:ai-security-audit; solution:agentic-systems | RU |
| 35 | 2027-04-15 | injection-benchmark | research | охват | бенчмарк стойкости к инъекциям | service:ai-security-audit | RU |
| 36 | 2027-04-20 | ai-security-bug-bounty | community | охват | багбаунти по безопасности агентов | service:ai-security-audit | RU |
| 37 | 2027-05-04 | support-agent-autonomy | research | охват | автономность агента поддержки | solution:customer-experience; case:retail-support-bot | RU+EN |
| 38 | 2027-05-06 | agent-vs-chatbot | industry | выбор | агент и чат-бот: рынок | solution:agentic-systems; case:retail-support-bot | RU |
| 39 | 2027-05-11 | agent-human-handoff | technical | выбор | передача диалога оператору | service:ai-crm-integration; solution:customer-experience | RU |
| 40 | 2027-05-13 | support-automation-case | case-study | решение | автоматизация поддержки магазина | case:retail-support-bot; solution:agentic-systems | RU+EN |
| 41 | 2027-05-18 | support-agent-ama | media | охват | AMA: агенты в поддержке | solution:agentic-systems | RU |
| 42 | 2027-05-20 | support-team-hiring | corporate | охват | найм команды поддержки ИИ | service:software-development | RU |
| 43 | 2027-06-01 | crm-agent-card-automation | product | выбор | агент в CRM: обновление | service:ai-crm-integration | RU |
| 44 | 2027-06-03 | erp-agent-operations | technical | выбор | агент в ERP: операции | service:ai-erp-integration | RU |
| 45 | 2027-06-08 | cms-agent-editorial | technical | охват | агент в CMS: редактура | service:ai-cms-integration | RU |
| 46 | 2027-06-10 | erp-reconciliation-case | case-study | решение | искажение данных в ERP: кейс | case:erp-data-reconciliation; service:ai-erp-integration | RU |
| 47 | 2027-06-15 | integration-toolkit-open | community | охват | открытый тулкит интеграций | service:ai-task-tracker-integration | RU |
| 48 | 2027-06-17 | integration-market-review | industry | выбор | обзор рынка ИИ-интеграций | service:ai-crm-integration; solution:agentic-systems | RU |
| 49 | 2027-07-01 | agentic-dev-pipeline | research | охват | агенты в разработке: замеры | solution:app-development-systems | RU+EN |
| 50 | 2027-07-06 | agent-harness-cost | research | выбор | стоимость агентной разработки | solution:app-development-systems; service:ai-infra-cost-optimization | RU |
| 51 | 2027-07-08 | highload-ai-backend | technical | выбор | нагрузка ИИ-сервисов | service:highload-backend; service:ai-infrastructure | RU |
| 52 | 2027-07-13 | mlops-notebook-to-prod | technical | выбор | MLOps: в продакшн | service:mlops-platforms | RU |
| 53 | 2027-07-15 | agentic-dev-investment | corporate | охват | инвестиции в агентную разработку | solution:app-development-systems | RU |
| 54 | 2027-07-20 | dev-pipeline-case | case-study | решение | агентный конвейер: кейс | solution:app-development-systems; case:reputation-monitoring-platform | RU |
| 55 | 2027-08-03 | aeo-ai-visibility | research | охват | AEO: видимость в ответах ИИ | service:seo-aeo; case:aeo-ai-visibility | RU+EN |
| 56 | 2027-08-05 | aeo-vs-seo | industry | выбор | AEO и SEO: рынок | service:seo-aeo; solution:content-generation | RU |
| 57 | 2027-08-10 | price-competitor-monitoring | technical | выбор | мониторинг цен конкурентов | service:information-monitoring; case:marketplace-reputation | RU |
| 58 | 2027-08-12 | site-conversion-ai | research | выбор | конверсия сайта: замеры | service:corporate-websites; service:landing-pages | RU |
| 59 | 2027-08-17 | seo-aeo-webinar | media | охват | вебинар по AEO | service:seo-aeo | RU |
| 60 | 2027-08-19 | growth-hackathon | community | охват | хакатон по росту | service:landing-pages; service:seo-aeo | RU |
| 61 | 2027-09-02 | review-response-automation | product | выбор | автоответы на отзывы: фича | solution:reputation-management; case:marketplace-reputation | RU |
| 62 | 2027-09-07 | reputation-marketplace-case | case-study | решение | репутация на маркетплейсах | case:marketplace-reputation; solution:reputation-management | RU |
| 63 | 2027-09-09 | sentiment-scoring-accuracy | research | выбор | точность оценки тональности | case:comment-sentiment-scoring; service:information-monitoring | RU |
| 64 | 2027-09-14 | monitoring-platform-case | case-study | решение | платформа мониторинга: кейс | case:reputation-monitoring-platform; service:information-monitoring | RU |
| 65 | 2027-09-16 | reputation-regulation | industry | выбор | регулирование отзывов | solution:reputation-management | RU |
| 66 | 2027-09-21 | reputation-ama | media | охват | AMA: управление репутацией | solution:reputation-management | RU |
| 67 | 2027-10-05 | ai-rollout-year-review | research | охват | итоги внедрения ИИ за год | solution:agentic-systems; solution:content-generation; solution:computer-vision | RU+EN |
| 68 | 2027-10-07 | ai-budget-2028 | industry | выбор | бюджет на ИИ на 2028 | service:ai-infra-cost-optimization | RU |
| 69 | 2027-10-12 | predictive-maintenance | technical | выбор | предиктивное обслуживание | service:predictive-analytics-systems | RU |
| 70 | 2027-10-14 | anomaly-detection-guide | technical | выбор | обнаружение аномалий | service:anomaly-detection-systems | RU |
| 71 | 2027-10-19 | ai-investment-round | corporate | охват | инвестиции в развитие ИИ-практики | solution:agentic-systems | RU |
| 72 | 2027-10-21 | ai-scholarship-program | community | охват | стипендия по ИИ | service:corporate-ai-training | RU |

### Дополнение: ML-направление

Четыре материала закрывают ML-группу и стоят седьмой публикацией в своих
месяцах. Все услуги-цели сейчас в драфте — ссылка включится после публикации.

| № | Дата | Slug | Жанр | Воронка | Запрос (RU) | Линки | Языки |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 73 | 2027-05-25 | speech-recognition-domain | technical | выбор | распознавание речи в домене | service:speech-recognition-systems (draft) | RU |
| 74 | 2027-07-22 | rl-scheduling-simulator | research | охват | обучение с подкреплением: симулятор | service:reinforcement-learning-systems (draft) | RU |
| 75 | 2027-08-24 | recsys-ecommerce | technical | выбор | рекомендательные системы в e-commerce | service:recommendation-systems (draft) | RU |
| 76 | 2027-09-23 | nlp-entity-extraction | technical | выбор | извлечение сущностей из текста | service:nlp-systems (draft) | RU |

## 7. Бриф на материал

Заполняется до написания, хранится в задаче. Десять пунктов.

1. **Зачем.** Проблему читателя и повод называем прямо.
2. **Чем помогает.** Что читатель сделает иначе после текста.
3. **Жанр.** Один из восьми (§ 3) и одна структура из `prose-quality.md`.
4. **Линковка.** Минимум одна коммерческая сущность плюс ссылки на смежные
   разборы.
5. **Воронка.** Одна стадия и одно целевое действие (§ 2).
6. **Поиск и AEO.** Целевой запрос, вопрос и прямой ответ на него в первом
   предложении, `tags`.
7. **Аргумент.** Механизм, число, предел или цена решения (§ 1).
8. **Объём и паритет.** RU обязателен; EN для топа пишется в той же итерации,
   EN ≥ 90 % объёма RU.
9. **Гейты.** `prose-quality` и `copy-guards`. Для `technical` и `research`
   дополнительно проверяем конкретику в схеме или таблице.
10. **Обложка и статус.** Slug по конвенции, шаблон обложки, статус
    идея → бриф → черновик → опубликовано.

## 8. Производство

- Такт: две публикации в неделю, один бриф и один черновик в работе.
- RU пишется первым; EN идёт для `RU+EN`.
- Схемы и таблицы переиспользуем из услуг там, где механизм общий
  (`scripts/generate-diagrams.mjs`).
- `media`-жанр выходит со страницей-расшифровкой и ссылкой на запись.

## 9. Открытые вопросы

- Приоритет жанров внутри месяца: какой материал выходит первым.
- Очередь EN-переводов вне календаря: где вести учёт.
- Отражение релизов услуг в календаре: пометка `(draft)` снимается вручную
  или обновляется на ревью.

## References

- Правила копирайта: `docs/frontend/prose-quality.md`.
- Нередакционные предпосылки: `docs/plans/news-enablers.md`.
- Спецификации жанров: `.opencode/skills/write-article/SKILL.md`.
- Предыдущий план: `docs/plans/content-video-followups.md`.
- Обложки: `articles/images/README.md`, `docs/images/image-generation-prompt.txt`.
