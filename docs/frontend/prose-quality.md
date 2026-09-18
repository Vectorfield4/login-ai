# Prose Quality Reference (Anti-AI-Patterns for Marketing Text)

Content rules for every user-facing string in the i18n dictionaries: chrome in `src/shared/i18n/ru|en/*`, entity content in `src/entities/<entity>/i18n/<plural>.ts`, composed at the root in `src/app/i18n/index.ts`. Applied when writing product copy: service pages, solution pages, case pages, investors page, and all block text.

## Banned lexical tells (EN)

| Banned | Replace with |
|--------|-------------|
| leverage (verb) | use |
| robust | solid, reliable |
| seamless | smooth (or remove) |
| navigate (metaphorical) | handle |
| delve, embark, unveil | dig into, start, show |
| truly, deeply, fundamentally | (delete) |
| utilize, facilitate | use, help |
| subsequently, commence, terminate | then, start, end |
| furthermore, moreover, consequently | and / so |

## Banned lexical tells (RU)

| Banned | Replace with |
|--------|-------------|
| инновационный | назвать технологию или результат |
| передовой | назвать версию, модель, срок |
| комплексный | описать состав работ |
| перспективный | назвать метрику |
| универсальный | назвать границы применимости |
| уникальный | назвать отличие с примером |
| революционный, прорывной | показать результат с числом |
| экосистема (как украшение) | назвать компоненты |
| синергия, холистический | описать связку прямо |
| качественно новый уровень | удалить, дать факт |

## Banned phrases

| Banned | Replacement |
|--------|-------------|
| "in today's fast-paced landscape/world" | state the actual context or delete |
| "whether you're X or Y" | address one audience directly |
| "not just X, but Y" | state Y directly |
| "in a world where X" | start with the problem |
| "X is more than just Y" | describe what X does |
| "unlock the potential" | name the outcome |
| "take it to the next level" | describe the improvement |
| "game-changer" | show the result with a number |
| "at the end of the day", "it goes without saying" | delete |
| "revolutionize", "empower" | describe the change / help, give |
| "synergy", "holistic approach" | describe the combination |
| "cutting-edge", "best-in-class" | name the tech / show evidence |
| "..., ensuring/highlighting/showcasing/fostering X" | make it a separate sentence or delete |
| "experts say", "studies show", "industry reports" (no named source) | name the source or delete |

| Banned (RU) | Replacement |
|-------------|-------------|
| "в эпоху цифровизации" | назвать конкретную ситуацию или удалить |
| "в мире, где..." | начать с проблемы читателя |
| "не просто X, а Y" | сказать Y прямо |
| "раскрыть потенциал" | назвать результат |
| "вывести на новый уровень" | описать улучшение с метрикой |
| "под ключ" (как единственный аргумент) | назвать этапы и объём |
| "эксперты считают", "исследования показывают" (без источника) | назвать источник или удалить |

## Banned structural patterns

1. **Uniform sentence rhythm.** Vary length dramatically. Short punch after long explanation.
2. **Tri-colon overuse** ("not A, not B, but C"). State the point directly.
3. **Paragraph-ending restatement.** Cut the last sentence or end with a forward link.
4. **Hedged superlatives** ("arguably one of the most"). Use a number or delete.
5. **False dichotomy intro** ("In a world where X, companies face a choice"). Start with the reader's problem.
6. **Lists that don't build.** Order by importance. Each item adds new info.
7. **Synonym cycling** (platform / solution / tool / system for the same product within one paragraph). Pick one name and repeat it.
8. **Em dash connectors** ("X, and that means Y"). End the sentence or use a comma. Em dashes are an AI tell.
9. **Buried actor** ("mistakes are caught automatically"). Name who does it: "the camera catches mistakes".

## Content quality checklist

Every 500-word block must pass ALL. If 3 or more fail, revise.

- Every benefit claim has a number, percentage, or named example
- Uses "you" (second person), not "businesses" or "organizations"
- Has a clear POV: takes a stance, does not present "both sides"
- Could NOT be copied unchanged to a competitor's site
- Acknowledges a tradeoff or limitation
- Headlines contain specific outcome + audience (not generic)
- Sentences vary in length (no 5+ consecutive similar word count)
- No paragraph ends with a restatement of its opening claim
- CTAs describe the actual next step ("Get an estimate in 1 day", not "Contact us")
- Active voice: the subject performs the action ("cameras catch gaps", not "gaps are caught by cameras")

Russian copy follows the same checklist. Second person is "вы". Numbers: use concrete values (percentages, days, prices) over adjectives.

## Content volume targets

Minimum volume per entity page (Russian text), enforced by the AC-5 suite in `src/app/i18n/content.test.ts`:

| Page | RU minimum | EN |
|------|------------|-----|
| Service (`services.*`) | 700 words | ≥90% of the RU word count per slug |
| Solution (`solutions.*`) | 1000 words | ≥90% of the RU word count per slug |

Counting follows the test helper `wordCount` (split on every run of non-letter/non-digit characters): all strings in the slug's dictionary subtree count, including `sections` content. Write the RU side first up to its minimum, then translate fully; a summarizing EN mirror that falls below 90% of the RU volume is a bug.

## Scoring guide

| Score | Criteria |
|-------|----------|
| 8-10 | Zero banned words, all claims have numbers, clear POV, varied rhythm, honest tradeoffs |
| 6-7 | 1-2 banned words (auto-replaceable), most claims specific, POV present |
| 4-5 | Multiple banned words, abstract claims, generic headlines, uniform rhythm |
| 1-3 | AI slop: no specifics, generic throughout, banned phrases in every paragraph |