import type { StackItem } from "./stack";

/**
 * Single source of truth for the engineering stack. `kind` is the broad
 * artifact family, `category` is the specific product area; the two never
 * duplicate each other.
 *
 * LLM models are artifacts, not technologies and not libraries: they live in
 * `entities/llm-model`.
 */
export const stack: StackItem[] = [
  // Languages.
  { slug: "typescript", kind: "language", category: "frontend", name: "TypeScript" },
  { slug: "go", kind: "language", category: "backend", name: "Go" },
  { slug: "python", kind: "language", category: "backend", name: "Python" },
  { slug: "rust", kind: "language", category: "backend", name: "Rust" },
  { slug: "swift", kind: "language", category: "mobile", name: "Swift" },
  { slug: "kotlin", kind: "language", category: "mobile", name: "Kotlin" },

  // Runtimes.
  { slug: "nodejs", kind: "runtime", category: "backend", name: "Node.js" },
  { slug: "tokio", kind: "runtime", category: "backend", name: "Tokio" },

  // Frameworks.
  { slug: "react", kind: "framework", category: "frontend", name: "React" },
  { slug: "nextjs", kind: "framework", category: "frontend", name: "Next.js" },
  { slug: "react-native", kind: "framework", category: "mobile", name: "React Native" },
  { slug: "flutter", kind: "framework", category: "mobile", name: "Flutter" },
  { slug: "axum", kind: "framework", category: "backend", name: "Axum" },

  // Libraries and inference engines.
  { slug: "pytorch", kind: "library", category: "ml", name: "PyTorch" },
  { slug: "scikit-learn", kind: "library", category: "ml", name: "scikit-learn" },
  { slug: "tensorrt", kind: "inference", category: "ml", name: "TensorRT" },
  { slug: "vllm", kind: "inference", category: "ml", name: "vLLM" },

  // Data stores, caches, search, transport and storage.
  { slug: "postgresql", kind: "data-store", category: "database", name: "PostgreSQL" },
  { slug: "sqlite", kind: "data-store", category: "database", name: "SQLite" },
  { slug: "clickhouse", kind: "data-store", category: "database", name: "ClickHouse" },
  { slug: "qdrant", kind: "data-store", category: "database", name: "Qdrant" },
  { slug: "pgvector", kind: "extension", category: "database", name: "pgvector" },
  { slug: "redis", kind: "data-store", category: "cache", name: "Redis" },
  { slug: "elasticsearch", kind: "data-store", category: "search", name: "Elasticsearch" },
  { slug: "kafka", kind: "broker", category: "messaging", name: "Kafka" },
  { slug: "minio", kind: "data-store", category: "storage", name: "MinIO" },

  // Platforms.
  { slug: "kubernetes", kind: "platform", category: "infra", name: "Kubernetes" },
  { slug: "prometheus", kind: "platform", category: "observability", name: "Prometheus" },
  { slug: "grafana", kind: "platform", category: "observability", name: "Grafana" },
  { slug: "langfuse", kind: "platform", category: "observability", name: "Langfuse" },
  { slug: "keycloak", kind: "platform", category: "security", name: "Keycloak" },
  { slug: "mlflow", kind: "platform", category: "ml", name: "MLflow" },
  { slug: "airflow", kind: "platform", category: "ml", name: "Airflow" },
  { slug: "embeddings-api", kind: "api", category: "ai", name: "Embeddings API" },
  { slug: "openai-api", kind: "api", category: "ai", name: "OpenAI API" },
  { slug: "yandex-speechkit", kind: "api", category: "ai", name: "Yandex SpeechKit" },
  { slug: "telegram-bot-api", kind: "api", category: "messaging", name: "Telegram Bot API" },
  { slug: "whatsapp-cloud-api", kind: "api", category: "messaging", name: "WhatsApp Cloud API" },
  { slug: "langgraph", kind: "framework", category: "ml", name: "LangGraph" },
  { slug: "whisper", kind: "inference", category: "ml", name: "Whisper" },
  { slug: "opensearch", kind: "data-store", category: "search", name: "OpenSearch" },
  { slug: "asterisk", kind: "platform", category: "infra", name: "Asterisk" },
  { slug: "max-bot-api", kind: "api", category: "messaging", name: "MAX Bot API" },
  { slug: "n8n", kind: "platform", category: "infra", name: "n8n" },
  { slug: "make", kind: "platform", category: "infra", name: "Make" },
];
