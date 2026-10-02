# Prose Quality Reference (Anti-AI-Patterns for Marketing Text)

Content rules for every user-facing string in the i18n dictionaries: chrome in `src/shared/i18n/ru|en/*`, entity content in `src/entities/<entity>/i18n/<plural>.ts`, composed in `src/shared/i18n/dict.ts`. Applied when writing product copy: service pages, solution pages, case pages, news articles, investors page, and all block text. See `i18n.md` for the dictionary layout.

## Two readers

Every article is written for two audiences at once:

| Reader | What they look for | Where in the text |
|---|---|---|
| **Skim** (executive, manager) | The point, the result, why it matters | Title, first sentence, conclusion |
| **Deep-dive** (engineer, specialist) | Details, numbers, limitations, reproducibility | Body, tables, examples |

**Rule:** the title and first sentence must work without the rest of the text. The conclusion must restate the main idea in fresh words, not quote the introduction.

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
10. **Puffery.** "pivotal moment", "testament to", "evolving landscape", "setting the stage for", "indelible mark", "deeply rooted". Cut puffery, state what happened.
11. **Name-dropping.** Listing media outlets without context. Pick one, say what was said.
12. **Superficial -ing phrases.** "highlighting...", "ensuring...", "reflecting...", "showcasing...", "fostering...". Delete or expand with real sources.
13. **Promotional language.** "nestled", "vibrant", "breathtaking", "groundbreaking", "renowned", "stunning", "must-visit". Use neutral descriptions.
14. **Vague attributions.** "Experts believe", "Industry reports suggest", "Some critics argue". Name the source or delete.
15. **Formulaic challenges.** "Despite challenges... continues to thrive." Replace with specific facts.
16. **AI vocabulary.** Additionally, crucial, delve, enduring, enhance, fostering, garner, interplay, intricate, landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore, vibrant. Replace with plain words.
17. **Fancy ways to say "is".** "serves as", "stands as", "boasts", "features". Just say "is" or "has".
18. **Rule of three.** Forcing ideas into groups of three. Use the natural number.
19. **False ranges.** "from X to Y" where X and Y aren't on a meaningful scale. List topics directly.
20. **Colon overuse.** Colons are fine before a list or example. Not as mid-sentence connectors.
21. **Boldface overuse.** Don't bold every proper noun or acronym.
22. **Inline-header lists.** The tell is a bold label and colon that restates the line: "**Performance:** Performance improved...". Convert those to prose. A bold lead-in that ends in a period, names the item, and is followed by genuinely new detail ("**Schema in TypeScript.** Tables live in one file.") is fine, not a tell.
23. **Title case headings.** Use sentence case.
24. **Decorative emojis.** Remove from headings and bullets.
25. **Curly quotes.** Replace with straight quotes.
26. **Chatbot phrases.** "I hope this helps!", "Let me know if...", "Of course!", "Certainly!", "Found the smoking gun!" Remove.
27. **Cutoff disclaimers.** "While specific details are limited..." Find sources or remove.
28. **Sycophantic tone.** "Great question! You're absolutely right!" Respond directly.
29. **Filler phrases.** "In order to" becomes "To". "Due to the fact that" becomes "Because". "It is important to note that" gets deleted.
30. **Excessive hedging.** "could potentially possibly be argued that it might" becomes "may".
31. **Generic conclusions.** "The future looks bright." State specific plans or facts.
32. **Abstract metaphor nouns.** Substrate, wedge, vector, locus, vantage, nexus, primitive (as noun), harness (as metaphor), surface (as in "API surface"), bedrock, scaffolding (as metaphor), modality, paradigm, gold-plating, ratchet (as metaphor), evacuate (for moving code), endgame, north star, flywheel. These read as technical but usually have a plainer concrete word. "Substrate" becomes "base". "Wedge in" becomes "add". "Vector" becomes "way" or "method". "Gold-plating" becomes "more than the job needs". "Ratchet" becomes the mechanism's real name or "a limit that only tightens". "Evacuate" becomes "move out". "Endgame" becomes "the last phase". Pick the concrete word.
33. **Say what it does, not how it feels.** "the database stays close at hand", "SQL you can read", "types that follow your schema" name a feeling. The fix names the mechanism or a number: "`.toSQL()` returns the exact string sent to the database", "a column rename fails the build". Ask what the sentence tells the reader to do or know, then write that. If you can't restate it as a concrete instruction, fact, or number, cut it. One more check: if the sentence could appear unchanged in another project's docs, it says nothing about this one. Cut it.
34. **Shorten or split dense sentences.** If the reader has to backtrack to parse a sentence, break it in two or drop clauses. One idea per sentence.
35. **Cut adverbs, or use a stronger verb.** "runs quickly" becomes "is fast" or the number. "significantly improves" becomes the measured delta. An adverb propping up a weak verb means the verb is wrong.
36. **Prefer the plain word.** "utilize" becomes "use", "leverage" becomes "use", "facilitate" becomes "help", "numerous" becomes "many", "in the event that" becomes "if". The fancier synonym is rarely clearer.

