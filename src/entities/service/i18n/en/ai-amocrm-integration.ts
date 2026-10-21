export const aiAmocrmIntegrationEn = {
  ctaBanner: {
    title: "Let's show the assistant on your amoCRM pipeline",
    text: "Send a pipeline export or access to a test environment. We'll build a pilot on your deals.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI integration with amoCRM",
  title: "AI assistant for amoCRM: leads, deals, and conversations",
  tagline:
    "The assistant moves a lead through the amoCRM pipeline, keeps deal context, and hands the dialog to a manager with a transcript.",
  description:
    "We connect an AI assistant to amoCRM: it reads leads and conversations, qualifies requests, updates the card and task once, and hands the manager a transcript, a reason, and the next step.",
  features: [
    {
      title: "Lead and deal context",
      text: "The assistant pulls the conversation history, deal stage, amount, owner, and past tasks from amoCRM. Context comes from fields and notes, so the conversation starts from facts.",
    },
    {
      title: "Qualification and follow-up",
      text: "The assistant asks questions from your script, records budget, timeline, role, and interest, then sends a follow-up in chat or email. Every answer lands in the lead fields.",
    },
    {
      title: "One card and one task",
      text: "The outcome is written to amoCRM once: the assistant adds a note, moves the stage, and creates a task. Chat and call stay on one deal.",
    },
    {
      title: "Handoff with context",
      text: "On escalation the manager gets the transcript, the reason for handoff, and the next step. The dialog continues from the point where the customer stopped.",
    },
  ],
  techStack: [
    {
      subtitle: "amoCRM and the event flow",
      description:
        "The assistant reads leads and deals from [amoCRM] through the API and webhooks, events move through [Kafka], [Redis] holds the dialog state, scenarios run on [Python], and a snapshot of the cards sits in [PostgreSQL].",
      technologies: [
        {
          id: "amocrm",
          name: "amoCRM",
          glossary:
            "A sales CRM: the assistant reads leads, deals, and conversations through the API and subscribes to stage-change webhooks.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: it delivers deal changes and assistant replies in order, so every event reaches a scenario once.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores a snapshot of the cards, the stage history, and the assistant action log, so the team sees what was written to a deal.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Holds the active dialog state and the message queue, so the assistant answers in milliseconds under a peak pipeline load.",
        },
        {
          id: "python",
          name: "Python",
          glossary:
            "The scenario language: it holds the qualification rules, model calls, and amoCRM response handling in one service.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Pipeline audit",
      text: "We review the pipelines, stages, and required fields. We mark where the assistant reads a lead, which fields it changes, and when it hands the dialog to a manager.",
    },
    {
      title: "Data and permission model",
      text: "We describe how amoCRM entities map onto the assistant schema, the lead dedup rule, and the technical account rights. We fix the fields open for reading and writing.",
    },
    {
      title: "Integration and scenarios",
      text: "We connect the amoCRM API and webhooks, build qualification, follow-up, and handoff scenarios. Each scenario runs on a test pipeline before launch.",
    },
    {
      title: "Pilot and launch",
      text: "For two weeks the assistant works on real leads in a limited pipeline. We measure qualified requests, tasks, and card edits, then move the scenarios to production from week four.",
    },
  ],
  fitItems: [
    {
      title: "amoCRM with an API and webhooks",
      text: "The assistant connects to your pipeline directly: it reads leads and deals, receives stage-change events, and writes the result to the card.",
      positive: true,
    },
    {
      title: "A sales process with an owner",
      text: "The pipeline has an owner who sets the stages and required fields. The process owner approves the qualification rules and signs off on the pilot.",
      positive: true,
    },
    {
      title: "A CRM without an API",
      text: "If the cards live in spreadsheets or a custom database without an API, data migration comes first. The assistant connects after the move.",
      positive: false,
    },
    {
      title: "Automatic discounts and money decisions",
      text: "A manager confirms discounts, refunds, and write-offs. The assistant collects arguments and prepares the calculation, while the money decision stays with a person.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Agentic support for an online store",
      text: "In the retail-support-bot case the assistant pulled the order and customer history from the CRM before the first reply and created a manager task on disputed amounts. 82% of requests closed without an operator.",
      metricValue: "−70%",
      metricLabel: "time spent handling a request",
    },
  ],
  faqItems: [
    {
      question: "Which channels connect?",
      answer:
        "Website chat, email, Telegram, and WhatsApp. Every channel arrives through its API and webhooks and lands on one deal.",
    },
    {
      question: "How does the assistant handle duplicate leads?",
      answer:
        "Before it writes, it looks for matches by phone, email, and company name. We fix the dedup rule during the audit and log every merge.",
    },
    {
      question: "How long does the rollout take?",
      answer:
        "The pilot takes two weeks on one pipeline. The launch with several scenarios and channels starts in week four.",
    },
    {
      question: "What does a manager get on handoff?",
      answer:
        "The dialog transcript, the escalation reason, the collected fields, and the next step. The manager continues the conversation without repeat questions.",
    },
  ],
  tradeoffs: [
    {
      title: "Pipeline setup quality",
      text: "Assistant accuracy rests on labeled stages and required fields. During the audit we fix the pipeline schema, and consistent cards give the model precise context.",
    },
    {
      title: "amoCRM API limits",
      text: "amoCRM sets quotas on requests per second. We queue the writes through Kafka, keep the peak within the quota, and update cards at an even pace.",
    },
    {
      title: "Money decisions stay with a manager",
      text: "A person confirms discounts, refunds, and write-offs. The assistant gathers context, prepares the calculation, and creates a task, while the final word stays with the manager.",
    },
  ],
  deliverables: [
    {
      title: "Pipeline and field map",
      text: "After the audit you get the pipeline schema, the list of fields for reading and writing, the dedup rule, and the handoff points to a manager.",
    },
    {
      title: "Pilot assistant",
      text: "The assistant works on your test pipeline: it qualifies leads, sends follow-ups, and updates cards. The pilot runs for two weeks with a daily review.",
    },
    {
      title: "Metrics dashboard",
      text: "The dashboard shows the share of qualified leads, the tasks created by the assistant, card edits, and the time to first reply. Metrics come from amoCRM.",
    },
  ],
  mechanism: [
    {
      title: "Lead context",
      text: "The assistant pulls the conversation history, deal stage, amount, and past tasks for the lead from amoCRM before the first question, so the customer gets straight to the point.",
    },
    {
      title: "Qualification",
      text: "The assistant qualifies the lead against your script: it records budget, timeline, role, and interest in the fields, then sends a follow-up, so the manager calls with full context.",
    },
    {
      title: "Handoff with context",
      text: "On escalation the manager gets the transcript, the reason for the handoff, the collected fields, and the next step, and the dialog continues from the same point.",
    },
  ],
  outcomes: [
    {
      title: "Pipelines in the base scope",
      value: "2",
      text: "The base delivery covers two amoCRM pipelines. Extra pipelines come as blocks with their own field mapping and qualification scenarios.",
    },
    {
      title: "Assistant scenarios",
      value: "3",
      text: "The base scope includes three scenarios: lead qualification, follow-up, and manager handoff. Each scenario runs on a test pipeline.",
    },
    {
      title: "Request handling",
      value: "−70%",
      text: "In the retail-support-bot case the request handling time dropped by 70%. The assistant removes context gathering and first replies.",
    },
  ],
};
