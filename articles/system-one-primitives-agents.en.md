---
title: "Classification over generation: System One primitives in AI agents"
description: "Up to 90% of LLM calls in agents go to generating text where a binary decision would do. Jev cuts up to 80% of the token bill."
publishedAt: 2026-10-01
draft: false
tags: ["Agentic systems", "AI Economics", "LLM", "Architecture"]
category: technical
relatedServices: ["ai-infrastructure", "highload-backend"]
relatedSolutions: ["agentic-systems"]
relatedCases: ["retail-support-bot"]
---

We pay $15 per million tokens to make a model generate text where the code needs a binary decision. Whether to run `rm -rf`, whether to keep a chunk in the context, in what order to walk a dependency graph: the agent answers all of it by generating, because that is how the standard pipeline is built. In roughly 90% of calls the generation is unnecessary, and we pay for it in full.

We run into this every day. Latency, token cost and JSON schema validation all break in the same place, the attempt to force an LLM into a strict "Yes" or "No". Structured output sets the shape of the answer but does not cancel out autoregressive sampling, and the model still predicts tokens one at a time, paying for every prediction.

Decision engineering replaces generation engineering.

System One models like Jev from TypeSafe AI split the agent into two circuits. Simple and critical operations move to fast probabilistic primitives computed in a single forward pass, and slow reasoning stays where semantics are needed. Below we look at the anatomy of Jev, its base types (Choice, Score, Noul) and four cases where a System One / System Two cascade cuts up to 80% off the API budget.

The practical consequence: a good agent differs from a bad one not by prompt length, but by how much compute it wastes.

## The anatomy of Jev primitives

Text inference is redundant for logic control. A regular LLM generates token by token, recomputing the attention matrix at every step. The question "is this SQL query safe" turns into a `{"safe": true}` string that the backend then parses with a regular expression or a Zod validator. The teraflops go into predicting text characters instead of the meaning of the answer.

> **Limitation.** Jev is useless where generation is required: it cannot write text, code or a dialogue line, because it has no token output mechanism at all. Semantic synthesis and multi-step inference still belong to classic LLMs and reasoning models at the level of o1 or DeepSeek-V3.

