export const sovereign_model_deploymentEn = {
  ctaBanner: {
    title: "Let's run the model inside your perimeter",
    text: "Name the model, data volume, and hardware limits. We'll size the setup and show benchmarks on a test rig.",
    buttonLabel: "Request a sizing",
  },
  navTitle: "Sovereign model deployment",
  title: "Deploying sovereign models inside your perimeter",
  tagline: "Open models run on your hardware, and data stays inside the perimeter.",
  description:
    "We deploy open LLMs inside your perimeter: hardware sizing, quantization, data isolation, and a mode without external APIs. Accuracy matches the cloud on typical tasks.",
  features: [
    {
      title: "Data inside the perimeter",
      text: "Requests and documents never reach an external provider: the model runs on your hardware.",
    },
    {
      title: "Hardware sizing",
      text: "We size GPU, memory, and throughput for the model and peak load, with no guesswork headroom.",
    },
    {
      title: "Quantization",
      text: "We compress the model to fit available memory and measure the quality drop on your tasks.",
    },
    {
      title: "Fallback loop",
      text: "Under overload a request falls back to the cloud by rules instead of failing with an error.",
    },
  ],
  techStack: [
    {
      subtitle: "Models and runtime",
      description:
        "Open models [Qwen] and [Llama] run on [vLLM] inside [Kubernetes], with state and cache stored in [PostgreSQL].",
      technologies: [
        {
          id: "qwen",
          name: "Qwen",
          glossary:
            "A family of open models strong in code and non-English text: suited to local inference on your own hardware.",
        },
        {
          id: "llama",
          name: "Llama",
          glossary:
            "An open model with a wide ecosystem: quantizes to fit available memory with a measured quality drop.",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary:
            "An inference server with batching and attention caching: it squeezes throughput from a single GPU.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "Orchestrates inference inside the perimeter: model updates and fallback replicas are described as code.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores state, cache, and logs: load and local-model answer quality are visible from them.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Requirements audit",
      text: "We fix the model, tasks, and constraints: where accuracy matters and where speed is enough.",
      processType: "discovery",
    },
    {
      title: "Hardware sizing",
      text: "We size GPU and memory for the model and load, and price ownership against the cloud.",
      processType: "system-design",
    },
    {
      title: "Deployment",
      text: "We bring up inference, set isolation and observability, and close external calls.",
      processType: "deployment",
    },
    {
      title: "Quality benchmarks",
      text: "We compare the local model with the cloud one on your task set and record the gap.",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "Data must not leave",
      text: "Regulatory or commercial limits ban an external API: the model stays inside.",
      positive: true,
    },
    {
      title: "Predictable load",
      text: "The peak is known: hardware is sized for it, not for an abstract maximum.",
      positive: true,
    },
    {
      title: "You need the latest frontier model",
      text: "If the task needs a model not available as open weights, the local option will not fit.",
      positive: false,
    },
    {
      title: "No GPU and no site",
      text: "Without dedicated hardware, deployment turns into a separate infrastructure project.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Documents and correspondence",
      text: "Requests and internal documents were handled by a local model; external calls out of the perimeter were eliminated.",
      metricValue: "0",
      metricLabel: "requests to an external API",
    },
  ],
  faqItems: [
    {
      question: "Will accuracy match the cloud?",
      answer:
        "On typical tasks yes; on complex reasoning open models are weaker. We show benchmarks before you choose.",
    },
    {
      question: "What hardware is needed?",
      answer:
        "It depends on the model and load: from one GPU for a pilot to a cluster under flow. We size it in advance.",
    },
    {
      question: "Can we mix local and cloud?",
      answer:
        "Yes. Simple and closed requests run locally; complex ones go to the cloud by rules and with de-identification.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "A pilot on one GPU takes two to three weeks; a production loop starts at eight weeks.",
    },
    {
      question: "Who is responsible for the hardware?",
      answer:
        "You own the perimeter and the hardware; we own the architecture and the launch. Upkeep and spare capacity can move to us under a separate agreement.",
    },
    {
      question: "What about model updates?",
      answer:
        "An update is a project of its own: we move the prompts, repeat the benchmarks, and roll out the new version with a canary, not a weights swap overnight.",
    },
  ],
  tradeoffs: [
    {
      title: "Open models trail on complex reasoning",
      text: "Open models trail frontier on complex reasoning: where maximum accuracy is required, the local option loses.",
    },
    {
      title: "A stalled GPU stops the loop",
      text: "Hardware and its upkeep are on you: a stalled GPU stops the whole loop, so spare capacity has to be planned.",
    },
    {
      title: "Quantization lowers quality",
      text: "Quantization saves memory and adds a quality drop: measure it on your own data, because on other datasets the drop looks different.",
    },
    {
      title: "A model update is a project",
      text: "A model update is a separate project: prompt retraining, repeat benchmarks, and canary rollout run as sequential stages.",
    },
  ],
  sections: [
    {
      title: "What your own perimeter gives",
      items: [
        "Data never leaves: documents, correspondence, and requests are handled on your hardware, with no external calls.",
        "Cost becomes predictable: instead of a token bill come hardware amortization and power, flat under peak load.",
        "Latency does not depend on the provider: the model answers from the local network, and network jitter disappears.",
        "Model version control: an update does not arrive unannounced; it is planned and tested on your task set.",
      ],
    },
    {
      title: "What the deployment covers",
      items: [
        "A task and model audit: we find where maximum accuracy matters and where speed is enough.",
        "Hardware sizing: we count GPU, memory, and throughput for the model and peak load.",
        "Quantization and measurement: we compress the weights to fit memory and measure the drop on your tasks.",
        "An isolation loop: external calls closed, rights, logs, and spare replicas configured.",
        "Acceptance: we compare with the cloud model on your set and hand the metrics to your team.",
      ],
    },
    {
      title: "Hidden costs",
      items: [
        "Hardware: we size the cost of ownership up front, spare capacity and downtime included.",
        "Power and cooling: over the long run this is a visible share of the bill.",
        "Model updates: moving prompts and repeating benchmarks is a separate project, not a free upgrade.",
        "Operations: monitoring, on-call, and GPU-failure response land on your team.",
      ],
    },
  ],
};
