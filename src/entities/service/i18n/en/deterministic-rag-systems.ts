export const deterministic_rag_systemsEn = {
  ctaBanner: {
    title: "Let's demo RAG on your documents",
    text: "Send a document sample and typical questions. We'll build the loop and show the share of answers with a source link.",
    buttonLabel: "Request a demo",
  },
  navTitle: "Deterministic RAG systems",
  title: "Building deterministic RAG systems",
  tagline: "The model answers from 3–4 verified fragments and cites each source.",
  description:
    "We build a RAG loop with hybrid search, a semantic cache, and tracing: the model receives only verified fragments, and every answer is traceable to its source.",
  features: [
    {
      title: "Hybrid search",
      text: "Meaning and exact identifiers such as part numbers, dates, and names are searched together, not separately.",
    },
    {
      title: "Verifiable source",
      text: "Every answer links to a specific fragment; without a source the system marks the answer as coming from memory.",
    },
    {
      title: "Semantic cache",
      text: "Repeated questions are answered instantly, and the cache version resets when a document updates.",
    },
    {
      title: "De-identification on exit",
      text: "Only fragments without personal data leave the perimeter, and the trace logs show it.",
    },
  ],
  techStack: [
    {
      subtitle: "Search and observability",
      description:
        "Search runs on [Qdrant] or [pgvector], the step chain is collected by [Langfuse], document updates go through [Kafka], and index versions are stored in [PostgreSQL].",
      technologies: [
        {
          id: "qdrant",
          name: "Qdrant",
          glossary:
            "A vector database with metadata filters: search respects both meaning and access rights to a fragment.",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary:
            "A PostgreSQL extension for vectors: when the whole stack is on one database, a separate vector store is unnecessary.",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Chain tracing: it shows which fragment was found, what the request cost, and where the source was lost.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: a new document revision triggers a version rebuild, not a full reindex.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores index versions and metadata: they switch the cache and check rights on a fragment.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Knowledge audit",
      text: "We review sources, structure, and access rights: what may be given to the model at all.",
      processType: "discovery",
    },
    {
      title: "Chunk schema",
      text: "We split documents by structure and fix metadata: version, source, rights.",
      processType: "system-design",
    },
    {
      title: "Building the loop",
      text: "We bring up hybrid search, cache, and tracing, and close external calls with de-identification.",
      processType: "implementation",
    },
    {
      title: "Quality benchmarks",
      text: "We measure the share of answers with a source link and retrieval accuracy on your question set.",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "A large document archive",
      text: "Policies, contracts, and support history do not fit the context but are needed for answers.",
      positive: true,
    },
    {
      title: "Frequent repeated questions",
      text: "The same topics come back: the semantic cache takes load off external inference.",
      positive: true,
    },
    {
      title: "Documents change daily",
      text: "With a daily index rebuild, cache and versions need a separate pipeline — that is another scope.",
      positive: false,
    },
    {
      title: "No owner of the knowledge base",
      text: "If no one owns the sources, stale documents land in answers alongside fresh ones.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "A policy knowledge base",
      text: "Answers linked to a specific policy section, and repeated questions were closed by the cache.",
      metricValue: "70–80%",
      metricLabel: "requests served from the semantic cache",
    },
  ],
  faqItems: [
    {
      question: "How is this different from plain RAG?",
      answer:
        "We do not send the whole archive into context: the model gets 3–4 verified fragments and a source link.",
    },
    {
      question: "What if the needed fragment is missing?",
      answer:
        "The system marks the answer as coming from memory instead of presenting it as retrieved from documents.",
    },
    {
      question: "How often should the index be rebuilt?",
      answer:
        "On an event: a new document revision triggers a version rebuild, not a full reindex.",
    },
    {
      question: "Does data leave the perimeter?",
      answer: "Only de-identified fragments; parsing, indexing, and search stay inside the loop.",
    },
    {
      question: "Can several sources be connected?",
      answer:
        "Yes, connectors collect documents from several systems, and rights are checked at the fragment metadata level.",
    },
    {
      question: "What about running costs?",
      answer:
        "The main cost is external inference on answers the cache does not hold. Rebuilds run on an event, not a schedule, so you pay for real changes.",
    },
  ],
  tradeoffs: [
    {
      title: "Chunking decides a lot",
      text: "Chunking decides a lot: too small a chunk breaks context and too large a one blurs the model's attention, and both give a wrong answer.",
    },
    {
      title: "The cache returns a close answer",
      text: "The semantic cache can return a past answer to a vector-close question: the threshold stays high and hits are logged.",
    },
    {
      title: "Pattern-based de-identification",
      text: "De-identification works on patterns: regexes catch email and phones, while free text needs manual sampling. Full guarantees cover structured fields.",
    },
    {
      title: "Access rights in the metadata",
      text: "Access rights live in the fragment metadata: without them, search returns documents closed to that user as well.",
    },
    {
      title: "The knowledge base owner",
      text: "The knowledge base owner is responsible for source freshness. The owner sets the refill rules, or the base goes stale.",
    },
    {
      title: "Access rights",
      text: "Access rights define who sees which documents. Access rights are set up front, or search returns documents closed to a user.",
    },
    {
      title: "Source quality",
      text: "Scans without a text layer and duplicates lower retrieval accuracy. Source quality sets the accuracy ceiling for the whole system.",
    },
    {
      title: "The update rule",
      text: "The update rule names the event that triggers a rebuild of the index version. The rule keeps the index fresh and assigns an owner.",
    },
  ],
  mechanism: [
    {
      title: "Offline indexing",
      text: "Documents are indexed offline, so answer quality does not depend on current traffic and is not bound to latency.",
    },
    {
      title: "Hybrid search",
      text: "Hybrid search closes both failures: vector search misses a part number, full-text misses a synonym, and together they catch both.",
    },
    {
      title: "Answer tracing",
      text: "Tracing shows the answer path: which fragment was found, what the request cost, and at which step the source was lost.",
    },
    {
      title: "Event-based versions",
      text: "Index versions switch on an event: a policy update does not require manual reindexing of the whole archive.",
    },
  ],
  sections: [
    {
      title: "What the project covers",
      items: [
        "A source audit: which documents exist, who owns them, and how often they change.",
        "A chunk and metadata schema: structure, version, and access rights per fragment.",
        "Hybrid search and cache: vector and full-text search, the cache threshold, and its reset.",
        "Tracing and de-identification: the answer path in the logs and the filters on exit.",
        "Benchmarks: the share of answers with a source link and retrieval accuracy on your question set.",
      ],
    },
  ],
};
