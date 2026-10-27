export const documentProcessingEn = {
  ctaBanner: {
    title: "Let's review your documents",
    text: "Send 50–100 scans and the field list: on the call we assess recognition quality and the scope of the first pipeline.",
    buttonLabel: "Discuss document processing",
  },
  navTitle: "AI document processing",
  title: "AI document processing",
  tagline:
    "We recognize scans and PDFs, extract fields, and validate data before it reaches your business system.",
  description:
    "We build a pipeline from scan to structured record: OCR, field extraction, validation rules, and loading into ERP or CRM. The pilot measures accuracy for every field.",
  features: [
    {
      title: "Recognition",
      text: "We recognize printed and handwritten documents: invoices, acts, contracts, and delivery notes. Each type gets a fixed language, scan quality, and error tolerance.",
    },
    {
      title: "Field extraction",
      text: "We extract requisites, amounts, dates, and table rows into JSON. The field schema matches the business system, so data reaches ERP without manual retyping.",
    },
    {
      title: "Data validation",
      text: "We check amounts, tax IDs, and dates against rules and reference data. A document with a mismatch goes to a human, and the rest pass automatically.",
    },
    {
      title: "Loading into the system",
      text: "We send the result to ERP, CRM, or an archive through an API. Every document gets a status and a link to the source file.",
    },
  ],
  techStack: [
    {
      subtitle: "Document pipeline",
      description:
        "We receive files in [MinIO], recognize and extract fields with [Python] and an [OpenAI API] model, run checks in [PostgreSQL], and queue processing in [Airflow].",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary:
            "The pipeline language: it splits PDFs, prepares images, calls OCR, and assembles JSON against the field schema.",
        },
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary:
            "The extraction model: it reads text and tables, returns fields against the schema, and flags uncertain values.",
        },
        {
          id: "airflow",
          name: "Airflow",
          glossary:
            "Queue and schedule: it processes batches, retries failed jobs, and stores the status of every document.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores extracted fields, validation rules, and status history: a document shows what changed and when.",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "Object storage for source scans: the file stays available for review and reprocessing.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Document type audit",
      text: "We collect document types, volume, and scan quality. We fix the fields the business system needs.",
      processType: "discovery",
    },
    {
      title: "Labeling and schema",
      text: "We label a reference sample and describe the field schema. Each field gets a validation rule.",
      processType: "system-design",
    },
    {
      title: "Pipeline",
      text: "We assemble OCR, extraction, and validation into one flow. We connect the business system API and the queue.",
      processType: "integration",
    },
    {
      title: "Pilot",
      text: "We run the pipeline on a real stream and measure accuracy. We tune the threshold and the manual review share.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "500+ documents a month",
      text: "The stream is large enough for automation to pay for setup. At that volume errors show up in the first week.",
      positive: true,
    },
    {
      title: "Reference documents exist",
      text: "You can provide 50–100 labelled documents. We measure accuracy on them and tune the review threshold.",
      positive: true,
    },
    {
      title: "Handwritten forms without references",
      text: "Handwritten forms need a labelled sample. Without one, accuracy stays a guess, and manual review eats the effect.",
      positive: false,
    },
    {
      title: "No process owner",
      text: "The pipeline changes accounting or operations work. You need a person who approves rules and signs off.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How much does document processing cost?",
      answer:
        "The base program starts at RUB 800,000 and covers one document type, extraction, and validation. Extra types and accuracy targets affect the estimate.",
    },
    {
      question: "How accurate is OCR?",
      answer:
        "On quality scans printed text reaches 95–99% accuracy per field. Handwritten fields and poor scans need human review, and we name the exact figure after the pilot.",
    },
    {
      question: "What about document security?",
      answer:
        "Files live in your environment or an agreed cloud. Field access is role-based, and the log shows who opened a document.",
    },
    {
      question: "How does it fit ERP?",
      answer:
        "We connect an API or an exchange queue. The document gets a status, and extracted fields reach the record without manual retyping.",
    },
  ],
  scope: [
    {
      title: "Document types",
      text: "The scope fixes the type list from the audit. Each type gets 30–50 reference documents and a field list.",
    },
    {
      title: "Fields",
      text: "The field list matches the ERP record: amounts, dates, counterparties, numbers, and table rows.",
    },
    {
      title: "Rules",
      text: "We check required fields, arithmetic, and reference data. A rule with a mismatch sends the document to manual review.",
    },
    {
      title: "Integration",
      text: "Integration with ERP runs through an API or a queue. The document gets a status, and the source file stays in storage.",
    },
  ],
  tradeoffs: [
    {
      title: "Scan quality",
      text: "OCR accuracy depends on resolution and scan quality. The audit measures the share of readable documents and shows which types need preprocessing.",
    },
    {
      title: "Handwritten fields",
      text: "Handwriting is harder than print. For those fields we add human review and collect reference examples.",
    },
    {
      title: "Human review",
      text: "Human review covers documents above the error threshold. An operator checks them, and that share falls as the model learns.",
    },
  ],
  deliverables: [
    {
      title: "Pipeline",
      text: "The pipeline takes a file, recognizes it, extracts fields, and returns JSON. Code and configuration stay with your team.",
    },
    {
      title: "Field schema",
      text: "The schema describes types, required fields, and validation rules. It matches the fields of the business system.",
    },
    {
      title: "Accuracy report",
      text: "The report shows accuracy per field on the reference sample. Errors are split by document type and scan quality.",
    },
  ],
  mechanism: [
    {
      title: "Pipeline",
      text: "The pipeline takes a file, checks the format, and sends pages to OCR. The output is text with block coordinates, so the model sees table structure tied to the page.",
    },
    {
      title: "Model",
      text: "The model maps text to the field schema and returns JSON with a confidence score per value. The schema sets types and required fields, so the result is ready for loading.",
    },
    {
      title: "Rules",
      text: "Rules check amounts, dates, and counterparties against reference data. A document with a mismatch gets a status and goes to an operator, while the rest load into the business system.",
    },
  ],
  precedents: [
    {
      title: "1 document type",
      text: "The base scope includes one document type. Each extra type adds fields, rules, and a reference sample.",
      metricValue: "1",
      metricLabel: "1 document type",
    },
    {
      title: "50 documents",
      text: "We test the pilot on 50–100 documents from your stream. That sample measures accuracy and the share of automatic loads.",
      metricValue: "50",
      metricLabel: "50 documents",
    },
    {
      title: "4 weeks",
      text: "The first pipeline launches in four weeks. The timeline covers the audit, labelling, pipeline, and a pilot on the real stream.",
      metricValue: "4 wk",
      metricLabel: "4 weeks",
    },
  ],
};
