export const ai_infrastructureEn = {
  ctaBanner: {
    title: "Let's discuss your AI infrastructure",
    text: "Tell us about your data volumes, security requirements, and model workloads. We'll prepare an architecture design and estimate within one business day.",
    buttonLabel: "Request an AI project estimate",
  },
  navTitle: "AI Infrastructure & RAG",
  title: "AI Infrastructure Design",
  tagline:
    "Integrating large language models into closed corporate perimeters with guaranteed data protection.",
  description:
    "Design and deployment of computing infrastructure for artificial intelligence workloads. Implementation of semantic search systems, inference cost optimization, and trade secret security.",
  features: [
    {
      title: "Anti-hallucination guardrails",
      text: "Strict isolation of AI models within verified local company documents.",
    },
    {
      title: "Operating cost control",
      text: "Efficient semantic caching preventing redundant repeated token submissions.",
    },
    {
      title: "Data security",
      text: "Deployment of search perimeters and databases within the organization's private boundary.",
    },
    {
      title: "Hybrid search",
      text: "Simultaneous consideration of semantic information similarity and exact identifier matches.",
    },
  ],
  techStack: [
    {
      subtitle: "Vector layer and semantics",
      description:
        "To handle complex knowledge bases, high-performance vector databases like [Qdrant] or specialized extensions like [pgvector] for PostgreSQL are deployed. Transforming unstructured documents into high-dimensional mathematical vectors is optimized via isolated [Embeddings API] instances that prevent index drift.",
      technologies: [
        {
          id: "qdrant",
          name: "Qdrant",
          glossary:
            "A vector database management system written in Rust, optimized for fast similarity search.",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary:
            "A PostgreSQL extension enabling storage, indexing, and vector embedding similarity search.",
        },
        {
          id: "embeddings-api",
          name: "Embeddings API",
          glossary:
            "An interface for converting text into mathematical vectors for subsequent semantic analysis.",
        },
      ],
    },
    {
      subtitle: "Orchestration and observability",
      description:
        "Context window management and hybrid search run on lightweight native layers. Request cost monitoring, prompt logging, and real-time execution trace debugging are integrated via [Langfuse], ensuring operational transparency.",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "An open-source platform for tracing, response quality evaluation, and token cost auditing in AI systems.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Data audit",
      text: "Evaluation of the structure, volume, and quality of corporate information intended for indexing.",
    },
    {
      title: "Perimeter design",
      text: "Selection and deployment of vector DBMS, HNSW index parameter tuning, and chunking strategies.",
    },
    {
      title: "Pipeline assembly",
      text: "Integration of caching systems, reranking mechanisms, and prompt engineering frameworks.",
    },
    {
      title: "Testing and launch",
      text: "Enabling distributed tracing, verifying hallucination prevention, and fixing SLAs.",
    },
  ],
  fitItems: [
    {
      title: "Enterprises with developed knowledge bases",
      text: "Organizations with significant volumes of closed internal regulations, technical documentation, and archives.",
      positive: true,
    },
    {
      title: "Fintech and legal platforms",
      text: "Products and internal services requiring automated analysis of complex contracts with absolute precision.",
      positive: true,
    },
    {
      title: "Large e-commerce aggregators",
      text: "Marketplaces implementing intelligent multilingual search across millions of distributed product cards.",
      positive: true,
    },
    {
      title: "Customer support teams",
      text: "Automation loops for first- and second-line user answers based on accumulated ticket history.",
      positive: true,
    },
    {
      title: "Companies without accumulated data",
      text: "New projects lacking unique text knowledge bases, proprietary regulations, or process history.",
      positive: false,
    },
    {
      title: "Linear automation scenarios",
      text: "Interaction systems where rigid programming condition trees are sufficient to close tasks.",
      positive: false,
    },
    {
      title: "Products without infrastructure budget",
      text: "Early prototypes planning to use exclusively public APIs without local information caching.",
      positive: false,
    },
    {
      title: "Dynamic real-time interfaces",
      text: "Transaction processing or market quote services where data becomes outdated every second.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "API token cost reduction up to 5x",
      text: "Proven result of AI infrastructure optimization through semantic caching and context window control.",
      metricValue: "−80%",
      metricLabel: "LLM token expense",
    },
  ],
  faqItems: [
    {
      question: "How does the architecture protect against hallucinations?",
      answer:
        "The model is isolated within the provided RAG context retrieved from the vector database. It is forbidden to use hidden training weights for generating facts, and a prompt instructor blocks answers when relevant text fragments are not found locally.",
    },
    {
      question: "How does semantic caching lower operational costs?",
      answer:
        "Deploying a semantic cache at the infrastructure level intercepts most recurring queries by determining semantic proximity from RAM. This eliminates the need to repeatedly send heavy contexts to external LLM services.",
    },
    {
      question: "How is commercial secret security ensured?",
      answer:
        "The entire vector database, document parsers, and search engines are deployed within the client's secure private perimeter. External inference APIs receive only anonymized and isolated text fragments stripped of personal information.",
    },
  ],
  sections: [
    {
      title: "Data cleansing and vector indexing",
      items: [
        "Analysis and preliminary processing of unstructured text arrays, files, and internal documentation.",
        "Cleansing source data from duplicates, system garbage, and incorrect characters before indexing.",
        "Developing optimal document chunking strategies to preserve context across logical fragments.",
        "Generating high-density vector embeddings using optimized transformation models.",
        "Designing and tuning HNSW graph geometry in vector stores to accelerate search speed.",
        "Configuring automatic vector index updates when source documents are modified or added, on an event, not a schedule.",
      ],
    },
    {
      title: "RAG pipeline optimization and cost control",
      items: [
        "Deploying semantic caching systems for instant interception of frequent recurring queries without resending the context to an external model.",
        "Integrating search result reranking algorithms to improve model answer accuracy.",
        "Developing and testing custom system prompt instructions and prompt engineering templates.",
        "Configuring dynamic context window limiting mechanisms to match current provider limits.",
        "Implementing end-to-end distributed tracing of call chains to monitor network I/O latency.",
        "Setting up automated token cost auditing systems and operational load forecasting.",
      ],
    },
  ],
};
