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
      text: "Analysis and preliminary processing turns unstructured text, files, and internal documentation into a clean, structured dataset. We normalize formats and remove noise, so the index starts from reliable material your team can trust.",
    },
    {
      title: "Cleansing source data",
      text: "Cleansing source data strips duplicates, system noise, and broken characters before indexing begins. The result is one clean source table that feeds the vector store, so search returns even, accurate matches for every query.",
    },
    {
      title: "Optimal document chunking strategies",
      text: "Optimal document chunking strategies split long files into logical fragments that keep their context and meaning. We tune chunk size to your documents, so answers rest on coherent passages with complete context.",
    },
    {
      title: "Generating vector embeddings",
      text: "Generating vector embeddings gives your documents a numeric representation built with models tuned to your domain. The vectors capture meaning and industry language, so semantic search finds the right fragment when wording differs.",
    },
    {
      title: "HNSW graph geometry in vector stores",
      text: "HNSW graph geometry sets how vectors link inside the store and speeds up nearest-neighbor search. We tune graph parameters to your data volume, so the right fragment arrives in milliseconds.",
    },
    {
      title: "Automatic vector index updates",
      text: "Automatic vector index updates run whenever a source document changes or a new file arrives. The index stays current through the event stream, so search returns fresh answers from the latest data.",
    },
    {
      title: "Semantic caching systems",
      text: "Semantic caching systems answer repeated queries instantly from memory by measuring how close their meaning is. The cache holds frequent questions, so you cut external calls and keep response times low.",
    },
    {
      title: "Reranking search results",
      text: "Reranking search results lifts the most relevant fragments to the top and improves answer accuracy. The reranker scores each candidate, so the model builds its answer from the best passages on hard queries.",
    },
    {
      title: "Custom system prompt instructions",
      text: "Custom system prompt instructions define the model's role, answer format, and rules for your workflow. We draft and test these templates with your team, so replies follow a predictable structure on every task.",
    },
    {
      title: "Dynamic context window limiting",
      text: "Dynamic context window limiting sets the request size against current provider limits and your budget. The system trims context to the relevant parts, so you control token spend and the model keeps answer quality.",
    },
    {
      title: "End-to-end distributed tracing",
      text: "End-to-end distributed tracing follows every call chain and shows where latency builds up. We turn on tracing across the pipeline, so you spot the slow step and keep response times under control.",
    },
    {
      title: "Automated token cost auditing",
      text: "Automated token cost auditing tallies spend per request and forecasts load week by week. We set up the audit, so you read the budget in numbers and catch rising model costs early.",
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
