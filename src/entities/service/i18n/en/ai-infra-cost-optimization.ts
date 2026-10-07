export const ai_infra_cost_optimizationEn = {
  ctaBanner: {
    title: "Let's price your token bill",
    text: "Send a month of call logs or access to the traces. We'll show where the budget goes and estimate the saving in two days.",
    buttonLabel: "Request an audit",
  },
  navTitle: "AI infrastructure and token optimization",
  title: "Optimizing AI infrastructure and token cost",
  tagline: "We measure where tokens go and cut the bill without losing answer quality.",
  description:
    "We break down LLM load step by step, find repeated and redundant calls, and add caching, batching, and model routing. The inference bill drops and quality stays put.",
  features: [
    {
      title: "Step-by-step audit",
      text: "We break down the request chain: where tokens go to a useful answer and where to resending context.",
    },
    {
      title: "Semantic cache",
      text: "Repeated questions are answered from memory instead of an external call, with a cache version per document.",
    },
    {
      title: "Model routing",
      text: "Simple phrases go to a cheap model, complex requests to a strong one, by rules in the code.",
    },
    {
      title: "Budget and alerts",
      text: "A per-project limit and an alert when cost grows the same day, not in the bill at month end.",
    },
  ],
  techStack: [
    {
      subtitle: "Metrics, cache, and inference",
      description:
        "Per-step cost is collected by [Langfuse], the cache lives in [Redis], inference is served by [vLLM], metrics come from [Prometheus], and history is stored in [PostgreSQL].",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Traces every chain: cost, latency, and token count per step are visible, not just the total.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Holds the semantic cache: a repeated question is answered from memory in milliseconds.",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary:
            "An inference server with batching and attention caching: it keeps a local model under load.",
        },
        {
          id: "prometheus",
          name: "Prometheus",
          glossary:
            "Scrapes cost and latency metrics: growth shows up before the provider invoice.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores cache versions and call history: the saving before and after is computed from them.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Profiling",
      text: "We collect calls for a period and break them down: input tokens, output tokens, repeats, and cache share.",
      processType: "analysis",
    },
    {
      title: "Optimization plan",
      text: "We fix where to cut: cache, batching, routing, and prompt compression, with an effect estimate.",
      processType: "system-design",
    },
    {
      title: "Implementation",
      text: "We add cache and routing and move part of the calls to a local model without breaking answers.",
      processType: "implementation",
    },
    {
      title: "Budget control",
      text: "We turn on limits and alerts, compare the bill before and after, and record the saving in numbers.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Call logs exist",
      text: "They show per-step spend; without logs we turn on tracing first.",
      positive: true,
    },
    {
      title: "Steady load",
      text: "Repeated requests get cached and routed; the effect shows in the second week.",
      positive: true,
    },
    {
      title: "A one-off experiment",
      text: "With dozens of calls a month, optimization does not pay off.",
      positive: false,
    },
    {
      title: "No metrics collected",
      text: "If cost and latency are not measured, we add observability first.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Support and policy base",
      text: "After caching and routing, external calls dropped while answer quality stayed the same.",
      metricValue: "−55%",
      metricLabel: "of the token bill",
    },
  ],
  faqItems: [
    {
      question: "Will quality drop?",
      answer:
        "We measure answer metrics before and after. Cache and routing leave complex requests alone, so any drop shows at once and is rolled back.",
    },
    {
      question: "How long does the audit take?",
      answer: "Profiling for a period takes two days; the optimization plan takes a week.",
    },
    {
      question: "Do you need production access?",
      answer: "Call logs and metrics are enough. We touch production only during the rollout.",
    },
    {
      question: "What if there is no saving?",
      answer: "We show the estimate before the rollout. If there is no effect, we do not start.",
    },
    {
      question: "How fast does optimization pay off?",
      answer:
        "We estimate payback on your call profile: cost before and after, works included. Under steady load the effect shows in the first weeks; for a one-off we say honestly that it will not pay off.",
    },
    {
      question: "What does the audit include?",
      answer:
        "The audit covers a per-step call profile, a cost map by model and prompt, an optimization plan, and an effect estimate in money. It is a report with numbers you can decide on, not generic advice.",
    },
    {
      question: "Is a local model required?",
      answer:
        "No. Local inference matters when volume cost or data confidentiality demands it. If the cloud covers the tasks cheaper, we keep the cloud and optimize the calls.",
    },
  ],
  tradeoffs: [
    {
      title: "Resending context",
      text: "The model rereads history and documents on every step, and you pay for it again. Resending context is the main line of the bill.",
    },
    {
      title: "A strong model on simple phrases",
      text: "Greetings, clarifications, and typos are handled by a strong model where a cheap one would do. An oversized model on simple phrases inflates the budget.",
    },
    {
      title: "An uncompressed prompt",
      text: "Fragments spare for the answer land in the context, and every one of them costs tokens. Prompt compression removes that spend and lowers the bill.",
    },
    {
      title: "A missing cache",
      text: "The same policy question goes to the provider again although the answer already existed. A cache answers from memory and removes repeated calls.",
    },
    {
      title: "A cache needs repeats",
      text: "In a product where questions repeat rarely, a cache only adds a vector search. A cache pays off where similar requests come back regularly.",
    },
    {
      title: "Chunk size to the document",
      text: "A chunk that is too small breaks context and one that is too large drags spare tokens. We tune chunk size to the document to keep meaning and cost in balance.",
    },
    {
      title: "Routing needs labeling",
      text: "An engineer sets which requests count as simple, and someone has to maintain those rules. Routing needs labeling and a regular review of the rules.",
    },
    {
      title: "Saving and quality",
      text: "If the task needs the strong model, the cheap one gives a worse answer. Saving and quality are linked, and metrics show the line where cutting stays safe.",
    },
  ],
  mechanism: [
    {
      title: "Call profile",
      text: "We break the calls down step by step: input and output tokens, repeats, and cache share. The profile shows exactly where the budget goes.",
    },
    {
      title: "Routing and cache",
      text: "Simple requests go to a cheap model and the semantic cache, while complex ones stay with the strong model. An engineer sets the routing rules.",
    },
    {
      title: "Measurement before and after",
      text: "We measure answer metrics and cost on one task set before and after the change, so the effect shows up in real numbers. The same tasks make the comparison honest.",
    },
    {
      title: "Budget control",
      text: "Budget control goes in with the optimization: limits and cost alerts show growth on the day of a spike. You see the overrun the same day it appears, and the month-end bill confirms it.",
    },
  ],
  deliverables: [
    {
      title: "A call profile report",
      text: "The output is a per-step call table with tokens, repeats, and cache share. It shows every source of spend without a manual log dig.",
    },
    {
      title: "A cost map",
      text: "We count the cost per model and prompt, so you see which part of the bill adds value and which goes to repeats.",
    },
    {
      title: "A work plan",
      text: "We fix what changes: cache, batching, routing, and prompt compression. The plan sets the order of work and the expected effect in money.",
    },
    {
      title: "A saving measurement",
      text: "We compare the bill before and after on one task set and show the saving in money. The measurement rests on your calls and your rates.",
    },
  ],
};