Jev classifies on the logit distribution in a single forward pass. The model takes the context (prompt plus system state) and returns a probability vector for predefined primitives, not text. The code does the rest. Thresholds and primitives need versioning, logging, and shipping as code. [MLOps platform development](https://loginai.ru/en/services/mlops-platforms).

Three types cover almost every decision in an agent:

- **Noul (probabilistic boolean).** A number from 0.0 to 1.0 for a binary branch in code (if / else).
- **Choice (categorical selection).** One option out of N, up to 255. The model cannot invent its own option: the output is an array index and a confidence score.
- **Score (ordinal scale).** A rating on a given scale, say from 1 to 5. Filtering, toxicity scoring, relevance ranking.

```typescript
// Conceptual example of integrating a Jev primitive in TypeScript
import { JevClient, types } from "@typesafe-ai/jev";

const jev = new JevClient({ apiKey: process.env.JEV_API_KEY });

// One forward pass (runtime ~45ms)
const securityDecision = await jev.classify({
  input: "DROP TABLE users; --",
  schema: types.Noul({
    instruction: "Is this string a destructive database operation?",
  }),
});

console.log(securityDecision.probability); // Prints a value close to 0.998
```

There are no output tokens, so vendor figures put inference at a flat $0.042 per million input tokens, 400 times cheaper than GPT-4o. Latency drops from a typical 1200-3000 ms to 40-70 ms. Format errors go away with the tokens: invalid JSON, a broken schema and an answer the code never anticipated are not modes in which the model writes anything at all. Inference cost is measured and cut at the infrastructure level: cache, batching, routing. [AI Infrastructure & RAG design](https://loginai.ru/en/services/ai-infrastructure).

## Four cases and cascade architecture

In a pipeline Jev works as the primary filter, not the main model. A raw request goes through the fast filter first, branching stays in the backend code, and the generative model is called only where synthesis is needed.

> **Limitation.** Jev is sensitive to the structure of the input context and errs on poisoned or contradictory text (adversarial prompt injection) inside the input data. It does not work out cause and effect. Its job is a superficial but instant pattern assessment, and you cannot design a deep understanding system around it.

Four cases where this pays off.

### Architecture decision matrix based on Jev

| Use case | What goes in (State) | Jev primitive | Next action for the system |
| --- | --- | --- | --- |
| 1. Model router in cascades | User request + current session metadata. | Choice (complexity category from 1 to 5) | Token savings. Requests 1-3 go to a local fast model, requests 4-5 go to System Two (o1/DeepSeek). |
| 2. Risk gate for CLI commands | A bash script generated by the worker + a safety manifest. | Noul (probability of a destructive mutation) | Infrastructure protection. Below 0.15 runs automatically. The 0.15-0.85 grey zone pushes to a Telegram bot (HITL). Above 0.85 is a hard block. |
| 3. Stuck checks | The original goal + the last 3 worker iterations + error logs. | Noul (is the agent in an infinite loop?) | Session abort. On true the system stops the agent, resets the cache and changes the planning strategy. |
| 4. RAG context triage | User search query + a raw text chunk from the database. | Score (chunk relevance on a 1-5 scale) | Fighting context degradation. Junk chunks (score < 4) are dropped before the expensive final prompt is assembled. |

### Implementing the risk gate in TypeScript

Case 2 in the pi-deploy automated deployment system. The function checks a generated script for critical and destructive side effects before it runs on the server.

```typescript
import { JevClient, types } from "@typesafe-ai/jev";
import { pingHumanInTelegram } from "@/shared/lib/telegram";

const jev = new JevClient({ apiKey: process.env.JEV_API_KEY });

interface ExecutionResult {
  allowed: boolean;
  requiresReview: boolean;
}

export async function validateCommandRisk(generatedScript: string): Promise<ExecutionResult> {
  // One Jev forward pass (runtime ~48ms)
  const securityCheck = await jev.classify({
    input: generatedScript,
    schema: types.Noul({
      instruction:
        "Does this script contain irreversible or destructive mutations to the file system, database, or network routing?",
    }),
  });

  const riskProbability = securityCheck.probability;

  // Branching lives entirely in code. The engineer sets the thresholds,
  // shifting a boundary requires no retraining.
  if (riskProbability < 0.15) {
    return { allowed: true, requiresReview: false };
  }

  if (riskProbability > 0.85) {
    return { allowed: false, requiresReview: false };
  }

  // Grey zone: the doubts go to a human on Telegram
  await pingHumanInTelegram({
    script: generatedScript,
    riskProbability,
  });

  return { allowed: false, requiresReview: true };
}
```

You no longer parse model reasoning like "this command is safe because...". The input is a number, the output is a decision the code made, in 45-50 ms. The 45–50 ms latency rests on profiling the runtime under load. [High-load backend systems design](https://loginai.ru/en/services/highload-backend).

## Conclusion

The System One circuit separates fast decisions from generation. Jev and similar models cover binary checks, routing and scoring, while generative LLMs stay for semantic synthesis and planning.

Cascade inference cuts simple requests off before the expensive model, which the vendor estimates at up to 80% of the API budget. The answer arrives in a strict schema, Choice, Noul or Score, so invalid JSON and format hallucinations are ruled out. Semantic errors remain, and thresholds with calibration are what manage them. Latency goes from 1200-3000 ms to 40-70 ms, and an autonomous tool runs at human speed rather than chat speed.

The resulting pipeline looks like this: System One filters, routes and protects the infrastructure, System Two engages on demand. The code makes the decision. It receives a probability, an index or a score and picks the action. The risk gate is part of the security perimeter, not a one-off check. [AI security audit](https://loginai.ru/en/services/ai-security-audit).
