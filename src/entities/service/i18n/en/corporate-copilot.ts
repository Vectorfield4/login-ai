export const corporateCopilotEn = {
  ctaBanner: {
    title: "We'll assemble the source map",
    text: "Send the system list, the owners, and typical employee questions. In two weeks we'll show search with access control on your document sample.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "Corporate AI assistant",
  title: "Corporate AI assistant for your knowledge base",
  tagline:
    "The assistant finds answers in email, files, the wiki, and databases and links to the source.",
  description:
    "We build a corporate assistant over your knowledge sources: one search index, permissions from the corporate role directory, and a citation from the retrieved fragment in every answer. The contour runs on your hardware or in a closed cloud, and request logs stay with you.",
  features: [
    {
      title: "One index across sources",
      text: "Email, files, the wiki, and databases land in one search index. Each answer shows which system the fragment came from.",
    },
    {
      title: "Roles from the directory",
      text: "The assistant reads groups and roles from the corporate directory and shows an employee only the documents open to them.",
    },
    {
      title: "A citation in every answer",
      text: "An answer relies on the retrieved fragments, and every claim carries a link to the document, section, and source version.",
    },
    {
      title: "A closed contour",
      text: "The assistant runs on your hardware or in a closed cloud. The request log keeps the question, the retrieved fragments, and the response time.",
    },
  ],
  techStack: [
    {
      subtitle: "Search, access, and deployment",
      description:
        "[OpenSearch] holds the full-text and vector index, [Keycloak] checks roles on every request, [PostgreSQL] stores the indexing queue and logs, [Kubernetes] runs the contour across sites, and [vLLM] serves the open model.",
      technologies: [
        {
          id: "opensearch",
          name: "OpenSearch",
          glossary:
            "A search engine with full-text and vector retrieval: one query covers email, files, the wiki, and database tables.",
        },
        {
          id: "keycloak",
          name: "Keycloak",
          glossary:
            "An identity server: the assistant reads the user's groups and roles from the corporate directory and checks access before returning a fragment.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores the indexing queue, fragment metadata, and the request log, so the log shows who asked and which fragments came back.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "The orchestrator for the contour: search, model, and indexing queue run as replicas, and updates go through manifests and readiness checks.",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary:
            "An inference server for the open model: batching and attention cache keep response time steady under requests from hundreds of employees.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Source inventory",
      text: "We list the systems, document volume, and owner of each source. We fix which data enters the index and who keeps it current.",
    },
    {
      title: "Access model",
      text: "We review groups and roles in the corporate directory, set inheritance rules, and design an index schema with access metadata on every fragment.",
    },
    {
      title: "Search and answers",
      text: "We bring up hybrid search, connect the model through vLLM, and build the answer layer: retrieved fragments, citations, and an access check before delivery.",
    },
    {
      title: "Pilot and launch",
      text: "Nine weeks to the first contour: one team, three sources, typical questions. We measure the share of answers with a correct citation and move the contour into production.",
    },
  ],
  fitItems: [
    {
      title: "Knowledge spread across systems",
      text: "Email, files, the wiki, and databases live apart. The assistant brings them into one search and shows the source of every answer.",
      positive: true,
    },
    {
      title: "A corporate role directory",
      text: "Groups and roles already live in the directory, so access inherits automatically, and a new employee gets the right documents on day one.",
      positive: true,
    },
    {
      title: "Sources without owners",
      text: "No one is responsible for document freshness. In this case the project starts with named owners and an update policy.",
      positive: false,
    },
    {
      title: "A public-facing chatbot",
      text: "The assistant answers employees inside the perimeter. Customer support and sales chat belongs to a separate service with a different scenario and access model.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "Which sources can we connect?",
      answer:
        "Email, files, the wiki, databases, and internal portals. We configure a connector for each system during the audit and fix the source list in the map.",
    },
    {
      question: "How does document access work?",
      answer:
        "The assistant reads roles from the corporate directory and checks access before returning a fragment. An employee sees answers from documents open to their group.",
    },
    {
      question: "Where does the data live?",
      answer:
        "In your contour or in a closed cloud with an isolated network. Request logs, the index, and the model stay on the agreed site.",
    },
    {
      question: "How long does the pilot take?",
      answer:
        "Nine weeks to the first contour: source audit, search build, and launch with one team. After that we connect new sources and groups.",
    },
  ],
  tradeoffs: [
    {
      title: "Answer quality depends on sources",
      text: "Clean sources with an owner and a version produce an accurate answer with a link. The source map and update policy set that level before the start.",
    },
    {
      title: "The role directory stays current",
      text: "Access inherits from the corporate directory, so current groups and roles produce an accurate result. Directory maintenance is part of the operations policy.",
    },
    {
      title: "On-prem adds an infrastructure stage",
      text: "Deployment on your hardware adds a stage for site preparation, replicas, and monitoring. That stage is part of the project plan and the budget.",
    },
  ],
  deliverables: [
    {
      title: "Source map",
      text: "The map shows the system, owner, volume, and update frequency of each source. It names the systems we connect first.",
    },
    {
      title: "Search with access control",
      text: "Search runs across all sources and checks directory permissions before delivery. Every answer carries a link to the document and the fragment version.",
    },
    {
      title: "Pilot and training",
      text: "The pilot runs with one team and three sources. Training shows employees how to ask a question, read a citation, and report a doubtful answer.",
    },
  ],
  mechanism: [
    {
      title: "Knowledge index",
      text: "Email, files, the wiki, and databases pass through connectors into one index with metadata for source, version, and access. Search finds a fragment by meaning and exact identifier, so an answer rests on a verified document.",
    },
    {
      title: "Role-based access",
      text: "The assistant reads groups and roles from the corporate directory and checks permissions on every fragment before it builds an answer. An employee sees documents for their group, and the log records the access basis for each request.",
    },
    {
      title: "Deployment inside the perimeter",
      text: "The contour runs on your hardware or in a closed cloud, so data stays inside the company perimeter. Request logs and indexes stay on the agreed site, and model updates pass through readiness checks.",
    },
  ],
  outcomes: [
    {
      title: "The first contour",
      value: "1 contour",
      text: "The first contour brings email, files, and the team knowledge base into one search. The team gets answers with links and works in the systems it already uses.",
    },
    {
      title: "Users and roles",
      value: "100–1,000",
      text: "The calculator covers 100 to 1,000 users and accounts for role permissions. Cost grows with the number of employees and sources.",
    },
    {
      title: "Time to launch",
      value: "9 wks",
      text: "The source audit, search build, and launch of the first contour take nine weeks. The pilot runs with one team, then we connect the remaining groups.",
    },
  ],
};
