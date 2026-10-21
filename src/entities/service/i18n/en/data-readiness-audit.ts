export const dataReadinessAuditEn = {
  ctaBanner: {
    title: "Open the data with us",
    text: "Give us read access to the sources and name a data owner. In two meetings we assemble the register, the profile, and a draft roadmap.",
    buttonLabel: "Discuss the audit",
  },
  navTitle: "Data audit for AI",
  title: "AI data readiness audit",
  tagline:
    "We collect the sources into a register, grade quality, map PII and access, and hand over a scorecard and roadmap.",
  description:
    "We survey your sources before an AI project: we build the register, profile the data, and review PII and access. You get a quality scorecard and a preparation roadmap.",
  features: [
    {
      title: "Source register",
      text: "We collect every source in one list: systems, tables, files, queues, and stores. For each source we record the owner, volume, refresh rate, and export path.",
    },
    {
      title: "Quality scorecard",
      text: "We score completeness, duplicates, freshness, and consistency for each source. The scores show which data is ready for a model and which needs cleanup.",
    },
    {
      title: "PII and access review",
      text: "We find personal data, check the processing basis, and map role permissions. We also see who can export sensitive fields and how.",
    },
    {
      title: "Roadmap",
      text: "We split the preparation into steps with time and effort estimates. The plan tracks dependencies between sources and the order of defect fixes.",
    },
  ],
  techStack: [
    {
      subtitle: "Survey stack",
      description:
        "We pull extracts through [Python], check transactional data in [PostgreSQL], aggregates in [ClickHouse], the event stream in [Kafka], and files in [MinIO].",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary:
            "Extract and profiling language: scripts count completeness, duplicates, and distributions for every source.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Transactional database: it holds orders, stock, and reference links, so we check their integrity here.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "Column store for analytics: we count aggregates and frequencies over large tables in minutes.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "Event stream: it shows how often records arrive and whether messages drop between systems.",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "Object store: it keeps the files, documents, and archives that also enter the survey.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Access and inventory",
      text: "We get read access and build the source register with the data owner. We record systems, volumes, and refresh rates.",
      processType: "discovery",
    },
    {
      title: "Profiling",
      text: "We count completeness, duplicates, distributions, and freshness on samples. Each source gets a report with numbers and sample records.",
      processType: "system-design",
    },
    {
      title: "Scorecard",
      text: "We fold the scores into a scorecard by source and attribute. It shows where data is ready and where you need cleanup or a new extract.",
      processType: "integration",
    },
    {
      title: "Roadmap and handover",
      text: "We assemble the work plan by priority and estimate the timeline. We hand over the register, scorecard, and map in a team meeting.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Three sources or more",
      text: "An AI project draws on CRM, ERP, stock, and analytics. The register and scorecard show how to join them into one loop.",
      positive: true,
    },
    {
      title: "A data owner is named",
      text: "Someone on your side confirms access and priorities. With that person you agree on samples and settle disputed fields faster.",
      positive: true,
    },
    {
      title: "No access to the sources",
      text: "Without table and file reads, profiling runs on descriptions. That report shows structure and misses defects inside the data.",
      positive: false,
    },
    {
      title: "An audit as a cleanup substitute",
      text: "The audit records defects and priority, while the team or a separate project removes duplicates and fixes reference data.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "ERP reconciliation after cleanup",
      text: "Our team removed 1,200 duplicate counterparties and linked stock to orders. Stock reconciliation takes 5 minutes, and report discrepancies fell by 90%.",
      metricValue: "−90%",
      metricLabel: "fewer discrepancies in reports",
    },
  ],
  faqItems: [
    {
      question: "How long does the audit take?",
      answer:
        "Three to four weeks for three sources. The timeline depends on table count, sample volume, and how fast access is approved.",
    },
    {
      question: "What is in the result?",
      answer:
        "A source register, a quality scorecard, a PII and access map, and a roadmap. We also hand over the samples and profiling scripts.",
    },
    {
      question: "How do you handle PII?",
      answer:
        "We find personal data through the catalog and samples, check the processing basis, and map roles. We mask sensitive fields in the reports themselves.",
    },
    {
      question: "What comes next?",
      answer:
        "You pick the first step from the roadmap and start cleanup or a pilot. We can run that stage as a separate project.",
    },
  ],
  tradeoffs: [
    {
      title: "Read access",
      text: "The audit relies on read access to tables and files. Full access speeds up profiling: the first source numbers arrive by the end of week one.",
    },
    {
      title: "Source quality",
      text: "The depth of the findings follows the completeness of the sources. With 40% empty fields, the scorecard shows that gap and the roadmap puts cleanup first.",
    },
    {
      title: "Cleanup as a separate project",
      text: "The audit records defects, priority, and scope. The client team or our separate project removes duplicates and fixes reference data to the plan.",
    },
  ],
  deliverables: [
    {
      title: "Source register",
      text: "The register lists systems, tables, files, and queues with owner, volume, and refresh rate. It shows where each attribute comes from.",
    },
    {
      title: "Quality scorecard",
      text: "The scorecard grades completeness, duplicates, freshness, and consistency for each source. Scores and sample records set the cleanup priority.",
    },
    {
      title: "Roadmap",
      text: "The roadmap splits preparation into steps with dates and owners. It ties source defects to team tasks and the order of work.",
    },
  ],
  mechanism: [
    {
      title: "Source inventory",
      text: "We walk the systems with the data owner and write each source, its tables, files, and queues into the register. Each entry carries volume, refresh rate, and export path, so the picture stays verifiable.",
    },
    {
      title: "Data profiling",
      text: "On a sample we count completeness, duplicates, distributions, and freshness for each data attribute. Python scripts repeat the calculation on new extracts, and you see quality move between iterations.",
    },
    {
      title: "Scorecard and roadmap",
      text: "Scores roll into a scorecard by source and attribute, and defects get a priority. The roadmap orders the steps by dependency, and the team starts with the source that covers 3–5 priority scenarios from the register.",
    },
  ],
  outcomes: [
    {
      title: "Sources in one register",
      value: "3",
      text: "The three sources in the base package get an owner, volume, and refresh rate. The register shows how to join CRM, stock, and reporting into one loop.",
    },
    {
      title: "Scorecard as the base artifact",
      value: "Scorecard",
      text: "The scorecard grades completeness, duplicates, and freshness for each source. It gives you a numeric basis for the data preparation talk.",
    },
    {
      title: "Reconciliation in ERP",
      value: "5 min",
      text: "In the ERP case, stock reconciliation takes 5 minutes after our team removed 1,200 duplicates. We use that result as a benchmark for cleanup scope.",
    },
  ],
};
