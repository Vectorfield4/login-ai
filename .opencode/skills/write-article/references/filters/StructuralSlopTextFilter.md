# Structural slop filter (anti-pattern gate)

The `prose-critic` subagent applies this before returning PASS. It catches the
sentence- and paragraph-level AI tells the other filters miss. The canonical
list is `docs/frontend/prose-quality.md`, "Banned structural patterns" #1-36.
The Scan list below is its operative form and is self-contained for the critic;
the doc itself is provenance and the writer's deep reference. Judge against the
Scan list, not against the whole document.

## Scan

- Rhythm: five consecutive sentences of near-equal length. Break one.
- Tri-colon: "not A, not B, but C". State C.
- Rule of three: forcing items into threes. Use the natural number.
- False range: "from X to Y" where X and Y are not on a scale. List directly.
- Colon as a mid-sentence connector. Let the point stand.
- Inline-header list: "**Performance:** Performance improved...". Convert to
  prose. A bold lead-in with genuinely new detail is fine.
- Title-case headings. Use sentence case.
- Non-building lists: items that repeat instead of adding. Order by importance.
- Name-dropping: an outlet named with no context. Pick one, say what it said.
- Promotional language: nestled, vibrant, groundbreaking, renowned, stunning.
- Hedging: "could potentially possibly be argued". Say may.
- Dense sentence: the reader backtracks to parse it. Split or drop clauses.
- Generic conclusion: "the future looks bright". State a plan or a fact.
- Chatbot and sycophantic phrases: "I hope this helps", "Great question".
- Abstract metaphor nouns: substrate, wedge, vector, nexus, paradigm, flywheel.
  Use the concrete word.
- Paragraph-ending restatement: cut the last sentence or end forward.

## Deterministic overlap

`test/copy-guards.test.ts` fails the EN `-ing` phrases and the banned
constructions for dictionary copy; `test/articles.test.ts` sweeps articles for
the lexicon. This filter judges the structural forms a regex cannot.

## Finding

One line per hit: `[file:line] STRUCTURAL_SLOP_VIOLATION: <pattern>.`
