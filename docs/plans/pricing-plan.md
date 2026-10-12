# Цены на услуги и решения — done (2026-10-12)

## Done

- Типы `PriceUnit`, `PriceItem { amount, unit }`, `PricePackage { name, amount, from? }` в `src/shared/types/content.ts`.
- Поля модели: `Service.price?`, `Solution.price?`, `Solution.packages?`
  (`src/entities/service/model/services.ts`, `src/entities/solution/model/solutions.ts`).
- Порог «от N ₽» у 36 услуг и 8 решений, три пакета у каждого решения (44 фикстуры).
- Общий неймспейс `pricing` в `src/shared/i18n/{ru,en}/pricing.ts` (единицы, подписи пакетов, «от», примечание).
- Организм `PricingSection` рендерит порог, единицу, примечание и сетку пакетов; подключён на страницах услуги и решения сразу под hero.
- JSON-LD `AggregateOffer` в RUB на детальной странице услуги и решения (`src/shared/data/seo.ts`, `SCHEMA_TYPE.aggregateOffer`).
- Цены подняты после сверки с рынком РФ 2026 (см. «Рыночная база»).
- Сумма хранится числом в фикстуре, а не ключом i18n на слаг: сумма одна для RU и EN, переводится только подпись единицы `pricing.units.*`. Форматирование суммы ручное, без `Intl`, чтобы разделитель разрядов не зависел от ICU на CI.

## Рыночная база

Рынок РФ, 2026. Источники: TAdviser (агентные системы, внедрение ИИ в бизнес, машинное зрение, экономика корпоративного ИИ), Habr Career (зарплатный отчёт H2 2025), прайс-страницы студий на 2026 (softrest.ru, samartsev.tech, axima-ai.ru), FL.ru (бюджеты заказов).

Ключевые ориентиры, ₽:

| Категория | Рынок |
| --- | --- |
| ИИ-агент: MVP / пилот | 250 000 – 700 000 |
| ИИ-агент: рабочее решение с интеграциями | 700 000 – 2 000 000 |
| ИИ-агент: корпоративный под ключ | 2 000 000 – 8 000 000 |
| Интеграция ИИ с CRM/ERP/CMS | 500 000 – 1 500 000 (ERP выше) |
| Компьютерное зрение: пилот | 300 000 – 1 500 000 |
| Компьютерное зрение: линия | 1 500 000 – 8 000 000 |
| Классический ML (прогноз, реком., аномалии, NLP, ASR) | 2 000 000 – 8 000 000 |
| MLOps / open-модели on-prem | 1 500 000 – 10 000 000 (железо отдельно) |
| LLM/RAG-платформа; аудит ИБ; оптимизация токенов | платформа 2–5 млн; аудит 0,3–2 млн; оптимизация 0,2–1,5 млн |
| Разработка ПО / высоконагруженный бэкенд | 2 000 000 – 30 000 000 |
| Поддержка после запуска | 15–30% от внедрения в год, или 50–300 тыс. ₽/мес |
| Ставка агентства | 2 000 – 5 000 ₽/час, 20 000 – 40 000 ₽/день |
| Зарплата ML/AI-инженера | middle 167 тыс., senior 285 тыс., lead 367 тыс. ₽/мес |

Вывод сверки: тяжёлые категории (ML, зрение, MLOps, on-prem, интеграции, разработка) были недооценены в 2–3 раза. Нижние категории (лендинг, мониторинг) остались на рынке.

## Цены, без НДС

Единицы: программа (за программу), проект (за проект), месяц (в месяц), язык (за язык).

