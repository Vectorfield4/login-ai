---
title: "The Era of Deterministic RAG: Enterprise AI Infrastructure Without Price Chaos and Hallucinations"
description: "Why pushing corporate documents straight into an LLM context window drives up token bills and loses accuracy. We break down the stack: vector layer, semantic cache, tracing."
publishedAt: 2026-09-27
readingTimeMin: 6
tags: ["RAG", "LLM", "Infrastructure", "Architecture"]
category: technical
relatedServices: ["ai-infrastructure"]
relatedSolutions: ["agentic-systems"]
relatedCases: []
---

Deterministic RAG removes the cost chaos and the hallucinations of enterprise search: the model receives 3–4 verified fragments assembled in the perimeter. Pushing corporate documents straight into the context window of an external model hits two limits at once. The first is the bill: our measurements on support and policy projects put as much as 75% of token spend on resending the same regulations, source code, and support history over and over. The second is accuracy: as the context grows, the share of correctly extracted facts drops, and the model answers questions with more confidence than the text it was given supports.

We call this the empty context paradox. The window is full, the request fits entirely, and there is less usable signal in it than in a short extract of relevant fragments. A third limit shows up under load: with thousands of concurrent sessions running through the stack, p99 latency becomes a random number that you can neither forecast nor put in an SLA. Load exposes latency and access boundaries. [AI security audit](https://loginai.ru/en/services/ai-security-audit).

So LLM stops being the knowledge store. The model remains the compute core and receives 3–4 verified fragments assembled locally. Below is the stack we build for a corporate knowledge base. If data must not leave the perimeter, the models run inside it. [Sovereign model deployment](https://loginai.ru/en/services/sovereign-model-deployment).

## Stack overview

```text
  Documents, repositories, support history
                     │
                     ▼ cleaning, chunking, de-identification
┌──────────────────────────────────────────────┐
│ 0. Offline indexing pipeline                 │
│    chunks → embeddings → knowledge base ver. │
└──────────────────────┬───────────────────────┘
                       │ offline
                       ▼ HNSW index
┌──────────────────────────────────────────────┐
│    Vector database: Qdrant / pgvector        │
└──────────────────────┬───────────────────────┘
                       │ chunks for the query
                       │
  [ User: "how do I connect the CRM?" ]
                       │
                       ▼ 1. query embedding
┌──────────────────────────────────────────────┐
│ 1. Semantic cache                            │
│    similarity > 0.95 → answer from memory    │
└──────────────────────┬───────────────────────┘
                       │ cache miss
                       ▼ 2. dense + sparse search
┌──────────────────────────────────────────────┐
│ 2. Hybrid search over the index              │
│    top 3–4 chunks, verified only             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼ 3. prompt assembly
┌──────────────────────────────────────────────┐
│ 3. External inference (private API)          │
│    prompt carries the retrieved chunks only  │
└──────────────────────┬───────────────────────┘
                       │
                       ▼ 4. observability
┌──────────────────────────────────────────────┐
│ 4. Langfuse: trace, cost, latency            │
└──────────────────────────────────────────────┘
```

Indexing runs offline and does not depend on traffic: a new revision of a regulation rebuilds a version of the index, not the dialog history. Parsing, tokenization, embeddings, and search stay inside the company perimeter.

## Vector layer and hybrid search

The stack splits storage by purpose. High-density vector indexes carry meaning, relational databases carry exact facts and access rights. Semantic similarity is computed once during indexing and never recalculated per request.

| Criterion | Vector layer (Qdrant / pgvector) | Full-text search |
| --- | --- | --- |
| Retrieval | Nearest vectors by cosine distance | Keyword match, stemming, synonym dictionaries |
| Synonyms | High: the meaning matches, the term does not | None, until a synonym is added by hand |
| p99 latency | Steady milliseconds on an HNSW graph | Grows with the number of query conditions |
| Data access | Fragments stay inside the perimeter | The whole database leaves on an external query |
| Cost of a miss | A relevant chunk is skipped | A silent absence of exact match |

Hybrid search (dense + sparse) on Qdrant or the pgvector extension reads a query from two sides at once: it takes the deep meaning of the wording and separately catches exact identifiers such as part numbers, dates, and proper nouns. That removes a pair of typical failures: vector search misses the part number, full-text search misses the synonym.

Chunking deserves its own mention. A fragment that is too small breaks context ("subject to the terms of the contract" with no contract attached), and one that is too large drags spare tokens into the prompt and blurs the model's attention. We split documents along their structure rather than at a fixed character count, and we re-read a sample of the chunks by hand once per sprint.

## Semantic caching

The main lever on operating cost is semantic caching. A key-based cache is invalidated by an extra space in the query, so a repeated question on the same topic goes to the model again. A semantic cache compares queries as vectors.

> "How do I set up the CRM integration?" and "Instructions for connecting a CRM system" are different strings with the same meaning.

With a similarity threshold above 0.95 those queries collapse into one, and the user gets a previously generated answer from memory. On traffic with real repetition (support, regulations, standard integrations) 70–80% of requests are intercepted: external inference is unloaded, and the answer comes back in fixed milliseconds instead of a network call to the provider.

The cache has a cost that shows up in incidents. Two questions about different entities can produce close vectors, and the cache returns a stale answer. So the threshold stays high, every hit is logged, and when a document gets a new revision you invalidate the affected cache version, not the whole cache. In a product with no repetition the cache is dead weight: it adds a vector search and returns nothing.

## Tracing instead of guessing

We build observability into the stack from day one, otherwise you reconstruct the economics from the provider invoice. Langfuse collects the chain for every request: incoming query → embedding → vector search → prompt assembly → inference → answer.

Four things become visible from that chain, and invisible without it:

* **Cache hit rate.** Whether the repetition hypothesis holds at all.
* **p99 per step, not per sum.** Where the latency actually accumulates: in embedding, in search, or on the network to the provider.
* **Cost of a dialog in tokens.** Counted per step, so growth shows up the day it happens.
* **Share of answers with no retrieved source.** The most honest metric there is. If 90% of answers cite no specific chunk, the model is answering from memory and the stack did not stop it.

## What leaves the perimeter

We keep all parsing, tokenization, and vector search logic inside a private cloud perimeter. Text chunks leave it only after personal data has been removed. A private perimeter with de-identification is a part of AI infrastructure, built for the task. [AI Infrastructure & RAG design](https://loginai.ru/en/services/ai-infrastructure).

De-identification is an ongoing process. Regular expressions catch email addresses and phone numbers, but they do not catch free text, so the rules are paired with manual sampling. There is no absolute guarantee here, and we do not promise one to a regulator. We promise something else: personal data does not reach the external call, and the tracing logs show it rather than an assertion.

## What you actually gain

The main result is a predictable bill and a traceable path for every answer. You know exactly which 3–4 fragments went to the model, what it cost, how long it took, and which step failed. A month of work goes into indexing and data cleanup, and that is the most underestimated part of the project. After it, the token bill stops being a blind bet.
