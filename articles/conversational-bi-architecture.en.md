---
title: "Conversational BI: Two-Layer LLM Agent Architecture with a Semantic Layer"
description: "How to overcome Text-to-SQL barriers (hallucinations, security risks, and high query costs) using a two-layer architecture of Intent LLM and Smart LLM with a semantic layer."
publishedAt: 2026-09-26
draft: false
readingTimeMin: 6
tags: ["Agentic systems", "LLM", "Data BI", "Architecture"]
category: technical
relatedServices: ["software-development"]
relatedSolutions: ["agentic-systems"]
relatedCases: []
---

Implementing generative AI in corporate analytics has long followed a dead-end path of direct code generation (Text-to-SQL) by a single monolithic language model. In practice, this approach faces three barriers: hallucinations in enterprise metrics, security risks of SQL injections, and high query costs when handling simple dialog phrases with an expensive model.

An effective solution is transitioning to multi-agent systems with separated responsibilities and a deterministic data contract. Below is the conceptual architecture of a Conversational BI system built on Intent LLM, Smart LLM, Semantic Layer, and Data Analysis Layer. Chat over BI hits the layer that predicts, not just reads data. [Predictive analytics systems](https://loginai.ru/en/services/predictive-analytics-systems).

## Conceptual architecture overview

The architecture distributes load among specialized components. A single model cannot handle user dialogue, session context, database schema, and code generation simultaneously. The system splits these tasks across two LLM layers and a software wrapper.

```text
       [ User ]
               │
               ▼ (1. Natural language: "What is the revenue by developer YoY?")
┌──────────────────────────────────────────────┐
│          1. Dispatch Layer                   │
│                (Intent LLM)                  │
├──────────────────────────────────────────────┤
│ • Context memory and user session            │
│ • Topic constraints (Local RAG)              │
│ • Capabilities Registry                      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼ (2. Routing: analytical intent only)
┌──────────────────────────────────────────────┐
│            2. Analytics Layer                │
│                (Smart LLM)                   │
├──────────────────────────────────────────────┤
│ • Input entity validation                    │
│ • Extraction: Metrics, Dimensions, Filters   │
│ • Structured Output Generation (Strict JSON) │
└──────────────────────┬───────────────────────┘
                       │
                       ▼ (3. Deterministic JSON contract)
┌──────────────────────────────────────────────┐
│           3. Semantic Layer                  │
│            (Semantic Layer / API)            │
├──────────────────────────────────────────────┤
│ • Parameter combination validation           │
│ • Dynamic safe query assembly                │
│ • Data Analysis Layer orchestration          │
└──────────────────────┬───────────────────────┘
                       │
                       ▼ (4. Safe SQL / DWH Execution)
┌──────────────────────────────────────────────┐
│         4. Storage & Calculation Layer       │
│             (Data Storage & OLAP)            │
└──────────────────────────────────────────────┘
```

## Detailed breakdown of layers and responsibilities

### 1. Dispatch layer (Intent LLM)
This layer acts as the front office: it filters the incoming request stream and keeps the conversation context. A lightweight model with a low token cost fits here (GPT-4o-mini or local Llama-3-8B). It stores chat history, so if a user asks about Moscow first and then writes "what about by developer?", the layer joins both requests into one context. A local knowledge base holds instructions on topics the system must not answer, and a capabilities registry keeps the high-level tool list: the model knows the system handles analytics but never sees table or column names. On a greeting or small talk the layer answers directly; once it detects an analytical intent it triggers a Tool Calling action and passes the task to the second layer.

### 2. Analytics layer (Smart LLM)
This is the back office, isolated from direct user communication. Its sole task is turning human speech into a strict data structure. A heavy, reasoning-capable model works here (GPT-4o or DeepSeek-V3), tuned for Structured Output. The query splits into four parts of the data cube: metrics (revenue, profit, EBITDA, sales), dimensions (city, region, developer), filters (nearby metro, construction date, completion status), and comparisons (year over year, month over month). The output is strictly valid JSON against a defined schema, with no free-form text.

### 3. Semantic layer
This is a critical component in classic backend code, without AI. It acts as the security and business logic gateway. On startup the backend scans the database or config files and loads the allowed parameter matrix. The JSON received from Smart LLM is checked for parameter compatibility: if a combination is invalid, the layer intercepts the error before the database is queried. Model access to the database structure stays closed, the model operates on abstract terms, and the layer itself generates a safe parameterized SQL query.

### 4. Data analysis layer
The final aggregation stage. The semantic layer executes the safe query in the DWH/OLAP cube (ClickHouse, PostgreSQL, Greenplum) and returns raw tabular data. Metrics live in the ERP, not the BI cube; the integration decides where they come from. [AI and ERP integration](https://loginai.ru/en/services/ai-erp-integration).

## Request lifecycle (data flow)

1. **User asks:** "What is the revenue by developer in Moscow YoY?"
2. **Intent LLM** identifies analytical intent, resolves context, and forwards the cleaned query to Layer 2.
3. **Smart LLM** processes the text and generates typed JSON:
    ```json
    {
      "metrics": "Revenue",
      "dimensions": ["developer"],
      "filters": [
        {"field": "city", "operator": "EQUALS", "value": "Moscow"}
      ],
      "comparison": "YoY"
    }
    ```
4. **Semantic Layer** intercepts JSON, validates parameter rules, builds a safe SQL query, and queries the database.
5. **Database** executes calculations and returns raw figures.
6. **Reverse Flow:**
    * Raw data returns to **Smart LLM**, which adds natural language insight and UI visualization metadata (`{"ui_component": "LineChart"}`).
    * **Intent LLM** delivers the final response with a chart widget and explanation.

## Architectural benefits

The model passes query parameters to the semantic layer and never computes values itself, so the numbers are predictable and an invalid query returns an error instead of a hallucination. By our logs, roughly a third of messages in corporate chats are greetings, clarifications, or typos, and routing them to the cheap Intent LLM saves up to 60% of the token budget. Direct access from the language model to database commands is closed, which removes the SQL injection risk. A schema change needs no retraining: updating the semantic layer mapping is enough. The two-layer scheme is a build project: the semantic layer, the API, and request orchestration. [Custom software development](https://loginai.ru/en/services/software-development).

## Limitations

The semantic layer is not a one-time setup. When the DWH structure changes, the mapping is updated by hand, and without an owner it drifts out of date within a few releases. The set of available queries is limited to the described matrix: an ad-hoc question outside it is not executed even when the data exists.

The intent classifier errs on new metric phrasings. If users start calling revenue "turnover", some requests route to the wrong layer and have to be re-annotated. Two models instead of one also produce two bills. The cheap Intent LLM does not cancel the Smart LLM spend on complex queries, so the saving holds on streams where simple phrases are about a third of the traffic.
