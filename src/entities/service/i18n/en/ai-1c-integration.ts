export const ai1cIntegrationEn = {
  ctaBanner: {
    title: "Show us a 1C test base",
    text: "Send the contour map or access to a test base: we will review your documents, stock, and rights and demo a pilot assistant on your data.",
    buttonLabel: "Discuss the pilot",
  },
  navTitle: "AI + 1C integration",
  title: "AI assistant for 1C: documents, stock, reconciliation",
  tagline:
    "The agent reads documents, stock, and counterparties in 1C and prepares operation drafts that a person confirms.",
  description:
    "We connect an AI assistant to 1C: it answers questions about documents, stock, and counterparties, prepares invoices, acts, and purchase requests, flags shortages and reconciliation gaps, and every action follows roles and lands in the log.",
  features: [
    {
      title: "1C context",
      text: "The agent reads documents, stock, and counterparties through a published API or extension and answers with a link to the exact document.",
    },
    {
      title: "Document drafts",
      text: "The agent prepares an invoice, an act, or a purchase request and attaches the basis: a contract, an order, or a stock balance.",
    },
    {
      title: "Stock alerts",
      text: "The agent warns about shortages and reconciliation gaps when the register balance diverges from an order.",
    },
    {
      title: "Rights and log",
      text: "Agent actions are limited by the 1C role, and every read and every draft lands in the log with its basis.",
    },
  ],
  techStack: [
    {
      subtitle: "1C and data exchange",
      description:
        "The agent reads the [1С] contour through an API or extension, keeps a snapshot for fast answers in [PostgreSQL], streams document events through [Kafka], builds scenarios in [Python], and runs the service in [Kubernetes].",
      technologies: [
        {
          id: "1c",
          name: "1С",
          glossary:
            "An accounting system that holds documents, stock, and counterparties: the agent reads them through a published API or an extension under a separate account.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores a snapshot of reference data and stock for fast answers plus the agent action log, which shows the basis for every prepared document.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: document, stock, and counterparty changes reach the agent as a stream, so the 1C contour answers heavy queries without extra load.",
        },
        {
          id: "python",
          name: "Python",
          glossary:
            "Agent scenarios: document reads, draft assembly, and rights checks live in Python code, so a rule changes in one place.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "The runtime: the agent service and connectors run in Kubernetes with separate limits, so the pilot and production contour share one configuration.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "1C contour audit",
      text: "We review modules, documents, and rights: which registers and reference books the agent reads, which forms it fills, and who confirms each operation.",
      processType: "discovery",
    },
    {
      title: "Data and rights model",
      text: "We fix how documents, stock, and counterparties map to 1C roles, so the agent works inside the account you grant.",
      processType: "system-design",
    },
    {
      title: "Integration and scenarios",
      text: "We connect to the API and extension, build data reads, invoice, act, and request drafts, and set up the action log.",
      processType: "integration",
    },
    {
      title: "Pilot on one process",
      text: "Four to six weeks on one process: we count the share of drafts without edits and the number of human confirmations.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A published API or extension",
      text: "1C exposes documents and stock through an API or extension: the agent connects to the standard contour with no file exports.",
      positive: true,
    },
    {
      title: "Clean reference books",
      text: "Items, counterparties, and units are defined: agent answers rest on the reference book, and your team owns the accounting rules.",
      positive: true,
    },
    {
      title: "Data trapped in files",
      text: "If documents live in spreadsheets and email with no API, we first move the exchange into the standard 1C contour.",
      positive: false,
    },
    {
      title: "Postings without approval",
      text: "An employee with signing rights posts irreversible money documents, while the agent prepares the draft and the basis.",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "ERP data reconciliation",
      text: "In the ERP case the team cleaned 1,200 duplicate counterparties and linked stock to orders: discrepancies in reports fell by 90%, and reconciliation takes 5 minutes. The 1C assistant builds on the same clean contour.",
      metricValue: "−90%",
      metricLabel: "discrepancies in reports",
    },
    {
      title: "A pilot in four to six weeks",
      text: "A pilot on one process takes four to six weeks: the team sees the share of drafts without edits and the number of human confirmations, and the expansion decision rests on the report.",
      metricValue: "4–6 weeks",
      metricLabel: "A pilot in four to six weeks",
    },
    {
      title: "Invoice, act, and request",
      text: "The base scenario covers an invoice, an act, and a purchase request: the agent prepares a draft with its basis, and an employee confirms the posting in 1C.",
      metricValue: "3 types",
      metricLabel: "Invoice, act, and request",
    },
    {
      title: "Discrepancies in reports",
      text: "In the ERP case discrepancies in reports fell by 90% after 1,200 duplicate counterparties were cleaned, and stock reconciliation against orders takes 5 minutes.",
      metricValue: "−90%",
      metricLabel: "Discrepancies in reports",
    },
  ],
  faqItems: [
    {
      question: "Does the agent post documents?",
      answer:
        "No. The agent prepares a draft with its basis, and an employee with signing rights confirms the posting in 1C.",
    },
    {
      question: "How fresh is the data?",
      answer:
        "The agent reads 1C through the API at request time, and the PostgreSQL snapshot of reference data and stock updates on Kafka events, so stock in the answer stays current.",
    },
    {
      question: "Which 1C versions and APIs do you support?",
      answer:
        "We connect to 1C:ERP, 1C:Trade Management, and 1C:Accounting through HTTP services, OData, or an extension, and we fix the version and module set at the audit.",
    },
    {
      question: "How long does the pilot take?",
      answer:
        "A pilot on one process takes four to six weeks; a production launch with several modules starts after the pilot report.",
    },
  ],
  tradeoffs: [
    {
      title: "API and extension quality",
      text: "Response speed depends on the published API and extension: at the audit we check the method set, limits, and exchange schema, so scenarios rest on standard calls.",
    },
    {
      title: "Reference-data cleanliness",
      text: "Answer accuracy rests on reference books: the agent flags duplicate counterparties and mismatched units, and your team brings the data to one form.",
    },
    {
      title: "Irreversible operations stay with a person",
      text: "An employee with signing rights posts money documents, the agent prepares the draft and attaches the basis, and the decision stays with the process owner.",
    },
  ],
  deliverables: [
    {
      title: "A contour audit and map",
      text: "The contour audit and map show the modules, documents, registers, and rights the agent will use, and they fix the pilot boundary.",
    },
    {
      title: "A pilot assistant",
      text: "The pilot assistant reads documents, stock, and counterparties, prepares invoice, act, and request drafts, and writes every action to the log.",
    },
    {
      title: "An evaluation and report",
      text: "The evaluation and report show the share of drafts without edits, the number of human confirmations, and the time spent on reconciliation, plus a plan to expand to other processes.",
    },
  ],
  mechanism: [
    {
      title: "Context from 1C",
      text: "The agent reads documents, stock, and counterparties in the 1C context through the API or extension at request time, so a manager gets an answer with a link to the exact document and current warehouse data.",
    },
    {
      title: "A document draft",
      text: "The agent assembles an invoice, an act, or a purchase request from 1C data, attaches the basis, and hands the draft to an employee who checks amounts, quantity, and counterparty before posting.",
    },
    {
      title: "Approval and the log",
      text: "An employee gives approval for the draft in 1C, and the log records the basis, the registers read, and the final decision, so every agent action can be checked and shown to an auditor.",
    },
  ],
};
