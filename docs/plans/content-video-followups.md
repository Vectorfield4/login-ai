# Content & video — follow-ups

Остаток от `content-video-umbrella.md`, не вошедший в ту работу.

## Обложки и публикация

Девять услуг остаются драфтами без растровой обложки
`src/shared/assets/images/services/<slug>.png`:

`voice-audio-generation`, `content-localization`, `ai-presentations`,
`ai-text-training`, `ai-image-training`, `ai-video-training`,
`ai-voice-training`, `ai-localization-training`, `ai-presentations-training`.

Порядок: сгенерировать обложку по шаблону
`docs/images/service-backdrop-prompt.txt`, убрать строку из таблицы
«Awaiting generation» в `src/shared/assets/images/services/README.md` и снять
`draft: true` в фикстуре — всё в одном изменении. Гейт:
`test/awaiting-generation.test.ts`. Волна 1 (`content-generation`,
`video-generation`, `image-generation`) уже опубликована.

## Новостной контент-план (к утверждению)

Собрать план статей и утвердить до первой публикации:

- календарь на 6-12 месяцев, строка на статью: слаг, языки, дата, формат,
  целевой запрос, статус;
- критерии статьи: зачем, чем помогает, с чем линкуется, воронка, поиск/AEO,
  производство, паритет RU/EN;
- воронки: охват → выбор → решение, каждому материалу одна стадия и одно
  целевое действие;
- покрытие всех шести направлений решения и обучающих программ.

Тестами не покрываем: маркетинговый документ к утверждению.
Ссылки: `docs/frontend/prose-quality.md`, `src/content.config.ts`,
`src/entities/news`.
