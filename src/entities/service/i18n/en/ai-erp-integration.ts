export const ai_erp_integrationEn = {
  ctaBanner: {
    title: "Let's look at your ERP data",
    text: "Show us which systems hold orders, stock, and invoices. We'll estimate the integration and demo the agent on a test environment.",
    buttonLabel: "Request an estimate",
  },
  navTitle: "AI + ERP integration",
  title: "Integrating AI agents with ERP systems",
  tagline:
    "The agent reads orders, stock, and finance in the ERP and prepares operations a person only confirms.",
  description:
    "We connect AI agents to your ERP: the agent answers requests about orders, stock, and invoices, prepares documents and requests, and irreversible operations require human confirmation.",
  features: [
    {
      title: "Answers from ERP data",
      text: "The agent answers questions about orders, stock, and invoices straight from the accounting system, with a document link.",
    },
    {
      title: "Document drafts",
      text: "The agent prepares an invoice, a purchase request, or a reconciliation act and puts the draft up for approval.",
    },
    {
      title: "Stock control",
      text: "The agent warns about shortages and overdue deliveries before they stop sales.",
    },
    {
      title: "Rights and audit log",
      text: "Every agent action is logged, and rights are limited by role and a dedicated account with no extra access.",
    },
  ],
  techStack: [
    {
      subtitle: "ERP and data exchange",
      description:
        "The agent works with [1С], [SAP], and [Microsoft Dynamics] through their APIs. Exchange runs through [Kafka], and an analytical snapshot is stored in [PostgreSQL].",
      technologies: [
        {
          id: "1c",
          name: "1С",
          glossary:
            "An accounting system common in the region: the agent reads documents and stock through a published API and extensions.",
        },
        {
          id: "sap",
          name: "SAP",
          glossary:
            "An enterprise ERP with modules: agent access is limited to the objects it needs and granted to a dedicated account.",
        },
        {
          id: "microsoft-dynamics",
          name: "Microsoft Dynamics",
          glossary:
            "An ERP platform with open APIs: the agent works with orders and invoices without touching the core setup.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: document and stock changes reach the agent without constant heavy queries to the ERP.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores a snapshot for fast answers and the agent action log: it shows what the agent read and prepared.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "ERP audit",
      text: "We break down modules, documents, and rights: what data the agent can reach and which operations are irreversible.",
      processType: "discovery",
    },
    {
      title: "Data model and rights",
      text: "We fix the mapping of ERP entities to the agent and the rights of its accounts.",
      processType: "system-design",
    },
    {
      title: "Integration and scenarios",
      text: "We connect to the API, build data reads and document preparation, and set up the action log.",
      processType: "integration",
    },
    {
      title: "Pilot on one process",
      text: "Three weeks on one process: we measure the share of documents prepared without a person and the number of edits.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "An ERP with an open API",
      text: "1С, SAP, or Dynamics expose data via an API: the agent connects with no workaround exports.",
      positive: true,
    },
    {
      title: "Clean accounting",
      text: "Reference data and filling rules are defined: the agent's answers rest on them, not on guesses.",
      positive: true,
    },
    {
      title: "Scattered data",
      text: "If one order lives in three unconnected systems, we put the data in order first.",
      positive: false,
    },
    {
      title: "Postings without confirmation",
      text: "The agent does not post irreversible financial operations itself; an authorized employee closes them.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Distribution and warehouse",
      text: "The agent answered stock queries and prepared purchase requests; managers stopped gathering data by hand from three reports.",
      metricValue: "−30%",
      metricLabel: "time spent preparing documents",
    },
  ],
  faqItems: [
    {
      question: "Does the agent post documents?",
      answer:
        "No. It prepares a draft and attaches the basis; posting is confirmed by an employee with signing rights.",
    },
    {
      question: "How fresh is the data?",
      answer:
        "The agent reads the ERP through the API at request time; the cache only holds reference data and updates on events.",
    },
    {
      question: "What about access to finance?",
      answer:
        "We grant rights by role: financial data is open only to the accounts already available to employees.",
    },
    {
      question: "How long does the rollout take?",
      answer: "A pilot on one process takes three weeks; a full launch starts at eight weeks.",
    },
    {
      question: "What if the ERP is upgraded and the API changes?",
      answer:
        "The mapping and connectors are code, so we test the upgrade on staging and fix it in one place instead of every scenario.",
    },
    {
      question: "Who maintains the loop after launch?",
      answer:
        "Your team runs the setup and the log; we hand over the documentation and connectors. Support can stay with us under a separate agreement.",
    },
  ],
  tradeoffs: [
    {
      title: "Irreversible operations stay with a person",
      text: "The ERP is the system of record, so irreversible operations stay with a person. The agent prepares the document; a person decides.",
    },
    {
      title: "Depends on reference data",
      text: "Answer quality depends on clean reference data: the agent flags duplicate counterparties and mismatched units for a person.",
    },
    {
      title: "Legacy without an API",
      text: "Integrating with a legacy loop without an API becomes a separate project around access and exports.",
    },
    {
      title: "Cost grows with the module count",
      text: "The more modules in the loop, the more expensive the maintenance: every data source needs its own mapping, so we fix the scope before the start.",
    },
  ],
  deliverables: [
    {
      title: "Stock with a batch link",
      text: "A manager asks about stock and gets an answer from the accounting system with a batch link. Exporting reports and checking rows by hand stay in the past.",
    },
    {
      title: "A purchase request draft",
      text: "A purchase request is assembled from sales and stock data: the agent prepares a draft with quantity and supplier. A person checks and confirms.",
    },
    {
      title: "Shortages ahead of the report",
      text: "Overdue deliveries and shortages show ahead of the report: a warning arrives on the event. Reaction happens in the same week the gap appears.",
    },
    {
      title: "A trace for every action",
      text: "Every agent action leaves a trace: the log shows what it read, what it prepared, and on what basis.",
    },
    {
      title: "A document-flow audit",
      text: "A document-flow audit shows which operations the agent reads and which it only prepares. The responsibility boundary is fixed before the start.",
    },
    {
      title: "Entity mapping",
      text: "Orders, stock, and invoices are tied to the accounting system and roles. Entity mapping fixes the links before the rules are written.",
    },
    {
      title: "A pilot on one process",
      text: "The pilot runs on one process: we measure the share of documents without edits and the number of manual confirmations. The result shows readiness to expand.",
    },
  ],
  mechanism: [
    {
      title: "A query to the accounting system",
      text: "A manager asks about stock and gets an answer from the accounting system with a batch link, instead of exporting a report by hand.",
    },
    {
      title: "A document draft",
      text: "A purchase request is assembled from sales and stock data: the agent prepares a draft with quantity and supplier.",
    },
    {
      title: "Confirmation by a person",
      text: "A person runs irreversible operations: the agent prepares the document, and the decision and posting stay with the employee.",
    },
    {
      title: "A trace in the log",
      text: "Every agent action leaves a trace: the log shows what it read, what it prepared, and on what basis.",
    },
  ],
};
