export const aiSalesAgentsEn = {
  ctaBanner: {
    title: "We'll review your pipeline and show the agent",
    text: "Send a pipeline export and 20-30 lead samples. We'll build a pilot on your conversations and show where the agent handles qualification and follow-up.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI sales agent",
  title: "AI sales agent: qualification and follow-up",
  tagline:
    "The agent qualifies inbound leads in amoCRM and Битрикс24, runs follow-up, and updates cards before the handoff to a manager.",
  description:
    "We connect an AI agent to your CRM: it reads lead context, qualifies against your script, sends follow-up, updates fields, and hands the dialog to a manager with the full history.",
  features: [
    {
      title: "Lead context from the CRM",
      text: "The agent pulls conversation history, deal stage, amount, and past tasks before the first question, so the customer gets straight to the point.",
    },
    {
      title: "Qualification by script",
      text: "The agent asks the questions from your script, records budget, timeline, role, and interest in CRM fields, and marks the lead as a fit or a cold contact.",
    },
    {
      title: "Follow-up sequence",
      text: "The agent sends the first touch, a reminder on day two, and a final message on day five, and a customer reply closes the sequence.",
    },
    {
      title: "Card updates and handoff",
      text: "The agent writes the dialog outcome, creates a task, and passes the manager a transcript with the reason, collected fields, and next step.",
    },
  ],
  techStack: [
    {
      subtitle: "CRM, events, and data",
      description:
        "The agent reads and writes in [amoCRM] through the API, stage changes travel through [Kafka], the deal snapshot lives in [PostgreSQL], the dialog queue and sessions stay in [Redis], and the scenarios and model run on [Python].",
      technologies: [
        {
          id: "amocrm",
          name: "amoCRM",
          glossary:
            "A sales CRM with webhooks: the agent subscribes to deal stage changes and receives new leads in real time.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: stage changes, new leads, and customer replies fan out to subscribers in order, and the exchange runs without polling the database.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores a snapshot of deals, qualification fields, and the agent action log: it shows what went into the card and when.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Stores dialog sessions, the message queue, and follow-up counters, so the agent replies in milliseconds and survives a service restart.",
        },
        {
          id: "python",
          name: "Python",
          glossary:
            "The language for scenarios and models: qualification rules, LLM calls, and CRM reply handling all run on it.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Pipeline audit",
      text: "We review stages, fields, sources, and fill rules: what the agent reads, what it writes, and where the manager's responsibility starts.",
    },
    {
      title: "Qualification script and data model",
      text: "We assemble the script questions, map answers onto amoCRM fields, and fix the dedup rule: one lead per customer, one log per dialog.",
    },
    {
      title: "Integration and pilot",
      text: "We connect the agent to the API, set the technical account's rights, and run a pilot on one request queue with a daily review.",
    },
    {
      title: "Launch",
      text: "We extend the scope to every channel, enable follow-up sequences and the dashboard, train the team on agent rules, and hand over support.",
    },
  ],
  fitItems: [
    {
      title: "Inbound leads and a CRM with an API",
      text: "A thousand requests per month and amoCRM with API access give the agent enough flow for qualification and follow-up from day one.",
      positive: true,
    },
    {
      title: "A sales process owner",
      text: "The person who owns the script and the fields sets the qualification rules and decides on disputed leads.",
      positive: true,
    },
    {
      title: "Sales tracked in spreadsheets",
      text: "When leads live in Excel with no API and no single data model, the project starts with a CRM migration, and the agent connects after the move.",
      positive: false,
    },
    {
      title: "Automatic discounts and money decisions",
      text: "Discounts, refunds, and write-offs stay with a manager: the agent gathers context, prepares the estimate, and creates a task.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "Which channels does the agent cover?",
      answer:
        "The agent replies in the website chat, Telegram, WhatsApp, and email, and handles calls through telephony with a transcript. The base delivery includes two channels, and we add the rest as blocks.",
    },
    {
      question: "Which CRMs do you support?",
      answer:
        "amoCRM, Битрикс24, and Salesforce. During the audit we check the API method list and show which fields the agent reads and writes in your version.",
    },
    {
      question: "How long does the pilot take?",
      answer:
        "The pilot on one request queue takes 4 to 6 weeks: two weeks for integration, two for data collection, and two for review and scenario tuning. The full launch follows.",
    },
    {
      question: "What does a manager get on handoff?",
      answer:
        "The dialog transcript, the collected fields, the reason for the handoff, and the proposed next step. The manager continues from where the agent stopped.",
    },
  ],
  tradeoffs: [
    {
      title: "CRM data quality",
      text: "Data quality sets how precise qualification gets: uniform fields and complete sources give the agent a basis for exact rules, and we review the cards during the audit.",
    },
    {
      title: "Channel and API limits",
      text: "Every channel has its own message limit and webhook rate: we schedule follow-ups against the API quotas, so a sequence goes out on time and within the provider contract.",
    },
    {
      title: "Money decisions stay with a person",
      text: "A person confirms discounts and refunds: the agent gathers history, calculates discount options, and passes the estimate with the customer's arguments.",
    },
  ],
  deliverables: [
    {
      title: "Pipeline map",
      text: "After the audit you get the pipeline schema, the list of fields to read and write, the dedup rule, and the handoff points to a manager.",
    },
    {
      title: "Pilot agent",
      text: "The agent runs on your test pipeline: it qualifies leads, sends follow-ups, and updates cards. The pilot runs for 4 to 6 weeks with a daily review.",
    },
    {
      title: "Metrics dashboard",
      text: "The dashboard shows the share of qualified leads, the number of tasks from the agent, card edits, and the time to first reply. Metrics come from amoCRM.",
    },
  ],
  mechanism: [
    {
      title: "Lead queue",
      text: "A new lead arrives through an amoCRM webhook, the agent matches it to an existing deal by phone and email, and queues the task in Redis. A repeated webhook updates the same card, so the CRM keeps one deal.",
    },
    {
      title: "Script and score",
      text: "The script is split into steps with required fields: after each answer the agent writes the value to the deal and scores it by weight. A lead above the threshold goes to a manager, while the rest stay in nurture.",
    },
    {
      title: "Follow-up queue and handoff",
      text: "Follow-up lives in a queue with two- and five-day delays, and a customer reply closes the task and updates the card. On handoff the agent packs the transcript, fields, and next step into one manager task.",
    },
  ],
  precedents: [
    {
      title: "Leads in the base scope",
      text: "The base delivery covers 1,000 inbound leads per month: the agent qualifies the flow and sends follow-ups during business hours.",
      metricValue: "1 000",
      metricLabel: "Leads in the base scope",
    },
    {
      title: "Channels in the base scope",
      text: "The base scope includes two channels, for example the website chat and Telegram. More channels come as blocks with their own mapping and tests.",
      metricValue: "2",
      metricLabel: "Channels in the base scope",
    },
    {
      title: "Agent scenarios",
      text: "The base delivery includes three scenarios: lead qualification, a follow-up sequence, and a manager handoff. Each scenario runs on your test pipeline.",
      metricValue: "3",
      metricLabel: "Agent scenarios",
    },
  ],
};
