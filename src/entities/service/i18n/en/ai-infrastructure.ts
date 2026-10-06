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
    {
      question: "How does the project start?",
      answer:
        "The project starts with a data audit: which sources exist, who owns them, and how often they change. From there we choose the chunk, metadata, and search scheme.",
    },
  ],
  mechanism: [
    {
      title: "Analysis and preprocessing",
      text: "Analysis and preliminary processing of unstructured text arrays, files, and internal documentation.",
    },
    {
      title: "Cleansing source data",
      text: "Cleansing source data from duplicates, system garbage, and incorrect characters before indexing.",
    },
    {
      title: "Optimal document chunking strategies",
      text: "Developing optimal document chunking strategies to preserve context across logical fragments and long documents.",
    },
    {
      title: "Generating vector embeddings",
      text: "Generating high-density vector embeddings for your documents using optimized transformation models tuned to your domain.",
    },
    {
      title: "HNSW graph geometry in vector stores",
      text: "Designing and tuning HNSW graph geometry in vector stores to accelerate search speed.",
    },
    {
      title: "Automatic vector index updates",
      text: "Configuring automatic vector index updates when source documents are modified or added, on an event, not a schedule.",
    },
    {
      title: "Semantic caching systems",
      text: "Deploying semantic caching systems for instant interception of frequent recurring queries without resending the context to an external model.",
    },
    {
      title: "Reranking search results",
      text: "Integrating search result reranking algorithms to improve model answer accuracy on hard queries.",
    },
    {
      title: "Custom system prompt instructions",
      text: "Developing and testing custom system prompt instructions and prompt engineering templates for your workflow.",
    },
    {
      title: "Dynamic context window limiting",
      text: "Configuring dynamic context window limiting mechanisms to match current provider limits and your budget.",
    },
    {
      title: "End-to-end distributed tracing",
      text: "Implementing end-to-end distributed tracing of call chains to monitor network I/O latency.",
    },
    {
      title: "Automated token cost auditing",
      text: "Setting up automated token cost auditing systems and operational load forecasting by week.",
    },
  ],
  deliverables: [
    {
      title: "Cleansing and indexing",
      text: "Cleansing and indexing: we gather unstructured data, drop duplicates, and build a vector index with metadata.",
    },
    {
      title: "Hybrid search",
      text: "Vector and full-text search work together, and we rerank the result so the answer rests on exact fragments.",
    },
    {
      title: "Semantic cache",
      text: "A semantic cache answers repeated questions from memory, so the cost of external calls drops.",
    },
    {
      title: "Tracing and budget",
      text: "Tracing and budget: we see the answer path and the per-step cost, and limits and alerts keep spend in check.",
    },
  ],
};
