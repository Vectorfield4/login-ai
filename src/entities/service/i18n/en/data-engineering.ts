export const dataEngineeringEn = {
  ctaBanner: {
    title: "Let's map your data pipeline",
    text: "Send us the source list and a volume estimate in gigabytes or terabytes. We will walk through ingestion and name the pilot timeline.",
    buttonLabel: "Discuss the project",
  },
  navTitle: "Data engineering",
  title: "Data engineering for AI and analytics",
  tagline:
    "We build ingestion, storage, and marts so reports reconcile and quality checks run before publication.",
  description:
    "We design the data pipeline: pull from APIs, databases, and files, land it in a layered warehouse with marts, and add quality checks. In 6-8 weeks we launch a pilot on three sources.",
  features: [
    {
      title: "Ingestion from sources",
      text: "We pull data from APIs, databases, and files with a connector, cursor, and retry on a dropped connection. You set the schedule, and a repeat run closes a missed interval.",
    },
    {
      title: "Warehouse and marts",
      text: "We build warehouse layers: raw, cleaned, and analytics. Marts are shaped for reports, so an analyst gets a table with clear fields and freshness within the last hour.",
    },
    {
      title: "Quality checks",
      text: "Every run checks empty required fields, duplicate keys, and amount mismatches between source and mart. A mismatch stops publication and sends an alert within 15 minutes.",
    },
    {
      title: "Lineage and monitoring",
      text: "The lineage line links a mart column to its source table and transformation step. A dashboard shows freshness, volume, and pipeline status, so a failure shows before a complaint.",
    },
  ],
  techStack: [
    {
      subtitle: "Ingestion, storage, and analytics",
      description:
        "Ingestion runs through [Airflow], streaming events land in [Kafka], transactional data sits in [PostgreSQL], analytics queries hit [ClickHouse], and files and archives live in [MinIO].",
      technologies: [
        {
          id: "airflow",
          name: "Airflow",
          glossary:
            "Pipeline orchestrator: schedules, step dependencies, and retry runs are code, versioned in the same repository.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "Streaming bus: takes events from applications and hands them to consumers with an on-disk buffer.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Transactional database: keeps reference tables and operational data, runs read replicas, and enforces integrity at the schema level.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "Columnar database: counts aggregates over millions of rows in seconds and holds the marts analysts query for reports.",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "Object storage: keeps raw extracts, archives, and large files on your hardware, with an S3-compatible API.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Source audit",
      text: "We review systems, owners, and access methods: API, database, file, or an export from an accounting system. We record refresh cadence and required fields.",
      processType: "discovery",
    },
    {
      title: "Warehouse model",
      text: "We design layers and marts for your reports: which tables you need, how keys connect, and where a metric is calculated. We agree the schema with your analyst.",
      processType: "system-design",
    },
    {
      title: "Pipelines and checks",
      text: "We build ingestion and refresh, then add quality checks and lineage. Every pipeline gets a schedule, a retry, and an alert, and the result lands on the dashboard.",
      processType: "integration",
    },
    {
      title: "Pilot and handover",
      text: "We launch a pilot on three sources and up to 5 TB, then reconcile the numbers with your reports. We hand over documentation, tests, and instructions to your team.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Three sources or more",
      text: "Data sits in a CRM, billing, and files while an analyst assembles the summary by hand. The pipeline brings the sources into one warehouse and refreshes marts.",
      positive: true,
    },
    {
      title: "An analytics owner",
      text: "An analyst owns the metrics and confirms the calculation rules. They set source priority and accept the pilot.",
      positive: true,
    },
    {
      title: "No access to sources",
      text: "A vendor closed the API and withholds an extract, while the database sits with a contractor. Access or an official export comes first.",
      positive: false,
    },
    {
      title: "Ad-hoc extracts only",
      text: "Reports are assembled by hand once a month, and one person holds the repeatable process. A pipeline pays off when a report is needed more often.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "Which stack do you use?",
      answer:
        "The stack: Airflow for scheduling, Kafka for events, PostgreSQL for transactions, ClickHouse for marts, MinIO for files. We pick it for your sources and volume.",
    },
    {
      question: "How do you choose a warehouse?",
      answer:
        "We look at query type and volume. Transactions go to PostgreSQL, aggregates over millions of rows to ClickHouse, files to MinIO. Up to 5 TB, PostgreSQL and ClickHouse cover the job.",
    },
    {
      question: "How long does the project take?",
      answer:
        "A pilot on three sources and two pipelines takes 6-8 weeks. The first two weeks cover the audit and model, then come pipelines and checks. We size it after the source list.",
    },
    {
      question: "How do you ensure data quality?",
      answer:
        "Checks count empty fields, duplicate keys, and amount mismatches with the mart. You set the threshold, for example an empty-field share below 1%. A mismatch stops publication, and an alert arrives within 15 minutes.",
    },
  ],
  tradeoffs: [
    {
      title: "Source quality",
      text: "Source quality sets the ceiling for mart accuracy. Duplicates, mixed date formats, and empty fields surface on the first run, so the audit comes before model design. An ingestion check adds 10–15 minutes per source to the pipeline run, and a mismatch surfaces before the mart is published.",
    },
    {
      title: "Data ownership",
      text: "Data ownership sits with your analyst, who confirms metric rules and source priority. We hand over documentation, tests, and instructions, so your team runs the pipelines.",
    },
    {
      title: "Latency and cost",
      text: "Latency and cost move together: streaming refresh updates marts in minutes and uses more compute, while a nightly batch costs less at volume. We size both modes on your data.",
    },
  ],
  deliverables: [
    {
      title: "A source map",
      text: "The source map lists systems, owners, refresh cadence, and access method. It shows which APIs and tables feed the warehouse.",
    },
    {
      title: "Pipelines",
      text: "Pipelines pull data on a schedule and land it in warehouse layers. Every run records status, volume, and duration, and a repeat run closes an interval.",
    },
    {
      title: "A quality dashboard",
      text: "The quality dashboard shows the share of empty fields, duplicate keys, and mismatches between source and mart. It tracks data freshness and check results.",
    },
  ],
  mechanism: [
    {
      title: "Ingestion",
      text: "Ingestion pulls from APIs, databases, and files on a schedule or an event. Each source gets a connector, cursor, and retry rule, so a load resumes from the point where it stopped. Raw records stay in the warehouse.",
    },
    {
      title: "Transformation",
      text: "Transformation brings raw records into one schema: types, dictionaries, and keys settle into a single layer. The model splits raw, cleaned, and analytics layers, and logic lives in SQL and versions with the code.",
    },
    {
      title: "Quality and lineage",
      text: "Quality and lineage checks run at every step: checks count empty fields, duplicates, and amount mismatches. The lineage line links a mart column to its source table, so a dispute about a number opens the path.",
    },
  ],
  outcomes: [
    {
      title: "Sources in the pipeline",
      value: "3 sources",
      text: "The base pipeline collects 3 sources: an API, a database, and files. Each source is listed on the map and added to the schedule.",
    },
    {
      title: "Warehouse volume",
      value: "5 TB",
      text: "The base warehouse holds 5 TB: a raw layer, a cleaned layer, and marts. Volume grows with the sources, and the retention policy sets a lifetime.",
    },
    {
      title: "Pipelines at work",
      value: "2 pipelines",
      text: "The base setup runs 2 pipelines: loading and mart refresh. Schedule, retries, and alerts are set in the first stage, so runs stay automatic.",
    },
  ],
};
