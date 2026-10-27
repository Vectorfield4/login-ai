export const aiN8nMakeEn = {
  ctaBanner: {
    title: "We automate your process on n8n and Make",
    text: "Send a list of repeating processes and the tools you already use. In two weeks we will show three scenarios on your data.",
    buttonLabel: "Discuss automation",
  },
  navTitle: "Automation on n8n and Make",
  title: "AI automation on n8n and Make",
  tagline:
    "We build n8n and Make scenarios with AI nodes: requests, documents, and notifications travel their route without manual transfer.",
  description:
    "We set up automation for repeating processes on n8n and Make. We map the workflow, add AI nodes for classification, data extraction, and replies, connect CRM, ERP, and documents, and add retries, logs, and monitoring.",
  features: [
    {
      title: "A workflow map and three automations",
      text: "We review the processes, mark the steps that move by hand, and build three scenarios that cover the bulk of the routine.",
    },
    {
      title: "AI nodes inside the process",
      text: "We classify requests, extract fields from emails and invoices, and draft replies: the model runs inside the scenario, while the team sets the rules.",
    },
    {
      title: "Integrations with CRM, ERP, and documents",
      text: "We connect CRM, ERP, email, spreadsheets, and document storage through APIs and webhooks, so data moves from system to system without copying.",
    },
    {
      title: "Retries, logs, and monitoring",
      text: "A failed node starts a retry, the event lands in the log, and the on-call engineer gets an alert with the run ID and input data.",
    },
  ],
  techStack: [
    {
      subtitle: "Platforms and infrastructure",
      description:
        "We build scenarios on [n8n] or [Make]. The event queue runs in [Kafka], run state is stored in [PostgreSQL], and [Redis] gives fast access to intermediate data.",
      technologies: [
        {
          id: "n8n",
          name: "n8n",
          glossary:
            "An open automation platform with a visual editor and code: a scenario runs on your own server or in the cloud.",
        },
        {
          id: "make",
          name: "Make",
          glossary:
            "A cloud scenario platform with ready connectors: a fit for teams that want a visual builder without running a server.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "A relational database: it stores run state, trigger history, and the reference tables the AI node uses to validate extracted fields.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "An event bus: requests, emails, and CRM changes arrive as one stream, and the scenario processes them in order.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "An in-memory store: it holds locks and intermediate results so a repeated run does not create a duplicate operation.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Process audit",
      text: "We review which operations the team repeats every day, where an API exists, and which data a scenario can reach. We record the routine in hours.",
    },
    {
      title: "Workflow design",
      text: "We draw the data route: trigger, checks, AI node, system write. For each step we describe the input, the output, and the action on failure.",
    },
    {
      title: "Build and integrations",
      text: "We build the scenario in n8n or Make, connect CRM, ERP, email, and document storage, and set up access and a test environment.",
    },
    {
      title: "Pilot and monitoring",
      text: "We run it on the real flow for two or three days, compare the result with manual work, and turn on retries, alerts, and a panel with successful run counts.",
    },
  ],
  fitItems: [
    {
      title: "Repeating processes with APIs",
      text: "Requests, invoices, and notifications already live in systems with APIs: the scenario reads the data and writes the result without manual transfer.",
      positive: true,
    },
    {
      title: "An owner who sets the rules",
      text: "A business-side person defines routing conditions and approves changes: the scenario gets clear rules in place of guesses.",
      positive: true,
    },
    {
      title: "Processes without APIs or data",
      text: "When the input sits on paper or in a locked file, collection and digitization come first, and automation follows.",
      positive: false,
    },
    {
      title: "Hard real-time requirements",
      text: "A response in milliseconds and custom processing logic need a separate backend: the low-code platform works at scenario steps.",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "A content pipeline for an agency",
      text: "In the agency-content-pipeline project the pipeline prepared material from briefs, an editor and a tone check approved the copy, and publication followed the calendar. Publishing volume grew threefold.",
      metricValue: "−60%",
      metricLabel: "time to prepare material",
    },
    {
      title: "Three workflows in the base",
      text: "The base package includes three workflows: requests, documents, and notifications. Each scenario gets a map, a test environment, and an owner.",
      metricValue: "3",
      metricLabel: "Three workflows in the base",
    },
    {
      title: "Launch in two or three weeks",
      text: "The process map and three scenarios take two or three weeks, and the first scenario reaches real data within a week.",
      metricValue: "2–3 wks",
      metricLabel: "Launch in two or three weeks",
    },
    {
      title: "Publication volume triples",
      text: "In the agency-content-pipeline case the pipeline prepared material from briefs, a tone check and an editor approved the copy, and the calendar set publication. Volume grew threefold.",
      metricValue: "×3",
      metricLabel: "Publication volume triples",
    },
  ],
  faqItems: [
    {
      question: "How is n8n different from Make?",
      answer:
        "You can host n8n on your own server and add code inside nodes. Make runs in the cloud and offers ready connectors. The choice depends on data requirements and administration.",
    },
    {
      question: "Can we host n8n ourselves?",
      answer:
        "Yes, self-hosted n8n runs in your environment on Docker or Kubernetes. We set up updates, backups, and access to internal systems.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "The process map and three scenarios take two or three weeks. The first scenario reaches real data within a week.",
    },
    {
      question: "What happens on failure?",
      answer:
        "The scenario retries with a delay, writes the event to the log, and sends an alert to the on-call engineer. If the retry fails, the task goes to a person with context.",
    },
  ],
  tradeoffs: [
    {
      title: "Low-code limits",
      text: "Low-code covers the standard steps: reading an API, parsing JSON, writing to CRM. We move logic with dozens of conditions into a separate service and call it from the scenario.",
    },
    {
      title: "Hosting choice",
      text: "Self-hosted n8n keeps data in your environment and needs administration. Cloud Make removes maintenance and keeps data with the provider. We price both options in the estimate with support cost.",
    },
    {
      title: "Platform dependency",
      text: "Scenarios live in the platform syntax, and a move to another platform requires porting nodes. Workflow export, git versioning, and rules kept in a separate layer lower the risk.",
    },
  ],
  deliverables: [
    {
      title: "A workflow map",
      text: "A workflow map shows every step of the process, the systems at the input and output, the decision owner, and the points where a person works today.",
    },
    {
      title: "Three automations",
      text: "We build three automations in n8n or Make, connect them to your systems, and hand them over with a guide for changing the rules.",
    },
    {
      title: "Monitoring and a report",
      text: "Monitoring and a report give you a panel with run counts, the share of successful operations, and an error list for the period, plus recommendations for the next scenarios.",
    },
  ],
  mechanism: [
    {
      title: "A trigger starts the run",
      text: "The scenario starts from a CRM webhook, a new email, or a schedule, takes the input data, and passes it to the next node, so processing begins at the moment of the event and runs without a manual start.",
    },
    {
      title: "The AI node",
      text: "The AI node classifies the request, extracts fields from an email or invoice, and prepares a reply draft under the team rules, so the next step receives labeled data and a ready action.",
    },
    {
      title: "Retry and log",
      text: "On failure the node retries with a delay, writes the input, the error, and the run ID to the log, and sends an alert to the on-call engineer, so the failure is visible at once and the review works from facts.",
    },
  ],
};
