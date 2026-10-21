export const aiWorkflowAutomationEn = {
  ctaBanner: {
    title: "We build automation on your processes",
    text: "Send a list of processes and the tools you use today. We will show three scenarios on your data.",
    buttonLabel: "Discuss automation",
  },
  navTitle: "Process automation with AI",
  title: "AI automation of business processes",
  tagline:
    "We place AI steps into approvals, routing, and documents: a request travels from trigger to system write, and you see the status of every run.",
  description:
    "We set up AI automation of business processes for operations teams. We build the process map, add routing and data extraction, and set up approvals, retries, and monitoring. The base covers 3 processes and 2 integrations; the pilot takes 3–4 weeks.",
  features: [
    {
      title: "A process map and three automations",
      text: "We break the process into steps, count manual work in hours, and build three automations: approvals, routing, and documents.",
    },
    {
      title: "AI routing and data extraction",
      text: "The model identifies the request type, selects a queue, and extracts fields from an email, invoice, or contract. The process owner sets the rules.",
    },
    {
      title: "Approvals with a decision log",
      text: "Every human step gets a deadline, a role, and a log entry: who approved and when. An overdue approval moves on through escalation.",
    },
    {
      title: "Monitoring, retries, and alerts",
      text: "On failure the node retries with a delay and writes the event to the log, and the on-call engineer gets an alert. The panel shows the share of successful operations.",
    },
  ],
  techStack: [
    {
      subtitle: "Platforms and infrastructure",
      description:
        "We build scenarios on [n8n] or [Make]. The event queue runs in [Kafka], run state lives in [PostgreSQL], and [Redis] gives fast access to intermediate data.",
      technologies: [
        {
          id: "n8n",
          name: "n8n",
          glossary:
            "An open automation platform: a scenario runs on your server or in the cloud, and nodes take custom code.",
        },
        {
          id: "make",
          name: "Make",
          glossary:
            "A cloud scenario platform with ready connectors: the team builds the process in a visual builder without running a server.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "A relational database stores run state, the approval log, and the reference tables that validate extracted fields.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "An event bus: requests, emails, and CRM changes arrive as one stream and are processed in order.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "An in-memory store holds locks and intermediate results, so a repeated run updates the same record.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Process audit",
      text: "We walk the process with the owner and the operators, record the steps, the time for each, and the systems. You get a map with manual work measured in hours.",
    },
    {
      title: "Workflow design",
      text: "We draw the data route: trigger, checks, AI step, approval, system write. For each step we fix the input, output, deadline, and action on failure.",
    },
    {
      title: "Build and integrations",
      text: "We build the scenario in n8n or Make, connect CRM, ERP, email, and documents through APIs. We set up access, a test environment, and a run on a data copy.",
    },
    {
      title: "Pilot and monitoring",
      text: "We run it on the real flow for 3–4 weeks, compare the result with manual work, and adjust the rules with the owner. We turn on retries and alerts.",
    },
  ],
  fitItems: [
    {
      title: "Repeating processes with APIs",
      text: "Requests, invoices, approvals, and notifications already live in systems with APIs. The scenario reads the data, sends it through an AI step, and writes the result to CRM.",
      positive: true,
    },
    {
      title: "An owner for the process",
      text: "A business-side person sets the routing conditions, approves changes, and resolves disputed cases. The process gets an owner, and the scenario gets clear rules.",
      positive: true,
    },
    {
      title: "Processes without APIs or data",
      text: "When the input sits on paper or in a locked file, collection and digitization come first. Automation starts once the data reaches a system.",
      positive: false,
    },
    {
      title: "Hard real-time requirements",
      text: "A response in milliseconds and custom logic need a separate backend. A low-code platform works at scenario steps and suits flows with delays in seconds.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "A content pipeline for an agency",
      text: "In the agency-content-pipeline project the pipeline prepared material from briefs, an editor and a tone check approved the copy, and publication followed the calendar. Publishing volume grew threefold.",
      metricValue: "−60%",
      metricLabel: "time to prepare material",
    },
  ],
  faqItems: [
    {
      question: "How do n8n and Make differ from a custom backend?",
      answer:
        "A low-code platform covers standard steps: a webhook, an API call, JSON parsing, a CRM write. n8n handles 3–5 processes up to 10,000 operations a day, while 100,000 events an hour and sub-second latency call for a custom backend.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "The pilot takes 3–4 weeks: audit, process map, three automations, and monitoring. The first scenario reaches real data within a week.",
    },
    {
      question: "What happens on failure?",
      answer:
        "The node retries with a 30-second delay, writes the event to the log, and alerts the on-call engineer. After three retries the task goes to a person.",
    },
    {
      question: "Which systems do you integrate?",
      answer:
        "We connect CRM, ERP, email, messengers, spreadsheets, and documents through APIs and webhooks. For systems without an API we use an export or a Kafka event bus.",
    },
  ],
  tradeoffs: [
    {
      title: "Low-code limits",
      text: "We move complex logic into a separate service and call it from the scenario, so heavy computation and proprietary models live outside low-code.",
    },
    {
      title: "The process owner's role",
      text: "Routing rules change with the process, so the process owner approves changes and resolves disputed cases. We hand over the rule reference.",
    },
    {
      title: "Monitoring and support",
      text: "Monitoring needs an on-call person who reviews errors and decides on escalation. We set the alert levels and hand over the support policy.",
    },
  ],
  deliverables: [
    {
      title: "A process map",
      text: "A process map shows every step, the systems at the input and output, approval deadlines, and the points where a person works.",
    },
    {
      title: "Three automations",
      text: "We build three automations in n8n or Make, connect them to your systems, and hand them over with a guide to changing rules.",
    },
    {
      title: "Monitoring and a report",
      text: "Monitoring and a report give you a panel with run counts, the share of successful operations, and an error list for the period.",
    },
  ],
  mechanism: [
    {
      title: "A trigger starts the run",
      text: "The scenario starts from a CRM webhook, a new email, or a schedule, takes the input data, and passes it to the next step, so processing begins at the moment of the event.",
    },
    {
      title: "The AI step",
      text: "The AI step classifies the request, extracts fields from an email or invoice, and prepares a reply draft under team rules. The next step receives data and an action.",
    },
    {
      title: "Approval and log",
      text: "An approval gets a deadline, a role, and a log entry, and a repeated node run checks the status and continues the route from the stopping point. The decision history stays complete.",
    },
  ],
  outcomes: [
    {
      title: "Three processes in the base",
      value: "3",
      text: "The base package includes three processes: approvals, routing, and documents. Each gets a map, a test environment, and monitoring.",
    },
    {
      title: "Two integrations in the base",
      value: "2",
      text: "The base package includes two integrations: CRM and document storage. We connect extra systems through APIs and price them separately.",
    },
    {
      title: "Actions in the log",
      value: "100%",
      text: "We write every scenario action to the log: the process owner sees the input, step, and result, so review rests on records and exact data.",
    },
  ],
};