| Услуга | Порог | Единица |
| --- | --- | --- |
| corporate-ai-training | 600 000 ₽ | программа |
| ai-text-training | 180 000 ₽ | программа |
| ai-image-training | 180 000 ₽ | программа |
| ai-video-training | 240 000 ₽ | программа |
| ai-voice-training | 240 000 ₽ | программа |
| ai-localization-training | 200 000 ₽ | программа |
| ai-presentations-training | 180 000 ₽ | программа |
| content-generation | 1 200 000 ₽ | проект |
| video-generation | 400 000 ₽ | проект |
| image-generation | 250 000 ₽ | проект |
| voice-audio-generation | 300 000 ₽ | проект |
| content-localization | 200 000 ₽ | язык |
| ai-presentations | 200 000 ₽ | проект |
| landing-pages | 150 000 ₽ | проект |
| corporate-websites | 900 000 ₽ | проект |
| seo-aeo | 120 000 ₽ | месяц |
| information-monitoring | 90 000 ₽ | месяц |
| software-development | 3 000 000 ₽ | проект |
| highload-backend | 2 500 000 ₽ | проект |
| ai-erp-integration | 1 500 000 ₽ | проект |
| ai-crm-integration | 900 000 ₽ | проект |
| ai-cms-integration | 700 000 ₽ | проект |
| ai-task-tracker-integration | 600 000 ₽ | проект |
| ai-infrastructure | 2 500 000 ₽ | проект |
| sovereign-model-deployment | 3 000 000 ₽ | проект |
| deterministic-rag-systems | 1 500 000 ₽ | проект |
| ai-security-audit | 500 000 ₽ | проект |
| ai-infra-cost-optimization | 400 000 ₽ | проект |
| computer-vision-systems | 2 500 000 ₽ | проект |
| mlops-platforms | 3 000 000 ₽ | проект |
| reinforcement-learning-systems | 2 500 000 ₽ | проект |
| predictive-analytics-systems | 2 000 000 ₽ | проект |
| recommendation-systems | 2 000 000 ₽ | проект |
| anomaly-detection-systems | 1 800 000 ₽ | проект |
| nlp-systems | 2 000 000 ₽ | проект |
| speech-recognition-systems | 1 500 000 ₽ | проект |

Порог решения равен пакету «Внедрение». Пилот и Платформа — границы диапазона.

| Решение | Пилот | Внедрение | Платформа |
| --- | --- | --- | --- |
| agentic-systems | 500 000 ₽ | 1 500 000 ₽ | 4 000 000 ₽ |
| computer-vision | 700 000 ₽ | 2 500 000 ₽ | 6 000 000 ₽ |
| customer-experience | 400 000 ₽ | 1 200 000 ₽ | 3 000 000 ₽ |
| content-generation | 500 000 ₽ | 1 500 000 ₽ | 3 500 000 ₽ |
| app-development-systems | 700 000 ₽ | 2 500 000 ₽ | 6 000 000 ₽ |
| medical-clinics | 450 000 ₽ | 1 300 000 ₽ | 3 000 000 ₽ |
| manufacturers | 500 000 ₽ | 1 800 000 ₽ | 4 000 000 ₽ |
| reputation-management | 300 000 ₽ | 900 000 ₽ | 2 000 000 ₽ |

Поддержка после запуска — 15–30% от внедрения в год, отдельной строкой.

## Acceptance criteria

- [x] Все 36 услуг несут `price` с суммой и единицей, сумма одна для RU и EN.
- [x] Все 8 решений несут `price` и три `packages`.
- [x] `PricingSection` рендерит порог и пакеты, обе страницы его подключают.
- [x] JSON-LD `AggregateOffer` с валютой RUB отдаётся на странице услуги и решения.
- [x] Цены сверены с рынком РФ 2026 и подняты в тяжёлых категориях.

## Verification

`lint` clean; `tsc -b` clean; `test` 383 passed / 0 failed; `verify` 165 pages; `verify:dist` ок.
`dist/ru/services/ai-security-audit/` несёт `lowPrice: 500000`; `dist/*/solutions/agentic-systems/` несёт `lowPrice: 500000, highPrice: 4000000, offerCount: 3`.

## References

- `src/shared/ui/organisms/PricingSection.tsx` (тест рядом).
- `test/pricing.test.ts` — пороги, пакеты и JSON-LD.
- `src/shared/data/seo.ts`, `src/shared/data/schema.ts`.
- Рыночные источники: TAdviser (внедрение ИИ, агентные системы, машинное зрение), Habr Career (зарплатный отчёт H2 2025), softrest.ru, samartsev.tech, axima-ai.ru, FL.ru.
