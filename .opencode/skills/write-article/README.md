# write-article

Reference layout for the WriteArticle skill. `SKILL.md` is the operating
procedure; this file records how the reference files divide the work.

## Separation of concerns

Four layers, one home per rule:

- `references/spec-template.md` — the brief. Business requirements: what data
  to harvest (genre, funnel, query, structure, evidence, links, frontmatter).
- `references/structures/*.md` — the logic. How a skeleton's blocks and its
  verdict must match: scale anchors, block order, failure modes.
- `references/genres/*.md` — the per-genre contract. Reader, volume, allowed
  structures, evidence and voice, and the Layout Topology & Rhythm wave.
- `references/acceptance.md` — the rubric the `prose-critic` applies. The
  deterministic green/red build state is the test suites under Failure modes in
  `SKILL.md` (`articles.test.ts` for volume, lexicon and the cover gate).

A parameter repeats across layers as a cross-reference, never as a second home:
volume and reader appear in the spec and the genre, the structure name in the
genre and its skeleton.
