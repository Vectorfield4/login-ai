export const aiApplicationRescueEn = {
  ctaBanner: {
    title: "Let's review the project",
    text: "Send access to the repository and pilot metrics: over two calls we find where the project lost its result.",
    buttonLabel: "Discuss the rescue",
  },
  navTitle: "AI project rescue",
  title: "AI project rescue",
  tagline: "We diagnose a stalled AI project: errors, cost, and a six-week restart plan.",
  description:
    "We review code, data, model, and pilot economics. We find why the result falls short of the plan and deliver a restart plan with metrics and budget.",
  features: [
    {
      title: "Diagnostics",
      text: "We review code, architecture, and integrations. We record where the project loses quality, speed, or money.",
    },
    {
      title: "Quality assessment",
      text: "We build a test set from real requests and measure model quality. We compare the result with the pilot promise.",
    },
    {
      title: "Cost",
      text: "We break down the model, infrastructure, and support bill. We show which costs grow with load.",
    },
    {
      title: "Restart plan",
      text: "We turn fixes into stages with metrics and budget. The plan shows what delivers a result in six weeks.",
    },
  ],
  techStack: [
    {
      subtitle: "Audit and restart",
      description:
        "We read traces in [Langfuse], replay requests through [OpenAI API], check the pipeline on [Python], and store metrics in [PostgreSQL].",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary:
            "The audit language: it replays requests, computes metrics, and builds a test set from logs.",
        },
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary:
            "The pilot model: we test answer quality and request cost before and after fixes.",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Request tracing: it shows where an answer loses quality and which steps take time.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores the test set, metrics, and versions: the restart result compares against the original pilot.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Access and interviews",
      text: "We get access to code, logs, and metrics. We talk to the team and the product owner.",
      processType: "discovery",
    },
    {
      title: "Audit",
      text: "We review the model, data, integrations, and infrastructure. We record why the result diverges from the plan.",
      processType: "analysis",
    },
    {
      title: "Metrics",
      text: "We build a test set and measure quality. We compare request cost with the pilot budget.",
      processType: "system-design",
    },
    {
      title: "Restart",
      text: "We present the plan to the sponsor and start the first stage. Metrics are fixed before work begins.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "The pilot is stalled",
      text: "The project has run for three months or more, and metrics stay flat. It needs an outside review and a plan.",
      positive: true,
    },
    {
      title: "Logs and metrics exist",
      text: "The team collects requests and responses. We use that data to measure quality and cost instead of guessing.",
      positive: true,
    },
    {
      title: "No code access",
      text: "The audit rests on code and logs. Without access we have interviews and external metrics, and findings become hypotheses.",
      positive: false,
    },
    {
      title: "Development only",
      text: "When the task is to add a feature to a working product, regular development fits. A rescue starts with diagnostics.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How much does a rescue cost?",
      answer:
        "The audit starts at RUB 400,000 and covers diagnostics, quality assessment, and a restart plan. First-stage development is priced separately.",
    },
    {
      question: "How long is the audit?",
      answer:
        "Ten business days for two systems and one model. The timeline grows with many integrations and missing logs.",
    },
    {
      question: "What if the project should close?",
      answer:
        "The report includes a stop scenario: support cost and what can be reused. The sponsor makes the decision.",
    },
    {
      question: "Do you take over the project?",
      answer:
        "We can run the first restart stage or hand the plan to your team. Code and access stay with you.",
    },
  ],
  scope: [
    {
      title: "Model",
      text: "We review the model, prompts, and versions. We find which requests produce a poor answer and how quality changes after fixes.",
    },
    {
      title: "Data",
      text: "We review sources, labelling, and data refresh. We check whether the examples support the claimed quality.",
    },
    {
      title: "Economics",
      text: "Economics covers request, infrastructure, and support cost. We compare spending with the budget and the promised effect.",
    },
    {
      title: "Team",
      text: "The team review covers roles, the release process, and product ownership. We record which decisions the restart needs.",
    },
  ],
  tradeoffs: [
    {
      title: "Diagnosis",
      text: "The diagnosis rests on code, logs, and interviews. With incomplete logs, some findings rest on metrics and need a check in the next sprint.",
    },
    {
      title: "Restart",
      text: "A restart needs a sponsor decision and team commitment. We provide the plan and can run the first stage, while the business keeps priority.",
    },
    {
      title: "Project boundaries",
      text: "The audit shows causes and a plan. We price development, model purchase, and support as a separate project.",
    },
  ],
  deliverables: [
    {
      title: "Report",
      text: "The report lists the causes of the gap and backs them with code, logs, or metrics. Every cause has a priority.",
    },
    {
      title: "Assessment",
      text: "The assessment shows quality and cost on the test set. You see the result the current version delivers.",
    },
    {
      title: "Plan",
      text: "The restart plan splits fixes into six weeks with metrics and budget. Every stage has an owner.",
    },
  ],
  mechanism: [
    {
      title: "Audit",
      text: "We read code and traces, replay requests, and talk to the team. The audit shows where quality is lost: in data, prompts, integration, or infrastructure.",
    },
    {
      title: "Metrics",
      text: "We build a test set from logs and measure the current version. The metrics give a baseline, so the restart effect is measured on the same requests.",
    },
    {
      title: "Restart",
      text: "The restart plan turns findings into stages with metrics and budget. The first stage runs six weeks, and the sponsor sees which result counts as success.",
    },
  ],
  outcomes: [
    {
      title: "10 days of audit",
      value: "10",
      text: "The audit takes 10 business days. In that time the team gets a report, an assessment, and a restart plan.",
    },
    {
      title: "6 weeks",
      value: "6 wk",
      text: "The restart plan covers six weeks. It includes stages, metrics, and the budget of the first scope.",
    },
    {
      title: "3 scenarios",
      value: "3",
      text: "The restart compares three scenarios: fix the current scope, rebuild part of it, or stop the project. Each has a price and risk.",
    },
  ],
};
