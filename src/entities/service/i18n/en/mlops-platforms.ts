export const mlops_platformsEn = {
  ctaBanner: {
    title: "Let's break down your ML process",
    text: "Show us how models are trained and shipped today. We'll propose a platform layout and size the first stage.",
    buttonLabel: "Request an estimate",
  },
  navTitle: "MLOps platform development",
  title: "Building MLOps platforms",
  tagline:
    "Training, versions, and model rollout are described as code and reproduce with one command.",
  description:
    "We build an MLOps platform: reproducible training pipelines, a model registry, quality monitoring, and automated rollout with rollback.",
  features: [
    {
      title: "Reproducible pipelines",
      text: "Training runs from code and configuration, not from a notebook on an engineer's machine.",
    },
    {
      title: "Model registry",
      text: "Every version carries metrics, dataset, and author: it is clear what was trained on what.",
    },
    {
      title: "Quality monitoring",
      text: "The platform watches drift and production metrics and warns before degradation.",
    },
    {
      title: "Rollout with rollback",
      text: "A new version ships canary-style, and rollback is one command, not a manual file swap.",
    },
  ],
  techStack: [
    {
      subtitle: "Pipelines and registry",
      description:
        "Pipelines are built in [Airflow], model versions are stored in [MLflow], artifacts in [MinIO], configuration in [Kubernetes], and metrics in [Prometheus].",
      technologies: [
        {
          id: "airflow",
          name: "Airflow",
          glossary:
            "Pipeline orchestration: training and feature recomputation steps are code and reproducible.",
        },
        {
          id: "mlflow",
          name: "MLflow",
          glossary:
            'Model registry: stores metrics, dataset, and artifact of every version, answering "what is in production".',
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "Stores model artifacts and datasets locally, with no external cloud.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "Ships models as services: canary release and rollback are described as manifests.",
        },
        {
          id: "prometheus",
          name: "Prometheus",
          glossary:
            "Scrapes quality and drift metrics in production: degradation shows before users feel it.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Process audit",
      text: "We review how models are trained, versioned, and shipped today: where the manual steps are.",
      processType: "discovery",
    },
    {
      title: "Pipeline schema",
      text: "We fix the training pipeline, registry, and rollout rules, and agree on quality metrics.",
      processType: "system-design",
    },
    {
      title: "Platform and registry",
      text: "We build the reproducible pipeline and registry and move the first models onto the platform.",
      processType: "implementation",
    },
    {
      title: "Operations and monitoring",
      text: "We enable drift monitoring and canary rollout, and define rollback and on-call.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "More than one model in production",
      text: "With several models, manual rollout becomes a bottleneck and a source of errors.",
      positive: true,
    },
    {
      title: "Regular retraining",
      text: "Models update on a schedule or on drift: the platform automates the cycle.",
      positive: true,
    },
    {
      title: "One model, updated once a year",
      text: "With one rare update, a platform costs more than manual rollout and does not pay off.",
      positive: false,
    },
    {
      title: "No model owner",
      text: "Without an engineer who owns the platform, it goes stale faster than the models.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Recommendations and scoring",
      text: "Models were trained and shipped through the platform, and a version rollback took minutes.",
      metricValue: "1",
      metricLabel: "command to roll back instead of a manual swap",
    },
  ],
  faqItems: [
    {
      question: "Do we need Kubernetes?",
      answer:
        "Not always. At low load the platform is built more simply: reproducibility and the registry matter, not a specific orchestrator.",
    },
    {
      question: "What about existing models?",
      answer:
        "We move them onto the platform gradually: new pipelines first, then migrate old models into the registry.",
    },
    {
      question: "How soon is the effect visible?",
      answer:
        "The first reproducible pipeline and registry are already a result: training stops depending on an engineer's machine.",
    },
    {
      question: "Who maintains the platform?",
      answer:
        "The customer's team with our handover: documentation, training, and support at the start.",
    },
  ],
  tradeoffs: [
    {
      title: "A platform is a product",
      text: "A platform has to be developed and maintained, or it goes stale faster than the models. A platform as a product needs an owner and regular releases.",
    },
    {
      title: "Payback grows with model count",
      text: "Infrastructure for its own sake costs more than manual rollout, so a platform pays back as the number of models grows. Payback depends on the model count and the release cadence.",
    },
    {
      title: "An entry threshold",
      text: "The team needs an engineer who owns the platform and its reliability. The entry threshold grows: without a dedicated engineer the platform goes stale.",
    },
    {
      title: "Migrating old pipelines",
      text: "Moving old pipelines into the registry takes time. Migrating old pipelines is a separate job, and it is planned before the platform launch.",
    },
  ],
  sections: [
    {
      title: "What the platform gives",
      items: [
        "Training is reproducible: code, data, and parameters are fixed, and the result repeats a month later.",
        'Model versions are not lost: the registry keeps metrics and dataset per version, and "what is in production" has an answer.',
        "Degradation shows early: monitoring catches drift before metrics fall for users.",
        "Rollout is safe: a canary release and a one-command rollback instead of a manual artifact swap.",
      ],
    },
  ],
};