## Allowed article structures

Not every article follows PSI. Pick one of three structures before you start writing:

| Structure | When to use | Scheme |
|---|---|---|
| **PSI** | There is a concrete problem and a solution | Problem → Solution → Impact |
| **Breakdown** | You need to explain how something works | Context → Mechanism → Limitations |
| **Comparison** | You need to show the difference between approaches | Criterion → Option A → Option B → Conclusion |

**Forbidden:** mixing structures within one article. If you started with PSI, do not switch to comparison halfway.

## Content quality checklist

Every 500+ word block must pass ALL items. If 3 or more fail, revise.

### Mandatory items

- [ ] Every benefit claim has a number, percentage, or named example
- [ ] Uses "you" (second person), not "businesses" or "organizations"
- [ ] Has a clear POV: takes a stance, does not present "both sides"
- [ ] Could NOT be copied unchanged to a competitor's site
- [ ] Acknowledges a tradeoff or limitation
- [ ] Headlines contain specific outcome + audience (not generic)
- [ ] Sentences vary in length (no 5+ consecutive similar word count)
- [ ] No paragraph ends with a restatement of its opening claim
- [ ] CTAs describe the actual next step ("Get an estimate in 1 day", not "Contact us")
- [ ] Active voice: the subject performs the action ("cameras catch gaps", not "gaps are caught by cameras")

### Evidence check

- [ ] All numbers have a source or context (where from, when, under what conditions)
- [ ] No generalizations without specifics: "fast" → "in 40 ms", "cheap" → "400x cheaper"
- [ ] Limitations and errors are disclosed explicitly, not hidden in footnotes

### Tone

- [ ] Peer-to-peer: like an experienced colleague explaining to a colleague
- [ ] No marketing noise: no "revolutionary", "next-gen", "synergistic"
- [ ] No condescension: not "incredibly easy", but a neutral explanation

**Russian copy** follows the same checklist. Second person is "вы". Numbers: use concrete values (percentages, days, prices) over adjectives.

## Content volume targets

Minimum volume per entity page, RU text:

| Page | RU minimum | EN |
|------|------------|-----|
| Service (`services.*`) | 700 words | ≥90% of the RU word count per slug |
| Solution (`solutions.*`) | 1000 words | ≥90% of the RU word count per slug |

Counting follows the helper `wordCount` in `test/words.ts` (splits on every run of non-letter/non-digit characters): all strings in the slug's dictionary subtree count, `sections` content included. Write the RU side first up to its minimum, then translate fully; a summarizing EN mirror below 90% of the RU volume is a bug.

No suite asserts these numbers today — `test/astro-content.test.ts` checks key parity, not volume. Treat the table as the writing target, and re-check it by hand when editing a service or solution dictionary.

## Pre-publish checklist

Before removing `draft: true`, verify:

1. [ ] Article structure is defined (PSI / Breakdown / Comparison)
2. [ ] Two-reader principle holds: the skim layer works standalone
3. [ ] All benefit claims are backed by numbers or examples
4. [ ] Limitations and tradeoffs are disclosed
5. [ ] Tone is peer-to-peer, active voice, no buzzwords
6. [ ] Headlines contain a specific outcome + audience
7. [ ] No banned words or phrases from the sections above
8. [ ] RU and EN versions are in sync on structure and volume (EN ≥ 90% of RU)

## Scoring guide

| Score | Criteria |
|-------|----------|
| 8-10 | Zero banned words, all claims have numbers, clear POV, varied rhythm, honest tradeoffs |
| 6-7 | 1-2 banned words (auto-replaceable), most claims specific, POV present |
| 4-5 | Multiple banned words, abstract claims, generic headlines, uniform rhythm |
| 1-3 | AI slop: no specifics, generic throughout, banned phrases in every paragraph |