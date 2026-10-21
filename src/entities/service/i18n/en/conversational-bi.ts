export const conversationalBiEn = {
  ctaBanner: {
    title: "Show us your warehouse schema",
    text: "Send the warehouse schema and the metric list. We will build the semantic layer, show the first answers, and scope a 4-6 week pilot.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "Chat with data",
  title: "Conversational BI: a chat with your company data",
  tagline:
    "An analyst asks a question in plain words and gets SQL, a chart, and a short answer from your warehouse.",
  description:
    "We build Conversational BI on top of your warehouse: a semantic layer, SQL generation, and role-based access. Fifty analysts ask questions in plain words, and the system returns figures and charts.",
  features: [
    {
      title: "A semantic layer over the warehouse",
      text: "Metrics, dimensions, and joins are defined once, so every query counts revenue and margin by one definition.",
    },
    {
      title: "A question in plain language",
      text: "The model translates the question into SQL against the semantic layer schema and shows the generated query before it runs.",
    },
    {
      title: "Access by role",
      text: "A user sees the rows and columns allowed by their role, and access filters apply to every query.",
    },
    {
      title: "A chart and a short answer",
      text: "The system picks the chart type, labels the axes, and adds a two- or three-sentence reading with the period.",
    },
  ],
  techStack: [
    {
      subtitle: "Warehouse and query layer",
      description:
        "The warehouse reads from [PostgreSQL] and [ClickHouse], update events flow through [Kafka], the answer cache lives in [Redis], and [Python] handles SQL generation and access checks.",
      technologies: [
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "The main store for metrics and reference data: the semantic layer keeps definitions, access rules, and query history here.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "A columnar database for heavy aggregates: it sums revenue and funnels over millions of rows in seconds while PostgreSQL holds the reference tables.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event stream from your sources: a new data batch lands in the warehouse and refreshes the cache without a manual restart.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "A cache for finished answers and query plans: a repeated question on the same metric returns in milliseconds.",
        },
        {
          id: "python",
          name: "Python",
          glossary:
            "The SQL generation and access-check service: it assembles the query from the semantic layer and applies role filters before execution.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Warehouse and metric audit",
      text: "We review the warehouse schema, the source list, and the metric owners, then fix which figures count as official.",
      processType: "discovery",
    },
    {
      title: "Semantic layer",
      text: "We describe metrics, dimensions, joins, and aggregation rules, and the metric owner approves every definition.",
      processType: "system-design",
    },
    {
      title: "NL-to-SQL and access",
      text: "We connect the SQL generator, test it on a set of real questions, and set up role-based filters.",
      processType: "integration",
    },
    {
      title: "Pilot and launch",
      text: "We launch on a group of fifty users, collect the questions that miss an answer, and bring accuracy to the agreed threshold.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A warehouse and a metric owner",
      text: "Data sits in PostgreSQL or ClickHouse, and a named person owns the revenue and margin definitions.",
      positive: true,
    },
    {
      title: "Roles are defined",
      text: "You have documented roles and access rules for rows and columns in reports.",
      positive: true,
    },
    {
      title: "Reports live in spreadsheets",
      text: "Scattered files and manual exports show different revenue for one period, so a shared source comes first.",
      positive: false,
    },
    {
      title: "Regulated metrics without governance",
      text: "When official figures are unapproved, the chat repeats the gaps between reports, so a governance rule comes first.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How accurate are the answers?",
      answer:
        "In the pilot we measure the share of questions with correct SQL and a correct figure on your set. We agree on the threshold before launch: it is usually 90-95% for common questions on approved metrics, and the system flags complex queries.",
    },
    {
      question: "Who sees what?",
      answer:
        "A role sets access: row and column filters apply before the query runs, so a user receives only permitted data. The rules live in the semantic layer and change with the role.",
    },
    {
      question: "Which sources do you connect?",
      answer:
        "PostgreSQL, ClickHouse, Kafka, and marts built on them. The base contour includes two sources, and we add extra ones one at a time: each adds tables, joins, and aggregation rules.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "The pilot runs 4-6 weeks: the audit and semantic layer, then NL-to-SQL and access, then the launch with a user group. The term depends on the metric count and schema readiness.",
    },
  ],
  tradeoffs: [
    {
      title: "Semantic layer quality",
      text: "Answer accuracy rests on semantic layer quality: described metrics, joins, and aggregation rules produce predictable SQL. One metric owner approves the definitions, and that speeds up every change.",
    },
    {
      title: "Access model",
      text: "The access model sets row and column visibility for each role. The closer the roles match how departments work, the easier the rights are to maintain and check during the pilot.",
    },
    {
      title: "Data freshness",
      text: "Data freshness follows the load schedule: Kafka refreshes streaming tables within minutes, and nightly marts arrive on schedule. Every answer shows the time of the last load.",
    },
  ],
  deliverables: [
    {
      title: "Semantic layer",
      text: "We describe metrics, dimensions, joins, and aggregation rules in one layer. The metric owner approves the definitions, and the layer becomes the source for the chat and the dashboard.",
    },
    {
      title: "Data chat",
      text: "We deploy a question-and-answer interface with SQL generation, access checks, and a short reading. The user sees the query, the chart, and the period behind each figure.",
    },
    {
      title: "Dashboard",
      text: "We assemble a dashboard from the questions the pilot users ask most. The panels refresh on schedule and are the entry point for the analytics team.",
    },
  ],
  mechanism: [
    {
      title: "The question",
      text: 'An analyst asks a question in plain words: "what is revenue by region for the quarter". The system finds the metric and dimensions in the semantic layer and clarifies the period when the question allows two readings.',
    },
    {
      title: "The SQL query",
      text: "The generator assembles the SQL query from semantic layer definitions, applies role filters, and checks the syntax. The user sees the finished SQL before execution and can save it as a report.",
    },
    {
      title: "The answer and access",
      text: "The warehouse returns aggregates, and the system picks a chart and writes a short reading with the period and units. Access filters apply to rows and columns, so each user sees their own slice of the data.",
    },
  ],
  outcomes: [
    {
      title: "Two sources in the base",
      value: "2 sources",
      text: "The base contour connects two sources, for example PostgreSQL and ClickHouse. Each source brings its own tables, and the semantic layer joins them into shared metrics.",
    },
    {
      title: "Fifty users",
      value: "50 users",
      text: "The pilot covers fifty users across roles. Each gets access to their own rows and asks questions without exports or a thread with an analyst.",
    },
    {
      title: "Semantic layer",
      value: "On request",
      text: "We add the semantic layer as a separate stage when the metric count grows and definitions change. The layer holds joins and rules, so new questions rest on one data model.",
    },
  ],
};
