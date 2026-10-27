export const aiBitrix24IntegrationEn = {
  ctaBanner: {
    title: "We'll show the assistant on your portal",
    text: "Send access to a test portal or the card schema. We'll build a pilot on real conversations in two weeks.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI + Bitrix24 integration",
  title: "AI assistant for Bitrix24: CRM, tasks, and the portal",
  tagline:
    "The assistant reads CRM and task context in Bitrix24, updates a card once, and hands the dialog to a manager with context.",
  description:
    "We connect an AI assistant to Bitrix24: it sees deals, tasks, and the timeline before the first question, updates a card with one record, starts approvals, and hands the dialog to a manager with full context.",
  features: [
    {
      title: "Context before the first question",
      text: "The assistant pulls deal history, recent tasks, and order status from the CRM before the customer asks the first question. The reply starts from facts, and the customer names only the new request.",
    },
    {
      title: "One record per dialog",
      text: "The outcome lands in the card once: chat, email, and a call stay in one deal, and an idempotency key filters duplicate cards and deals.",
    },
    {
      title: "Tasks and approvals",
      text: "The assistant creates tasks, moves deal stages, and starts an approval from a template. The employee gets a portal notification and sees why it started.",
    },
    {
      title: "A portal bot and a manager handoff",
      text: "Inside the portal the bot answers employees and customers: it shows order status, reminds about a task, and hands a complex dialog to a manager with the transcript.",
    },
  ],
  techStack: [
    {
      subtitle: "The portal and the event flow",
      description:
        "The assistant works with [Битрикс24] through REST and webhooks. Portal events flow through [Kafka], a snapshot of cards and the action log live in [PostgreSQL], the dialog context sits in [Redis], and the scenarios and handlers are written in [Python].",
      technologies: [
        {
          id: "bitrix24",
          name: "Битрикс24",
          glossary:
            "A portal with a REST API and webhooks: deals, tasks, and the timeline are open to the assistant through native methods, with no core changes.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: card and task changes leave the portal and fan out to subscribers in order, with retries after a failure.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores a snapshot of cards, tasks, and the assistant action log: it shows what was written to the portal and when.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "The context cache and lock: it holds the dialog session and keeps two handlers from writing the same card twice.",
        },
        {
          id: "python",
          name: "Python",
          glossary:
            "The integration language: webhook handlers, REST calls, and dialog routing rules live in one repository with shared tests.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Portal audit",
      text: "We review objects, fields, and rights: which deals, tasks, and contacts the assistant reads, where it writes, and which portal sections stay with employees.",
      processType: "discovery",
    },
    {
      title: "Data and permission model",
      text: "We fix the field mapping, dedup rules, and technical account: one deal per customer, one timeline comment per dialog.",
      processType: "system-design",
    },
    {
      title: "Integration and scenarios",
      text: "We connect REST and webhooks and build three scenarios: a deal answer, a task from a request, and an approval. We test each scenario on a test portal.",
      processType: "integration",
    },
    {
      title: "Pilot and launch",
      text: "Two weeks on real conversations: we measure the share of dialogs without an operator and the number of card edits, then move the contour to production in four to six weeks.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A Bitrix24 portal with REST and webhooks",
      text: "The assistant connects through native methods to deals, tasks, and the timeline and updates cards without core changes.",
      positive: true,
    },
    {
      title: "A process owner in sales or support",
      text: "One person sets field rules and escalation priorities, so the assistant follows the order your company already uses.",
      positive: true,
    },
    {
      title: "A portal without an API and with a custom core",
      text: "This starts with a data access project: the assistant goes live once a stable API exists.",
      positive: false,
    },
    {
      title: "Money decisions on autopilot",
      text: "An employee confirms refunds, write-offs, and discounts above the limit, while the assistant prepares the calculation and a draft reply.",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "Retail store support",
      text: "The assistant handled chat and email, pulled orders from the CRM, and closed 82% of requests; operators took non-standard cases, and processing time fell by 70%.",
      metricValue: "82%",
      metricLabel: "requests without an operator",
    },
    {
      title: "Users in the base contour",
      text: "The base contour covers 50 employees: sales, support, and the lead get the assistant in the portal from day one of the pilot.",
      metricValue: "50",
      metricLabel: "Users in the base contour",
    },
    {
      title: "Launch scenarios",
      text: "Three scenarios cover a deal answer, a task from a request, and an approval: each scenario gets its own metrics and process owner.",
      metricValue: "3",
      metricLabel: "Launch scenarios",
    },
    {
      title: "Requests without an operator",
      text: "On the retail store support case, the assistant closed 82% of requests without an operator, and processing time fell by 70%.",
      metricValue: "82%",
      metricLabel: "Requests without an operator",
    },
  ],
  faqItems: [
    {
      question: "How is cloud Bitrix24 different from the on-premise edition?",
      answer:
        "In the cloud, REST allows about two requests per second per webhook and up to 50 commands in a batch call. In the on-premise edition the server sets the ceiling, and the data stays in your perimeter. We choose the integration scheme during the audit.",
    },
    {
      question: "How does the assistant handle webhooks and duplicates?",
      answer:
        "The assistant writes an idempotency key for every event and looks for a match by phone, email, and order number before it creates a deal. A repeated webhook updates the same card.",
    },
    {
      question: "How long do the pilot and launch take?",
      answer:
        "A pilot on one request queue takes two weeks. A launch with tasks, approvals, and several channels takes four to six weeks.",
    },
    {
      question: "What goes to a person?",
      answer:
        "A disputed amount, a refund, a complaint, and a deal above the limit go to a person. The manager gets the transcript, the handoff reason, and a proposed next step, while money and legal decisions stay with the employee.",
    },
  ],
  tradeoffs: [
    {
      title: "Edition and API limits",
      text: "The cloud edition allows about two requests per second per webhook, so the assistant collects peak events in batches of up to 50 commands. The on-premise edition lifts that ceiling and adds work on the customer's server.",
    },
    {
      title: "A process owner",
      text: "The process owner in sales or support sets field rules and escalation priorities. Their involvement keeps cards consistent and scenarios predictable.",
    },
    {
      title: "Money stays with a person",
      text: "An employee confirms refunds, write-offs, and discounts above the limit. The assistant prepares the calculation, a draft reply, and the deal history, while the decision stays with a person.",
    },
  ],
  deliverables: [
    {
      title: "A portal audit and map",
      text: "We assemble a map of objects, fields, rights, and webhooks: it shows which deals and tasks the assistant reads, where it writes, and which portal sections stay with employees.",
    },
    {
      title: "A pilot assistant",
      text: "We launch the assistant on one request queue: it answers on a deal, creates tasks, and hands complex dialogs to a manager with context.",
    },
    {
      title: "A metrics dashboard",
      text: "We measure the share of dialogs without an operator, the number of tasks from the assistant, and card edits. The dashboard pulls these metrics from the portal and shows the trend by week.",
    },
  ],
  mechanism: [
    {
      title: "Context from CRM and tasks",
      text: "The assistant reads the deal, contacts, recent tasks, and the portal timeline before the first reply. The customer gets to the point, and the manager sees the same picture as the bot.",
    },
    {
      title: "One write to the card",
      text: "The dialog outcome lands in the timeline as one record: the assistant updates deal fields, creates a task, and fixes the next step. A repeated webhook updates the same card through an idempotency key.",
    },
    {
      title: "A handoff with context",
      text: "A complex dialog goes to the manager with the transcript, the handoff reason, and a proposed step. The employee continues from where the assistant stopped, and the customer saves time.",
    },
  ],
};
