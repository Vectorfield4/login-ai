# Цены на услуги и решения — done (2026-10-12)

## Done

- Типы `PriceUnit`, `PriceItem { amount, unit }`, `PricePackage { name, amount, from? }` в `src/shared/types/content.ts`.
- Поля модели: `Service.price?`, `Solution.price?`, `Solution.packages?`
  (`src/entities/service/model/services.ts`, `src/entities/solution/model/solutions.ts`).
- Порог «от N ₽» у 36 услуг и 8 решений, три пакета у каждого решения (44 фикстуры).
- Общий неймспейс `pricing` в `src/shared/i18n/{ru,en}/pricing.ts` (единицы, подписи пакетов, «от», примечание).
- Организм `PricingSection` рендерит порог, единицу, примечание и сетку пакетов; подключён на страницах услуги и решения сразу под hero.
- JSON-LD `AggregateOffer` в RUB на детальной странице услуги и решения (`src/shared/data/seo.ts`, `SCHEMA_TYPE.aggregateOffer`).
- Отступление от исходной модели: сумма хранится числом в фикстуре, а не ключом i18n на слаг. Сумма одна для RU и EN, дублировать её в двух словарях незачем; переводится только подпись единицы `pricing.units.*`. Форматирование суммы ручное, без `Intl`, чтобы разделитель разрядов не зависел от ICU на CI.

## Цены, без НДС

Единицы: программа (за программу), проект (за проект), месяц (в месяц), язык (за язык).

| Услуга | Порог | Единица |
| --- | --- | --- |
| corporate-ai-training | 350 000 ₽ | программа |
| ai-text-training | 120 000 ₽ | программа |
| ai-image-training | 120 000 ₽ | программа |
| ai-video-training | 180 000 ₽ | программа |
| ai-voice-training | 180 000 ₽ | программа |
| ai-localization-training | 140 000 ₽ | программа |
| ai-presentations-training | 120 000 ₽ | программа |
| content-generation | 900 000 ₽ | проект |
| video-generation | 300 000 ₽ | проект |
| image-generation | 180 000 ₽ | проект |
| voice-audio-generation | 200 000 ₽ | проект |
| content-localization | 150 000 ₽ | язык |
| ai-presentations | 120 000 ₽ | проект |
| landing-pages | 150 000 ₽ | проект |
| corporate-websites | 600 000 ₽ | проект |
| seo-aeo | 90 000 ₽ | месяц |
| information-monitoring | 90 000 ₽ | месяц |
| software-development | 1 500 000 ₽ | проект |
| highload-backend | 1 200 000 ₽ | проект |
| ai-erp-integration | 700 000 ₽ | проект |
| ai-crm-integration | 450 000 ₽ | проект |
| ai-cms-integration | 400 000 ₽ | проект |
| ai-task-tracker-integration | 350 000 ₽ | проект |
| ai-infrastructure | 900 000 ₽ | проект |
| sovereign-model-deployment | 900 000 ₽ | проект |
| deterministic-rag-systems | 700 000 ₽ | проект |
| ai-security-audit | 250 000 ₽ | проект |
| ai-infra-cost-optimization | 200 000 ₽ | проект |
| computer-vision-systems | 1 200 000 ₽ | проект |
| mlops-platforms | 1 000 000 ₽ | проект |
| reinforcement-learning-systems | 1 000 000 ₽ | проект |
| predictive-analytics-systems | 900 000 ₽ | проект |
| recommendation-systems | 900 000 ₽ | проект |
| anomaly-detection-systems | 800 000 ₽ | проект |
| nlp-systems | 800 000 ₽ | проект |
| speech-recognition-systems | 700 000 ₽ | проект |

Порог решения равен пакету «Внедрение». Пилот и Платформа — границы диапазона.

| Решение | Пилот | Внедрение | Платформа |
| --- | --- | --- | --- |
| agentic-systems | 350 000 ₽ | 900 000 ₽ | 1 800 000 ₽ |
| computer-vision | 500 000 ₽ | 1 500 000 ₽ | 3 000 000 ₽ |
| customer-experience | 300 000 ₽ | 800 000 ₽ | 1 500 000 ₽ |
| content-generation | 400 000 ₽ | 1 100 000 ₽ | 2 200 000 ₽ |
| app-development-systems | 500 000 ₽ | 1 500 000 ₽ | 3 000 000 ₽ |
| medical-clinics | 350 000 ₽ | 900 000 ₽ | 1 800 000 ₽ |
| manufacturers | 450 000 ₽ | 1 200 000 ₽ | 2 500 000 ₽ |
| reputation-management | 200 000 ₽ | 550 000 ₽ | 1 200 000 ₽ |

Поддержка после запуска — около 15% от внедрения в год, отдельной строкой.

## Acceptance criteria

- [x] Все 36 услуг несут `price` с суммой и единицей, сумма одна для RU и EN.
- [x] Все 8 решений несут `price` и три `packages`.
- [x] `PricingSection` рендерит порог и пакеты, обе страницы его подключают.
- [x] JSON-LD `AggregateOffer` с валютой RUB отдаётся на странице услуги и решения.
- [x] Цифры подтверждены владельцем продукта (внедрение по запросу).

## Verification

`lint` clean; `tsc -b` clean; `test` 383 passed / 0 failed; `verify` 165 pages; `verify:dist` ок.
`dist/ru/services/ai-security-audit/` несёт `lowPrice: 250000`; `dist/*/solutions/agentic-systems/` несёт `lowPrice: 350000, highPrice: 1800000, offerCount: 3`.

## References

- `src/shared/ui/organisms/PricingSection.tsx` (тест рядом).
- `test/pricing.test.ts` — пороги, пакеты и JSON-LD.
- `src/shared/data/seo.ts`, `src/shared/data/schema.ts`.
