---
title: "Conversational BI: Two-Layer LLM Agent Architecture with a Semantic Layer"
description: "How to overcome Text-to-SQL barriers (hallucinations, security risks, and high query costs) using a two-layer architecture of Intent LLM and Smart LLM with a semantic layer."
publishedAt: 2026-09-26
readingTimeMin: 6
tags: ["Agentic systems", "LLM", "Data BI", "Architecture"]
relatedServices: ["software-development"]
relatedSolutions: ["agentic-systems"]
relatedCases: []
---

Implementing generative AI in corporate analytics has long followed a dead-end path of direct code generation (Text-to-SQL) by a single monolithic language model. In practice, this approach faces three barriers: hallucinations in enterprise metrics, security risks of SQL injections, and high query costs when handling simple dialog phrases with an expensive model.

An effective solution is transitioning to multi-agent systems with separated responsibilities and a deterministic data contract. Below is the conceptual architecture of a Conversational BI system built on Intent LLM, Smart LLM, Semantic Layer, and Data Analysis Layer.

## Conceptual Architecture Overview

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

## Detailed Breakdown of Layers and Responsibilities

### 1. Dispatch Layer (Intent LLM)
This layer acts as the front office. Its main task is fast filtering of incoming requests and maintaining conversation context.

* **Model Class:** Lightweight, fast model with low token cost (GPT-4o-mini or local Llama-3-8B).
* **Session Memory:** Stores chat history. If a user asks about Moscow first and then writes "what about by developer?", the Intent LLM joins the context.
* **Knowledge Base (RAG):** Stores system constraint instructions on what topics the system should not discuss.
* **Capabilities Registry:** Holds a high-level list of tools. It knows the system handles analytics (metrics, dimensions, comparisons) but does not know exact table or column names.
* **Workflow:** If the user request is a greeting or small talk, the model answers directly. Once an analytical intent is detected, the model triggers a Tool Calling action and passes the task to Layer 2.

### 2. Analytics Layer (Smart LLM)
The back-office layer, isolated from direct user communication. Its sole task is converting human speech into a strict data structure.

* **Model Class:** Heavy, reasoning-capable model (GPT-4o or DeepSeek-V3) tuned for Structured Output.
* **Entity Extraction:** Deconstructs the user query into analytical cube components:
    * **Metrics:** Revenue, profit, EBITDA, sales volume.
    * **Dimensions:** City, region, area, developer.
    * **Filters:** Nearby metro (true), construction date (> 2024), completed (false).
    * **Comparisons:** Year-over-Year (YoY), Month-over-Month (MoM).
* **Output Contract:** Generates strictly valid JSON matching a defined schema. No free-form text.

### 3. Semantic Layer
A critical component implemented in classic backend code (without AI). Acts as a security and business logic gateway.

* **Startup Registration:** Upon startup, the backend scans the database or config files to populate agent prompts with the allowed parameter matrix.
* **Business Logic Validation:** Validates parameter compatibility in the JSON received from Smart LLM. If an invalid combination is generated, the semantic layer intercepts the error without querying the database.
* **Security:** Model access to database structure is restricted, operating only on abstract terms. The semantic layer generates a safe parameterized SQL query.

### 4. Data Analysis Layer
The final aggregation stage. The semantic layer executes the safe query in the DWH/OLAP cube (ClickHouse, PostgreSQL, Greenplum) and returns raw tabular data.

## Request Lifecycle (Data Flow)

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

## Architectural Benefits

* **Predictability:** The model instructs the semantic layer on what parameters to extract. It never computes values directly, which prevents hallucinations. An invalid query triggers a controlled system error.
* **Cost Optimization (TCO):** Routing routine dialogues to a lightweight Intent LLM saves up to 60% on API token budgets.
* **Database Isolation:** Direct query access from the language model to database commands is blocked, eliminating SQL injection risks.
* **Scalability:** Schema updates require updating only the semantic layer mapping without retraining or re-prompting LLMs.
