export const ai_crm_integrationEn = {
  ctaBanner: {
    title: "Let's run an agent on your CRM",
    text: "Give us access to a test environment or send the card schema. We'll build a pilot on real conversations in two weeks.",
    buttonLabel: "Request a pilot",
  },
  navTitle: "AI + CRM Integration",
  title: "Integrating AI assistants with CRM",
  tagline: "The agent sees the customer history and deals in the CRM and updates cards itself.",
  description:
    "We connect AI assistants to your CRM: the agent reads conversation and deal history, updates cards, creates tasks, and hands the dialog to a manager with full context.",
  features: [
    {
      title: "Context without re-asking",
      text: "The agent pulls conversation history, deals, and order status from the CRM before the first question.",
    },
    {
      title: "One record, no duplicates",
      text: "The outcome lands in the card once: a call, an email, and a chat do not become three copies.",
    },
    {
      title: "Handoff to a manager",
      text: "On escalation the manager gets the transcript, the reason, and the next step, not an empty thread.",
    },
    {
      title: "Rights and roles",
      text: "The agent works within the role's rights: it sees only the fields and deals open to that user.",
    },
  ],
  techStack: [
    {
      subtitle: "CRM and event flow",
      description:
        "The agent talks to [Битрикс24], [amoCRM], or [Salesforce] through their APIs. Changes fan out through [Kafka], and card fields map onto the [PostgreSQL] schema.",
      technologies: [
        {
          id: "bitrix24",
          name: "Битрикс24",
          glossary:
            "A CRM with a ready REST API: deals, leads, and tasks are available to the agent with no core changes.",
        },
        {
          id: "amocrm",
          name: "amoCRM",
          glossary:
            "A sales CRM with webhooks: the agent subscribes to deal stage changes and reacts in real time.",
        },
        {
          id: "salesforce",
          name: "Salesforce",
          glossary:
            "An enterprise CRM with custom objects: a complex field schema maps onto the agent's entities.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: changes from the CRM and the agent fan out without losing order and without polling.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores a snapshot of deals and the agent action log: it shows what the agent wrote to the CRM and when.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "CRM audit",
      text: "We review objects, fields, and rights: what the agent may read and write, and what stays closed.",
      processType: "discovery",
    },
    {
      title: "Data schema",
      text: "We fix entity mapping and dedup rules: one deal per customer, one log per dialog.",
      processType: "system-design",
    },
    {
      title: "Agent integration",
      text: "We connect the agent to the API, build read and write scenarios, and set the technical account's rights.",
      processType: "integration",
    },
    {
      title: "Pilot and launch",
      text: "Two weeks on real conversations: we measure closed dialogs and card edits, then move to production.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A dedicated CRM with an API",
      text: "The agent connects to Битрикс24, amoCRM, or Salesforce directly, without core changes.",
      positive: true,
    },
    {
      title: "Requests across chat, email, telephony",
      text: "The agent merges the channels into one deal and removes manual copy-paste.",
      positive: true,
    },
    {
      title: "A CRM kept in Excel",
      text: "No API and no single data model: migration first, the agent second.",
      positive: false,
    },
    {
      title: "Disputed decisions on autopilot",
      text: "The agent does not confirm refunds or money-related writes on its own; those stay with a person.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Support for an online store",
      text: "The agent pulled the order and customer history from the CRM before the first reply and created a manager task on disputed amounts.",
      metricValue: "−40%",
      metricLabel: "time spent gathering context",
    },
  ],
  faqItems: [
    {
      question: "Where does the agent write results?",
      answer:
        "Into the CRM card: a note, fields, and a task. The agent keeps no separate store, so there is no second source of truth.",
    },
    {
      question: "What about duplicate deals?",
      answer:
        "Before writing, the agent looks for a similar deal by a field set. We fix the dedup rule at the start and log every merge.",
    },
    {
      question: "How long does the rollout take?",
      answer:
        "A pilot on one request queue takes two weeks. A full launch with several channels starts at six weeks.",
    },
    {
      question: "Does it work with our CRM version?",
      answer:
        "Yes, if an API is available. We check the supported methods during the audit and show the limits before we start.",
    },
  ],
  tradeoffs: [
    {
      title: "Integration without an API",
      text: "If the CRM lives in spreadsheets without an API, the integration starts as a data migration project. The agent connects only after the data moves.",
    },
    {
      title: "You need a process owner",
      text: "Without an owner of the sales process, the agent repeats the chaos: the team sets the field rules, and card consistency depends on them.",
    },
    {
      title: "Routine goes to the agent, money to a person",
      text: "Telephony and manual checks on disputed refunds stay on your side. The agent takes over context gathering and routine, while money decisions stay with a person.",
    },
    {
      title: "Cost depends on the system count",
      text: "Cost depends on the number of entities and integrations: every new system in the loop adds mapping maintenance, so we fix the scope before the start.",
    },
    {
      title: "Data stays in the perimeter",
      text: "If customer data must stay inside your perimeter, the agent runs on your infrastructure, and that is a separate part of the project.",
    },
  ],
  deliverables: [
    {
      title: "History before the first question",
      text: "The agent pulls conversation history, open deals, and order status before the first question. The customer skips retelling the story.",
    },
    {
      title: "The outcome written once",
      text: "The agent adds a card note, updates fields, and creates a task. The outcome is written once, so a call, an email, and a chat stay one deal.",
    },
    {
      title: "Escalation with a reason",
      text: "The thread goes to the manager with the reason and a proposed next step. Escalation starts from facts, so the dialog is on point.",
    },
    {
      title: "Rights by role",
      text: "The agent sees only the fields and deals open to the user and works within the role's rights. A separate technical account with reduced rights blocks access to other people's data.",
    },
    {
      title: "Metrics in the CRM",
      text: "The share of dialogs closed without a manager, the number of tasks the agent created, and the records fixed by hand. Integration metrics live in the CRM itself.",
    },
  ],
};
